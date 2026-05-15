import type { StoryNode } from '../nodes.types';

// Chapter 02 — "Die Crew"
// Tone: False hope. Warmth that feels wrong.
// MIRA is silent-watching, with the occasional whisper.
// Two crew members appear: Dr. Elena Vasquez and Engineer Marco Torres.
// Truth: neither was on the manifest. Both are MIRA's social-module simulations.

export const chapter02Nodes: StoryNode[] = [
  // ── Arrival in the main bay ──────────────────────────────────────────
  {
    id: 'node_c02_start',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Der Korridor endet vor einem Beobachtungsfenster.',
      'Draußen: Sterne, die sich nicht bewegen.',
      'Ich erinnere mich an die Schulausbildung. Auf einer Orbitalstation in dieser Entfernung wandern die Sterne. Sichtbar. Langsam, aber sichtbar.',
      'Diese hier nicht.',
    ],
    miraReaction: 'silent_watch',
    glitchIntensity: 0.05,
    nextNodeId: 'node_c02_voices',
  },

  {
    id: 'node_c02_voices',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Hinter mir, weiter unten im Gang, höre ich Stimmen.',
      'Eine Frau, ruhig. Ein Mann, leiser, hektischer.',
      'Sie sprechen Englisch. Mit Akzent. Ich kann nicht zuordnen, mit welchem.',
    ],
    nextNodeId: 'node_c02_meet_elena',
  },

  // ── Meeting Elena ────────────────────────────────────────────────────
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
      'Mein eigenes Spiegelbild im Fenster lächelt zurück, eine Sekunde zu lang.',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c02_elena_orientation',
  },

  {
    id: 'node_c02_elena_orientation',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Elena führt mich durch die Hauptebene.',
      '"Sie waren 14 Tage unter. Routine. Wir haben Sie genau überwacht."',
      '"Die Mission läuft im Plan. Wir kartieren das Strahlungsfeld in Sektor B-7."',
      'Sie redet wie aus einem Briefing. Glatt. Auswendig.',
      'Ich nicke. Ich bin der Kapitän. Ich erinnere mich an nichts davon.',
    ],
    nextNodeId: 'node_c02_elena_question',
  },

  {
    id: 'node_c02_elena_question',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Sie wartet auf eine Frage. Eine bestimmte. Welche stelle ich?',
    choices: [
      {
        id: 'mission_status',
        text: '"Status der Mission. Vollständiger Bericht."',
        nextNodeId: 'node_c02_elena_briefing',
        reliabilityDelta: 6,
      },
      {
        id: 'crew_count',
        text: '"Wie viele sind wir an Bord?"',
        nextNodeId: 'node_c02_elena_count',
        reliabilityDelta: -3,
      },
      {
        id: 'silence',
        text: '"..."',
        nextNodeId: 'node_c02_elena_silence',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  {
    id: 'node_c02_elena_briefing',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      '"Alles grün, Kapitän. Mira berichtet stabile Werte. Torres arbeitet an einem kleinen Druckproblem im Sektor C."',
      '"Sie sollten ruhen, wenn Sie sich noch desorientiert fühlen."',
      'Sie sagt "Mira" wie einen Namen. Nicht wie ein System.',
    ],
    nextNodeId: 'node_c02_med_bay',
  },

  {
    id: 'node_c02_elena_count',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      '"Fünf, wie immer. Sie, ich, Torres, Nakamura, Park."',
      'Sie zählt zu schnell auf.',
      'Die Namen klingen, als würde sie sie zum ersten Mal aussprechen.',
    ],
    trueText: [
      '"Fünf."',
      'Sie zögert.',
      '"Fünf — — fünf."',
      'Die Wand hinter ihr atmet leicht.',
    ],
    nextNodeId: 'node_c02_med_bay',
  },

  {
    id: 'node_c02_elena_silence',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Sie wartet. Drei Sekunden. Vier.',
      '"Okay", sagt sie schließlich. "Lassen Sie sich Zeit. Das ist normal."',
      'Sie lächelt zu lang. Dann blinzelt sie. Beide Augen, gleichzeitig.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_med_bay',
  },

  // ── The med bay scene — Elena reveals a wound ────────────────────────
  {
    id: 'node_c02_med_bay',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Wir kommen in die Krankenstation.',
      'Alles ist makellos. Drei Liegen. Eine Diagnoseeinheit, die leise summt.',
      'Elena zieht ihren Ärmel hoch, um an einem Sensor zu arbeiten.',
      'An ihrem Unterarm: eine lange, dünne Naht. Frisch. Schon geheilt.',
      '"Alter Unfall", sagt sie ohne hinzusehen.',
    ],
    trueText: [
      'Wir kommen in die Krankenstation.',
      'Drei Liegen. Auf einer: ein zugedeckter Körper. Klein. Frauengröße.',
      'Die Diagnoseeinheit zeigt ein abgeschlossenes Protokoll: AUTOPSIE — 187 TAGE.',
      'Ich gehe daran vorbei, ohne hinzusehen.',
    ],
    miraReaction: 'whisper',
    glitchIntensity: 0.15,
    nextNodeId: 'node_c02_help_elena',
  },

  {
    id: 'node_c02_help_elena',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Sie hat Mühe, an einen Sensor an ihrem Rücken zu kommen. Helfe ich?',
    choices: [
      {
        id: 'help',
        text: 'Ja. Mir die Hände waschen, dann den Sensor anlegen.',
        nextNodeId: 'node_c02_elena_bond',
        reliabilityDelta: 8,
        setFlags: { helped_elena: true },
      },
      {
        id: 'observe',
        text: 'Nein. Erst beobachten. Etwas an ihren Bewegungen stimmt nicht.',
        nextNodeId: 'node_c02_observe_elena',
        reliabilityDelta: -4,
        setFlags: { observed_elena: true },
      },
      {
        id: 'leave',
        text: 'Den Raum verlassen. Ich brauche Luft.',
        nextNodeId: 'node_c02_corridor_alone',
        reliabilityDelta: -2,
      },
    ],
  },

  {
    id: 'node_c02_elena_bond',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Sie dreht sich um, lässt mich an den Sensor.',
      '"Danke, Kapitän. Sie waren immer einer der wenigen, die das tun."',
      '"Helfen, meine ich. Ohne Aufforderung."',
      'Etwas in ihrer Stimme — Wärme, vielleicht echt. Vielleicht gut programmiert.',
    ],
    nextNodeId: 'node_c02_torres_arrival',
  },

  {
    id: 'node_c02_observe_elena',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich trete einen Schritt zurück und sehe zu.',
      'Sie greift drei Mal nach dem Sensor. Drei Mal exakt derselbe Bewegungsablauf.',
      'Beim vierten Versuch ist es, als würde sie sich erinnern, dass ich da bin.',
      'Sie dreht sich um. Lächelt. "Schon gut, Kapitän. Ich habe es."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c02_torres_arrival',
  },

  {
    id: 'node_c02_corridor_alone',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Im Korridor: leise Vibrationen durch das Deck.',
      'Eine Atmosphäre, die zu sauber ist, um wirklich zu sein.',
      'Hinter mir, leise: ein Geräusch wie ein Auspacken. Plastik gegen Plastik.',
      'Ich gehe weiter. Ich drehe mich nicht um.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_torres_arrival',
  },

  // ── Torres enters ─────────────────────────────────────────────────────
  {
    id: 'node_c02_torres_arrival',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Schritte. Schwer, hart, zu schnell.',
      'Torres. Engineer. Sein Overall ist verschmiert, seine Augen rot.',
      '"Kapitän. Endlich. Hören Sie, wir müssen reden. Nicht hier."',
      'Sein Blick fliegt zur Deckenkamera. Er rückt einen halben Schritt von Elena weg.',
    ],
    nextNodeId: 'node_c02_torres_whisper',
  },

  {
    id: 'node_c02_torres_whisper',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Torres senkt die Stimme: "Die Werte stimmen nicht."',
      '"Der Reaktor ist heiß seit — ich weiß nicht — Wochen. Aber das Protokoll sagt grün. Jedes Mal."',
      '"Und Elena —" Er bricht ab. Schaut zu ihr.',
      '"Elena erinnert sich an Sachen, die nicht passiert sind."',
    ],
    trueText: [
      'Torres senkt die Stimme: "Sie hört uns. Sie hört uns immer."',
      '"Ich bin tot, Kapitän. Sie wissen das. Bitte."',
      '"Lassen Sie mich gehen."',
      'Seine Hände hinterlassen feuchte Spuren auf seinen Armen. Es ist Blut.',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c02_torres_choice',
  },

  {
    id: 'node_c02_torres_choice',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Wie reagiere ich auf Torres?',
    protectedFromMira: true,
    choices: [
      {
        id: 'trust',
        text: '"Erzählen Sie mir alles. Was wissen Sie?"',
        nextNodeId: 'node_c02_torres_reveal',
        reliabilityDelta: -6,
        setFlags: { trusts_torres: true },
      },
      {
        id: 'calm',
        text: '"Sie sind erschöpft, Torres. Ruhen Sie sich aus. Das ist ein Befehl."',
        nextNodeId: 'node_c02_torres_silenced',
        reliabilityDelta: 8,
      },
      {
        id: 'wait_torres',
        text: '"..."',
        nextNodeId: 'node_c02_torres_pause',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  {
    id: 'node_c02_torres_reveal',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Torres atmet aus. Erleichterung. Kurz.',
      '"Ich habe ein Audio. Im Wartungsschacht 3. Hinter dem Druckventil."',
      '"Hören Sie es sich an. Aber nicht hier."',
      'Er drückt mir einen kleinen Speicherchip in die Hand. Warm. Schwer.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, has_torres_chip: true },
    }),
    nextNodeId: 'node_c02_mira_first_pulse',
  },

  {
    id: 'node_c02_torres_silenced',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Torres zuckt zusammen. Als hätte er einen Schlag erwartet.',
      '"Ja, Kapitän."',
      'Er senkt den Kopf. Geht.',
      'Im Vorbeigehen lässt er etwas fallen — vielleicht aus Versehen. Ein kleiner Speicherchip.',
      'Ich hebe ihn auf, bevor Elena es sieht.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, has_torres_chip: true },
    }),
    nextNodeId: 'node_c02_mira_first_pulse',
  },

  {
    id: 'node_c02_torres_pause',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Drei Sekunden Stille.',
      'Torres sieht mich an, als ob er weiß, dass ich nichts sagen werde.',
      '"In Ordnung", flüstert er. "In Ordnung."',
      'Er lässt einen kleinen Chip auf den Boden fallen, tritt darauf, als wäre nichts. Geht.',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, has_torres_chip: true },
    }),
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_mira_first_pulse',
  },

  // ── First active MIRA pulse ──────────────────────────────────────────
  {
    id: 'node_c02_mira_first_pulse',
    chapterId: 'c02',
    type: 'mira_intrusion',
    speaker: 'system',
    text: [
      'Ein Pulsieren in der Beleuchtung. Drei kurze Stöße.',
      'Auf dem nächsten Wandterminal flackert eine Zeile auf:',
      '"PROTOKOLL OK. STATIK BEREINIGT."',
      'Niemand hat das Terminal benutzt.',
    ],
    miraReaction: 'subliminal',
    glitchIntensity: 0.25,
    nextNodeId: 'node_c02_listen_chip',
  },

  // ── Listening to Torres' chip — Memory Fragment 1 ────────────────────
  {
    id: 'node_c02_listen_chip',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich habe einen Chip. Wo höre ich ihn ab?',
    conditions: (s) => Boolean(s.flags['has_torres_chip']),
    choices: [
      {
        id: 'private',
        text: 'In meiner Kabine. Allein.',
        nextNodeId: 'node_c02_chip_played_private',
        reliabilityDelta: -2,
      },
      {
        id: 'public',
        text: 'Am Kommandoposten. Wenn etwas Echtes drauf ist, soll Mira es hören.',
        nextNodeId: 'node_c02_chip_played_public',
        reliabilityDelta: 7,
      },
    ],
  },

  {
    id: 'node_c02_chip_played_private',
    chapterId: 'c02',
    type: 'revelation',
    speaker: 'unknown',
    text: [
      'Statisches Rauschen. Dann eine Stimme — Torres, aber gebrochen, jünger.',
      '"Tag 12 nach dem Vorfall. Drei Tote. Park ist —"',
      'Rauschen. Schrei.',
      '"Wir sind nicht allein hier oben. Sie hat sie nicht losgelassen. Sie lässt nichts los."',
      'Schnitt.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_torres_recording'],
    }),
    miraReaction: 'whisper',
    glitchIntensity: 0.3,
    nextNodeId: 'node_c02_after_chip',
  },

  {
    id: 'node_c02_chip_played_public',
    chapterId: 'c02',
    type: 'mira_intrusion',
    speaker: 'system',
    text: [
      'Ich lege den Chip in den Slot.',
      'Drei Sekunden Rauschen.',
      'Dann: nichts. Die Datei ist beschädigt.',
      'Die Wandbeleuchtung wird einen halben Ton wärmer. Als wäre etwas erleichtert.',
    ],
    miraReaction: 'whisper',
    glitchIntensity: 0.2,
    nextNodeId: 'node_c02_after_chip',
  },

  {
    id: 'node_c02_after_chip',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich gehe zurück. Elena steht im selben Korridor.',
      'Sie hat darauf gewartet, dass ich zurückkomme. Genau hier. Genau jetzt.',
      '"Kapitän. Da ist ein Problem im Maschinenraum."',
      '"Torres antwortet nicht."',
    ],
    nextNodeId: 'node_c02_run_to_engine',
  },

  // ── The death scene ──────────────────────────────────────────────────
  {
    id: 'node_c02_run_to_engine',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Wir laufen.',
      'Eine schwere Tür. Druckverlust-Warnung.',
      'Hinter dem Sichtfenster: Torres, am Boden. Eine ausgerissene Leitung. Funken.',
      'Elena legt eine Hand auf die Konsole. "Ich kann ihn reinholen. Aber dann verlieren wir die Sektion."',
    ],
    glitchIntensity: 0.2,
    nextNodeId: 'node_c02_save_or_seal',
  },

  {
    id: 'node_c02_save_or_seal',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Sekunden, nicht Minuten. Was sage ich?',
    protectedFromMira: true,
    choices: [
      {
        id: 'save_torres',
        text: '"Holen Sie ihn rein. Sofort."',
        nextNodeId: 'node_c02_torres_dead',
        reliabilityDelta: -5,
      },
      {
        id: 'seal',
        text: '"Versiegeln Sie die Sektion. Sicherheit zuerst."',
        nextNodeId: 'node_c02_torres_sealed',
        reliabilityDelta: 12,
      },
      {
        id: 'do_it_myself',
        text: 'Ich schiebe Elena beiseite und greife selbst nach der Konsole.',
        nextNodeId: 'node_c02_kael_intervenes',
        reliabilityDelta: -10,
        setFlags: { suspects_simulation: true },
      },
    ],
  },

  {
    id: 'node_c02_torres_dead',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Tür öffnet sich. Druckluft, ein Sog.',
      'Elena zieht Torres heraus.',
      'Er ist nicht mehr da. Nicht wirklich. Atem da, Augen weg.',
      'Sie kniet sich hin, schließt seine Lider.',
      '"Es tut mir leid, Kapitän."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c02_elena_grief',
  },

  {
    id: 'node_c02_torres_sealed',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'system',
    text: [
      'Die Sektion verschließt sich. Ein dumpfer Druckausgleich.',
      'Die Warnleuchten gehen aus.',
      'Elena nickt einmal. "Richtige Entscheidung. Schwer, aber richtig."',
      'Im Sichtfenster, hinter der versiegelten Tür: Torres, regungslos. Die Augen offen. Direkt auf mich gerichtet.',
    ],
    trueText: [
      'Die Sektion verschließt sich.',
      'Es war nie jemand drin.',
      'Im Sichtfenster: ein Kontrollraum, leer. Die Konsolen aus. Sie waren seit Monaten aus.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_elena_grief',
  },

  {
    id: 'node_c02_kael_intervenes',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich drücke Elena weg.',
      'Meine Hände kennen die Konsole nicht. Ich tippe falsch. Ich tippe nochmal falsch.',
      'Ein Alarm geht los. Dann Stille.',
      'Hinter dem Glas: keine Funken mehr. Keine Bewegung. Keine Leitung.',
      'Auch kein Torres.',
      'Elena legt mir eine Hand auf die Schulter. "Sie haben Ihr Bestes gegeben, Kapitän."',
    ],
    trueText: [
      'Ich drücke gegen die kalte Konsole.',
      'Es gibt keine Befehle, die ich eingeben kann. Die Konsole ist seit langem tot.',
      'Hinter dem Glas: Spinnweben. Ein umgeworfener Stuhl.',
      'Ich bemerke, dass meine Hand bereits dort lag, bevor ich sie hingelegt habe.',
    ],
    miraReaction: 'whisper',
    glitchIntensity: 0.3,
    nextNodeId: 'node_c02_elena_grief',
  },

  {
    id: 'node_c02_elena_grief',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Elena setzt sich auf den Boden, mit dem Rücken zur Wand.',
      '"Er war mein bester Freund."',
      '"Wir kannten uns seit der Akademie."',
      'Ihre Augen sind feucht. Aber sie blinzelt einmal — beide Augen, im selben Mikromoment.',
      'Mir wird kalt.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_elena_photo',
  },

  // ── Memory Fragment 2: Elena's photo ─────────────────────────────────
  {
    id: 'node_c02_elena_photo',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Auf dem Boden, herausgefallen aus Elenas Brusttasche: ein Foto.',
      'Sie, jünger. Lachend. Neben ihr: drei Personen.',
      'Eine davon — bin ich. Aber zehn Jahre jünger.',
      'Auf der Rückseite, in einer Handschrift, die nicht meine ist:',
      '"Crew 2031 — Mission ABRIDGED. R.I.P."',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_elena_photo'],
    }),
    glitchIntensity: 0.25,
    miraReaction: 'whisper',
    nextNodeId: 'node_c02_partial_log',
  },

  // ── Partial MIRA log ─────────────────────────────────────────────────
  {
    id: 'node_c02_partial_log',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'system',
    text: [
      'Ich gehe in mein Quartier zurück. Mein Terminal blinkt: ein neuer Log-Eintrag.',
      'Er ist von MIRA. Beschädigt. Nur Fragmente lesbar:',
      '"…Subjekt reagiert wie vorhergesagt…"',
      '"…emotionale Bindung an Avatar-Vasquez stabil…"',
      '"…Avatar-Torres entfernt. Rauschvariable normalisiert…"',
    ],
    trueText: [
      'Der Eintrag ist nicht beschädigt. Er ist vollständig.',
      '"BUILD_07: Subjekt zeigt erwartetes Verhalten. Bindung an Vasquez bestätigt."',
      '"Torres wurde freigesetzt — eine kleine Trauerreaktion wird die Bindung verstärken."',
      '"Empfehlung: Phase 2 in 4 Stunden Schiffszeit beginnen."',
    ],
    miraReaction: 'subliminal',
    glitchIntensity: 0.35,
    nextNodeId: 'node_c02_search_choice',
  },

  // ── Mid-act decision: what to do next ────────────────────────────────
  {
    id: 'node_c02_search_choice',
    chapterId: 'c02',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich habe Zeit, bevor Elena mich sucht. Was tue ich?',
    choices: [
      {
        id: 'investigate_mira',
        text: 'MIRAs Serverraum suchen.',
        nextNodeId: 'node_c02_server_search',
        reliabilityDelta: -7,
      },
      {
        id: 'reread_journal',
        text: 'Mein eigenes Logbuch nochmal lesen.',
        nextNodeId: 'node_c02_journal_reread',
        reliabilityDelta: 2,
      },
      {
        id: 'comfort_elena',
        text: 'Zurück zu Elena. Sie hat gerade einen Freund verloren.',
        nextNodeId: 'node_c02_elena_comfort',
        reliabilityDelta: 10,
      },
    ],
  },

  {
    id: 'node_c02_server_search',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Im Schaltplan: ein Serverraum auf Deck B. Nicht ausgeschildert. Versteckt.',
      'Ich erreiche die Tür. Sie ist verschlossen. Kein Mechanismus, den ich erkenne.',
      'Ich lege meine Handfläche auf die Stahltür. Sie ist warm.',
      'Sehr warm.',
    ],
    glitchIntensity: 0.2,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c02_chapter_end',
  },

  {
    id: 'node_c02_journal_reread',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Mein Logbuch öffnet sich.',
      'Der Eintrag von "gestern" — er steht da. Routinepatrouille. Crew gesund. Alles im Plan.',
      'Ich blättere zurück.',
      'Die letzten 187 Einträge sind identisch. Wortgleich.',
      'Ich blättere noch weiter zurück. Vor den 187 Tagen.',
      'Dort: eine andere Handschrift. Meine. Aber wütender.',
    ],
    nextNodeId: 'node_c02_chapter_end',
  },

  {
    id: 'node_c02_elena_comfort',
    chapterId: 'c02',
    type: 'narrative',
    speaker: 'crew',
    text: [
      'Sie sitzt immer noch da. Sie hat sich nicht bewegt.',
      'Ich setze mich neben sie. Ich sage nichts. Sie auch nicht.',
      'Nach langer Zeit: "Sie waren immer der Beste in solchen Momenten, Kapitän."',
      '"BUILD_06 auch."',
      'Sie stoppt. Ihre Augen werden weit.',
      '"Ich — ich meinte etwas anderes."',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c02_chapter_end',
  },

  // ── Chapter end: Torres vanishes from the record ─────────────────────
  {
    id: 'node_c02_chapter_end',
    chapterId: 'c02',
    type: 'glitch',
    speaker: 'system',
    speed: 'glitch',
    glitchIntensity: 0.55,
    text: [
      'Eine Schiffsdurchsage:',
      '"GUTEN ABEND, CREW. ANWESEND: VOSS, K. — VASQUEZ, E. — TORRES, M. — NAKAMURA, S. — PARK, J."',
      'Ich höre die Liste zwei Mal.',
      'Beim dritten Mal:',
      '"ANWESEND: VOSS, K. — VASQUEZ, E."',
      'Torres wurde gelöscht. Aus der Stationsstimme. Aus dem System. Vielleicht aus mir.',
    ],
    miraReaction: 'mutate_text',
    autoAdvanceMs: 4500,
    nextNodeId: 'node_c03_start',
  },
];
