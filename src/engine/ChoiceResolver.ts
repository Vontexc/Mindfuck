import type { Choice, GameStateSnapshot, StoryNode } from '../story/nodes.types';

/**
 * Resolves which choices should be visible at a given node.
 * Conditions can hide options based on state (e.g. ARG option only when flag set).
 */
export class ChoiceResolver {
  visibleChoices(node: StoryNode, state: GameStateSnapshot): Choice[] {
    if (!node.choices) return [];
    return node.choices.filter((c) =>
      c.conditions ? c.conditions(state) : true,
    );
  }
}
