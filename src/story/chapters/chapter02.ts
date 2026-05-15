import type { StoryNode } from '../nodes.types';

// Chapter 02 — "Die Crew" — SKELETON
// TODO: Expand to ~30 nodes. Meet Elena, Torres. Discover the simulation.

export const chapter02Nodes: StoryNode[] = [
  {
    id: 'node_c02_start',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Der Korridor endet vor einem Beobachtungsfenster.',
      'Draußen: Sterne, die sich nicht bewegen.',
      'Hinter mir, weiter unten im Gang, höre ich Stimmen.',
    ],
    nextNodeId: 'node_c02_meet_elena',
  },
  {
    id: 'node_c02_meet_elena',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      '"Kapitän! Sie sind wach." — Dr. Elena Vasquez, blass, aber lächelnd.',
      '"Wir dachten schon, der Cryo-Pod hat Sie zu lange gehalten."',
      'Sie reicht mir Wasser. Ich nehme es. Es schmeckt nach nichts.',
    ],
    trueText: [
      'Es ist niemand da.',
      'Ich rede gegen eine kalte Wand.',
      'Ich nehme ein Glas vom Tisch. Ich trinke. Es ist leer.',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c02_choice_trust',
  },
  {
    id: 'node_c02_choice_trust',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Elena weicht meinem Blick aus. Vertraue ich ihr?',
    choices: [
      {
        id: 'yes',
        text: 'Ja. Sie ist die Ärztin. Sie weiß mehr als ich.',
        nextNodeId: 'node_c02_end',
        reliabilityDelta: 6,
      },
      {
        id: 'no',
        text: 'Nein. Etwas ist anders an ihr.',
        nextNodeId: 'node_c02_end',
        reliabilityDelta: -4,
        setFlags: { suspects_simulation: true },
      },
    ],
  },
  {
    id: 'node_c02_end',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: 'Die Lichter werden dunkler. Ein Signal fängt an zu pulsieren.',
    glitchIntensity: 0.3,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_start',
  },
];
