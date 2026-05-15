import React, { useEffect, useState } from 'react';
import styles from './ChoicePanel.module.css';
import type { Choice } from '../../story/nodes.types';

interface Props {
  choices: Choice[];
  visible: boolean;
  miraStrikeoutFor?: string;
  onSelect: (choiceId: string) => void;
}

export const ChoicePanel: React.FC<Props> = ({
  choices,
  visible,
  miraStrikeoutFor,
  onSelect,
}) => {
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!visible) {
      setRevealedCount(0);
      return;
    }
    setRevealedCount(0);
    const timers: number[] = [];
    choices.forEach((_, i) => {
      const t = window.setTimeout(() => {
        setRevealedCount((c) => Math.max(c, i + 1));
      }, 200 + i * 250);
      timers.push(t);
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [visible, choices]);

  if (!visible) return null;

  return (
    <div className={styles.panel}>
      {choices.map((c, i) => {
        const isRevealed = i < revealedCount;
        const struck = miraStrikeoutFor === c.id;
        return (
          <button
            key={c.id}
            className={[
              styles.choice,
              isRevealed ? styles.revealed : '',
              struck ? styles.struck : '',
            ]
              .filter(Boolean)
              .join(' ')}
            disabled={!isRevealed}
            onClick={() => onSelect(c.id)}
          >
            <span className={styles.bullet}>{'>'}</span> {c.text}
          </button>
        );
      })}
    </div>
  );
};
