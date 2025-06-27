import fetch from 'node-fetch'

// Hardcoded credentials for testing
const CLIENT_ID = '165965'
const CLIENT_SECRET = '8f0119291cb417f21921608020f29ec51ae2bf81'

async function testOAuthFlow() {
  console.log('🔐 Testing OAuth Flow with correct scope...\n')

  // Step 1: Generate authorization URL with correct scope
  const redirectUri = 'http://localhost:4000/api/strava/oauth/callback'
  const scope = 'read,activity:read_all'
  const state = 'test-user-id'

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${scope}&state=${state}`

  console.log('1. Authorization URL (visit this in browser):')
  console.log(authUrl)
  console.log("\n2. After authorization, you'll get a code parameter")
  console.log(
    '3. Use that code to exchange for tokens with activity:read_all scope'
  )

  // Note: You need to manually visit the URL and get the authorization code
  // Then use that code in the exchange below

  console.log(
    '\n4. To test with a new authorization code, update the code below:'
  )
  console.log('   const authCode = "YOUR_AUTHORIZATION_CODE_HERE";')
  console.log('   Then uncomment the token exchange code below')

  // Uncomment and update with your authorization code:
  /*
  const authCode = "YOUR_AUTHORIZATION_CODE_HERE";
  
  const tokenRes = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: authCode,
      grant_type: 'authorization_code',
    }),
  });

  if (tokenRes.ok) {
    const tokenData = await tokenRes.json();
    console.log('✅ New token with activity:read_all scope:');
    console.log(`   Access Token: ${tokenData.access_token}`);
    console.log(`   Refresh Token: ${tokenData.refresh_token}`);
    console.log(`   Expires At: ${new Date(tokenData.expires_at * 1000).toISOString()}`);
    console.log(`   Athlete ID: ${tokenData.athlete.id}`);
  } else {
    console.log('❌ Token exchange failed');
    console.log(`   Status: ${tokenRes.status}`);
    console.log(`   Response: ${await tokenRes.text()}`);
  }
  */
}

testOAuthFlow()
