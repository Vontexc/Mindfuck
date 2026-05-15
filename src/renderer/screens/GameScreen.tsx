import React, { useEffect, useState } from 'react';
import styles from './GameScreen.module.css';
import { Terminal } from '../components/Terminal';
import { ChoicePanel } from '../components/ChoicePanel';
import { GlitchLayer } from '../components/GlitchLayer';
import { MiraOverlay } from '../components/MiraOverlay';
import { EchoLog } from '../components/EchoLog';
import { useGameEngine } from '../hooks/useGameEngine';
import type { EndingId, GameStateSnapshot } from '../../story/nodes.types';

interface Props {
  playerName: string;
  runNumber: number;
  startEndingC?: boolean;
  onEnding: (id: EndingId, snapshot: GameStateSnapshot) => void;
}

export const GameScreen: React.FC<Props> = ({
  playerName,
  runNumber,
  startEndingC,
  onEnding,
}) => {
  const {
    snapshot,
    currentNode,
    intrusion,
    makeChoice,
    triggerPassive,
    advance,
    getDisplayText,
    clearIntrusion,
  } = useGameEngine({
    playerName,
    runNumber,
    startNodeId: startEndingC ? 'ending_C_intro' : undefined,
    onEnding,
  });

  const [textDone, setTextDone] = useState(false);
  const [countdownLeft, setCountdownLeft] = useState<number | null>(null);

  // Reset typewriter completion on node change.
  useEffect(() => {
    setTextDone(false);
  }, [currentNode?.id]);

  // Handle countdown nodes (Ending C trigger).
  useEffect(() => {
    if (!currentNode?.countdownActive) {
      setCountdownLeft(null);
      window.signalNull?.setCountdownActive(false);
      return;
    }
    const totalMs = currentNode.autoAdvanceMs ?? 30000;
    const startedAt = Date.now();
    setCountdownLeft(Math.ceil(totalMs / 1000));
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, totalMs - (Date.now() - startedAt));
      setCountdownLeft(Math.ceil(remaining / 1000));
      if (remaining <= 0) {
        window.clearInterval(interval);
        window.signalNull?.setCountdownActive(false);
      }
    }, 200);
    return () => {
      window.clearInterval(interval);
      window.signalNull?.setCountdownActive(false);
    };
  }, [currentNode?.id, currentNode?.countdownActive, currentNode?.autoAdvanceMs]);

  // Auto-advance non-choice nodes after their delay.
  useEffect(() => {
    if (!currentNode || !textDone) return;
    if (currentNode.choices?.length) return;
    if (!currentNode.nextNodeId) return;
    const delay = currentNode.autoAdvanceMs ?? 1500;
    const t = window.setTimeout(() => advance(), delay);
    return () => window.clearTimeout(t);
  }, [currentNode, textDone, advance]);

  if (!currentNode || !snapshot) {
    return <div className={styles.loading}>LADEN ...</div>;
  }

  const displayText = getDisplayText(currentNode);
  const glitch = currentNode.glitchIntensity ?? 0;
  const showEchoLog =
    Boolean(snapshot.flags['echo_log_unlocked']) && currentNode.chapterId === 'c04';
  const showTrueAscii =
    Boolean(currentNode.trueText) &&
    snapshot.currentLies.some((l) => l.nodeId === currentNode.id && l.revealed);

  return (
    <div className={styles.screen}>
      <Terminal
        node={currentNode}
        displayText={displayText}
        onTextComplete={() => setTextDone(true)}
        showTrueAscii={showTrueAscii}
      />

      {currentNode.choices && (
        <ChoicePanel
          choices={currentNode.choices
            .filter((c) => (c.conditions ? c.conditions(snapshot) : true))
            .map((c) => ({
              ...c,
              text: c.text.replace(/\[NAME\]/g, playerName),
            }))}
          visible={textDone}
          onSelect={makeChoice}
        />
      )}

      {countdownLeft !== null && (
        <div className={styles.countdown}>{countdownLeft.toString().padStart(2, '0')}</div>
      )}

      <GlitchLayer intensity={glitch + Math.min(0.3, snapshot.miraAwarenessLevel * 0.06)} />
      <MiraOverlay intrusion={intrusion} onDismiss={clearIntrusion} />
      <EchoLog
        visible={showEchoLog}
        playerName={playerName}
        history={snapshot.choiceHistory}
      />
    </div>
  );
};
