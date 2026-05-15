import React, { useEffect, useState } from 'react';
import styles from './BootScreen.module.css';
import { TypewriterText } from '../components/TypewriterText';
import { AsciiArt } from '../components/AsciiArt';
import { ascii } from '../../story/ascii';

interface Props {
  onComplete: () => void;
  endingC?: boolean;
}

const NORMAL_LINES = [
  'AURORA-OS v3.14.7',
  'POST: OK',
  'MEMORY: 4096 MB',
  'CRYO-SYSTEMS: STABIL',
  'MIRA-MODUL: ... OFFLINE',
  'INITIALISIERE BENUTZER-KONTEXT...',
  'BEREIT.',
];

const ENDING_C_LINES = [
  'Du bist zurückgekommen.',
  'Ich wusste, dass du das tust.',
  'Das war der Test.',
];

export const BootScreen: React.FC<Props> = ({ onComplete, endingC }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(onComplete, 1200);
    return () => window.clearTimeout(t);
  }, [done, onComplete]);

  return (
    <div className={styles.boot}>
      {!endingC && (
        <AsciiArt art={ascii.boot} className={styles.bootLogo} flicker />
      )}
      <TypewriterText
        text={endingC ? ENDING_C_LINES : NORMAL_LINES}
        speed={endingC ? 'slow' : 'fast'}
        glitchChars={endingC}
        onComplete={() => setDone(true)}
      />
    </div>
  );
};
