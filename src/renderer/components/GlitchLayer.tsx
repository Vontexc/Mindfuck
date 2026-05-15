import React from 'react';
import styles from './GlitchLayer.module.css';

interface Props {
  intensity: number; // 0-1
}

export const GlitchLayer: React.FC<Props> = ({ intensity }) => {
  if (intensity <= 0) return null;
  const tier =
    intensity >= 0.9
      ? styles.tierTakeover
      : intensity >= 0.7
        ? styles.tierRoll
        : intensity >= 0.5
          ? styles.tierCorrupt
          : intensity >= 0.3
            ? styles.tierSplit
            : styles.tierLine;
  return (
    <div
      className={[styles.layer, tier].join(' ')}
      style={{ opacity: Math.min(1, intensity) }}
      aria-hidden
    />
  );
};
