import React from 'react';
import styles from './GlitchMenu.module.css';

interface Props {
  onStart: () => void;
}

export const GlitchMenu: React.FC<Props> = ({ onStart }) => {
  return (
    <div className={styles.bg}>
      <div className={styles.dialog} role="dialog" aria-labelledby="dialog-title">
        <div className={styles.titleBar}>
          <span id="dialog-title">aurora_runtime.exe — SYSTEMFEHLER</span>
          <button className={styles.close} onClick={onStart} aria-label="Close">×</button>
        </div>
        <div className={styles.body}>
          <p>Eine unerwartete Bedingung wurde ausgelöst. Möchten Sie fortfahren?</p>
          <p className={styles.code}>0x00000000 — SIGNAL_NULL</p>
          <p className={styles.warning}>
            INHALTSHINWEIS: Psychologischer Horror, Identitätsverlust, Tod (textuell).
          </p>
        </div>
        <div className={styles.buttons}>
          <button onClick={onStart}>OK</button>
          <button onClick={onStart}>Abbrechen</button>
          <button onClick={onStart}>Hilfe</button>
        </div>
      </div>
    </div>
  );
};
