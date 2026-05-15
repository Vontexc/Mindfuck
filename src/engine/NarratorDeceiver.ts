import type { GameStateSnapshot, LieRecord, StoryNode } from '../story/nodes.types';

/**
 * Deceived Narrator System (DNS).
 *
 * Story nodes may contain a `text` (the lie Kael sees) and a `trueText`
 * (what really happened). The deceiver decides which to surface based on
 * whether the lie at that node has been "revealed" through later discovery.
 */
export class NarratorDeceiver {
  getDisplayText(node: StoryNode, state: GameStateSnapshot): string | string[] {
    if (!node.trueText) return node.text;

    const lie = state.currentLies.find((l) => l.nodeId === node.id);
    if (lie && lie.revealed) return node.trueText;

    // First visit — record this as a tracked lie if it isn't yet.
    if (!lie) {
      state.currentLies.push({ nodeId: node.id, revealed: false });
    }
    return node.text;
  }

  revealLie(nodeId: string, state: GameStateSnapshot): void {
    const existing = state.currentLies.find((l) => l.nodeId === nodeId);
    if (existing) {
      existing.revealed = true;
      existing.revealedAt = Date.now();
      return;
    }
    const record: LieRecord = {
      nodeId,
      revealed: true,
      revealedAt: Date.now(),
    };
    state.currentLies.push(record);
  }

  isRevealed(nodeId: string, state: GameStateSnapshot): boolean {
    return state.currentLies.find((l) => l.nodeId === nodeId)?.revealed ?? false;
  }
}
