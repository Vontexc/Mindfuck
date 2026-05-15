// Generates a Mermaid graph of all story nodes — handy for narrative review.
// Usage: npm run story:graph > docs/story-graph.md

import { allStoryNodes } from '../src/story';

const lines: string[] = ['```mermaid', 'graph TD'];

for (const n of allStoryNodes) {
  const label = n.id.replace(/^node_/, '').replace(/^ending_/, 'E:');
  const shape = n.type === 'choice' ? `{${label}}` :
                n.type === 'ending_trigger' ? `[[${label}]]` :
                `[${label}]`;
  lines.push(`  ${n.id}${shape}`);

  if (n.nextNodeId && n.id !== n.nextNodeId) {
    lines.push(`  ${n.id} --> ${n.nextNodeId}`);
  }
  n.choices?.forEach((c) => {
    lines.push(`  ${n.id} -->|${c.id}| ${c.nextNodeId}`);
  });
}

lines.push('```');
console.log(lines.join('\n'));
