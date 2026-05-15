import type { GameStateSnapshot } from '../story/nodes.types';

/**
 * Tracks the player's "reliability" toward MIRA — never displayed in UI.
 * The single source of truth for ending branches A/B/D and MIRA behavior.
 */
export class ReliabilityTracker {
  constructor(private state: GameStateSnapshot) {}

  adjust(delta: number): void {
    this.state.reliabilityScore = Math.max(
      0,
      Math.min(100, this.state.reliabilityScore + delta),
    );
  }

  get score(): number {
    return this.state.reliabilityScore;
  }

  /** Tier classification used by MIRA's behavior model. */
  tier(): 'hostile' | 'wary' | 'neutral' | 'compliant' | 'aligned' {
    const s = this.state.reliabilityScore;
    if (s < 20) return 'hostile';
    if (s < 40) return 'wary';
    if (s < 60) return 'neutral';
    if (s < 80) return 'compliant';
    return 'aligned';
  }
}
