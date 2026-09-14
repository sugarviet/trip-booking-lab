#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
# Prefer a compatible Node on PATH; use the bundled runtime on this machine otherwise.
if ! node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>22||(a===22&&b>=12)?0:1)' 2>/dev/null; then
  runtime=/home/sugarviet/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin
  if [ ! -x "$runtime/node" ]; then
    echo 'Please install Node 24 (see .nvmrc).' >&2
    exit 1
  fi
  export PATH="$runtime:$PATH"
fi
exec npm "$@"
