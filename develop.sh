#!/bin/bash

set -e

echo "[Step] Generating routes.."
pnpm run gen:routes

echo "[Step] Generating styles.."
pnpm run gen:styles

echo "[Step] Starting.."
npx vite
