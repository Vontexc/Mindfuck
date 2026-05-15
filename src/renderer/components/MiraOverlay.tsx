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

  if (intrusion.type === 'subliminal_flash') {
    return (
      <div className={styles.subliminal} aria-hidden>
        {intrusion.resolvedText}
      </div>
    );
  }

  if (intrusion.type === 'direct_address') {
    return (
      <div className={styles.directAddress} aria-hidden>
        <div className={styles.directAddressInner}>{intrusion.resolvedText}</div>
      </div>
    );
  }

  if (intrusion.type === 'false_memory') {
    return (
      <div className={styles.whisper} aria-hidden>
        {intrusion.resolvedText}
      </div>
    );
  }

  if (intrusion.type === 'static_burst') {
    return <div className={styles.staticBurst} aria-hidden />;
  }

  return null;
};
