import { useEffect, useMemo, useRef, useState } from 'react';
import { GameEngine } from '../../engine/GameEngine';
import { StoryParser } from '../../engine/StoryParser';
import { MiraEngine } from '../../engine/MiraEngine';
import { allStoryNodes } from '../../story';
import type {
  GameStateSnapshot,
  StoryNode,
  EndingId,
} from '../../story/nodes.types';
import type { Intrusion } from '../../engine/MiraEngine';

interface UseGameEngineOpts {
  playerName: string;
  runNumber: number;
  startNodeId?: string;
  onEnding?: (id: EndingId) => void;
}

export function useGameEngine(opts: UseGameEngineOpts) {
  const engineRef = useRef<GameEngine | null>(null);
  const miraRef = useRef<MiraEngine | null>(null);

  const [snapshot, setSnapshot] = useState<GameStateSnapshot | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [intrusion, setIntrusion] = useState<Intrusion | null>(null);

  // Init once.
  useEffect(() => {
    const engine = new GameEngine({
      playerName: opts.playerName,
      runNumber: opts.runNumber,
    });
    const mira = new MiraEngine(opts.playerName);

    const parser = new StoryParser();
    const { valid, errors } = parser.parse(allStoryNodes);
    if (errors.length) console.warn('[StoryParser]', errors);
    engine.registerNodes(valid);

    engine.on('nodeEnter', (node) => {
      setCurrentNode(node);
      mira.setProtected(!!node.protectedFromMira);
      mira.reactToNode(node.miraReaction ?? 'none', engine.getState());

      // Forward countdown trigger to main process for Ending C.
      if (node.countdownActive) {
        window.signalNull?.setCountdownActive(true);
      }

      if (node.type === 'ending_trigger' && node.id === 'node_ending_router') {
        const ending = engine.evaluateEnding();
        opts.onEnding?.(ending);
      }
    });

    engine.on('choiceMade', (record) => {
      mira.analyzeChoice(record, engine.getState());
    });

    engine.on('snapshot', (s) => {
      setSnapshot({ ...s });
      // Persist after each meaningful update.
      window.signalNull?.saveSave?.(s).catch(() => {/* */});
    });

    mira.on('intrusion', (i) => setIntrusion(i));

    engineRef.current = engine;
    miraRef.current = mira;

    // Either restore the save or start fresh.
    (async () => {
      const save = await window.signalNull?.loadSave?.();
      if (save && save.currentNodeId && save.runNumber === opts.runNumber) {
        engine.restore(save);
        engine.enterNode(save.currentNodeId);
      } else if (opts.startNodeId) {
        engine.start();
        if (opts.startNodeId !== 'node_c01_boot') {
          engine.enterNode(opts.startNodeId);
        }
      } else {
        engine.start();
      }
    })();

    return () => {
      engine.clear();
      mira.clear();
    };
  // We intentionally only init once per mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useMemo(
    () => ({
      makeChoice: (id: string) => engineRef.current?.makeChoice(id),
      triggerPassive: () => engineRef.current?.triggerPassive(),
      advance: () => engineRef.current?.advance(),
      getDisplayText: (node: StoryNode) =>
        engineRef.current?.getDisplayText(node) ?? node.text,
      clearIntrusion: () => setIntrusion(null),
    }),
    [],
  );

  return { snapshot, currentNode, intrusion, ...api };
}
