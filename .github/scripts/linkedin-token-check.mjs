/**
 * LinkedIn Token Expiry Checker
 * 
 * Runs daily after the LinkedIn post. Checks token expiry via introspection.
 * Sends a Brevo email alert 7 days before expiry.
 * 
 * Required env: LINKEDIN_ACCESS_TOKEN, LINKEDIN_CLIENT_ID,
 *               LINKEDIN_CLIENT_SECRET, BREVO_API_KEY
 */

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const BREVO_KEY = process.env.BREVO_API_KEY;
const ALERT_EMAIL = 'shimicyberworld@gmail.com';
const ALERT_DAYS = 7;

async function main() {
  if (!TOKEN || !CLIENT_ID || !CLIENT_SECRET) {
    console.log('ℹ️  Token check skipped — missing LinkedIn client credentials.');
    return;
  }

  // Introspect token
  const res = await fetch('https://www.linkedin.com/oauth/v2/introspectToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      token: TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    console.log('⚠️  Token introspection failed:', res.status);
    return;
  }

  const data = await res.json();

  if (!data.active) {
    console.log('❌ Token is EXPIRED! Sending alert...');
    await sendAlert(0);
    return;
  }

  const expiresAt = new Date(data.expires_at * 1000);
  const now = new Date();
  const daysLeft = Math.floor((expiresAt - now) / (1000 * 60 * 60 * 24));

  console.log(`🔑 Token expires: ${expiresAt.toISOString()} (${daysLeft} days left)`);

  if (daysLeft <= ALERT_DAYS) {
    console.log(`⚠️  Token expiring in ${daysLeft} days — sending alert...`);
    await sendAlert(daysLeft);
  } else {
    console.log('✅ Token is healthy.');
  }
}

async function sendAlert(daysLeft) {
  if (!BREVO_KEY) {
    console.log('⚠️  No BREVO_API_KEY — cannot send email alert.');
    return;
  }

  const subject = daysLeft <= 0
    ? '🚨 SCW LinkedIn Token EXPIRED — posting stopped'
    : `⚠️ SCW LinkedIn Token expires in ${daysLeft} days`;

  const body = daysLeft <= 0
    ? `<h2>LinkedIn Token Expired</h2>
       <p>The SCW LinkedIn auto-poster has stopped working because the token expired.</p>
       <p><b>To fix:</b> Run this on your Mac:</p>
       <pre>cd ~/Documents/shimis-cyber-world && node /tmp/linkedin-oauth.mjs "YOUR_CLIENT_SECRET"</pre>
       <p>Then update the LINKEDIN_ACCESS_TOKEN secret in GitHub.</p>`
    : `<h2>LinkedIn Token Expiring Soon</h2>
       <p>Your SCW LinkedIn auto-poster token expires in <b>${daysLeft} days</b>.</p>
       <p><b>To refresh:</b> Run this on your Mac:</p>
       <pre>cd ~/Documents/shimis-cyber-world && node /tmp/linkedin-oauth.mjs "YOUR_CLIENT_SECRET"</pre>
       <p>Then update the LINKEDIN_ACCESS_TOKEN secret in GitHub.</p>
       <p>If you don't refresh, LinkedIn posting will stop automatically.</p>`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'SCW Feed Bot', email: ALERT_EMAIL },
      to: [{ email: ALERT_EMAIL }],
      subject,
      htmlContent: body,
    }),
  });

  if (res.ok) {
    console.log('📧 Alert email sent.');
  } else {
    console.log('⚠️  Failed to send alert:', res.status, await res.text());
  }
}

main().catch(err => {
  console.error('Token check error:', err.message);
  // Don't exit with error — this is non-critical
});
