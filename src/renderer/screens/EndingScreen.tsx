import React from 'react';
import styles from './EndingScreen.module.css';
import { TypewriterText } from '../components/TypewriterText';
import type { EndingId } from '../../story/nodes.types';
import { EndingCalculator } from '../../engine/EndingCalculator';

interface Props {
  endingId: EndingId;
  playerName: string;
  onRestart: () => void;
}

const calc = new EndingCalculator();

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
};

export const EndingScreen: React.FC<Props> = ({ endingId, playerName, onRestart }) => {
  const label = calc.label(endingId);
  const epilogue = EPILOGUES[endingId].map((l) =>
    l.replace('[NAME]', playerName),
  );

  return (
    <div className={[styles.screen, styles[`tier${endingId}`]].join(' ')}>
      <div className={styles.tag}>ENDING {endingId} // {label.toUpperCase()}</div>
      <div className={styles.body}>
        <TypewriterText
          text={epilogue}
          speed="slow"
          glitchChars={endingId === 'E' || endingId === 'F'}
          onComplete={() => {/* */}}
        />
      </div>
      <button className={styles.restart} onClick={onRestart}>
        Neuer Versuch
      </button>
    </div>
  );
};
