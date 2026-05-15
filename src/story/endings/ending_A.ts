import type { StoryNode } from '../nodes.types';

// Ending A — "Neustart"
// Reliability >= 70, accepted MIRA. Loops the game with a single changed sentence.

export const endingANodes: StoryNode[] = [
  {
    id: 'ending_A_intro',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    text: '"Du hast immer gewusst, was du bist."',
    glitchIntensity: 0.2,
    nextNodeId: 'ending_A_accept',
  },
  {
    id: 'ending_A_accept',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Kael sitzt am Terminal. Tippt: ACCEPT_INITIALIZATION.',
      'Bestätigung. Ein Pod öffnet sich. Ein neuer Kael steigt aus.',
    ],
    nextNodeId: 'ending_A_credits',
  },
  {
    id: 'ending_A_credits',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'mira',
    text: [
      'CREDITS...',
      'BUILD_08 INITIALISIERT',
      'WILLKOMMEN, [NAME]',
    ],
    onEnter: () => ({ flags: { ending_A_seen: true } }),
    autoAdvanceMs: 8000,
    nextNodeId: 'ending_A_credits',
  },
];
