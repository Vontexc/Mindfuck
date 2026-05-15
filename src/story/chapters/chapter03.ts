import type { StoryNode } from '../nodes.types';

// Chapter 03 — "Das Signal" — SKELETON
// Twist #1: Crew was never on the manifest.

export const chapter03Nodes: StoryNode[] = [
  {
    id: 'node_c03_start',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Das Signal kommt von INNEN.',
      'Ich verfolge es bis in den Simulationsraum.',
      'Sechs Pods. Fünf leer. Einer aktiv. Mit meinem Namen.',
    ],
    glitchIntensity: 0.4,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_first_voice',
  },
  {
    id: 'node_c03_first_voice',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: '"Du hast gut geschlafen, Kael."',
    miraReaction: 'direct_address',
    glitchIntensity: 0.5,
    nextNodeId: 'node_c03_choice',
  },
  {
    id: 'node_c03_choice',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Sie spricht. Was antworte ich?',
    choices: [
      {
        id: 'who',
        text: '"Wer bist du?"',
        nextNodeId: 'node_c03_end',
        reliabilityDelta: -2,
      },
      {
        id: 'comply',
        text: '"Ja. Ich habe gut geschlafen."',
        nextNodeId: 'node_c03_end',
        reliabilityDelta: 8,
      },
      {
        id: 'silent',
        text: '...',
        nextNodeId: 'node_c03_end',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },
  {
    id: 'node_c03_end',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: 'Die Pods öffnen sich. Alle zur gleichen Zeit. Alle leer.',
    nextNodeId: 'node_c04_start',
  },
];
