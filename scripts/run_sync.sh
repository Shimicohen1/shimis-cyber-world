#!/bin/bash
# SCW Vault Sync wrapper
# Run manually: bash scripts/run_sync.sh (from repo root)

export PATH="/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."
/usr/bin/python3 scripts/sync_vault.py
