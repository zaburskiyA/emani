#!/usr/bin/env bash
set -euo pipefail

REMOTE="${1:-production}"
BRANCH="${2:-main}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Run this script from inside a git repository." >&2
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "Git remote '$REMOTE' was not found." >&2
  echo "Add it with:" >&2
  echo "  git remote add $REMOTE root@5.42.123.97:/opt/emani.git" >&2
  exit 1
fi

echo "Deploying branch '$BRANCH' to remote '$REMOTE'..."
git push "$REMOTE" "$BRANCH:$BRANCH"

echo "Done. The server hook is building and publishing the site automatically."
