import React from 'react';
import styles from './Terminal.module.css';
import type { StoryNode } from '../../story/nodes.types';
import { TypewriterText } from './TypewriterText';
import { AsciiArt } from './AsciiArt';
import { ascii, type AsciiId } from '../../story/ascii';

interface Props {
  node: StoryNode;
  displayText: string | string[];
  onTextComplete: () => void;
  /** When true, prefer the asciiTrue variant (DNS revealed). */
  showTrueAscii?: boolean;
}

const speakerColor: Record<NonNullable<StoryNode['speaker']>, string> = {
  kael: styles.colorKael,
  mira: styles.colorMira,
  system: styles.colorSystem,
  crew: styles.colorCrew,
  unknown: styles.colorUnknown,
  orpheus: styles.colorOrpheus,
  composite: styles.colorComposite,
};

export const Terminal: React.FC<Props> = ({
  node,
  displayText,
  onTextComplete,
  showTrueAscii,
}) => {
  const colorClass = node.speaker ? speakerColor[node.speaker] : styles.colorKael;
  const asciiId = showTrueAscii && node.asciiTrue ? node.asciiTrue : node.ascii;
  const art = asciiId && asciiId in ascii ? ascii[asciiId as AsciiId] : undefined;
  return (
    <div className={styles.terminal}>
      <div className={styles.scanlines} />
      <div className={[styles.body, colorClass].join(' ')}>
        {art && (
          <AsciiArt
            art={art}
            flicker={
              node.type === 'glitch' || (node.glitchIntensity ?? 0) > 0.3
            }
          />
        )}
        <TypewriterText
          text={displayText}
          speed={node.speed ?? 'normal'}
          glitchChars={node.type === 'glitch' || (node.glitchIntensity ?? 0) > 0.3}
          canSkip
          onComplete={onTextComplete}
        />
        <div className={styles.skipHint} aria-hidden>
          klicken zum überspringen
        </div>
      </div>
    </div>
  );
};
