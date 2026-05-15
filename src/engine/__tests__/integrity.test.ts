import { describe, it, expect } from 'vitest';
import { StoryParser } from '../StoryParser';
import { GameEngine } from '../GameEngine';
import { EndingCalculator } from '../EndingCalculator';
import { allStoryNodes } from '../../story';

describe('Story integrity', () => {
  it('parses all story nodes without errors', () => {
    const parser = new StoryParser();
    const { errors } = parser.parse(allStoryNodes);
    expect(errors).toEqual([]);
  });

  it('initial node exists', () => {
    const ids = new Set(allStoryNodes.map((n) => n.id));
    expect(ids.has('node_c01_boot')).toBe(true);
  });
});

describe('EndingCalculator', () => {
  const calc = new EndingCalculator();
  const baseState = {
    currentNodeId: '',
    chapterId: 'c05' as const,
    visitedNodes: [],
    choiceHistory: [],
    reliabilityScore: 50,
    miraAwarenessLevel: 0,
    playerName: 'TEST',
    runNumber: 1,
    discoveredFragments: [],
    currentLies: [],
    flags: {},
    timestamp: 0,
  };

  it('returns C when window closed during countdown', () => {
    expect(
      calc.calculate({ ...baseState, flags: { window_closed_during_countdown: true } }),
    ).toBe('C');
  });

  it('returns F when ARG code found', () => {
    expect(calc.calculate({ ...baseState, flags: { arg_code_found: true } })).toBe('F');
  });

  it('returns A for high reliability', () => {
    expect(calc.calculate({ ...baseState, reliabilityScore: 80 })).toBe('A');
  });

  it('returns D for fragments + low reliability', () => {
    expect(
      calc.calculate({
        ...baseState,
        discoveredFragments: ['1', '2', '3', '4', '5'],
        reliabilityScore: 20,
      }),
    ).toBe('D');
  });
});

describe('GameEngine basic flow', () => {
  it('starts and exposes initial node', () => {
    const engine = new GameEngine({ playerName: 'T', runNumber: 1 });
    engine.registerNodes(allStoryNodes);
    engine.start();
    expect(engine.getCurrentNode()?.id).toBe('node_c01_boot');
  });

  it('advances through linear nodes', () => {
    const engine = new GameEngine({ playerName: 'T', runNumber: 1 });
    engine.registerNodes(allStoryNodes);
    engine.start();
    engine.advance();
    expect(engine.getCurrentNode()?.id).toBe('node_c01_wake');
  });
});
