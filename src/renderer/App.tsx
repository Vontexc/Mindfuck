import React, { useEffect, useState } from 'react';
import { BootScreen } from './screens/BootScreen';
import { GlitchMenu } from './screens/GlitchMenu';
import { GameScreen } from './screens/GameScreen';
import { EndingScreen } from './screens/EndingScreen';
import type { EndingId, GameStateSnapshot } from '../story/nodes.types';

type Screen = 'boot' | 'menu' | 'game' | 'ending';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('boot');
  const [playerName, setPlayerName] = useState<string>('KAPITÄN');
  const [runNumber, setRunNumber] = useState<number>(1);
  const [endingId, setEndingId] = useState<EndingId | null>(null);
  const [endingSnapshot, setEndingSnapshot] = useState<GameStateSnapshot | null>(null);
  const [endingCFromCold, setEndingCFromCold] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const name = await window.signalNull?.getSteamName?.();
        if (name) setPlayerName(name);
      } catch {/* dev mode without preload */}

      try {
        const c = await window.signalNull?.getEndingCFlag?.();
        if (c) setEndingCFromCold(true);
      } catch {/* */}

      try {
        const save = await window.signalNull?.loadSave?.();
        if (save) setRunNumber(save.runNumber);
      } catch {/* */}
    })();
  }, []);

  return (
    <>
      {screen === 'boot' && (
        <BootScreen
          onComplete={() => setScreen(runNumber > 1 ? 'game' : 'menu')}
          endingC={endingCFromCold}
        />
      )}
      {screen === 'menu' && (
        <GlitchMenu onStart={() => setScreen('game')} />
      )}
      {screen === 'game' && (
        <GameScreen
          playerName={playerName}
          runNumber={runNumber}
          startEndingC={endingCFromCold}
          onEnding={(id, finalSnapshot) => {
            setEndingId(id);
            setEndingSnapshot(finalSnapshot ?? null);
            setScreen('ending');
          }}
        />
      )}
      {screen === 'ending' && endingId && (
        <EndingScreen
          endingId={endingId}
          playerName={playerName}
          snapshot={endingSnapshot}
          onRestart={() => {
            setRunNumber((n) => n + 1);
            setEndingId(null);
            setEndingSnapshot(null);
            setScreen('boot');
          }}
        />
      )}
    </>
  );
};
