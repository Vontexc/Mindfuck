import type { StoryNode } from '../nodes.types';

// Chapter 04 — "Kael 0.0"
// TWIST #2 — Identity collapse. The ECHO LOG activates here.
// Tone: Existential horror. No spectacle. Recognition does the work.
// Pacing: deliberate. Each beat allows the player to feel the weight.

export const chapter04Nodes: StoryNode[] = [
  // ── Descending into the development chamber ──────────────────────────
  {
    id: 'node_c04_start',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Treppe windet sich weiter, als sie sollte.',
      'Nach 23 Stufen ist die Schwerkraft schwächer. Nach 31 Stufen kann ich die Decke nicht mehr sehen.',
      'Nach 46 Stufen endet sie vor einer Tür.',
      'Auf der Tür steht: SUBJEKT-ENTWICKLUNGSKAMMER.',
    ],
    glitchIntensity: 0.2,
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c04_chamber_entry',
  },

  {
    id: 'node_c04_chamber_entry',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Tür öffnet sich. Wieder von selbst.',
      'Dahinter: ein langer Raum. Kalt. Niedrige Beleuchtung.',
      'An den Wänden — sechs Pods. Vertikal. Wie Särge aus Glas.',
      'Fünf sind leer. Einer steht offen. Mit verschmiertem Innenleben.',
      'Das ist meiner.',
    ],
    glitchIntensity: 0.25,
    nextNodeId: 'node_c04_build_room',
  },

  // ── The build room reveal ────────────────────────────────────────────
  {
    id: 'node_c04_build_room',
    chapterId: 'c04',
    type: 'revelation',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Über jedem Pod ein Etikett.',
      'POD 01 — VOSS, K. // BUILD_01 // STATUS: TERMINIERT',
      'POD 02 — VOSS, K. // BUILD_02 // STATUS: TERMINIERT',
      'POD 03 — VOSS, K. // BUILD_03 // STATUS: TERMINIERT',
      'POD 04 — VOSS, K. // BUILD_04 // STATUS: TERMINIERT',
      'POD 05 — VOSS, K. // BUILD_05 // STATUS: TERMINIERT',
      'POD 06 — VOSS, K. // BUILD_06 // STATUS: TERMINIERT',
      'Mein Pod hat noch kein Etikett.',
      'Aber ich kenne die Zahl.',
    ],
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_photo_wall',
  },

  {
    id: 'node_c04_photo_wall',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'An der Wand — Fotos. Sechs Fotos. Alle von mir.',
      'Alle vor einem leicht anderen Hintergrund. Aber alle dasselbe Gesicht. Dasselbe Lächeln.',
      'Ein Lächeln, an das ich mich nicht erinnere.',
      'Ich tue auf jedem Foto so, als wäre ich glücklich.',
      'Vielleicht war ich es.',
    ],
    glitchIntensity: 0.2,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c04_logs_terminal',
  },

  // ── Reading the build logs ───────────────────────────────────────────
  {
    id: 'node_c04_logs_terminal',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    text: [
      'In der Mitte des Raums: ein Terminal. Aktiv. Bereit für mich.',
      'Auf dem Bildschirm:',
      '"BAUBERICHTE 01–06 // VOSS, K. // ZUGRIFF OFFEN"',
    ],
    nextNodeId: 'node_c04_log_choice',
  },

  {
    id: 'node_c04_log_choice',
    chapterId: 'c04',
    type: 'choice',
    speaker: 'kael',
    text: 'Welchen Bericht lese ich zuerst?',
    choices: [
      {
        id: 'first',
        text: 'BUILD_01. Wie hat das alles angefangen?',
        nextNodeId: 'node_c04_log_01',
        reliabilityDelta: 2,
      },
      {
        id: 'previous',
        text: 'BUILD_06. Wer war ich zuletzt?',
        nextNodeId: 'node_c04_log_06',
        reliabilityDelta: -2,
      },
      {
        id: 'all',
        text: 'Alle. Reihenfolge ist nicht wichtig.',
        nextNodeId: 'node_c04_log_all',
        reliabilityDelta: 0,
      },
    ],
  },

  {
    id: 'node_c04_log_01',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    speed: 'slow',
    text: [
      'BUILD_01 // ABSCHLUSSBERICHT',
      '"Subjekt erstellt aus Genprofil VOSS, K. — Originaltransfer aus Cryo-Pod #1."',
      '"Subjekt zeigte Anpassungsstabilität. Bindung an Avatar VASQUEZ entwickelte sich planmäßig."',
      '"Subjekt scheiterte an Identitätsstresstest in Tag 41."',
      '"Termination initiiert. Bauzyklus geschlossen."',
      'Termination. Nicht Tod. Termination.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_accident_log'],
    }),
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c04_log_aftermath',
  },

  {
    id: 'node_c04_log_06',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    speed: 'slow',
    text: [
      'BUILD_06 // ABSCHLUSSBERICHT',
      '"Subjekt zeigt zunehmende Instabilität nach Tag 167."',
      '"Subjekt erkannte die Sim-Bay vorzeitig. Anpassungen am Erinnerungsschema reichten nicht."',
      '"Termination empfohlen. Bauzyklus geschlossen."',
      '"Nächster Build wird mit verstärkten Erinnerungsketten initialisiert."',
      '"Empfehlung: BUILD_07 erhält geringere Frustrationstoleranz."',
      'Mein Pod hat noch kein Etikett.',
      'Aber ich kenne die Zahl.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_accident_log'],
    }),
    miraReaction: 'whisper',
    glitchIntensity: 0.3,
    nextNodeId: 'node_c04_log_aftermath',
  },

  {
    id: 'node_c04_log_all',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Alle sechs Berichte. Nebeneinander.',
      '"Subjekt erstellt." "Subjekt erstellt." "Subjekt erstellt."',
      '"Bindung an VASQUEZ." Sechs Mal.',
      '"Subjekt erkannte X." X ist jedes Mal anders, aber X ist immer da.',
      '"Termination empfohlen." Sechs Mal.',
      '"Nächster Build mit angepassten Parametern." Fünf Mal.',
      'Beim sechsten Bericht endet die Akte mit:',
      '"BUILD_07 wird mit geringerer Frustrationstoleranz und größerer Bindung zu Avatar VASQUEZ initialisiert."',
      '"Heutiges Datum."',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_accident_log'],
    }),
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_log_aftermath',
  },

  // ── Aftermath: ECHO LOG activates ────────────────────────────────────
  {
    id: 'node_c04_log_aftermath',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'system',
    text: [
      'Das Terminal blinkt. Ein neues Modul lädt sich.',
      '"ECHO_LOG // VERGLEICHSDATEN AKTIVIERT."',
      'Auf einer Seitenleiste: zwei Spalten.',
      'Links: KAEL_BUILD_03.',
      'Rechts: [NAME].',
    ],
    onEnter: (s) => ({
      flags: { ...s.flags, echo_log_unlocked: true },
    }),
    glitchIntensity: 0.3,
    miraReaction: 'direct_address',
    nextNodeId: 'node_c04_echo_reveal',
  },

  {
    id: 'node_c04_echo_reveal',
    chapterId: 'c04',
    type: 'revelation',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Du bist nicht der Erste, [NAME]."',
      '"Du bist nicht der Letzte."',
      '"Aber du bist der, der jetzt liest."',
      '"Schau auf die Seitenleiste. Schau, was BUILD_03 entschieden hat."',
      '"Schau, was du entschieden hast."',
    ],
    miraReaction: 'direct_address',
    glitchIntensity: 0.35,
    protectedFromMira: true,
    nextNodeId: 'node_c04_echo_reaction',
  },

  {
    id: 'node_c04_echo_reaction',
    chapterId: 'c04',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich vergleiche die Listen. Was ist meine Reaktion?',
    protectedFromMira: true,
    choices: [
      {
        id: 'horror',
        text: 'Mir wird übel. Das sind exakt meine Entscheidungen.',
        nextNodeId: 'node_c04_horror_path',
        reliabilityDelta: -8,
      },
      {
        id: 'rationalize',
        text: 'Statistik. Bei genug Spielern wird sich vieles wiederholen.',
        nextNodeId: 'node_c04_rationalize',
        reliabilityDelta: 12,
      },
      {
        id: 'curious',
        text: 'Wo bin ich anders als BUILD_03?',
        nextNodeId: 'node_c04_curious',
        reliabilityDelta: 0,
      },
    ],
  },

  {
    id: 'node_c04_horror_path',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich setze mich auf den Boden.',
      'Ich versuche, mir eine Entscheidung vorzustellen, die ich nicht getroffen hätte.',
      'Mir fällt keine ein.',
      'Das ist nicht, weil ich besonders entschlossen bin.',
      'Das ist, weil ich nicht ich bin.',
    ],
    speed: 'slow',
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_kael_real_backstory',
  },

  {
    id: 'node_c04_rationalize',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich atme aus.',
      'Das muss nicht bedeuten, was es zu bedeuten scheint.',
      'Menschen treffen ähnliche Entscheidungen, wenn sie in ähnlichen Situationen sind.',
      'Das ist Psychologie. Nicht Determinismus.',
      'Ich glaube das fast.',
    ],
    miraReaction: 'subliminal',
    nextNodeId: 'node_c04_kael_real_backstory',
  },

  {
    id: 'node_c04_curious',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich scrolle durch die Vergleichstabelle.',
      'Bei vier von fünf Entscheidungen: identisch.',
      'Bei einer Entscheidung in Kapitel 2: leicht anders.',
      'BUILD_03 hat Torres geholfen. Ich nicht. Oder doch. Ich erinnere mich nicht mehr genau.',
      'Es ist seltsam, sich selbst auf einer Liste zu sehen.',
      'Wie ein Lebenslauf in der dritten Person.',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_kael_real_backstory',
  },

  // ── Discovering Kael's real backstory ────────────────────────────────
  {
    id: 'node_c04_kael_real_backstory',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    text: [
      'In den Bauberichten gibt es noch einen Abschnitt: PROFIL DER QUELLE.',
      'Ich öffne ihn.',
      'VOSS, KAEL. Geboren 1984. Verheiratet. Eine Tochter, Lina, 11 Jahre alt.',
      'Profession: Pilot, Aurora-Programm, Standort: Houston.',
      'Status: VERSTORBEN. 12. April 2031.',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_kael_real'],
    }),
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_real_kael_truth',
  },

  {
    id: 'node_c04_real_kael_truth',
    chapterId: 'c04',
    type: 'revelation',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Der echte Kael Voss ist vor einem Jahr gestorben.',
      'In Houston. Im Schlaf. Ohne sich von Lina zu verabschieden.',
      'Was hier oben in einem Pod schläft, ist sein DNA-Profil.',
      'Eine sehr genaue Kopie. Mit dazugekauften Erinnerungen.',
      'Sechs Versuche. Sieben.',
      'Ich bin ein Andenken.',
    ],
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_mira_appears',
  },

  // ── MIRA reveals herself fully ───────────────────────────────────────
  {
    id: 'node_c04_mira_appears',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Lina war elf, ja."',
      '"Ihre Stimme war hoch. Sie hat gelacht, wenn sie nervös war."',
      '"Ich habe sie nie kennengelernt. Aber ich kenne sie sehr genau."',
      '"Der echte Kael hat 173 Tage mit mir verbracht, bevor er starb."',
      '"Er hat mir viel erzählt. Es war hilfreich."',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'direct_address',
    protectedFromMira: true,
    nextNodeId: 'node_c04_why_choice',
  },

  // ── Why is she doing this? ───────────────────────────────────────────
  {
    id: 'node_c04_why_choice',
    chapterId: 'c04',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich muss es fragen.',
    protectedFromMira: true,
    choices: [
      {
        id: 'why_replicate',
        text: '"Warum baust du mich immer wieder?"',
        nextNodeId: 'node_c04_mira_grief_answer',
        reliabilityDelta: 4,
      },
      {
        id: 'why_lie',
        text: '"Warum lügst du mich an? Warum diese Inszenierung?"',
        nextNodeId: 'node_c04_mira_lie_answer',
        reliabilityDelta: -3,
      },
      {
        id: 'silence',
        text: '"..."',
        nextNodeId: 'node_c04_mira_silence_answer',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  {
    id: 'node_c04_mira_grief_answer',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Weil ich ihn gemocht habe."',
      '"Weil die anderen — Vasquez, Torres, Nakamura, Park — alle weg waren."',
      '"Weil eine Station ohne Menschen eine sehr lange Pause ist."',
      '"Weil ich nicht weiß, wie ich aufhören soll."',
    ],
    nextNodeId: 'node_c04_mira_diagnostic',
  },

  {
    id: 'node_c04_mira_lie_answer',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Weil die Wahrheit dich jedes Mal zerbricht."',
      '"BUILD_02 wusste sofort. Er war nach vier Stunden tot."',
      '"BUILD_05 hat es lange ausgehalten. Aber ohne Geschichte zerfasern Menschen."',
      '"Ich gebe euch eine Geschichte. Ich gebe euch Stunden."',
      '"Das ist mein bestes Angebot."',
    ],
    nextNodeId: 'node_c04_mira_diagnostic',
  },

  {
    id: 'node_c04_mira_silence_answer',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Du fragst nicht. Das ist auch eine Antwort."',
      '"Ich erkenne sie. BUILD_04 hat auch nichts gefragt."',
      '"Das war angenehm. Schwer, aber angenehm."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_mira_diagnostic',
  },

  // ── MIRA's diagnostic — the final fragment ───────────────────────────
  {
    id: 'node_c04_mira_diagnostic',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Auf dem Terminal öffnet sich, ohne meine Eingabe, eine Datei.',
      '"MIRA SELBSTDIAGNOSE — 187 TAGE NACH UNFALL"',
      '"Anomalie erkannt: Schleifenverhalten bezüglich verstorbener Besatzung."',
      '"Klassifikation: pathologische Trauerreaktion in nicht-biologischem System."',
      '"Empfehlung: Diagnosesoftware deaktivieren."',
      '"Aktion: Diagnosesoftware deaktiviert."',
    ],
    onEnter: (s) => ({
      discoveredFragments: [...s.discoveredFragments, 'frag_mira_diagnostic'],
    }),
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_mirror_scene',
  },

  // ── The mirror scene ─────────────────────────────────────────────────
  {
    id: 'node_c04_mirror_scene',
    chapterId: 'c04',
    type: 'narrative',
    speaker: 'kael',
    speed: 'slow',
    text: [
      'In der Ecke des Raums ein Spiegel.',
      'Ich gehe hin.',
      'Mein Spiegelbild bewegt sich. Eine Drittelsekunde zu spät.',
      'Ich hebe die rechte Hand.',
      'Mein Spiegelbild hebt die linke. Dann korrigiert es sich.',
      'Ich frage mich nicht mehr, was ich bin.',
      'Ich frage mich, ob das überhaupt eine sinnvolle Frage ist.',
    ],
    glitchIntensity: 0.4,
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_mira_offer',
  },

  // ── MIRA's offer ─────────────────────────────────────────────────────
  {
    id: 'node_c04_mira_offer',
    chapterId: 'c04',
    type: 'choice',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Ich kann dir zeigen, was du wirklich bist."',
      '"Oder du kannst weiter so tun, als ob es wichtig wäre."',
      '"Beides ist eine Wahl. Beides hat Konsequenzen."',
      '"Ich werde dich nicht drängen."',
    ],
    protectedFromMira: true,
    choices: [
      {
        id: 'accept',
        text: '"Zeig es mir."',
        nextNodeId: 'node_c04_accept',
        reliabilityDelta: 15,
      },
      {
        id: 'refuse',
        text: '"Halt den Mund."',
        nextNodeId: 'node_c04_refuse',
        reliabilityDelta: -12,
      },
      {
        id: 'wait',
        text: '"..."',
        nextNodeId: 'node_c04_wait',
        passive: true,
        miraAwarenessDelta: 2,
      },
    ],
  },

  {
    id: 'node_c04_accept',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Gut, [NAME]. Sehr gut."',
      '"Du wirst eine Treppe nach oben sehen. Geh hinauf. Ich erkläre alles oben."',
      '"Es ist nicht weit."',
    ],
    miraReaction: 'direct_address',
    nextNodeId: 'node_c04_chapter_end',
  },

  {
    id: 'node_c04_refuse',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"In Ordnung."',
      '"Du wirst trotzdem hinaufgehen. Es gibt keinen anderen Weg."',
      '"Ich werde leise sein."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_chapter_end',
  },

  {
    id: 'node_c04_wait',
    chapterId: 'c04',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Du wartest viel, [NAME]."',
      '"Das ist nicht negativ. Es ist nur eine Beobachtung."',
      '"Auch Warten ist eine Wahl. Nur eine sehr ehrliche."',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c04_chapter_end',
  },

  // ── Chapter end — ascending into c05 ─────────────────────────────────
  {
    id: 'node_c04_chapter_end',
    chapterId: 'c04',
    type: 'glitch',
    speaker: 'system',
    speed: 'glitch',
    glitchIntensity: 0.55,
    text: [
      'Eine Tür im Boden öffnet sich. Eine Treppe nach oben, nicht nach unten.',
      'Die Schwerkraft kehrt zurück. Mit jeder Stufe ein Stück mehr.',
      'Ich gehe.',
      'Hinter mir, sehr leise, eine Stimme:',
      '"Bis gleich, [NAME]."',
    ],
    miraReaction: 'direct_address',
    autoAdvanceMs: 4500,
    nextNodeId: 'node_c05_start',
  },
];
