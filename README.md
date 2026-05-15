# SIGNAL NULL

Ein psychologisches Text-Adventure für Steam. Electron + React + TypeScript.

> **Status**: Foundation komplett. Engine, MIRA-System, Save-System, alle 6 Ending-Skelette und Kapitel 1 ausgearbeitet. Kapitel 2–5 als Skelette vorhanden, müssen ausgebaut werden. Siehe `claude-tasks/`.

## Setup

```bash
npm install
npm run dev          # startet Electron + Vite mit HMR
npm test             # vitest — Story-Integrität + Engine-Tests
npm run typecheck    # TS strict mode
npm run package      # produktiver Build (siehe scripts/build-steam.sh)
```

## Architektur

- `src/engine/` — Pure-TS Game Engine (kein React). State Machine, MIRA, Deceived Narrator System, Ending-Routing.
- `src/story/` — Story-Content als Daten (`chapters/`, `endings/`, `mira_dialogs/`).
- `src/main/` — Electron Main: Fensterverwaltung, Steam (`greenworks`), verschlüsselte Saves, Ending-C-Hook.
- `src/renderer/` — React UI: Terminal, ChoicePanel, GlitchLayer, MiraOverlay, EchoLog.

## Kernkonzepte

- **Reliability Score** (0–100, unsichtbar): treibt MIRA-Verhalten und Ending A/B/D.
- **MIRA Awareness Level** (0–5): bestimmt, wie aggressiv MIRA in die UI eingreift.
- **DNS (Deceived Narrator System)**: Story-Nodes können `text` (Lüge) und `trueText` (Wahrheit) tragen; spätere Entscheidungen können die Wahrheit per `revealsLieAt` freischalten.
- **Ending C** wird über das `before-quit`-Event in Electron getriggert, wenn der Spieler das Fenster während des Countdowns schließt.
- **Ending F (ARG)**: lokaler Webhook auf `127.0.0.1:34917/signal?code=…` (opt-in).

## Story-Graph

```bash
npx tsx scripts/generate-story-graph.ts > docs/story-graph.md
```

## Lizenz
Privates Repository.
