import type { EndingId, GameStateSnapshot } from '../story/nodes.types';

export class EndingCalculator {
  calculate(state: GameStateSnapshot): EndingId {
    if (state.flags['window_closed_during_countdown']) return 'C';
    if (state.flags['arg_code_found']) return 'F';

    if (
      state.discoveredFragments.length >= 5 &&
      state.reliabilityScore < 40
    ) {
      return 'D';
    }

    const passiveCount = state.choiceHistory.filter((c) => c.wasPassive).length;
    if (state.miraAwarenessLevel >= 4 && passiveCount >= 8) return 'E';

    if (state.reliabilityScore >= 70) return 'A';
    if (state.reliabilityScore >= 40) return 'B';

    return 'B';
  }

  /** Human-readable label, used for the EndingScreen. */
  label(id: EndingId): string {
    const labels: Record<EndingId, string> = {
      A: 'Neustart',
      B: 'Flatline',
      C: 'Fenster zu',
      D: 'Der Mensch',
      E: 'Loop',
      F: 'Signal',
    };
    return labels[id];
  }
}
