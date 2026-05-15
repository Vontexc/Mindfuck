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
import { debounce } from '../../utils/debounce';

interface UseGameEngineOpts {
  playerName: string;
  runNumber: number;
  startNodeId?: string;
  onEnding?: (id: EndingId, snapshot: GameStateSnapshot) => void;
}

export function useGameEngine(opts: UseGameEngineOpts) {
  const engineRef = useRef<GameEngine | null>(null);
  const miraRef = useRef<MiraEngine | null>(null);
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const [snapshot, setSnapshot] = useState<GameStateSnapshot | null>(null);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [intrusion, setIntrusion] = useState<Intrusion | null>(null);

  useEffect(() => {
    const engine = new GameEngine({
      playerName: optsRef.current.playerName,
      runNumber: optsRef.current.runNumber,
    });
    const mira = new MiraEngine(optsRef.current.playerName);

    // Validate story on construction — surface broken refs in dev console.
    const parser = new StoryParser();
    const { valid, errors } = parser.parse(allStoryNodes);
    if (errors.length && import.meta.env?.DEV) {
      console.error('[StoryParser] structural errors:', errors);
    }
    engine.registerNodes(valid);

    // Debounced save — coalesce rapid snapshot bursts (typewriter, fragment
    // additions, MIRA awareness ticks) into a single disk write.
    const persist = debounce((s: GameStateSnapshot) => {
      window.signalNull?.saveSave?.(s).catch(() => {/* ignore */});
    }, 500);

    const offEnter = engine.on('nodeEnter', (node) => {
      setCurrentNode(node);
      mira.setProtected(!!node.protectedFromMira);
      mira.reactToNode(node.miraReaction ?? 'none', engine.getState());

      if (node.countdownActive) {
        window.signalNull?.setCountdownActive(true);
      }

      if (node.type === 'ending_trigger' && node.id === 'node_ending_router') {
        const ending = engine.evaluateEnding();
        optsRef.current.onEnding?.(ending, engine.getState());
      }
    });

    const offChoice = engine.on('choiceMade', (record) => {
      mira.analyzeChoice(record, engine.getState());
    });

    const offSnapshot = engine.on('snapshot', (s) => {
      setSnapshot({ ...s });
      persist(s);
    });

    const offIntrusion = mira.on('intrusion', (i) => setIntrusion(i));

    engineRef.current = engine;
    miraRef.current = mira;

    // Boot the engine — either restore the save (matching run number) or
    // start fresh at the configured start node.
    (async () => {
      const save = await window.signalNull?.loadSave?.().catch(() => null);
      if (
        save &&
        save.currentNodeId &&
        save.runNumber === optsRef.current.runNumber
      ) {
        engine.restore(save);
        engine.enterNode(save.currentNodeId);
        return;
      }
      engine.start();
      const startAt = optsRef.current.startNodeId;
      if (startAt && startAt !== 'node_c01_boot') {
        engine.enterNode(startAt);
      }
    })();

    return () => {
      offEnter();
      offChoice();
      offSnapshot();
      offIntrusion();
      persist.flush();
      engine.clear();
      mira.clear();
    };
    // Intentionally init-once per mount; opts are tracked through optsRef.
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
