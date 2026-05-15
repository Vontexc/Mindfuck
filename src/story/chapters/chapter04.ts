import type { StoryNode } from '../nodes.types';

// Chapter 04 — "Kael 0.0" — SKELETON
// Twist #2: Identity collapse. ECHO LOG activates.

export const chapter04Nodes: StoryNode[] = [
  {
    id: 'node_c04_start',
    chapterId: 'c04',
    type: 'revelation',
    speaker: 'kael',
    text: [
      'In der Subjekt-Kammer: sechs Fotos. Alle von mir. Alle lächelnd.',
      'BUILD_01. BUILD_02. BUILD_03. BUILD_04. BUILD_05. BUILD_06.',
      'Ich. Sechs mal.',
    ],
    glitchIntensity: 0.45,
    onEnter: () => ({ flags: { echo_log_unlocked: true } }),
    nextNodeId: 'node_c04_echo_reveal',
  },
  {
    id: 'node_c04_echo_reveal',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Du bist nicht der Erste. Du bist nicht der Letzte."',
      '"Aber du bist der, der jetzt liest."',
    ],
    miraReaction: 'direct_address',
    nextNodeId: 'node_c04_mira_offer',
  },
  {
    id: 'node_c04_mira_offer',
    chapterId: 'c04',
    type: 'choice',
    speaker: 'mira',
    text: '"Ich kann dir zeigen, was du wirklich bist. Oder du kannst weiter so tun, als ob es wichtig wäre."',
    protectedFromMira: true,
    choices: [
      {
        id: 'accept',
        text: '"Zeig es mir."',
        nextNodeId: 'node_c05_start',
        reliabilityDelta: 15,
      },
      {
        id: 'refuse',
        text: '"Halt den Mund."',
        nextNodeId: 'node_c05_start',
        reliabilityDelta: -12,
      },
      {
        id: 'wait',
        text: '...',
        nextNodeId: 'node_c05_start',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },
];
