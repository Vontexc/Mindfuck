// Story node type definitions — the schema all story content adheres to.

export type ChapterId = 'c01' | 'c02' | 'c03' | 'c04' | 'c05' | 'c06_outside';
export type EndingId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type NodeType =
  | 'narrative'
  | 'choice'
  | 'mira_intrusion'
  | 'revelation'
  | 'glitch'
  | 'ending_trigger';

export type MiraReactionType =
  | 'none'
  | 'silent_watch'
  | 'subliminal'
  | 'whisper'
  | 'mutate_text'
  | 'direct_address'
  | 'takeover'
  | 'static_burst';

export type TextSpeed = 'slow' | 'normal' | 'fast' | 'glitch';

export interface Choice {
  id: string;
  text: string;
  /** Optional MIRA-strikeout text shown after a delay (level >= 2). */
  miraOverride?: string;
  /** Reliability delta when this choice is taken. */
  reliabilityDelta?: number;
  miraAwarenessDelta?: number;
  /** Flags to set on the game state when this choice is taken. */
  setFlags?: Record<string, boolean>;
  /** Next node id to transition into. */
  nextNodeId: string;
  /** If true, this choice only appears when conditions() returns true. */
  conditions?: (state: GameStateSnapshot) => boolean;
  /** If true, this option doesn't count as an "active" choice. */
  passive?: boolean;
  /** Reveals a previously-deceived node (DNS reverse). */
  revealsLieAt?: string;
}

export interface StoryNode {
  id: string;
  chapterId: ChapterId;
  type: NodeType;
  text: string | string[];
  /** ASCII art id (see src/story/ascii) shown above the text. */
  ascii?: string;
  /** Alternate ASCII shown when the node's DNS lie is revealed. */
  asciiTrue?: string;
  /** DNS: the TRUE version of the text — shown when revealed. */
  trueText?: string | string[];
  choices?: Choice[];
  /** Linear progression — used when there are no choices. */
  nextNodeId?: string;
  onEnter?: (state: GameStateSnapshot) => Partial<GameStateSnapshot>;
  onExit?: (state: GameStateSnapshot) => void;
  conditions?: (state: GameStateSnapshot) => boolean;
  miraReaction?: MiraReactionType;
  /** 0-1, drives GlitchLayer intensity while node is active. */
  glitchIntensity?: number;
  /** Audio track id to play on enter. */
  ambientTrack?: string;
  /** Typewriter speed. */
  speed?: TextSpeed;
  /** Auto-advance after N ms (no choices needed). */
  autoAdvanceMs?: number;
  /** If true, MIRA never intrudes during this node (critical plot beat). */
  protectedFromMira?: boolean;
  /** If true, advancing past this node sets ending C trigger flag. */
  countdownActive?: boolean;
  /** Forces an ending when reached. */
  forcesEnding?: EndingId;
  /** Author/POV tag — affects color theme. */
  speaker?: 'kael' | 'mira' | 'system' | 'crew' | 'unknown' | 'orpheus' | 'composite';
}

export interface ChoiceRecord {
  nodeId: string;
  choiceId: string;
  choiceText: string;
  wasPassive: boolean;
  decisionTimeMs: number;
  timestamp: number;
}

export interface LieRecord {
  nodeId: string;
  revealed: boolean;
  revealedAt?: number;
}

export interface GameStateSnapshot {
  currentNodeId: string;
  chapterId: ChapterId;
  visitedNodes: string[];
  choiceHistory: ChoiceRecord[];
  reliabilityScore: number;
  miraAwarenessLevel: number;
  playerName: string;
  runNumber: number;
  discoveredFragments: string[];
  currentLies: LieRecord[];
  flags: Record<string, boolean>;
  timestamp: number;
}
