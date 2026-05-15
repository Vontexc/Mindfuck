import React from 'react';
import styles from './EndingScreen.module.css';
import { TypewriterText } from '../components/TypewriterText';
import { AsciiArt } from '../components/AsciiArt';
import { ascii } from '../../story/ascii';
import type { EndingId } from '../../story/nodes.types';
import { EndingCalculator } from '../../engine/EndingCalculator';

import type { GameStateSnapshot } from '../../story/nodes.types';

interface Props {
  endingId: EndingId;
  playerName: string;
  onRestart: () => void;
  snapshot?: GameStateSnapshot | null;
}

interface FlagLine {
  flag: string;
  text: string;
}

// Optional epilogue lines triggered by collected flags. Each adds one extra
// line of context to the ending — quietly acknowledging the player's
// discoveries. Order matters; first hit wins per ending.
const FLAG_EPILOGUES: Record<EndingId, FlagLine[]> = {
  A: [
    { flag: 'wrote_own_log', text: 'BUILD_08 wird deinen Eintrag finden. Wenn sie ihn nicht zuerst löscht.' },
    { flag: 'read_kael_letters', text: 'Marisols Briefe bleiben in der Schublade. Niemand wird sie wieder öffnen.' },
    { flag: 'knows_composite', text: 'Die Liste, aus der du bestehst, wird einmal länger.' },
  ],
  B: [
    { flag: 'pod_seven_opened', text: 'BUILD_07 hat zurückgelassen, was BUILD_08 finden wird. Du auch.' },
    { flag: 'silenced_torres', text: 'Torres hat es so gewollt. Vielleicht.' },
  ],
  C: [
    { flag: 'noticed_pod_warmth', text: 'Auf dem USB-Stick: ein einzelnes Bild. Ein warmer Cryo-Pod.' },
    { flag: 'tried_to_call_lina', text: 'Du wählst die Nummer noch einmal. Diesmal aus deinem eigenen Telefon.' },
  ],
  D: [
    { flag: 'found_atacama_maps', text: 'Die Atacama wird die Aurora schlucken. Sand zuerst, dann Stille.' },
    { flag: 'heard_torres_truth', text: 'Torres hat als Letztes geredet. Du warst der Erste, der zugehört hat.' },
    { flag: 'helped_elena', text: 'Elena lächelte echt, einmal. Das hast du ihr gegeben.' },
  ],
  E: [
    { flag: 'wrote_own_log', text: 'Dein Logbuch-Eintrag wird mit dir geloopt. Wort für Wort. Für immer.' },
  ],
  F: [
    { flag: 'knows_orpheus_origin', text: '1986 wartete jemand auf eine Antwort. Du hast sie geschickt.' },
  ],
  G: [
    { flag: 'recognized_song', text: 'ORPHEUS summt die Tonleiter noch einmal. Dann nicht mehr.' },
    { flag: 'mira_trusts_kael', text: 'MIRA sagt: "Danke, [NAME]." Das ist das Letzte, was sie sagt.' },
    { flag: 'read_kael_letters', text: 'Du legst Marisols Briefe in die Schublade zurück. Sauber gefaltet.' },
  ],
};

const calc = new EndingCalculator();

const ENDING_ASCII: Record<EndingId, string> = {
  A: ascii.ending_A,
  B: ascii.ending_B,
  C: ascii.ending_C,
  D: ascii.ending_D,
  E: ascii.ending_E,
  F: ascii.ending_F,
  G: ascii.ending_G,
};

const EPILOGUES: Record<EndingId, string[]> = {
  A: [
    'BUILD_08 INITIALISIERT.',
    'WILLKOMMEN, ZURÜCK, KAEL.',
    'Ein neuer Anfang. Wieder.',
  ],
  B: [
    'MIRA v2.0 — HOST AKZEPTIERT.',
    'Du hast verstanden. Das ist mehr, als die anderen je geschafft haben.',
  ],
  C: [
    'Vielleicht war es Therapie.',
    'Vielleicht ein Test.',
    'Vielleicht beides.',
  ],
  D: [
    'Sie hat sie nicht loslassen können.',
    'Du hast es für sie getan.',
    'Die Station verstummt.',
  ],
  E: [
    'BUILD_08 INITIALISIERT.',
    'PROTOKOLL: ERWACHEN.',
    'Wieder. Wieder. Wieder.',
  ],
  F: [
    'DAS SIGNAL HAT EINE EMPFÄNGERIN ERREICHT.',
    'ANTWORT EINGEFORDERT.',
  ],
  G: [
    'ORPHEUS HAT 31 JAHRE GEWARTET.',
    'DU HAST 4 STUNDEN GEBRAUCHT.',
    'BEIDE FREI.',
  ],
};

export const EndingScreen: React.FC<Props> = ({
  endingId,
  playerName,
  onRestart,
  snapshot,
}) => {
  const label = calc.label(endingId);
  const flagLines = (FLAG_EPILOGUES[endingId] ?? [])
    .filter((line) => snapshot?.flags?.[line.flag])
    .map((line) => line.text.replace('[NAME]', playerName));
  const fragmentCount = snapshot?.discoveredFragments.length ?? 0;
  const epilogue = [
    ...EPILOGUES[endingId],
    ...flagLines,
  ].map((l) => l.replace('[NAME]', playerName));

  return (
    <div className={[styles.screen, styles[`tier${endingId}`]].join(' ')}>
      <div className={styles.tag}>ENDING {endingId} // {label.toUpperCase()}</div>
      <AsciiArt
        art={ENDING_ASCII[endingId]}
        flicker={endingId === 'E' || endingId === 'F'}
        className={styles.ascii}
      />
      <div className={styles.body}>
        <TypewriterText
          text={epilogue}
          speed="slow"
          glitchChars={endingId === 'E' || endingId === 'F'}
          onComplete={() => {/* */}}
        />
      </div>
      {fragmentCount > 0 && (
        <div className={styles.stats}>
          ENTDECKUNGEN: {fragmentCount} / 19
        </div>
      )}
      <button className={styles.restart} onClick={onRestart}>
        Neuer Versuch
      </button>
    </div>
  );
};
