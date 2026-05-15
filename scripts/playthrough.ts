// Playthrough simulator. Walks the GameEngine through a deterministic path
// per scenario and validates that all transitions resolve cleanly.
//
// Run with:  npx tsx scripts/playthrough.ts
//
// Tests several distinct paths:
//   1. Compliant route — high reliability → Ending A
//   2. Hostile route   — sided with ORPHEUS → Ending G
//   3. Passive route   — wait everywhere   → Ending E or B
//   4. Completionist   — visits all optional branches, low rapport → Ending D
//   5. Ending C path   — flag set externally via flags

import { GameEngine } from '../src/engine/GameEngine';
import { MiraEngine } from '../src/engine/MiraEngine';
import { StoryParser } from '../src/engine/StoryParser';
import { allStoryNodes } from '../src/story';
import type {
  EndingId,
  GameStateSnapshot,
  StoryNode,
} from '../src/story/nodes.types';

const NODE_VISIT_LIMIT = 400;

type ChoiceStrategy =
  | 'compliant'        // pick highest reliabilityDelta choice
  | 'hostile'          // pick lowest reliabilityDelta (most adversarial)
  | 'passive'          // pick the passive option, else first
  | 'completionist'    // prefer choices that reveal fragments / open branches
  | 'orpheus_path';    // hostile + listens to orpheus + opens all archives

interface RunResult {
  strategy: ChoiceStrategy;
  visitedCount: number;
  uniqueNodeCount: number;
  finalEnding: EndingId | 'TIMEOUT' | 'STUCK';
  reliabilityScore: number;
  miraAwarenessLevel: number;
  discoveredFragments: string[];
  flags: Record<string, boolean>;
  trace: string[];
  warnings: string[];
}

const ORPHEUS_ALIGN = new Set([
  'listen_orpheus',
  'side_orpheus',
  'orpheus_command',
  'explore',
  'tell_mira', // refuses ORPHEUS — reverse-flag for hostile/orpheus strategies
]);

const EXPLORE_CHOICE_HINTS = ['search', 'read', 'explore', 'write_log', 'pod', 'call', 'open'];

function isExploreChoice(id: string): boolean {
  return EXPLORE_CHOICE_HINTS.some((h) => id.includes(h));
}

function pickChoice(
  node: StoryNode,
  strategy: ChoiceStrategy,
  state: GameStateSnapshot,
): string | null {
  if (!node.choices || node.choices.length === 0) return null;
  const visible = node.choices.filter((c) =>
    c.conditions ? c.conditions(state) : true,
  );
  if (visible.length === 0) return null;

  const scored = visible.map((c) => {
    let score = 0;
    const rel = c.reliabilityDelta ?? 0;
    switch (strategy) {
      case 'compliant':
        // Always lean cooperative; never side with ORPHEUS.
        score = rel;
        if (c.id === 'side_orpheus' || c.id === 'orpheus_command') score -= 1000;
        break;
      case 'hostile':
        // Defiant but does NOT join ORPHEUS — refuses both AIs.
        score = -rel;
        if (c.id === 'side_orpheus' || c.id === 'orpheus_command' || c.id === 'listen_orpheus') {
          score -= 500;
        }
        if (c.id === 'refuse_orpheus' || c.id === 'tell_mira' || c.id === 'ignore_orpheus') {
          score += 50;
        }
        break;
      case 'passive':
        // Strictly passive — explicit passive marker wins, otherwise the
        // last option (typically least-effort) and never an explore branch.
        if (c.passive) score = 10000;
        else if (isExploreChoice(c.id)) score = -100;
        else score = 1; // reach last via index tiebreak
        break;
      case 'completionist':
        // Collect everything, but refuse ORPHEUS' final command.
        if (c.setFlags) score += 30;
        if (isExploreChoice(c.id)) score += 25;
        score -= rel; // bias hostile for low reliability → ending D
        if (c.id === 'orpheus_command' || c.id === 'side_orpheus') score -= 1000;
        if (c.id === 'refuse_orpheus') score += 100;
        break;
      case 'orpheus_path':
        score = -rel;
        if (ORPHEUS_ALIGN.has(c.id)) score += 100;
        if (isExploreChoice(c.id)) score += 30;
        if (c.id === 'tell_mira' || c.id === 'refuse_orpheus' || c.id === 'ignore_orpheus') {
          score -= 500;
        }
        break;
    }
    return { c, score };
  });

  // Stable tie-break by reverse index (favors the LATER option for "passive").
  if (strategy === 'passive') {
    return scored
      .map((s, i) => ({ ...s, idx: i }))
      .sort((a, b) => b.score - a.score || b.idx - a.idx)[0].c.id;
  }
  scored.sort((a, b) => b.score - a.score);
  return scored[0].c.id;
}

