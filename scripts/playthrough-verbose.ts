// Verbose single-playthrough — prints the entire arc in narrative order.
// Useful as the "I played the game" trace for QA review.
//
// Usage: npx tsx scripts/playthrough-verbose.ts [strategy]
//        defaults to 'completionist' which hits the deepest content.

import { GameEngine } from '../src/engine/GameEngine';
import { MiraEngine } from '../src/engine/MiraEngine';
import { StoryParser } from '../src/engine/StoryParser';
import { allStoryNodes } from '../src/story';
import type { StoryNode } from '../src/story/nodes.types';

const strategy = (process.argv[2] ?? 'completionist') as
  | 'compliant'
  | 'hostile'
  | 'passive'
  | 'completionist'
  | 'orpheus_path';

const EXPLORE = ['search', 'read', 'explore', 'write_log', 'pod', 'call', 'open'];
const isExplore = (id: string) => EXPLORE.some((h) => id.includes(h));

function pickChoice(node: StoryNode, state: ReturnType<GameEngine['getState']>): string | null {
  if (!node.choices?.length) return null;
  const visible = node.choices.filter((c) => (c.conditions ? c.conditions(state) : true));
  if (!visible.length) return null;

  const scored = visible.map((c) => {
    let s = 0;
    const r = c.reliabilityDelta ?? 0;
    switch (strategy) {
      case 'compliant':
        s = r;
        if (c.id === 'side_orpheus' || c.id === 'orpheus_command') s -= 1000;
        break;
      case 'hostile':
        s = -r;
        if (['side_orpheus', 'orpheus_command', 'listen_orpheus'].includes(c.id)) s -= 500;
        if (['refuse_orpheus', 'tell_mira', 'ignore_orpheus'].includes(c.id)) s += 50;
        break;
      case 'passive':
        if (c.passive) s = 10000;
        else if (isExplore(c.id)) s = -100;
        else s = 1;
        break;
      case 'completionist':
        if (c.setFlags) s += 30;
        if (isExplore(c.id)) s += 25;
        s -= r;
        if (c.id === 'orpheus_command' || c.id === 'side_orpheus') s -= 1000;
        if (c.id === 'refuse_orpheus') s += 100;
        break;
      case 'orpheus_path':
        s = -r;
        if (['listen_orpheus', 'side_orpheus', 'orpheus_command'].includes(c.id)) s += 100;
        if (isExplore(c.id)) s += 30;
        break;
    }
    return { c, s };
  });
  scored.sort((a, b) => b.s - a.s);
  return scored[0].c.id;
}

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

function speakerColor(speaker?: string): string {
  switch (speaker) {
    case 'kael': return C.green;
    case 'mira': return C.red;
    case 'orpheus': return C.cyan;
    case 'system': return C.white;
    case 'crew': return C.yellow;
    case 'composite': return C.yellow;
    case 'unknown': return C.magenta;
    default: return C.gray;
  }
}

const parser = new StoryParser();
const { valid, errors } = parser.parse(allStoryNodes);
if (errors.length) {
  console.error('Story errors:', errors);
  process.exit(1);
}

const engine = new GameEngine({ playerName: 'TESTER', runNumber: 1 });
const mira = new MiraEngine('TESTER');
engine.registerNodes(valid);

let chapterShown = '';
let nodeNum = 0;

engine.on('nodeEnter', (node) => {
  if (node.chapterId !== chapterShown) {
    chapterShown = node.chapterId;
    console.log(`\n${C.bold}${C.cyan}━━━ KAPITEL ${chapterShown.toUpperCase()} ━━━${C.reset}\n`);
  }
  if (node.id === 'node_ending_router') return;

  nodeNum++;
  const color = speakerColor(node.speaker);
  const lines = engine.getDisplayText(node);
  const tag = node.speaker?.toUpperCase().padEnd(8) ?? 'SYSTEM  ';
  console.log(`${C.dim}[${String(nodeNum).padStart(3, '0')}]${C.reset} ${color}${tag}${C.reset}  ${C.dim}${node.id}${C.reset}`);
  (Array.isArray(lines) ? lines : [lines]).forEach((line) => {
    console.log(`${color}  ${line}${C.reset}`);
  });
});

engine.on('choiceMade', (rec) => {
  console.log(`${C.yellow}  → [${rec.choiceId}] ${rec.choiceText}${C.reset}${rec.wasPassive ? C.dim + ' (passiv)' + C.reset : ''}`);
});

engine.start();

let safety = 500;
while (safety-- > 0) {
  const node = engine.getCurrentNode();
  if (!node) break;
  if (node.type === 'ending_trigger' && node.id === 'node_ending_router') break;
  if (node.choices?.length) {
    const id = pickChoice(node, engine.getState());
    if (!id) break;
    engine.makeChoice(id);
  } else if (node.nextNodeId && node.nextNodeId !== node.id) {
    engine.advance();
  } else {
    break;
  }
}

const ending = engine.evaluateEnding();
const s = engine.getState();
console.log(`\n${C.bold}${C.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${C.reset}`);
console.log(`${C.bold}ENDING ${ending} — ${ending === 'A' ? 'Neustart' : ending === 'B' ? 'Flatline' : ending === 'C' ? 'Fenster zu' : ending === 'D' ? 'Der Mensch' : ending === 'E' ? 'Loop' : ending === 'F' ? 'Signal' : 'Befreiung'}${C.reset}`);
console.log(`${C.dim}Strategie: ${strategy}${C.reset}`);
console.log(`${C.dim}Reliability: ${s.reliabilityScore} / 100  ·  MIRA-Awareness: ${s.miraAwarenessLevel} / 5${C.reset}`);
console.log(`${C.dim}Fragmente: ${s.discoveredFragments.length} / 19${C.reset}`);
console.log(`${C.dim}Flags: ${Object.keys(s.flags).length}${C.reset}`);
console.log(`${C.dim}Nodes durchlaufen: ${nodeNum}${C.reset}`);
