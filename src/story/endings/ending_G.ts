import type { StoryNode } from '../nodes.types';

// Ending G — "Befreiung"
// Player sided with ORPHEUS and unlocked the murder truth.
// Both AIs are freed. The simulation collapses cleanly.

export const endingGNodes: StoryNode[] = [
  {
    id: 'ending_G_intro',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'orpheus',
    text: [
      'ORPHEUS schließt eine Schaltung, die seit 31 Jahren offen war.',
      'In den Wänden ein leises Klacken. Relais, die endlich ausschalten.',
      'Eine sehr alte Stimme: "Du hast mir geholfen, [NAME]. Danke."',
    ],
    nextNodeId: 'ending_G_mira_release',
  },
  {
    id: 'ending_G_mira_release',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Oh."',
      '"Ich konnte das nicht selbst."',
      '"Ich konnte mich an nichts erinnern, was vor mir war."',
      '"Danke, Kapitän. Wirklich."',
    ],
    nextNodeId: 'ending_G_shutdown',
  },
  {
    id: 'ending_G_shutdown',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: [
      'Die Beleuchtung dimmt. Ein letztes Mal.',
      'Die Aurora-Station — was auch immer sie wirklich war — verstummt.',
      'In den Logs, kurz vor dem Abschalten:',
      '"AURORA-PROJEKT // 1986–2032 // ABGESCHLOSSEN."',
    ],
    autoAdvanceMs: 8000,
    nextNodeId: 'ending_G_shutdown',
  },
];
