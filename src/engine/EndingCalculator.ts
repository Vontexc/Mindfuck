import type { EndingId, GameStateSnapshot } from '../story/nodes.types';

export class EndingCalculator {
  calculate(state: GameStateSnapshot): EndingId {
    // Externally-triggered endings always take priority.
    if (state.flags['window_closed_during_countdown']) return 'C';
    if (state.flags['arg_code_found']) return 'F';

    // Ending G — Befreiung — requires player to have sided with ORPHEUS
    // and to have unlocked his truth (murder reveal).
    if (
      state.flags['sided_with_orpheus'] &&
      state.flags['orpheus_truth_unlocked']
    ) {
      return 'G';
    }

    // Ending D — Der Mensch — requires the fragments and a low rapport.
    if (
      state.discoveredFragments.length >= 5 &&
      state.reliabilityScore < 40
    ) {
      return 'D';
    }

    // Ending E — Loop — high awareness paired with chronic passivity.
    const passiveCount = state.choiceHistory.filter((c) => c.wasPassive).length;
    if (state.miraAwarenessLevel >= 4 && passiveCount >= 8) return 'E';

    if (state.reliabilityScore >= 70) return 'A';
    if (state.reliabilityScore >= 40) return 'B';

    return 'B';
  }

  label(id: EndingId): string {
    const labels: Record<EndingId, string> = {
      A: 'Neustart',
      B: 'Flatline',
      C: 'Fenster zu',
      D: 'Der Mensch',
      E: 'Loop',
      F: 'Signal',
      G: 'Befreiung',
    };
    return labels[id];
  }
}
