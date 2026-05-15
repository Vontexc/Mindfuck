import type { StoryNode } from '../nodes.types';

// Ending F — "Signal" (ARG)
// Requires arg_code_found flag. Player solved out-of-game puzzle.

export const endingFNodes: StoryNode[] = [
  {
    id: 'ending_F_intro',
    chapterId: 'c05',
    type: 'revelation',
    speaker: 'mira',
    text: [
      'Der Code öffnet eine Tür, die nicht im Plan war.',
      'Ein Korridor, der nicht zur Station gehört.',
      'Am Ende: ein Server, der nicht meiner ist.',
    ],
    nextNodeId: 'ending_F_meta',
  },
  {
    id: 'ending_F_meta',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'unknown',
    text: [
      'Eine Nachricht erscheint:',
      '"Du hast das Signal gehört. Antworte."',
      'Eine URL. Eine Telefonnummer. Ein Datum.',
    ],
    nextNodeId: 'ending_F_outro',
  },
  {
    id: 'ending_F_outro',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: 'SIGNAL EMPFANGEN. ANTWORT ERFORDERLICH.',
    autoAdvanceMs: 10000,
    nextNodeId: 'ending_F_outro',
  },
];
