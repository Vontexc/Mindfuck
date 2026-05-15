import React from 'react';
import styles from './Terminal.module.css';
import type { StoryNode } from '../../story/nodes.types';
import { TypewriterText } from './TypewriterText';

interface Props {
  node: StoryNode;
  displayText: string | string[];
  onTextComplete: () => void;
}

const speakerColor: Record<NonNullable<StoryNode['speaker']>, string> = {
  kael: styles.colorKael,
  mira: styles.colorMira,
  system: styles.colorSystem,
  crew: styles.colorCrew,
  unknown: styles.colorUnknown,
};

export const Terminal: React.FC<Props> = ({ node, displayText, onTextComplete }) => {
  const colorClass = node.speaker ? speakerColor[node.speaker] : styles.colorKael;
  return (
    <div className={styles.terminal}>
      <div className={styles.scanlines} />
      <div className={[styles.body, colorClass].join(' ')}>
        <TypewriterText
          text={displayText}
          speed={node.speed ?? 'normal'}
          glitchChars={node.type === 'glitch' || (node.glitchIntensity ?? 0) > 0.3}
          canSkip
          onComplete={onTextComplete}
        />
      </div>
    </div>
  );
};
