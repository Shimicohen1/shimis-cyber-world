/**
 * One-time LinkedIn OAuth token generator.
 * Run: node linkedin-oauth.mjs
 * Opens browser → you click Allow → token is printed.
 * Delete this file after use.
 */

import http from 'http';
import { exec } from 'child_process';

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const CLIENT_SECRET = process.argv[2] || '';
const REDIRECT_URI = 'http://localhost:3000/callback';
const SCOPES = 'w_member_social,openid,profile';

if (!CLIENT_ID) {
  console.error('\n❌ Set LINKEDIN_CLIENT_ID env var first.\n');
  console.error('Example: LINKEDIN_CLIENT_ID=xxxxx node linkedin-oauth-local.mjs YOUR_SECRET\n');
  process.exit(1);
}

if (!CLIENT_SECRET) {
  console.error('\n❌ Usage: node linkedin-oauth.mjs YOUR_CLIENT_SECRET\n');
  console.error('Copy the "Primary Client Secret" from the Auth tab and pass it as argument.');
  console.error('Example: node linkedin-oauth.mjs WPL_AP1.xxxxxxxxxxxx\n');
  process.exit(1);
}

// Step 1: Start local server to catch the callback
const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const url = new URL(req.url, 'http://localhost:3000');
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Error: ${error}</h1><p>${url.searchParams.get('error_description')}</p>`);
    server.close();
    return;
  }

  if (!code) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>No code received</h1>');
    server.close();
    return;
  }

  // Step 2: Exchange code for access token
  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.access_token) {
      // Step 3: Get person URN from id_token (JWT)
      let personUrn = '';
      if (tokenData.id_token) {
        // Decode JWT payload (second part, base64url)
        const parts = tokenData.id_token.split('.');
        const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
        console.log('JWT payload:', JSON.stringify(payload));
        if (payload.sub) {
          personUrn = `urn:li:person:${payload.sub}`;
        }
      }
      if (!personUrn) {
        // Fallback: try introspection
        const introRes = await fetch('https://www.linkedin.com/oauth/v2/introspectToken', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            token: tokenData.access_token,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
          }),
        });
        if (introRes.ok) {
          const intro = await introRes.json();
          if (intro.sub) personUrn = `urn:li:person:${intro.sub}`;
        }
      }
      if (!personUrn) personUrn = 'MANUAL_LOOKUP_NEEDED';

      console.log('\n' + '='.repeat(60));
      console.log('✅ SUCCESS! Copy these to GitHub Secrets:');
      console.log('='.repeat(60));
      console.log(`\nLINKEDIN_ACCESS_TOKEN:\n${tokenData.access_token}`);
      console.log(`\nLINKEDIN_PERSON_URN:\n${personUrn}`);
      console.log(`\nToken expires in: ${Math.round(tokenData.expires_in / 86400)} days`);
      console.log('='.repeat(60) + '\n');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <html><body style="font-family:sans-serif;max-width:600px;margin:50px auto;text-align:center">
        <h1>✅ Token Obtained!</h1>
        <p>Check your terminal for the values to copy to GitHub Secrets.</p>
        <p>You can close this tab.</p>
        </body></html>
      `);
    } else {
      console.error('❌ Token error:', tokenData);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre>`);
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`<h1>Error</h1><pre>${err.message}</pre>`);
  }

  setTimeout(() => server.close(), 1000);
});

server.listen(3000, () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  
  console.log('\n🔐 Opening LinkedIn authorization in your browser...\n');
  console.log(`If it doesn't open, go to:\n${authUrl}\n`);
  
  exec(`open "${authUrl}"`);
});
