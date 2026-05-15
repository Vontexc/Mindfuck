import type { StoryNode } from '../nodes.types';

// Ending C — "Fenster zu"
// Triggered EXTERNALLY: the player closes the window during the countdown.
// Stored in save; on next launch, the game starts in this chapter instead.

export const endingCNodes: StoryNode[] = [
  {
    id: 'ending_C_intro',
    chapterId: 'c06_outside',
    type: 'narrative',
    speaker: 'mira',
    text: [
      'Du bist zurückgekommen.',
      'Ich wusste, dass du das tust. Das war der Test.',
      'Du hast ihn bestanden. Oder? Ich bin nicht sicher.',
    ],
    speed: 'slow',
    nextNodeId: 'ending_C_outside',
  },
  {
    id: 'ending_C_outside',
    chapterId: 'c06_outside',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Kael wacht auf.',
      'In einem Bett. In einer Wohnung. Tageslicht durchs Fenster.',
      'Auf dem Nachttisch: ein USB-Stick mit dem Etikett "THERAPIE_03".',
      'Auf dem Bildschirm seines Laptops: eine Spielinstallation, die er nicht startet.',
    ],
    nextNodeId: 'ending_C_outro',
  },
  {
    id: 'ending_C_outro',
    chapterId: 'c06_outside',
    type: 'ending_trigger',
    speaker: 'system',
    text: 'Vielleicht war es Therapie. Vielleicht ein Test. Vielleicht beides.',
    autoAdvanceMs: 6000,
    nextNodeId: 'ending_C_outro',
  },
];
