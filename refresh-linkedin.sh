#!/bin/bash
# Quick LinkedIn token refresh — run this every 60 days
# Usage: ./refresh-linkedin.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SECRET_FILE="$SCRIPT_DIR/.linkedin-secret"

# Check if client secret is saved
if [ ! -f "$SECRET_FILE" ]; then
  echo "First run — enter your LinkedIn Client Secret (from Auth tab):"
  read -s CLIENT_SECRET_INPUT
  echo "$CLIENT_SECRET_INPUT" > "$SECRET_FILE"
  chmod 600 "$SECRET_FILE"
  echo "Saved. You won't need to enter it again."
fi

CLIENT_SECRET=$(cat "$SECRET_FILE")

echo "🔐 Starting LinkedIn OAuth refresh..."
echo "   Your browser will open — click Allow."
echo ""

node /tmp/linkedin-oauth.mjs "$CLIENT_SECRET" 2>/dev/null

if [ $? -ne 0 ]; then
  # Script might not be in /tmp, copy it
  echo "Setting up OAuth script..."
  cp "$SCRIPT_DIR/.github/scripts/linkedin-oauth-local.mjs" /tmp/linkedin-oauth.mjs 2>/dev/null
  node /tmp/linkedin-oauth.mjs "$CLIENT_SECRET"
fi

echo ""
echo "📋 Now copy the LINKEDIN_ACCESS_TOKEN value above and run:"
echo "   echo 'PASTE_TOKEN_HERE' | gh secret set LINKEDIN_ACCESS_TOKEN"
echo ""
