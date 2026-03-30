#!/bin/bash
# SCW Vault Sync wrapper — launched by macOS LaunchAgent
# Grant Full Disk Access to /bin/bash in System Settings > Privacy if needed

export PATH="/usr/local/bin:/usr/bin:/bin:/opt/homebrew/bin"
export HOME="$HOME"

cd REPO_DIR
/usr/bin/python3 scripts/sync_vault.py
