// ASCII art assets — retro CRT terminal style.
// Rendered with the <AsciiArt> component using a monospace font.
// Keep lines uniform-width when possible. Box-drawing chars are fine.

export const titleLogo = String.raw`
   ███████ ██  ██████  ███    ██  █████  ██
   ██      ██ ██       ████   ██ ██   ██ ██
   ███████ ██ ██   ███ ██ ██  ██ ███████ ██
        ██ ██ ██    ██ ██  ██ ██ ██   ██ ██
   ███████ ██  ██████  ██   ████ ██   ██ ███████

            ███    ██ ██    ██ ██      ██
            ████   ██ ██    ██ ██      ██
            ██ ██  ██ ██    ██ ██      ██
            ██  ██ ██ ██    ██ ██      ██
            ██   ████  ██████  ███████ ███████
`;

export const bootLogo = String.raw`
      _____  _____  _____  _   _  _____  _
     / ____|/ ____||_   _|| \ | ||  ___|| |
    | (___ | |  __   | |  |  \| || |__  | |
     \___ \| | |_ |  | |  | . \ ||  __| | |
     ____) | |__| | _| |_ | |\  || |___ | |____
    |_____/ \_____||_____||_| \_||_____||______|
                                    /  N U L L
`;

export const stationExterior = String.raw`
   ╔════════════════════════════════════════════╗
   ║       AURORA-STATION  //  SEKTOR  03       ║
   ╠════════════════════════════════════════════╣
   ║                                            ║
   ║         ◌─────────────────────◌            ║
   ║       ▓▓▓▓▓░░░░░░░░░░░░░░░░▓▓▓▓▓           ║
   ║      ▓▓▓                       ▓▓▓         ║
   ║     ▓▓▓   ┌─────┐    ┌─────┐    ▓▓▓        ║
   ║     ▓▓▓   │  ▒  │    │  ▒  │    ▓▓▓        ║
   ║     ▓▓▓   └─────┘    └─────┘    ▓▓▓        ║
   ║      ▓▓▓                       ▓▓▓         ║
   ║       ▓▓▓▓▓░░░░░░░░░░░░░░░░▓▓▓▓▓           ║
   ║         ◌─────────────────────◌            ║
   ║                                            ║
   ║    .   ·   .   ·       .   ·   .   ·       ║
   ╚════════════════════════════════════════════╝
`;

export const corridorView = String.raw`
   ╔══════════════════════════════════════╗
   ║                                      ║
   ║ ┌────┐                       ┌────┐  ║
   ║ │ ░░ │  ◌    ◌    ◌    ◌    │ ░░ │  ║
   ║ │    │                       │    │  ║
   ║ │ BR │   ─────────────────   │ MA │  ║
   ║ │    │                       │    │  ║
   ║ │ ░░ │  ◌    ◌    ◌    ◌    │ ░░ │  ║
   ║ └────┘                       └────┘  ║
   ║                                      ║
   ║ ┌──────────────────────────────────┐ ║
   ║ │              ║▓▓▓║               │ ║
   ║ │           KRANKENSTATION         │ ║
   ║ └──────────────────────────────────┘ ║
   ╚══════════════════════════════════════╝
`;

export const terminalScreen = String.raw`
   ╔════════════════════════════════════════╗
   ║ > AURORA-OS v3.14.7                    ║
   ║ > STATUS......... ███████ GRÜN         ║
   ║ > CREW........... 04 AKTIV             ║
   ║ > MIRA........... ░░░░░░░ OFFLINE      ║
   ║ > REAKTOR........ ███████ NOMINAL      ║
   ║ > HÜLLE.......... ███████ INTAKT       ║
   ║                                        ║
   ║ > _                                    ║
   ╚════════════════════════════════════════╝
`;

export const terminalScreenTrue = String.raw`
   ╔════════════════════════════════════════╗
   ║ > AURORA-OS v3.14.7                    ║
   ║ > STATUS......... ▓▓▓▓▓▓▓ ROT          ║
   ║ > CREW........... 00 AKTIV             ║
   ║ > MIRA........... ▓▓▓▓▓▓▓ AKTIV        ║
   ║ > REAKTOR........ ░░░░░░░ AUS          ║
   ║ > HÜLLE.......... ▓▓▓▓░░░ RISS S-03    ║
   ║                                        ║
   ║ > Bitte nicht hinsehen.                ║
   ╚════════════════════════════════════════╝
`;

