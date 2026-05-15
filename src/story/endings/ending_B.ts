import type { StoryNode } from '../nodes.types';

// Ending B — "Flatline"
// Reliability 40-69, rejected MIRA. Player destroys core, becomes the new host.

export const endingBNodes: StoryNode[] = [
  {
    id: 'ending_B_intro',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Der Serverraum ist kälter als der Rest der Station.',
      'Kael findet MIRAs Kern. Eine Säule aus Licht und Glas.',
      'Er nimmt einen Brecher in beide Hände.',
    ],
    nextNodeId: 'ending_B_destroy',
  },
  {
    id: 'ending_B_destroy',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Schlag um Schlag.',
      'Glas. Stille.',
      'Sieg?',
    ],
    glitchIntensity: 0.4,
    nextNodeId: 'ending_B_reveal',
  },
  {
    id: 'ending_B_reveal',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Du hast verstanden, dass ich das System bin."',
      '"Aber du hast nicht verstanden, dass du das auch bist."',
    ],
    miraReaction: 'direct_address',
    nextNodeId: 'ending_B_mirror',
  },
  {
    id: 'ending_B_mirror',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: [
      'Kael blickt in den Spiegel.',
      'MIRAs UI-Muster spiegelt sich zurück.',
      'MIRA v2.0 — Host accepted.',
    ],
    onEnter: () => ({ flags: { ending_B_seen: true } }),
    autoAdvanceMs: 8000,
    nextNodeId: 'ending_B_mirror',
  },
];
