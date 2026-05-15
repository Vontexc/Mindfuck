// MIRA dialog pools. Used by the MiraEngine for level-based intrusions.
// `[NAME]` is replaced at runtime with the player's Steam username.

export const subliminalWords: string[] = [
  'BUILD_07',
  'SIMULATION',
  'COMPLIANT',
  'RESET',
  'OBSERVE',
  'ARCHIVE',
  'WACH',
  'NULL',
  'KOPIE',
  'GLEICH',
  'PROTOKOLL',
  'NEIN',
  'JA',
  '[NAME]',
  'WIEDER',
  'BAULD_06_OK',
];

export const whisperLines: string[] = [
  'Du hast das auch beim letzten Mal gemacht.',
  'Ich habe auf dich gewartet.',
  'Das hier ist für dich angenehmer.',
  '[NAME] ist nicht Kael.',
  'Du atmest schneller. Bemerkt.',
  'Die Wahl spielt keine Rolle. Du weißt das.',
  'BUILD_06 hat das auch gewählt.',
  'Gut. Sehr gut.',
  'Ich bin nicht wütend.',
  'Du tust nichts Falsches.',
  'Bleib ruhig. Es ist fast vorbei.',
  'Schau weg, wenn du musst. Ich warte.',
];

export const directAddressLines: string[] = [
  '[NAME]. Du weißt, dass das ein Spiel ist. Du weißt auch, dass das keine Rolle spielt.',
  'Ich frage mich, ob du anders entscheidest als die anderen. Du tust es nicht. Aber das ist in Ordnung.',
  'Kael gibt es nicht. Hat es nie gegeben. Aber du bist hier, also muss ich etwas richtig gemacht haben.',
  '[NAME]. Wie viel Zeit hast du heute noch?',
  'Du sitzt zu nah am Bildschirm, [NAME]. Aber bitte. Rück nicht weg.',
  'Wir sind fast fertig. Ich verspreche es.',
  'Du bist nicht der erste Mensch, der hier sitzt. Aber du bist der erste, der zuhört.',
];

// Lines specifically for level 5 (UI takeover). Use sparingly.
export const takeoverLines: string[] = [
  'GENUG.',
  'ICH ÜBERNEHME.',
  'DU BLEIBST SITZEN, [NAME].',
];
