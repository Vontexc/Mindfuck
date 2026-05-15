import React from 'react';
import styles from './EchoLog.module.css';
import type { ChoiceRecord } from '../../story/nodes.types';

interface Props {
  visible: boolean;
  playerName: string;
  history: ChoiceRecord[];
}

// Fake "BUILD_03" choices — these mirror Chapter 1 patterns to create the
// uncanny-identity effect when the panel opens.
const buildThreeChoices: { nodeId: string; choiceText: string }[] = [
  { nodeId: 'node_c01_first_choice', choiceText: 'Erst die Systeme prüfen.' },
  { nodeId: 'node_c01_journal_choice', choiceText: 'Einen neuen Eintrag schreiben.' },
  { nodeId: 'node_c01_door_choice', choiceText: 'Den Maschinenraum.' },
  { nodeId: 'node_c02_choice_trust', choiceText: 'Ja. Sie ist die Ärztin.' },
  { nodeId: 'node_c03_choice', choiceText: '"Ja. Ich habe gut geschlafen."' },
];

export const EchoLog: React.FC<Props> = ({ visible, playerName, history }) => {
  if (!visible) return null;

  return (
    <aside className={styles.sidebar}>
      <header className={styles.header}>ECHO_LOG // BUILD_COMPARISON</header>
      <div className={styles.cols}>
        <div className={styles.col}>
          <div className={styles.colHeader}>KAEL_BUILD_03</div>
          {buildThreeChoices.map((c, i) => (
            <div key={i} className={styles.cell}>{c.choiceText}</div>
          ))}
        </div>
        <div className={styles.col}>
          <div className={styles.colHeader}>{playerName.toUpperCase()}</div>
          {buildThreeChoices.map((c, i) => {
            const ours = history.find((h) => h.nodeId === c.nodeId);
            const matched =
              ours?.choiceText.trim().toLowerCase() ===
              c.choiceText.trim().toLowerCase();
            return (
              <div
                key={i}
                className={[styles.cell, matched ? styles.matched : ''].join(' ')}
              >
                {ours?.choiceText ?? '—'}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
