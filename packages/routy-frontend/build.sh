#!/bin/bash

set -e

echo "[Step] Generating routes.."
pnpm run gen:routes

echo "[Step] Generating styles.."
pnpm run gen:styles

echo "[Step] Compiling.."
tsc

echo "[Step] Builing.."
npx vite build

echo "[Step] Build successful"
