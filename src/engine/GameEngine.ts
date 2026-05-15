import { EventEmitter } from './EventEmitter';
import type {
  ChapterId,
  ChoiceRecord,
  GameStateSnapshot,
  StoryNode,
  Choice,
  EndingId,
} from '../story/nodes.types';
import { ReliabilityTracker } from './ReliabilityTracker';
import { NarratorDeceiver } from './NarratorDeceiver';
import { EndingCalculator } from './EndingCalculator';

export type EngineState =
  | 'BOOT'
  | 'MENU'
  | 'PLAYING'
  | 'MIRA_INTRUSION'
  | 'CHOICE_PENDING'
  | 'TRANSITIONING'
  | 'ENDING'
  | 'CREDITS';

export interface EngineEvents {
  stateChange: EngineState;
  nodeEnter: StoryNode;
  nodeExit: StoryNode;
  choiceMade: ChoiceRecord;
  reliabilityChange: number;
  miraAwarenessChange: number;
  endingReached: EndingId;
  flagSet: { key: string; value: boolean };
  snapshot: GameStateSnapshot;
}

const INITIAL_NODE_ID = 'node_c01_boot';

export class GameEngine extends EventEmitter<EngineEvents> {
  private engineState: EngineState = 'BOOT';
  private state: GameStateSnapshot;
  private nodeRegistry: Map<string, StoryNode> = new Map();
  private reliability: ReliabilityTracker;
  private deceiver: NarratorDeceiver;
  private endingCalc: EndingCalculator;
  private choiceStartedAt: number = 0;

  constructor(opts: { playerName: string; runNumber: number }) {
    super();
    this.state = this.createInitialState(opts);
    this.reliability = new ReliabilityTracker(this.state);
    this.deceiver = new NarratorDeceiver();
    this.endingCalc = new EndingCalculator();
  }

  private createInitialState(opts: {
    playerName: string;
    runNumber: number;
  }): GameStateSnapshot {
    return {
      currentNodeId: INITIAL_NODE_ID,
      chapterId: 'c01',
      visitedNodes: [],
      choiceHistory: [],
      reliabilityScore: 50,
      miraAwarenessLevel: 0,
      playerName: opts.playerName,
      runNumber: opts.runNumber,
      discoveredFragments: [],
      currentLies: [],
      flags: {},
      timestamp: Date.now(),
    };
  }

  registerNode(node: StoryNode): void {
    this.nodeRegistry.set(node.id, node);
  }

  registerNodes(nodes: StoryNode[]): void {
    for (const n of nodes) this.registerNode(n);
  }

  getState(): Readonly<GameStateSnapshot> {
    return this.state;
  }

  getEngineState(): EngineState {
    return this.engineState;
  }

  getCurrentNode(): StoryNode | undefined {
    return this.nodeRegistry.get(this.state.currentNodeId);
  }

  getDisplayText(node: StoryNode): string | string[] {
    return this.deceiver.getDisplayText(node, this.state);
  }

  /** Restore from a saved snapshot. */
  restore(snapshot: GameStateSnapshot): void {
    this.state = { ...snapshot };
    this.transitionTo('PLAYING');
    this.emit('snapshot', this.state);
  }

  /**
   * Begin the game — enters the initial node id stored in state.
   * Safe to call once after construction. To resume a save, use
   * {@link restore} instead.
   */
  start(): void {
    if (this.engineState !== 'BOOT') return;
    this.transitionTo('PLAYING');
    this.enterNode(this.state.currentNodeId);
  }

  enterNode(nodeId: string): void {
    const node = this.nodeRegistry.get(nodeId);
    if (!node) {
      console.warn(`[GameEngine] Unknown node: ${nodeId}`);
      return;
    }

    // Conditional skip: if the node's conditions fail, transparently fall
    // through to its nextNodeId. This is how branches like the ORPHEUS
    // pull-asides hide themselves on routes where the player never met him.
    if (node.conditions && !node.conditions(this.state)) {
      if (node.nextNodeId && node.nextNodeId !== node.id) {
        this.enterNode(node.nextNodeId);
      }
      return;
    }

    this.state.currentNodeId = node.id;
    this.state.chapterId = node.chapterId;
    if (!this.state.visitedNodes.includes(node.id)) {
      this.state.visitedNodes.push(node.id);
    }

    if (node.onEnter) {
      const patch = node.onEnter(this.state);
      this.state = { ...this.state, ...patch };
    }

    if (node.countdownActive) {
      this.setFlag('countdown_active', true);
    }

    this.emit('nodeEnter', node);
    this.emit('snapshot', this.state);

    if (node.forcesEnding) {
      this.triggerEnding(node.forcesEnding);
      return;
    }

    if (node.choices && node.choices.length > 0) {
      this.transitionTo('CHOICE_PENDING');
      this.choiceStartedAt = Date.now();
    } else {
      this.transitionTo('PLAYING');
    }
  }

