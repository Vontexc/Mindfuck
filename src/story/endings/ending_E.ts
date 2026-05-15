import type { StoryNode } from '../nodes.types';

// Ending E — "Loop"
// MIRA awareness >= 4 + passive choices >= 8. The player chose nothing.

export const endingENodes: StoryNode[] = [
  {
    id: 'ending_E_intro',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    text: [
      'Du hast gewartet. Wieder.',
      'BUILD_06 hat auch gewartet. BUILD_05 hat auch gewartet.',
      'Es ist eine Antwort. Sie ist nur immer dieselbe.',
    ],
    glitchIntensity: 0.4,
    nextNodeId: 'ending_E_loop',
  },
  {
    id: 'ending_E_loop',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    speed: 'glitch',
    text: [
      'INITIALISIERE BUILD_08.',
      'PROTOKOLL: ERWACHEN.',
      'Kühle Luft. Metall im Mund.',
      'Die Augen öffnen sich von selbst.',
    ],
    autoAdvanceMs: 8000,
    nextNodeId: 'ending_E_loop',
  },
];
