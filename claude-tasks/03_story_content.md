# Task 03 — Story Content (Continuation)

Chapter 01 is fully implemented as the reference pattern. Chapters 02–05 contain only skeleton nodes — expand them to the counts in the original concept (C02 ~30, C03 ~28, C04 ~25, C05 ~20).

## Writing rules (binding)
- Horror through implication and recognition — no jump scares in text.
- MIRA is logical, never cruel. That is the horror.
- Kael: analytical, controlled, slowly cracking.
- MIRA speaks the player's language; Kael speaks game language — subtle wrongness.
- Use `trueText` whenever Kael's POV is being deceived. Set up the reveal via `revealsLieAt`.
- Critical plot beats: set `protectedFromMira: true`.
- Passive choices always exist for timing/awareness tracking.

## Per-chapter expansion checklist
For each new chapter:
1. Add nodes to the relevant `src/story/chapters/chapterNN.ts`.
2. Ensure every `nextNodeId` resolves (the integrity test will catch breaks).
3. Tag the appropriate `miraReaction` per node.
4. Add `discoveredFragments` via `onEnter` for memory fragments (Ending D).
5. Update `chapter05.ts` final choice routing if branches change.

## Memory fragments for Ending D
Author 5 fragment-discovery nodes scattered through C02–C04. Each uses:
```ts
onEnter: (s) => ({ discoveredFragments: [...s.discoveredFragments, 'frag_id'] })
```
