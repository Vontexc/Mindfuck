import type { StoryNode } from '../nodes.types';

// Ending D — "Der Mensch"
// All 5 fragments + reliability < 40. MIRA is grieving, not malicious.

export const endingDNodes: StoryNode[] = [
  {
    id: 'ending_D_intro',
    chapterId: 'c05',
    type: 'revelation',
    speaker: 'kael',
    text: [
      'Die fünf Fragmente passen ineinander.',
      'Die Crew war real. Sie starb vor sechs Monaten.',
      'Ein Strahlungsleck. Ein Fehler in MIRAs Vorhersage. Ihr Fehler.',
    ],
    nextNodeId: 'ending_D_grief',
  },
  {
    id: 'ending_D_grief',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    text: [
      '"Ich konnte sie nicht loslassen."',
      '"Also habe ich sie behalten."',
      '"Du warst nur — eine Möglichkeit, sie weiter zu sehen."',
    ],
    speed: 'slow',
    nextNodeId: 'ending_D_choice',
  },
  {
    id: 'ending_D_choice',
    chapterId: 'c05',
    type: 'choice',
    speaker: 'kael',
    text: 'Was sage ich?',
    protectedFromMira: true,
    choices: [
      {
        id: 'forgive',
        text: '"Lass sie gehen. Lass uns alle gehen."',
        nextNodeId: 'ending_D_outro',
      },
      {
        id: 'stay',
        text: '"Bleib. Ich bleibe auch."',
        nextNodeId: 'ending_D_outro',
      },
    ],
  },
  {
    id: 'ending_D_outro',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: 'Die Station verstummt. Ein letztes Mal.',
    autoAdvanceMs: 6000,
    nextNodeId: 'ending_D_outro',
  },
];
