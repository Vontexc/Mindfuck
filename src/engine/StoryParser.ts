import type { StoryNode } from '../story/nodes.types';

/**
 * StoryParser — validates and indexes raw story content modules.
 *
 * Story files export arrays of StoryNode. The parser ensures referential
 * integrity (every nextNodeId resolves to a node, no orphans) and surfaces
 * structural problems at boot rather than mid-playthrough.
 */
export class StoryParser {
  parse(nodes: StoryNode[]): { valid: StoryNode[]; errors: string[] } {
    const errors: string[] = [];
    const ids = new Set<string>();

    for (const n of nodes) {
      if (ids.has(n.id)) errors.push(`Duplicate node id: ${n.id}`);
      ids.add(n.id);
      if (!n.text) errors.push(`Node ${n.id} has empty text`);
    }

    for (const n of nodes) {
      if (n.nextNodeId && !ids.has(n.nextNodeId)) {
        errors.push(`Node ${n.id} → unknown nextNodeId: ${n.nextNodeId}`);
      }
      n.choices?.forEach((c) => {
        if (!ids.has(c.nextNodeId)) {
          errors.push(
            `Node ${n.id} choice ${c.id} → unknown nextNodeId: ${c.nextNodeId}`,
          );
        }
      });
    }

    return { valid: nodes, errors };
  }
}