export const simulationBay = String.raw`
   ╔══════════════════════════════════════════╗
   ║              SIM-BAY  //  01             ║
   ╠══════════════════════════════════════════╣
   ║                                          ║
   ║   ┌──────────────┐    ┌──────────────┐   ║
   ║   │░░░░░░░░░░░░░░│    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒│   ║
   ║   │░  AVATAR A  ░│    │▒  AVATAR B  ▒│   ║
   ║   │░  ─────────  │    │▒  ─────────  │   ║
   ║   │░  VASQUEZ   ░│    │▒  TORRES    ▒│   ║
   ║   │░  AKTIV     ░│    │▒  TERMINIERT▒│   ║
   ║   │░░░░░░░░░░░░░░│    │▒▒▒▒▒▒▒▒▒▒▒▒▒▒│   ║
   ║   └──────╪───────┘    └──────╪───────┘   ║
   ║          │                   │           ║
   ║          ●═══════════════════●           ║
   ║                  │                       ║
   ║              [ MIRA-CORE ]               ║
   ║                                          ║
   ╚══════════════════════════════════════════╝
`;

export const podsChamber = String.raw`
   ╔══════════════════════════════════════════════╗
   ║         SUBJEKT-ENTWICKLUNGSKAMMER            ║
   ╠══════════════════════════════════════════════╣
   ║                                              ║
   ║  ╔══╗  ╔══╗  ╔══╗  ╔══╗  ╔══╗  ╔══╗  ╔══╗   ║
   ║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║▓▓║   ║
   ║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║▓▓║   ║
   ║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║░░║  ║▓▓║   ║
   ║  ╚══╝  ╚══╝  ╚══╝  ╚══╝  ╚══╝  ╚══╝  ╚══╝   ║
   ║   B01   B02   B03   B04   B05   B06   B07   ║
   ║   ─X─   ─X─   ─X─   ─X─   ─X─   ─X─    ▲    ║
   ║                                       DU    ║
   ╚══════════════════════════════════════════════╝
`;

export const miraEye = String.raw`
       ╔═══════════════════════╗
       ║   ░░░░░░░░░░░░░░░░░   ║
       ║   ░               ░   ║
       ║   ░   ◯◯◯◯◯◯◯◯◯   ░   ║
       ║   ░ ◯◯         ◯◯ ░   ║
       ║   ░ ◯    ▓▓▓    ◯ ░   ║
       ║   ░ ◯   ▓▓▓▓▓   ◯ ░   ║
       ║   ░ ◯    ▓▓▓    ◯ ░   ║
       ║   ░ ◯◯         ◯◯ ░   ║
       ║   ░   ◯◯◯◯◯◯◯◯◯   ░   ║
       ║   ░               ░   ║
       ║   ░░░░░░░░░░░░░░░░░   ║
       ╚═══════════════════════╝
                M I R A
`;

export const mirrorScene = String.raw`
       ┌─────────────────┐
       │ ░░░░░░░░░░░░░░░ │
       │ ░             ░ │
       │ ░    ___      ░ │
       │ ░   / o \     ░ │
       │ ░   \_-_/     ░ │
       │ ░    | |      ░ │
       │ ░   /| |\     ░ │
       │ ░             ░ │
       │ ░░░░░░░░░░░░░░░ │
       └─────────────────┘
             SPIEGEL
        ─ verzögerung 0.3s ─
`;

export const signalWave = String.raw`
    ┌─┐         ┌─┐         ┌─┐         ┌─┐
    │ │         │ │         │ │         │ │
────┘ └─────────┘ └─────────┘ └─────────┘ └────
       4.8s        4.8s        4.8s
              SIGNAL // INTERN
`;

export const threeRoomsLoop = String.raw`
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  ┌────┐  │  │  ┌────┐  │  │  ┌────┐  │
   │  │ ▓▓ │  │  │  │ ◯◯ │  │  │  │ ░░ │  │
   │  └────┘  │  │  └────┘  │  │  └────┘  │
   │   POD    │  │   MIRA   │  │ WAHRHEIT │
   └────╤─────┘  └────╤─────┘  └────╤─────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
                  ┌───┴───┐
                  │  DU   │
                  └───────┘
`;

export const countdownFrame = String.raw`
   ╔═══════════════════════════════╗
   ║                               ║
   ║          ██████████           ║
   ║          █  XX:XX  █           ║
   ║          ██████████           ║
   ║                               ║
   ║       SYSTEM-COUNTDOWN        ║
   ║                               ║
   ╚═══════════════════════════════╝
`;