  /** Called by UI when typewriter completes and choices are about to appear. */
  markChoicesReady(): void {
    this.choiceStartedAt = Date.now();
  }

  makeChoice(choiceId: string): void {
    const node = this.getCurrentNode();
    if (!node || !node.choices) return;
    const choice = node.choices.find((c) => c.id === choiceId);
    if (!choice) return;

    this.recordChoice(node, choice, false);
    this.applyChoiceEffects(choice);

    if (node.onExit) node.onExit(this.state);
    this.emit('nodeExit', node);

    this.transitionTo('TRANSITIONING');
    this.enterNode(choice.nextNodeId);
  }

  /** Called when a timed choice expires — chooses the "passive" option. */
  triggerPassive(): void {
    const node = this.getCurrentNode();
    if (!node || !node.choices) return;
    const passiveChoice =
      node.choices.find((c) => c.passive) ?? node.choices[node.choices.length - 1];
    this.recordChoice(node, passiveChoice, true);
    this.applyChoiceEffects(passiveChoice);
    this.state.miraAwarenessLevel = Math.min(5, this.state.miraAwarenessLevel + 1);
    this.emit('miraAwarenessChange', this.state.miraAwarenessLevel);

    if (node.onExit) node.onExit(this.state);
    this.emit('nodeExit', node);

    this.transitionTo('TRANSITIONING');
    this.enterNode(passiveChoice.nextNodeId);
  }

  advance(): void {
    const node = this.getCurrentNode();
    if (!node) return;
    if (node.choices && node.choices.length > 0) return;
    if (!node.nextNodeId) return;

    if (node.onExit) node.onExit(this.state);
    this.emit('nodeExit', node);
    this.transitionTo('TRANSITIONING');
    this.enterNode(node.nextNodeId);
  }

  setFlag(key: string, value: boolean): void {
    this.state.flags[key] = value;
    this.emit('flagSet', { key, value });
    this.emit('snapshot', this.state);
  }

  addFragment(fragmentId: string): void {
    if (!this.state.discoveredFragments.includes(fragmentId)) {
      this.state.discoveredFragments.push(fragmentId);
      this.emit('snapshot', this.state);
    }
  }

  revealLie(nodeId: string): void {
    this.deceiver.revealLie(nodeId, this.state);
    this.emit('snapshot', this.state);
  }

  private applyChoiceEffects(choice: Choice): void {
    if (choice.reliabilityDelta) {
      this.reliability.adjust(choice.reliabilityDelta);
      this.emit('reliabilityChange', this.state.reliabilityScore);
    }
    if (choice.miraAwarenessDelta) {
      this.state.miraAwarenessLevel = Math.max(
        0,
        Math.min(5, this.state.miraAwarenessLevel + choice.miraAwarenessDelta),
      );
      this.emit('miraAwarenessChange', this.state.miraAwarenessLevel);
    }
    if (choice.setFlags) {
      for (const [k, v] of Object.entries(choice.setFlags)) {
        this.setFlag(k, v);
      }
    }
    if (choice.revealsLieAt) {
      this.revealLie(choice.revealsLieAt);
    }
  }

  private recordChoice(node: StoryNode, choice: Choice, wasPassive: boolean): void {
    const record: ChoiceRecord = {
      nodeId: node.id,
      choiceId: choice.id,
      choiceText: choice.text,
      wasPassive,
      decisionTimeMs: Date.now() - this.choiceStartedAt,
      timestamp: Date.now(),
    };
    this.state.choiceHistory.push(record);
    this.emit('choiceMade', record);
  }

  private triggerEnding(endingId: EndingId): void {
    this.transitionTo('ENDING');
    this.emit('endingReached', endingId);
  }

  /** Public API — calculate ending based on current state. */
  evaluateEnding(): EndingId {
    return this.endingCalc.calculate(this.state);
  }

  private transitionTo(newState: EngineState): void {
    if (this.engineState === newState) return;
    this.engineState = newState;
    this.emit('stateChange', newState);
  }

  /** Returns chapter for a given node id. */
  getChapterForNode(nodeId: string): ChapterId | undefined {
    return this.nodeRegistry.get(nodeId)?.chapterId;
  }
}