function runStrategy(strategy: ChoiceStrategy): RunResult {
  const warnings: string[] = [];
  const trace: string[] = [];

  const parser = new StoryParser();
  const { valid, errors } = parser.parse(allStoryNodes);
  errors.forEach((e) => warnings.push(`PARSE: ${e}`));

  const engine = new GameEngine({ playerName: 'TESTER', runNumber: 1 });
  const mira = new MiraEngine('TESTER');
  engine.registerNodes(valid);

  let finalEnding: RunResult['finalEnding'] = 'TIMEOUT';
  let visited = 0;
  const uniq = new Set<string>();
  let stalledOn: string | null = null;
  let lastChoiceNode: string | null = null;

  engine.on('nodeEnter', (node) => {
    uniq.add(node.id);
    visited++;
    mira.setProtected(!!node.protectedFromMira);
    mira.reactToNode(node.miraReaction ?? 'none', engine.getState());

    if (visited > NODE_VISIT_LIMIT) return;

    if (node.type === 'ending_trigger' && node.id === 'node_ending_router') {
      finalEnding = engine.evaluateEnding();
      trace.push(`[ROUTE] → ENDING ${finalEnding}`);
      return;
    }

    trace.push(`[${node.id}] ${(Array.isArray(node.text) ? node.text[0] : node.text)?.slice(0, 60) ?? ''}`);

    setTimeout(() => {}, 0); // queue microtask — but we'll act synchronously
  });

  engine.on('choiceMade', (rec) => {
    mira.analyzeChoice(rec, engine.getState());
    trace.push(`  → CHOICE: ${rec.choiceId} (${rec.choiceText.slice(0, 50)})`);
  });

  engine.start();

  // Drive the engine until ending or stuck.
  let safety = NODE_VISIT_LIMIT;
  while (safety-- > 0) {
    const node = engine.getCurrentNode();
    if (!node) {
      warnings.push('Engine returned undefined current node');
      finalEnding = 'STUCK';
      break;
    }

    if (node.type === 'ending_trigger' && node.id === 'node_ending_router') {
      // already routed by event handler
      break;
    }

    if (node.choices && node.choices.length > 0) {
      const choiceId = pickChoice(node, strategy, engine.getState());
      if (!choiceId) {
        warnings.push(`No selectable choice at ${node.id}`);
        finalEnding = 'STUCK';
        break;
      }
      if (lastChoiceNode === node.id && stalledOn === choiceId) {
        warnings.push(`Stalled at ${node.id}`);
        finalEnding = 'STUCK';
        break;
      }
      lastChoiceNode = node.id;
      stalledOn = choiceId;
      engine.makeChoice(choiceId);
    } else if (node.nextNodeId && node.nextNodeId !== node.id) {
      engine.advance();
    } else {
      // self-loop ending or terminal node — final state
      if (node.forcesEnding) finalEnding = node.forcesEnding;
      break;
    }
  }

  if (safety <= 0) warnings.push('Iteration limit hit');

  const state = engine.getState();
  return {
    strategy,
    visitedCount: visited,
    uniqueNodeCount: uniq.size,
    finalEnding,
    reliabilityScore: state.reliabilityScore,
    miraAwarenessLevel: state.miraAwarenessLevel,
    discoveredFragments: state.discoveredFragments,
    flags: state.flags,
    trace,
    warnings,
  };
}

function summarize(result: RunResult): void {
  console.log('━'.repeat(72));
  console.log(`STRATEGIE: ${result.strategy}`);
  console.log('━'.repeat(72));
  console.log(`  ENDING ............ ${result.finalEnding}`);
  console.log(`  Reliability ....... ${result.reliabilityScore}`);
  console.log(`  MIRA Awareness .... ${result.miraAwarenessLevel}`);
  console.log(`  Nodes visited ..... ${result.visitedCount}`);
  console.log(`  Unique nodes ...... ${result.uniqueNodeCount}`);
  console.log(`  Fragments (${result.discoveredFragments.length}) .. ${result.discoveredFragments.join(', ') || '—'}`);
  console.log(`  Flags (${Object.keys(result.flags).length}) ...... ${Object.keys(result.flags).join(', ') || '—'}`);
  if (result.warnings.length) {
    console.log('  ⚠ Warnings:');
    result.warnings.forEach((w) => console.log(`     - ${w}`));
  }
  console.log('');
}

const strategies: ChoiceStrategy[] = [
  'compliant',
  'hostile',
  'passive',
  'completionist',
  'orpheus_path',
];

const results = strategies.map(runStrategy);

console.log('\n╔════════════════════════════════════════════════════════════════════════╗');
console.log('║              SIGNAL NULL — PLAYTHROUGH SIMULATOR                        ║');
console.log('╚════════════════════════════════════════════════════════════════════════╝\n');

results.forEach(summarize);

const allEndings = new Set(results.map((r) => r.finalEnding));
console.log('━'.repeat(72));
console.log(`Reached endings:    ${[...allEndings].join(', ')}`);
console.log(`Total warnings:     ${results.reduce((n, r) => n + r.warnings.length, 0)}`);
console.log('━'.repeat(72));

const anyStuck = results.some((r) => r.finalEnding === 'STUCK' || r.finalEnding === 'TIMEOUT');
if (anyStuck) {
  console.error('\n❌ One or more playthroughs failed to reach an ending.');
  process.exit(1);
}
console.log('\n✅ All playthrough strategies reached a valid ending.');