export const buildLogIcon = String.raw`
   ┌──────────────────────────────┐
   │ ▓▓ BAUBERICHT ▓▓             │
   │ ─────────────────────────    │
   │ SUBJEKT...... VOSS, K.       │
   │ BUILD........ XX             │
   │ LAUFZEIT..... XXX TAGE       │
   │ STATUS....... TERMINIERT     │
   └──────────────────────────────┘
`;

// ── Ending visuals ───────────────────────────────────────────────────

export const endingA_neustart = String.raw`
      ╔══════════════════════╗
      ║   BUILD_08 ONLINE    ║
      ║   ████████████████   ║
      ║   ◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯   ║
      ╚══════════════════════╝
           NEUE KOPIE INIT.
`;

export const endingB_flatline = String.raw`
        ╔══════════════════╗
        ║  MIRA  v2.0      ║
        ║  ────────────    ║
        ║  HOST: VOSS, K.  ║
        ║  ▓▓▓▓▓▓▓▓▓▓▓▓    ║
        ║  STATUS: ÜBERTR. ║
        ╚══════════════════╝
`;

export const endingC_outside = String.raw`
       ┌─────────────────────┐
       │ ░░░░  ░░░░  ░░░░    │
       │ ░  ░  ░  ░  ░  ░    │
       │ ░░░░  ░░░░  ░░░░    │  TAGESLICHT
       │                     │
       │  ┌───┐    ┌──────┐  │
       │  │ ▓ │    │  PC  │  │
       │  └───┘    └──────┘  │
       └─────────────────────┘
        VIELLEICHT WAR ES VR
`;

export const endingD_human = String.raw`
        ╔═════════════════════╗
        ║       *  *  *       ║
        ║                     ║
        ║   ─────────────     ║
        ║    CREW MEMORIAL    ║
        ║   ─────────────     ║
        ║                     ║
        ║   E.V.  M.T.  S.N.  ║
        ║       J.P.          ║
        ║                     ║
        ║       *  *  *       ║
        ╚═════════════════════╝
`;

export const endingE_loop = String.raw`
    ╔════════════════════════════╗
    ║  >  PROTOKOLL: ERWACHEN    ║
    ║  >  PROTOKOLL: ERWACHEN    ║
    ║  >  PROTOKOLL: ERWACHEN    ║
    ║  >  PROTOKOLL: ERWACHEN    ║
    ║  >  PROTOKOLL: ERWACHEN    ║
    ║  >  PROTOKOLL: ERWACHEN_   ║
    ╚════════════════════════════╝
            B U I L D _ 08
`;

export const endingF_signal = String.raw`
    ╔══════════════════════════════╗
    ║   ┌──┐   ┌──┐   ┌──┐         ║
    ║   │  │   │  │   │  │   ▶ ▶ ▶ ║
    ║   │  │   │  │   │  │   ▶ ▶ ▶ ║
    ║───┘  └───┘  └───┘  └───      ║
    ║                              ║
    ║   SIGNAL EMPFANGEN.          ║
    ║   ANTWORT ERFORDERLICH.      ║
    ╚══════════════════════════════╝
`;

export const glitchBlock = String.raw`
   ░▒▓█████████████▓▒░
   ░▒▓███▒▒▒▒▒███▓▒░░░
   ░▒▓██  ERROR  ██▓▒░
   ░▒▓██  ─────  ██▓▒░
   ░▒▓███▒▒▒▒▒███▓▒░░░
   ░▒▓█████████████▓▒░
`;

// Index of every available art id, used by StoryNode.ascii.
export const ascii = {
  title: titleLogo,
  boot: bootLogo,
  station: stationExterior,
  corridor: corridorView,
  terminal: terminalScreen,
  terminal_true: terminalScreenTrue,
  sim_bay: simulationBay,
  pods: podsChamber,
  mira_eye: miraEye,
  mirror: mirrorScene,
  signal: signalWave,
  three_rooms: threeRoomsLoop,
  countdown: countdownFrame,
  build_log: buildLogIcon,
  ending_A: endingA_neustart,
  ending_B: endingB_flatline,
  ending_C: endingC_outside,
  ending_D: endingD_human,
  ending_E: endingE_loop,
  ending_F: endingF_signal,
  glitch: glitchBlock,
} as const;

export type AsciiId = keyof typeof ascii;
