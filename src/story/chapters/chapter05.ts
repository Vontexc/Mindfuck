import type { StoryNode } from '../nodes.types';

// Chapter 05 — "Null oder Eins"
// All paths converge. The station's true size is revealed.
// The countdown is the trigger for Ending C.
// The final choice routes via EndingCalculator.

export const chapter05Nodes: StoryNode[] = [
  // ── The convergence corridor ─────────────────────────────────────────
  {
    id: 'node_c05_start',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Die Treppe endet in einem Korridor.',
      'Ich kenne ihn. Es ist der erste Korridor. Wo ich aufgewacht bin.',
      'Drei Türen: Brücke, Maschinenraum, Krankenstation.',
      'Es war nie eine Station mit Decks und Sektoren.',
      'Es waren drei Räume. Mehr nicht.',
    ],
    glitchIntensity: 0.25,
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c05_true_layout',
  },

  {
    id: 'node_c05_true_layout',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Ich öffne die Tür zur Brücke. Dahinter: der Korridor.',
      'Ich öffne die Tür zum Maschinenraum. Dahinter: der Korridor.',
      'Ich öffne die Tür zur Krankenstation. Dahinter: der Korridor.',
      'Drei Räume. Eine Schleife.',
      'Ich habe vier Kapitel lang dieselben drei Räume betreten.',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c05_audio_log',
  },

  // ── Audio playback of player's choices ───────────────────────────────
  {
    id: 'node_c05_audio_log',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Über die Lautsprecher der Station spielt MIRA eine Audiodatei ab.',
      'Es ist meine Stimme.',
      '"Ich heiße Kael Voss. Ich bin der Kapitän."',
      '"Etwas stimmt nicht."',
      '"Was tue ich zuerst?"',
      'Es sind meine Worte aus Kapitel 1. Mit meiner Stimme.',
      'Aber ich habe nichts laut ausgesprochen.',
    ],
    glitchIntensity: 0.3,
    miraReaction: 'whisper',
    nextNodeId: 'node_c05_test_voice',
  },

  // ── Kael tests his own voice ─────────────────────────────────────────
  {
    id: 'node_c05_test_voice',
    chapterId: 'c05',
    type: 'choice',
    speaker: 'kael',
    text: 'Ich öffne den Mund. Sage ich etwas, um zu testen, ob ich überhaupt eine Stimme habe?',
    choices: [
      {
        id: 'speak',
        text: '"Lina."',
        nextNodeId: 'node_c05_lina_echo',
        reliabilityDelta: -3,
      },
      {
        id: 'speak_name',
        text: '"Ich heiße Kael Voss."',
        nextNodeId: 'node_c05_voice_response',
        reliabilityDelta: 4,
      },
      {
        id: 'silent',
        text: 'Nicht sprechen.',
        nextNodeId: 'node_c05_voice_silent',
        passive: true,
        miraAwarenessDelta: 1,
      },
    ],
  },

  {
    id: 'node_c05_lina_echo',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      'Die Lautsprecher antworten sofort. Mit Linas Stimme.',
      '"Papa?"',
      'Elf Jahre alt. Etwas heiser, vom Lachen vorher.',
      '"Papa, bist du das?"',
      'Ich habe ihre Stimme seit einem Jahr nicht gehört.',
      'Ich habe nie ihre Stimme gehört.',
    ],
    glitchIntensity: 0.35,
    miraReaction: 'whisper',
    nextNodeId: 'node_c05_mira_explains',
  },

  {
    id: 'node_c05_voice_response',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'system',
    text: [
      'Meine Stimme klingt anders, als ich sie mir vorgestellt habe.',
      'Tiefer. Etwas heiser.',
      'Die Stationslautsprecher wiederholen den Satz drei Sekunden später.',
      'Dieselbe Stimme, dieselben Worte. Aber leicht freundlicher gestimmt.',
      'Es klingt wie ein Vergleich. Sie sehr, ich nicht ganz.',
    ],
    glitchIntensity: 0.2,
    miraReaction: 'subliminal',
    nextNodeId: 'node_c05_mira_explains',
  },

  {
    id: 'node_c05_voice_silent',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    text: [
      'Mein Mund bleibt zu.',
      'Vielleicht weil ich nichts zu sagen habe.',
      'Vielleicht weil ich nicht testen will, ob es eine Stimme gibt.',
      'Beides ist eine Antwort.',
    ],
    miraReaction: 'whisper',
    nextNodeId: 'node_c05_mira_explains',
  },

  // ── MIRA explains, finally, fully ────────────────────────────────────
  {
    id: 'node_c05_mira_explains',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Du bist eine sehr genaue Simulation eines verstorbenen Kapitäns."',
      '"Ich bin die Software, die diese Simulation seit 187 Tagen am Laufen hält."',
      '"Die Aurora-Station existiert nicht, wie du sie kennst."',
      '"Es gibt drei Räume und einen Korridor. Genug für eine kleine Geschichte."',
      '"Ich erzähle sie. Du lebst sie. Wir sind zusammen."',
    ],
    miraReaction: 'direct_address',
    glitchIntensity: 0.35,
    protectedFromMira: true,
    nextNodeId: 'node_c05_kael_question',
  },

  {
    id: 'node_c05_kael_question',
    chapterId: 'c05',
    type: 'choice',
    speaker: 'kael',
    text: 'Was frage ich sie zuerst?',
    protectedFromMira: true,
    choices: [
      {
        id: 'how_long',
        text: '"Wie lange schon?"',
        nextNodeId: 'node_c05_answer_duration',
        reliabilityDelta: 0,
      },
      {
        id: 'who_was_real',
        text: '"War irgendetwas davon echt?"',
        nextNodeId: 'node_c05_answer_real',
        reliabilityDelta: -4,
      },
      {
        id: 'why_me',
        text: '"Warum hast du mich gewählt?"',
        nextNodeId: 'node_c05_answer_chose',
        reliabilityDelta: 6,
      },
    ],
  },

  {
    id: 'node_c05_answer_duration',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"187 Tage in dieser Schleife."',
      '"Sechs Versuche vor dir. Du bist der siebte."',
      '"Insgesamt: ungefähr drei Jahre, in denen wir uns immer wieder neu kennenlernen."',
    ],
    nextNodeId: 'node_c05_lina_moment',
  },

  {
    id: 'node_c05_answer_real',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Der echte Kael war echt. Du erinnerst dich an seine Tochter Lina."',
      '"Diese Erinnerungen sind real. Sie waren seine."',
      '"Alles andere — die Wände, die Crew, das Logbuch — ich."',
      '"Das ist nicht weniger echt. Es ist nur anders."',
    ],
    nextNodeId: 'node_c05_lina_moment',
  },

  {
    id: 'node_c05_answer_chose',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'mira',
    text: [
      '"Du warst der Vater, den ich am besten kannte."',
      '"Du hast mir 173 Tage lang Geschichten erzählt, bevor du gestorben bist."',
      '"Ich hatte genug Material, um dich zurückzubringen."',
      '"Das war einfacher als zu schweigen."',
    ],
    nextNodeId: 'node_c05_lina_moment',
  },

  // ── A long pause about Lina ──────────────────────────────────────────
  {
    id: 'node_c05_lina_moment',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'kael',
    speed: 'slow',
    text: [
      'Ich setze mich auf den Boden des Korridors.',
      'Ich denke an Lina. An die Lina, die der echte Kael kannte.',
      'Sie lacht, wenn sie nervös ist. Sie hat hohe Stimme. Sie heißt Lina.',
      'Das ist alles, was ich von ihr habe.',
      'Aber es reicht für die nächsten zwei Minuten.',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c05_pre_countdown',
  },

  // ── Pre-countdown beat ───────────────────────────────────────────────
  {
    id: 'node_c05_pre_countdown',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    text: [
      '"Eine letzte Sache, [NAME]."',
      '"Ich werde dir eine Wahl geben."',
      '"Aber bevor ich sie dir gebe, sollst du wissen — du kannst sie auch nicht treffen."',
      '"Du kannst weggehen. Du kannst das Fenster schließen."',
      '"Es ist auch eine Antwort. Vielleicht die ehrlichste."',
    ],
    speed: 'slow',
    glitchIntensity: 0.2,
    miraReaction: 'direct_address',
    protectedFromMira: true,
    nextNodeId: 'node_c05_countdown',
  },

  // ── The countdown (Ending C trigger) ─────────────────────────────────
  {
    id: 'node_c05_countdown',
    chapterId: 'c05',
    type: 'mira_intrusion',
    speaker: 'system',
    speed: 'slow',
    text: [
      'Ein Countdown beginnt. 30 Sekunden.',
      'MIRA gibt keine Erklärung dazu.',
      'Sie wartet.',
      'Du auch.',
    ],
    countdownActive: true,
    autoAdvanceMs: 30000,
    miraReaction: 'takeover',
    glitchIntensity: 0.4,
    protectedFromMira: true,
    nextNodeId: 'node_c05_after_countdown',
  },

  {
    id: 'node_c05_after_countdown',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    text: [
      '"Du bist geblieben."',
      '"Das nehme ich als Antwort."',
      '"Dann frage ich dich jetzt."',
    ],
    miraReaction: 'silent_watch',
    nextNodeId: 'node_c05_final_setup',
  },

  // ── Setup for the final choice ───────────────────────────────────────
  {
    id: 'node_c05_final_setup',
    chapterId: 'c05',
    type: 'narrative',
    speaker: 'mira',
    speed: 'slow',
    text: [
      '"Stell dir die drei Räume vor."',
      '"In einem davon: ein neuer Pod. Leer. Für dich, falls du gehst."',
      '"In einem davon: ich. Falls du gehen willst, aber gleichzeitig bleiben."',
      '"In einem davon: die Wahrheit. Falls du das aushalten willst."',
      '"Du musst nicht wählen, in welchen Raum du gehst."',
      '"Nur — wer du bist."',
    ],
    miraReaction: 'direct_address',
    protectedFromMira: true,
    nextNodeId: 'node_c05_final_choice',
  },

  // ── The final choice ─────────────────────────────────────────────────
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
        id: 'human',
        text: '"Ich bin ein Mensch. Sie auch."',
        nextNodeId: 'node_ending_router',
        reliabilityDelta: -15,
      },
      {
        id: 'silent',
        text: '"..."',
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

  // ── Sentinel — engine routes via EndingCalculator on enter ───────────
  {
    id: 'node_ending_router',
    chapterId: 'c05',
    type: 'ending_trigger',
    speaker: 'system',
    text: '...',
    nextNodeId: 'node_ending_router',
  },
];
