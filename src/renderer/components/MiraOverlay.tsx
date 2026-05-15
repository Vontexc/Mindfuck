import React, { useEffect, useState } from 'react';
import styles from './MiraOverlay.module.css';
import type { Intrusion } from '../../engine/MiraEngine';

interface Props {
  intrusion: Intrusion | null;
  onDismiss: () => void;
}

export const MiraOverlay: React.FC<Props> = ({ intrusion, onDismiss }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!intrusion) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = window.setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, intrusion.durationMs);
    return () => window.clearTimeout(t);
  }, [intrusion, onDismiss]);

  if (!intrusion || !visible) return null;

  const isOrpheus = intrusion.source === 'orpheus';

  if (intrusion.type === 'subliminal_flash') {
    return (
      <div
        className={[styles.subliminal, isOrpheus ? styles.orpheus : ''].join(' ')}
        aria-hidden
      >
        {intrusion.resolvedText}
      </div>
    );
  }

  if (
    intrusion.type === 'direct_address' ||
    intrusion.type === 'orpheus_breakthrough'
  ) {
    return (
      <div
        className={[styles.directAddress, isOrpheus ? styles.orpheus : ''].join(' ')}
        aria-hidden
      >
        <div
          className={[
            styles.directAddressInner,
            isOrpheus ? styles.orpheusBox : '',
          ].join(' ')}
        >
          {intrusion.resolvedText}
        </div>
      </div>
    );
  }

  if (intrusion.type === 'false_memory') {
    return (
      <div
        className={[styles.whisper, isOrpheus ? styles.orpheus : ''].join(' ')}
        aria-hidden
      >
        {intrusion.resolvedText}
      </div>
    );
  }

  if (intrusion.type === 'static_burst') {
    return <div className={styles.staticBurst} aria-hidden />;
  }

  return null;
};
