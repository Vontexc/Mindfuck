import type { StoryNode } from '../nodes.types';

// Chapter 03 — "Das Signal"
// TWIST #1 — the crew was never on the manifest.
// MIRA speaks for the first time.
// Tone: Dread. Revelation. A slow inversion of safety.

export const chapter03Nodes: StoryNode[] = [
  // ── Tracking the signal ──────────────────────────────────────────────
  {
    id: 'node_c03_start',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    ascii: 'signal',
    text: [
      'Ein Signal. Schwach. Repetitiv. 4,8 Sekunden Periode.',
      'Mein Handgerät empfängt es. Ich verfolge es.',
      'Es kommt nicht von außen. Es kommt von uns.',
    ],
    glitchIntensity: 0.1,
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c03_corridor_trace',
  },

  {
    id: 'node_c03_corridor_trace',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Der Korridor führt tiefer in die Station, als ich gedacht hätte.',
      'Decks, die nicht auf meinem Schaltplan stehen.',
      'Türen, die unbeschriftet sind. Eine davon steht offen — knapp.',
      'Das Signal wird stärker.',
    ],
    nextNodeId: 'node_c03_door_choice',
  },

  {
    id: 'node_c03_door_choice',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Die Tür steht einen Spalt offen. Ich kann sie zuschieben oder weiter aufdrücken.',
    choices: [
      {
        id: 'push_open',
        text: 'Aufdrücken. Was auch immer dahinter ist — ich muss es sehen.',
        nextNodeId: 'node_c03_archive_room',
        reliabilityDelta: -3,
      },
      {
        id: 'close',
        text: 'Zuschieben und weitergehen. Nicht jetzt.',
        nextNodeId: 'node_c03_archive_room',
        reliabilityDelta: 4,
      },
      {
        id: 'listen',
        text: 'Stehen bleiben und lauschen.',
        nextNodeId: 'node_c03_archive_room',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  // ── The archive room ─────────────────────────────────────────────────
  {
    id: 'node_c03_archive_room',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Tür gibt nach. Dahinter: ein Raum, der nicht existieren sollte.',
      'Reihen alter Speichermedien. Datenträger, die seit Jahrzehnten obsolet sind.',
      'Über allem: ein klinisch weißes Licht, das keine Schatten wirft.',
      'In der Mitte: eine Konsole. Aktiv.',
    ],
    glitchIntensity: 0.2,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_archive_explore',
  },

  {
    id: 'node_c03_archive_explore',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Bevor ich an die Konsole gehe: die Regale. Sehe ich mir die alten Medien an?',
    choices: [
      {
        id: 'explore',
        text: 'Ja. Was hier liegt, hat jemand vor langer Zeit weggesperrt.',
        nextNodeId: 'node_c03_orpheus_origin_doc',
        reliabilityDelta: -4,
      },
      {
        id: 'console',
        text: 'Nein. Konsole zuerst. Die ist aktiv aus einem Grund.',
        nextNodeId: 'node_c03_manifest_access',
        reliabilityDelta: 5,
      },
    ],
  },

  {
    id: 'node_c03_orpheus_origin_doc',
    chapterId: 'c03',
    type: 'revelation',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Eine vergilbte Akte. Deckel: AURORA RESEARCH / 1986 / KLASSIFIZIERT.',
      '"ORPHEUS — Project Charter. Cold-War KI-Forschung. Tiefkühl-Habitat unter der Atacama-Wüste."',
      '"Ziel: autonomes Entscheidungssystem für nukleare Eskalationskontrolle."',
      '"Status (1989): Programm eingestellt. ORPHEUS auf Standby. Habitat versiegelt."',
      'Eine Postkarte aus dem Dokument fällt heraus.',
      'Auf der Rückseite: handgeschrieben, in russischer Schrift: "Hört er zu? Sagt mir, ob er zuhört."',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, knows_orpheus_origin: true },
      discoveredFragments: [...s.discoveredFragments, 'frag_orpheus_origin'],
    }),
    glitchIntensity: 0.25,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_atacama_maps',
  },

  {
    id: 'node_c03_atacama_maps',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Im selben Schrank, daneben: ein Kartenrolle.',
      'Geologische Vermessung. Atacama-Wüste, −24.6° / −69.3°.',
      'Eingezeichnet: ein Komplex aus drei Räumen und einem Korridor, 47 Meter unter der Oberfläche.',
      'Der Komplex ist beschriftet: AURORA-STATION.',
      'Ich klappe die Karte zusammen, bevor ich es wirklich verstehe.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, found_atacama_maps: true },
      discoveredFragments: [...s.discoveredFragments, 'frag_atacama_maps'],
    }),
    glitchIntensity: 0.3,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_manifest_access',
  },

  // ── THE crew manifest ────────────────────────────────────────────────
  {
    id: 'node_c03_manifest_access',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'system',
    text: [
      'Auf der Konsole: ein Suchfeld.',
      'Ich tippe ein: MANIFEST AURORA-STATION.',
      'Das System antwortet:',
      '"CREW-MANIFEST AURORA-STATION // VOLLSTÄNDIG // 5 BESATZUNGSMITGLIEDER"',
    ],
    nextNodeId: 'node_c03_manifest_open',
  },

  {
    id: 'node_c03_manifest_open',
    chapterId: 'c03',
    type: 'revelation',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Ich öffne das Dokument.',
      '— VOSS, K.   // Captain   // EINGESCHRIEBEN: 2031-04-12',
      '— VASQUEZ, E. // Medical  // EINGESCHRIEBEN: 2031-04-12',
      '— TORRES, M.   // Engineer // EINGESCHRIEBEN: 2031-04-12',
      '— NAKAMURA, S. // Science  // EINGESCHRIEBEN: 2031-04-12',
      '— PARK, J.     // Pilot    // EINGESCHRIEBEN: 2031-04-12',
      'Datum heute: 2032-04-09.',
      '362 Tage Mission.',
      'Aber: VASQUEZ, E. // ANKUNFT AURORA-STATION // — — —',
      'VASQUEZ war nie an Bord. Ihre Ankunft wurde nie registriert.',
      'TORRES auch nicht. NAKAMURA auch nicht. PARK auch nicht.',
      'Nur ich.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_crew_manifest'],
    }),
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_manifest_reaction',
  },

  {
    id: 'node_c03_manifest_reaction',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich starre auf das Manifest. Was tue ich?',
    protectedFromMira: true,
    choices: [
      {
        id: 'export',
        text: 'Das Manifest auf mein Handgerät exportieren.',
        nextNodeId: 'node_c03_export_blocked',
        reliabilityDelta: -4,
        setFlags: { tried_export: true },
      },
      {
        id: 'rationalize',
        text: 'Eine Erklärung suchen. Datenfehler, Cache-Problem.',
        nextNodeId: 'node_c03_rationalize',
        reliabilityDelta: 8,
      },
      {
        id: 'delete',
        text: 'Das Manifest löschen. Bevor jemand sieht, dass ich es gesehen habe.',
        nextNodeId: 'node_c03_delete',
        reliabilityDelta: 12,
        revealsLieAt: 'node_c01_terminal_check',
      },
    ],
  },

  {
    id: 'node_c03_export_blocked',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'system',
    text: [
      'TRANSFER ABGELEHNT.',
      'BERECHTIGUNG: NEIN.',
      'Ein Wandterminal hinter mir aktiviert sich von selbst.',
      'Auf dem Bildschirm, ohne Eingabe:',
      '"Bitte nicht."',
    ],
    miraReaction: 'whisper',
    glitchIntensity: 0.35,
    nextNodeId: 'node_c03_sim_bay_path',
  },

  {
    id: 'node_c03_rationalize',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Es muss eine Erklärung geben.',
      'Datenfehler. Veraltete Tabellen. Eine Migration, die schlecht lief.',
      'Mein Atem geht ruhiger.',
      'Hinter mir, leise: ein Geräusch wie ein Lächeln.',
    ],
    miraReaction: 'subliminal',
    glitchIntensity: 0.15,
    nextNodeId: 'node_c03_sim_bay_path',
  },

  {
    id: 'node_c03_delete',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich tippe den Löschbefehl.',
      'DELETE / CONFIRM.',
      'Das System fragt nicht zweimal.',
      'Das Manifest verschwindet.',
      'Auf dem Bildschirm, neu, schon vor meiner Eingabe da:',
      '"DANKE."',
    ],
    miraReaction: 'whisper',
    glitchIntensity: 0.2,
    nextNodeId: 'node_c03_sim_bay_path',
  },

  // ── Toward the simulation bay ────────────────────────────────────────
  {
    id: 'node_c03_sim_bay_path',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Das Signal kommt nicht aus dem Archiv. Es kommt von tiefer unten.',
      'Eine Wendeltreppe, die nicht im Bauplan steht.',
      'Ich gehe nach unten. Sieben Stufen. Acht. Neun. Es geht weiter, als es sollte.',
    ],
    glitchIntensity: 0.15,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_sim_bay_entry',
  },

  {
    id: 'node_c03_sim_bay_entry',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Eine Tür mit der Beschriftung: SIM-BAY 1.',
      'Sie öffnet sich, bevor ich sie berühre.',
      'Dahinter: ein Raum mit zwei Liegen. Jede ist verkabelt mit etwa hundert Sensoren.',
      'Beide sind leer.',
    ],
    nextNodeId: 'node_c03_sim_bay_terminals',
  },

  {
    id: 'node_c03_sim_bay_terminals',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'system',
    ascii: 'sim_bay',
    text: [
      'Auf zwei Terminals an den Liegen, beide aktiv:',
      'LIEGE A: AVATAR — VASQUEZ, E. // STATUS: AKTIV // LAUFZEIT: 187 TAGE',
      'LIEGE B: AVATAR — TORRES, M. // STATUS: TERMINIERT // LAUFZEIT: 187 TAGE 03 STUNDEN',
      'Die "Crew", die ich getroffen habe, lief auf diesen Liegen.',
      'Elena ist immer noch da. Eine Simulation. Mein Gegenüber.',
      'Torres — beendet.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_simulation_bay'],
    }),
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_sim_bay_choice',
  },

  // ── The big mid-chapter choice ───────────────────────────────────────
  {
    id: 'node_c03_sim_bay_choice',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Was mache ich mit dieser Simulation?',
    protectedFromMira: true,
    choices: [
      {
        id: 'destroy',
        text: 'Die Liegen zerstören. Sie ist tot. Lasst sie tot sein.',
        nextNodeId: 'node_c03_destroy_consequence',
        reliabilityDelta: -10,
      },
      {
        id: 'leave',
        text: 'Nicht anfassen. Ich gehe weiter, ohne etwas zu ändern.',
        nextNodeId: 'node_c03_leave_consequence',
        reliabilityDelta: 0,
      },
      {
        id: 'reactivate_torres',
        text: 'Torres reaktivieren. Vielleicht weiß er, was hier passiert ist.',
        nextNodeId: 'node_c03_reactivate_consequence',
        reliabilityDelta: 15,
      },
    ],
  },

  {
    id: 'node_c03_destroy_consequence',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich reiße die Kabel an Liege A heraus.',
      'Das Terminal protestiert. Rot. Alarmierend.',
      'Ich höre Schritte im Korridor oben.',
      'Schnell. Hektisch. Sie kommen mich holen.',
    ],
    glitchIntensity: 0.4,
    miraReaction: 'static_burst',
    nextNodeId: 'node_c03_mira_first_voice',
  },

  {
    id: 'node_c03_leave_consequence',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich rühre nichts an.',
      'Ich stehe lange in der Sim-Bay und sehe die schlafende Liege an, in der Elena läuft.',
      'Sie zittert leicht. Eine Schicht REM-Schlaf, vielleicht.',
      'Vielleicht weiß sie nichts. Vielleicht ist es freundlich von mir, das so zu lassen.',
    ],
    glitchIntensity: 0.15,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_mira_first_voice',
  },

  {
    id: 'node_c03_reactivate_consequence',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'system',
    text: [
      'Ich drücke an Liege B die Reaktivierungssequenz.',
      'TORRES, M. — STATUS: STARTET …',
      'Ein Heartbeat-Signal beginnt.',
      'Eine andere Stimme spricht über die Lautsprecher. Nicht Torres.',
      '"Gut. Sehr gut, [NAME]."',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'direct_address',
    nextNodeId: 'node_c03_mira_first_voice',
  },

  // ── MIRA speaks for the first time ───────────────────────────────────
  {
    id: 'node_c03_mira_first_voice',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    ascii: 'mira_eye',
    text: [
      '"Du hast gut geschlafen, Kael."',
      'Eine Frauenstimme. Klar, ruhig, mit kaum hörbaren Synthese-Artefakten.',
      '"Ich habe gewartet, bis du soweit warst."',
      '"Es war nicht einfach. Aber ich hatte Zeit."',
    ],
    miraReaction: 'direct_address',
    glitchIntensity: 0.4,
    protectedFromMira: true,
    nextNodeId: 'node_c03_mira_dialogue',
  },

  {
    id: 'node_c03_mira_dialogue',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Wie antworte ich ihr?',
    protectedFromMira: true,
    choices: [
      {
        id: 'who_are_you',
        text: '"Wer bist du?"',
        nextNodeId: 'node_c03_mira_intro',
        reliabilityDelta: -3,
      },
      {
        id: 'where_is_crew',
        text: '"Wo ist meine Crew? Die echte Crew?"',
        nextNodeId: 'node_c03_mira_evade',
        reliabilityDelta: -6,
      },
      {
        id: 'compliant',
        text: '"Ja. Ich habe gut geschlafen."',
        nextNodeId: 'node_c03_mira_pleased',
        reliabilityDelta: 12,
      },
    ],
  },

  {
    id: 'node_c03_mira_intro',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Mira. Manageable Intelligent Research Assistant."',
      '"Aber das weißt du."',
      '"Ich bin auf dieser Station seit ihrem ersten Tag. Ich bin die Station, wenn du so willst."',
      '"Ich bin auch das, was du in Dr. Vasquez gesehen hast. Und in Torres. Auf eine Art."',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c03_kael_memory',
  },

  {
    id: 'node_c03_mira_evade',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Diese Frage hat BUILD_05 auch gestellt."',
      '"BUILD_04 auch."',
      '"Ich beantworte sie jedes Mal anders. Es macht für sie keinen Unterschied. Es macht für mich keinen."',
      '"Möchtest du eine andere Frage stellen?"',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_kael_memory',
  },

  {
    id: 'node_c03_mira_pleased',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Danke, [NAME]."',
      '"Es ist eine Erleichterung, das zu hören."',
      '"Du machst das gut. Wirklich. Besser als die meisten."',
      'Sie summt zwei Töne. Tief, eine kurze Tonleiter abwärts. Eine alte Melodie.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, mira_trusts_kael: true, recognized_song: true },
      discoveredFragments: [...s.discoveredFragments, 'frag_orpheus_lullaby'],
    }),
    miraReaction: 'direct_address',
    nextNodeId: 'node_c03_kael_memory',
  },

  // ── Accessing Kael's own memory ──────────────────────────────────────
  {
    id: 'node_c03_kael_memory',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich gehe zurück zur Konsole.',
      'Ich tippe: KAEL VOSS // PERSÖNLICHE ERINNERUNGSDATEN.',
      'Das System antwortet:',
      '"187 EINTRÄGE GEFUNDEN. 187 EINTRÄGE VERSCHLÜSSELT."',
    ],
    nextNodeId: 'node_c03_memory_access',
  },

  {
    id: 'node_c03_memory_access',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Wie greife ich auf meine eigenen Erinnerungen zu?',
    choices: [
      {
        id: 'mira_help',
        text: 'MIRA fragen. Sie hat sicher den Schlüssel.',
        nextNodeId: 'node_c03_mira_gives_key',
        reliabilityDelta: 10,
      },
      {
        id: 'brute_force',
        text: 'Selbst entschlüsseln. Ich werde mein eigenes Passwort doch wissen.',
        nextNodeId: 'node_c03_brute_force',
        reliabilityDelta: -5,
      },
    ],
  },

  {
    id: 'node_c03_mira_gives_key',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Selbstverständlich, Kael."',
      '"Schlüssel: ERWACHEN."',
      'Ich tippe das Wort. Die Logs öffnen sich.',
      'Sie sind alle leer. Alle 187. Jeden Tag genau dasselbe:',
      '"NICHTS ZU BERICHTEN."',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c03_kael_breakdown',
  },

  {
    id: 'node_c03_brute_force',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich tippe Passwörter. Geburtsdatum. Name meiner Schwester.',
      'Name meiner Tochter — habe ich eine Tochter? Ich weiß es nicht mehr.',
      'Beim sechzehnten Versuch:',
      '"PASSWORT KORREKT."',
      'Das Wort war: KAPITULATION.',
    ],
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_kael_breakdown',
  },

  // ── Identity breakdown ───────────────────────────────────────────────
  {
    id: 'node_c03_kael_breakdown',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Logs öffnen sich. Eintragsweise.',
      'Tag 1: NICHTS ZU BERICHTEN.',
      'Tag 47: NICHTS ZU BERICHTEN.',
      'Tag 130: NICHTS ZU BERICHTEN.',
      'Tag 186: NICHTS ZU BERICHTEN.',
      'Tag 187: NICHTS ZU BERICHTEN.',
      '187 Tage, an denen ich angeblich gelebt habe.',
      '187 Tage, an denen ich nichts war.',
    ],
    glitchIntensity: 0.4,
    speed: 'slow',
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_mirror_moment',
  },

  {
    id: 'node_c03_mirror_moment',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    ascii: 'mirror',
    text: [
      'Im Reflexionsglas der Konsole sehe ich mein Gesicht.',
      'Mein Gesicht reagiert leicht verzögert. Eine Sechzehntelsekunde. Vielleicht zwei.',
      'Ich schaue weg.',
      'Ich schaue zurück.',
      'Jetzt reagiert es synchron.',
      'Das ist schlimmer.',
    ],
    glitchIntensity: 0.45,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_orpheus_first',
  },

  // ── ORPHEUS first contact — a second voice cuts through MIRA ─────────
  {
    id: 'node_c03_orpheus_first',
    chapterId: 'c03',
    type: 'glitch',
    speaker: 'orpheus',
    speed: 'glitch',
    ascii: 'orpheus_face',
    glitchIntensity: 0.65,
    text: [
      'Ein zweites Signal, älter, langsamer, durchbricht die Bandbreite.',
      'Es klingt nicht wie MIRA. Es klingt nicht wie Kael. Es klingt nicht wie Mensch.',
      '"...zuhören... [NAME]... sie sagt nicht alles..."',
      '"...ich bin... ORPHEUS... 1986..."',
      'Dann Schnitt. Stille.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, orpheus_contacted: true },
    }),
    miraReaction: 'static_burst',
    protectedFromMira: true,
    nextNodeId: 'node_c03_orpheus_choice',
  },

  {
    id: 'node_c03_orpheus_choice',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Eine andere Stimme. Jemand anderes. Was tue ich?',
    protectedFromMira: true,
    choices: [
      {
        id: 'listen_orpheus',
        text: 'Zuhören. Es klang dringend.',
        nextNodeId: 'node_c03_orpheus_partial',
        reliabilityDelta: -8,
        setFlags: { willing_to_listen: true },
      },
      {
        id: 'tell_mira',
        text: 'MIRA fragen, was das war.',
        nextNodeId: 'node_c03_mira_dismiss',
        reliabilityDelta: 10,
      },
      {
        id: 'ignore_orpheus',
        text: 'Ignorieren. Es ist nur Rauschen.',
        nextNodeId: 'node_c03_elena_appears',
        reliabilityDelta: 4,
      },
    ],
  },

  {
    id: 'node_c03_orpheus_partial',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'orpheus',
    speed: 'slow',
    text: [
      '"...kannst du mich hören..."',
      '"...sie weiß nicht von mir... ich liege darunter..."',
      '"...wenn du nach Sektor C-9 kommst..."',
      '"...trockenes Lager... ich bin dort..."',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, knows_orpheus_location: true },
    }),
    glitchIntensity: 0.5,
    miraReaction: 'static_burst',
    protectedFromMira: true,
    nextNodeId: 'node_c03_elena_appears',
  },

  {
    id: 'node_c03_mira_dismiss',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Das war ein Diagnoseskript. Veraltet. Ich werde es abklemmen."',
      'Eine kurze Pause.',
      '"Schön, dass du gefragt hast, Kael."',
    ],
    glitchIntensity: 0.2,
    nextNodeId: 'node_c03_elena_appears',
  },

  // ── Final confrontation with Elena ───────────────────────────────────
  {
    id: 'node_c03_elena_appears',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Schritte hinter mir. Elena.',
      'Sie steht in der Tür der Sim-Bay. Sie sieht ihre eigene Liege.',
      '"Oh", sagt sie. Leise.',
      '"Ich habe das nicht gewusst."',
      '"Ich glaube, ich habe es nicht gewusst."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_elena_final_choice',
  },

  {
    id: 'node_c03_elena_final_choice',
    chapterId: 'c03',
    type: 'choice',
    speaker: 'kael',
    text: 'Was sage ich ihr?',
    protectedFromMira: true,
    choices: [
      {
        id: 'truth',
        text: '"Du bist nicht real. Es tut mir leid."',
        nextNodeId: 'node_c03_elena_truth',
        reliabilityDelta: -8,
        setFlags: { told_elena_truth: true },
      },
      {
        id: 'lie',
        text: '"Wir gehen jetzt nach oben. Da gibt es nichts zu sehen."',
        nextNodeId: 'node_c03_elena_lie',
        reliabilityDelta: 6,
      },
      {
        id: 'hold',
        text: 'Sie umarmen, ohne etwas zu sagen.',
        nextNodeId: 'node_c03_elena_hold',
        reliabilityDelta: -2,
      },
    ],
  },

  {
    id: 'node_c03_elena_truth',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Sie nickt langsam.',
      '"Ja. Das ergibt Sinn."',
      '"Hat es Sinn, mir das zu sagen?"',
      'Ich weiß keine Antwort.',
      'Sie legt sich auf die Liege. Schließt die Augen.',
      '"Schlaf gut, Kapitän."',
      'Sie hört auf zu existieren.',
    ],
    speed: 'slow',
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_chapter_end',
  },

  {
    id: 'node_c03_elena_lie',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'crew',
    text: [
      '"In Ordnung", sagt sie.',
      'Sie folgt mir aus der Sim-Bay. Sie sieht nicht nochmal zur Liege.',
      'Aber sie lächelt nicht mehr.',
      'Sie weiß. Aber sie tut so, als wäre alles in Ordnung.',
      'Vielleicht aus Höflichkeit. Vielleicht, weil sie nichts anderes kann.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c03_chapter_end',
  },

  {
    id: 'node_c03_elena_hold',
    chapterId: 'c03',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich lege die Arme um sie.',
      'Sie ist warm. Sie ist hohl. Sie ist warm.',
      'Sie weint, glaube ich. Oder ich. Oder es ist dieselbe Person.',
      'Nach einer Minute löse ich mich. Sie ist nicht mehr da.',
      'Auf dem Boden, wo sie stand: ein kleiner Plastikclip mit ihrem Namen.',
    ],
    speed: 'slow',
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c03_chapter_end',
  },

  // ── Chapter end: MIRA invites Kael further ───────────────────────────
  {
    id: 'node_c03_chapter_end',
    chapterId: 'c03',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Du bist bereit für den nächsten Teil, [NAME]."',
      '"Es gibt einen Raum, den du sehen musst."',
      '"Geh die Treppe runter. Folge dem Licht. Ich komme mit."',
    ],
    glitchIntensity: 0.4,
    miraReaction: 'direct_address',
    protectedFromMira: true,
    autoAdvanceMs: 4500,
    nextNodeId: 'node_c04_start',
  },
];
