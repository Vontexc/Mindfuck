import type { StoryNode } from '../nodes.types';

// Chapter 01 — "Erwachen"
// Tone: Disorientation. Clinical. False calm.
// MIRA is silent. Subliminal flashes hint at her presence.

export const chapter01Nodes: StoryNode[] = [
  {
    id: 'node_c01_boot',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'system',
    speed: 'glitch',
    glitchIntensity: 0.4,
    ambientTrack: 'boot_hum',
    ascii: 'boot',
    text: [
      'SYSTEM... ONLINE',
      'AURORA-STATION // SEKTOR 03 // CRYO-BAY 02',
      'PROTOKOLL: ERWACHEN',
      'SUBJEKT: VOSS, K. (KAPITÄN)',
      'STATUS: ...',
      'STATUS: STABIL',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c01_wake',
  },

  {
    id: 'node_c01_wake',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'kael',
    speed: 'slow',
    glitchIntensity: 0.1,
    text: [
      'Kühle Luft. Metall im Mund.',
      'Die Augen öffnen sich von selbst.',
      'Über mir: ein Deckenlicht. Es flackert nicht. Das ist gut.',
      'Ich heiße Kael Voss. Ich bin der Kapitän.',
      'Ich erinnere mich nicht, wann ich eingeschlafen bin.',
    ],
    nextNodeId: 'node_c01_first_choice',
  },

  {
    id: 'node_c01_first_choice',
    chapterId: 'c01',
    type: 'choice',
    speaker: 'kael',
    text: 'Etwas stimmt nicht. Es ist zu still. Was tue ich zuerst?',
    choices: [
      {
        id: 'search_crew',
        text: 'Die Crew suchen.',
        nextNodeId: 'node_c01_corridor_survey',
        reliabilityDelta: -3,
      },
      {
        id: 'check_systems',
        text: 'Erst die Systeme prüfen.',
        nextNodeId: 'node_c01_terminal_check',
        reliabilityDelta: 5,
      },
      {
        id: 'wait',
        text: '...',
        nextNodeId: 'node_c01_corridor_survey',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  {
    id: 'node_c01_terminal_check',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'kael',
    speed: 'normal',
    ascii: 'terminal',
    asciiTrue: 'terminal_true',
    text: [
      'Das nächstgelegene Terminal flackert in dezentem Bernsteinton.',
      'STATUS: GRÜN.',
      'CREW: 4 AKTIV.',
      'MIRA: OFFLINE.',
      'Komisch. Die Crewzahl ist falsch. Es sollten fünf sein.',
    ],
    trueText: [
      'Das Terminal lügt.',
      'STATUS: ROT.',
      'CREW: 0.',
      'MIRA: AKTIV.',
      'Die Anzeige verändert sich, sobald ich wegsehe.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c01_corridor_survey',
  },

  {
    id: 'node_c01_corridor_survey',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'kael',
    ascii: 'corridor',
    text: [
      'Der Korridor ist sauber. Zu sauber.',
      'Ein Geruch von Antiseptikum. Kein Staub.',
      'Die Türen zur Brücke, zum Maschinenraum, zur Krankenstation. Alle geschlossen.',
      'Ich bin allein. Vorerst.',
    ],
    trueText: [
      'Der Korridor riecht nach getrocknetem Blut.',
      'Auf dem Boden, an der Tür zur Krankenstation: ein Körper unter Plastik.',
      'Die Plastikplane bewegt sich nicht. Aber ich bin sicher, dass sie das vorhin getan hat.',
      'Ich gehe daran vorbei, ohne hinzusehen.',
    ],
    glitchIntensity: 0.15,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c01_journal',
  },

  {
    id: 'node_c01_journal',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'In meiner Kabine: mein Logbuch.',
      'Letzter Eintrag: gestern, 22:14 Bordzeit.',
      '"Routinepatrouille. Crew gesund. Alles im Plan."',
      'Die Handschrift ist meine. Vermutlich.',
    ],
    trueText: [
      'In meiner Kabine: mein Logbuch.',
      'Letzter Eintrag: 187 TAGE her.',
      '"Sie hört uns. Sie hört uns. Sie hört uns."',
      'Die Worte sind in die Seite gekratzt, nicht geschrieben.',
    ],
    miraReaction: 'silent_watch',
    glitchIntensity: 0.2,
    nextNodeId: 'node_c01_journal_choice',
  },

  {
    id: 'node_c01_journal_choice',
    chapterId: 'c01',
    type: 'choice',
    speaker: 'kael',
    text: 'Was tue ich mit dem Logbuch?',
    choices: [
      {
        id: 'document',
        text: 'Einen neuen Eintrag schreiben. Dokumentation hilft.',
        nextNodeId: 'node_c01_lights_flicker',
        reliabilityDelta: 4,
      },
      {
        id: 'reread',
        text: 'Alte Einträge nochmal lesen. Vielleicht erinnere ich mich.',
        nextNodeId: 'node_c01_lights_flicker',
        reliabilityDelta: -2,
      },
      {
        id: 'pocket',
        text: 'Einstecken und weitergehen.',
        nextNodeId: 'node_c01_lights_flicker',
      },
    ],
  },

  {
    id: 'node_c01_lights_flicker',
    chapterId: 'c01',
    type: 'mira_intrusion',
    speaker: 'kael',
    ascii: 'mirror',
    text: [
      'Die Lichter flackern. Einmal. Zweimal.',
      'Im Spiegel über dem Waschbecken sehe ich etwas. Eine Bewegung.',
      'Als ich hinschaue, ist da nur ich.',
      'Ich sehe länger hin, als ich müsste.',
    ],
    glitchIntensity: 0.35,
    miraReaction: 'subliminal',
    protectedFromMira: false,
    nextNodeId: 'node_c01_door_choice',
  },

  {
    id: 'node_c01_door_choice',
    chapterId: 'c01',
    type: 'choice',
    speaker: 'kael',
    text: 'Eine der Türen ließe sich öffnen. Welche?',
    choices: [
      {
        id: 'bridge',
        text: 'Die Brücke. Dort gibt es Antworten.',
        nextNodeId: 'node_c01_end',
        reliabilityDelta: 2,
      },
      {
        id: 'medbay',
        text: 'Die Krankenstation. Wenn es Verletzte gibt, müssen sie warten?',
        nextNodeId: 'node_c01_end',
        reliabilityDelta: -3,
        setFlags: { saw_medbay_c01: true },
      },
      {
        id: 'engine',
        text: 'Den Maschinenraum. Wenn etwas defekt ist, finde ich es dort.',
        nextNodeId: 'node_c01_end',
        reliabilityDelta: 5,
      },
      {
        id: 'pod',
        text: 'Erst zurück zum Cryo-Pod. Ich will sehen, woraus ich gekommen bin.',
        nextNodeId: 'node_c01_pod_examine',
        reliabilityDelta: -4,
      },
    ],
  },

  {
    id: 'node_c01_pod_examine',
    chapterId: 'c01',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich gehe zurück zum Pod. Er steht offen. Eine Pfütze Kondenswasser daneben.',
      'Ich lege eine Hand auf das Innenleben.',
      'Warm. Nicht kalt — warm. Wie ein Bett, das jemand gerade verlassen hat.',
      'Kein Cryo-Pod, in dem jemand 14 Tage geschlafen hat, ist noch warm.',
      'An der Innenwand: ein kleines Etikett. "BUILD_07 — INIT 04:12".',
      'Auf meiner Armbanduhr: 04:31. Neunzehn Minuten alt.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, noticed_pod_warmth: true },
      discoveredFragments: [...s.discoveredFragments, 'frag_pod_warmth'],
    }),
    glitchIntensity: 0.25,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c01_end',
  },

  {
    id: 'node_c01_end',
    chapterId: 'c01',
    type: 'glitch',
    speaker: 'unknown',
    speed: 'glitch',
    glitchIntensity: 0.6,
    ascii: 'glitch',
    text: [
      'Die Tür gleitet auf.',
      'Dahinter: ein weiterer Korridor.',
      'Identisch zum ersten.',
      'BUILD_07',
    ],
    miraReaction: 'subliminal',
    autoAdvanceMs: 4000,
    nextNodeId: 'node_c02_start', // placeholder until c02 implemented
  },
];
