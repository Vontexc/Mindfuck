import { EventEmitter } from './EventEmitter';
import type {
  ChoiceRecord,
  GameStateSnapshot,
  MiraReactionType,
} from '../story/nodes.types';

export type IntrusionType =
  | 'subliminal_flash'
  | 'choice_strikethrough'
  | 'text_mutation'
  | 'static_burst'
  | 'direct_address'
  | 'ui_stutter'
  | 'false_memory'
  | 'countdown_inject'
  | 'font_shift';

export interface Intrusion {
  type: IntrusionType;
  payload: string;
  durationMs: number;
  /** Player's name interpolated if the line uses `[NAME]`. */
  resolvedText: string;
}

export interface MiraEvents {
  intrusion: Intrusion;
  awarenessChange: number;
  whisper: string;
}

interface BehaviorModel {
  avgDecisionTimeMs: number;
  fastDecisionCount: number;
  passiveCount: number;
  logicalChoiceCount: number;
  emotionalChoiceCount: number;
  observedReReads: number;
}

import { subliminalWords, whisperLines, directAddressLines } from '../story/mira_dialogs/intrusions';

export class MiraEngine extends EventEmitter<MiraEvents> {
  private model: BehaviorModel = {
    avgDecisionTimeMs: 0,
    fastDecisionCount: 0,
    passiveCount: 0,
    logicalChoiceCount: 0,
    emotionalChoiceCount: 0,
    observedReReads: 0,
  };

  private playerName: string;
  private nodeIsProtected = false;
  private queue: Array<() => void> = [];

  constructor(playerName: string) {
    super();
    this.playerName = playerName;
  }

  setPlayerName(name: string): void {
    this.playerName = name;
  }

  setProtected(isProtected: boolean): void {
    this.nodeIsProtected = isProtected;
    if (!isProtected) this.flushQueue();
  }

  analyzeChoice(record: ChoiceRecord, state: GameStateSnapshot): void {
    const total = state.choiceHistory.length;
    this.model.avgDecisionTimeMs =
      (this.model.avgDecisionTimeMs * (total - 1) + record.decisionTimeMs) / total;
    if (record.decisionTimeMs < 3000) this.model.fastDecisionCount++;
    if (record.wasPassive) this.model.passiveCount++;

    this.maybeIntrude(state);
  }

  /**
   * React to a story node's MIRA reaction tag.
   * Called when a node is entered.
   */
  reactToNode(reaction: MiraReactionType, state: GameStateSnapshot): void {
    if (reaction === 'none' || this.nodeIsProtected) return;

    switch (reaction) {
      case 'subliminal':
        this.fireIntrusion('subliminal_flash', this.pickSubliminal(), 120);
        break;
      case 'whisper':
        this.fireIntrusion('false_memory', this.pickWhisper(state), 2000);
        break;
      case 'mutate_text':
        this.fireIntrusion('text_mutation', '', 4000);
        break;
      case 'direct_address':
        if (state.miraAwarenessLevel >= 4) {
          this.fireIntrusion(
            'direct_address',
            this.pickDirectAddress(state),
            5000,
          );
        }
        break;
      case 'takeover':
        this.fireIntrusion('static_burst', '', 1500);
        break;
      case 'silent_watch':
        // Intentional no-op — presence felt by absence.
        break;
    }
  }

  private maybeIntrude(state: GameStateSnapshot): void {
    const level = state.miraAwarenessLevel;
    if (level === 0) return;

    // Rough probability ramps with awareness level.
    const probability = 0.05 + level * 0.08;
    if (Math.random() > probability) return;

    if (level <= 1) {
      this.fireIntrusion('subliminal_flash', this.pickSubliminal(), 120);
    } else if (level === 2) {
      this.fireIntrusion('ui_stutter', '', 600);
    } else if (level === 3) {
      this.fireIntrusion('text_mutation', this.pickWhisper(state), 3000);
    } else if (level >= 4) {
      // Alternate between whisper-style and direct address at high levels.
      if (Math.random() < 0.5) {
        this.fireIntrusion('false_memory', this.pickWhisper(state), 2500);
      } else {
        this.fireIntrusion(
          'direct_address',
          this.pickDirectAddress(state),
          4500,
        );
      }
    }
  }

  private fireIntrusion(
    type: IntrusionType,
    payload: string,
    durationMs: number,
  ): void {
    const intrusion: Intrusion = {
      type,
      payload,
      durationMs,
      resolvedText: this.interpolate(payload),
    };
    if (this.nodeIsProtected) {
      this.queue.push(() => this.emit('intrusion', intrusion));
      return;
    }
    this.emit('intrusion', intrusion);
  }

  private flushQueue(): void {
    const items = this.queue.splice(0);
    for (const fn of items) fn();
  }

  private interpolate(text: string): string {
    return text.replace(/\[NAME\]/g, this.playerName || 'KAEL');
  }

  private pickSubliminal(): string {
    return subliminalWords[Math.floor(Math.random() * subliminalWords.length)];
  }

  private pickWhisper(state: GameStateSnapshot): string {
    // Bias selection on tier — wary players hear menace, compliant ones hear reassurance.
    const pool = whisperLines;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  private pickDirectAddress(state: GameStateSnapshot): string {
    return directAddressLines[
      Math.floor(Math.random() * directAddressLines.length)
    ];
  }
}
