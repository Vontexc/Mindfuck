import type { StoryNode } from './nodes.types';
import { chapter01Nodes } from './chapters/chapter01';
import { chapter02Nodes } from './chapters/chapter02';
import { chapter03Nodes } from './chapters/chapter03';
import { chapter04Nodes } from './chapters/chapter04';
import { chapter05Nodes } from './chapters/chapter05';
import { endingANodes } from './endings/ending_A';
import { endingBNodes } from './endings/ending_B';
import { endingCNodes } from './endings/ending_C';
import { endingDNodes } from './endings/ending_D';
import { endingENodes } from './endings/ending_E';
import { endingFNodes } from './endings/ending_F';
import { endingGNodes } from './endings/ending_G';

export const allStoryNodes: StoryNode[] = [
  ...chapter01Nodes,
  ...chapter02Nodes,
  ...chapter03Nodes,
  ...chapter04Nodes,
  ...chapter05Nodes,
  ...endingANodes,
  ...endingBNodes,
  ...endingCNodes,
  ...endingDNodes,
  ...endingENodes,
  ...endingFNodes,
  ...endingGNodes,
];

export { chapter01Nodes, chapter02Nodes, chapter03Nodes, chapter04Nodes, chapter05Nodes };
export { endingANodes, endingBNodes, endingCNodes, endingDNodes, endingENodes, endingFNodes, endingGNodes };
