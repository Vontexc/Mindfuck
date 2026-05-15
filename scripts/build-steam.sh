#!/usr/bin/env bash
# Steam build pipeline — produces the depot-ready artifacts.
set -euo pipefail

echo "[1/4] Type-checking..."
npm run typecheck

echo "[2/4] Running tests..."
npm test

echo "[3/4] Building renderer & main..."
npm run build

echo "[4/4] Packaging electron application..."
npm run package

echo "Done. Artifacts in ./release/"
