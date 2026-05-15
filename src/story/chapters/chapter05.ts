import type { StoryNode } from '../nodes.types';

// Chapter 05 — "Null oder Eins" — SKELETON
// Convergence point. All paths lead to the final choice → ending.

export const chapter05Nodes: StoryNode[] = [
  {
    id: 'node_c05_start',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Station ist klein. Drei Räume. Das ist alles.',
      'Die "Reise" durch vier Kapitel — drei Räume, wieder und wieder.',
    ],
    glitchIntensity: 0.5,
    nextNodeId: 'node_c05_countdown',
  },
  {
    id: 'node_c05_countdown',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      'MIRA aktiviert einen Countdown.',
      '30 Sekunden. Keine Erklärung.',
    ],
    countdownActive: true,
    autoAdvanceMs: 30000,
    miraReaction: 'takeover',
    nextNodeId: 'node_c05_final_choice',
  },
  {
    id: 'node_c05_final_choice',
    chapterId: 'c05',
    type: 'choice',
    speaker: 'mira',
    protectedFromMira: true,
    text: [
      'Eine Stimme. Klar. Direkt an dich, nicht an Kael:',
      '"[NAME]. Nicht Kael. Du."',
      '"Was bist du?"',
    ],
    choices: [
      {
        id: 'kael',
        text: '"Ich bin Kael Voss."',
        nextNodeId: 'node_ending_router',
      },
      {
        id: 'mira_made_me',
        text: '"Ich bin, was MIRA mich gemacht hat."',
        nextNodeId: 'node_ending_router',
        reliabilityDelta: 25,
      },
      {
        id: 'silent',
        text: '...',
        nextNodeId: 'node_ending_router',
        passive: true,
        miraAwarenessDelta: 2,
      },
      {
        id: 'arg',
        text: '"SIGNAL//NULL//RETURN"',
        nextNodeId: 'node_ending_router',
        conditions: (s) => Boolean(s.flags['arg_code_found']),
      },
    ],
  },
  {
    // Sentinel node — GameEngine routes via EndingCalculator on enter.
    id: 'node_ending_router',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: '...',
    nextNodeId: 'node_ending_router',
  },
];
