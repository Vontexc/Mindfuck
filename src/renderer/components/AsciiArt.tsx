import React from 'react';
import styles from './AsciiArt.module.css';

interface Props {
  art: string;
  flicker?: boolean;
  className?: string;
}

export const AsciiArt: React.FC<Props> = ({ art, flicker, className }) => {
  return (
    <pre
      className={[
        styles.art,
        flicker ? styles.flicker : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {art}
    </pre>
  );
};
