import fetch from 'node-fetch'

// Hardcoded credentials for testing
const CLIENT_ID = '165965'
const CLIENT_SECRET = '8f0119291cb417f21921608020f29ec51ae2bf81'
const REFRESH_TOKEN = '2f5e6e7e672585ca6a7a5c5cec3be2a03bb5e31e'

async function testRefreshedToken() {
  console.log('🔄 Testing with refreshed token...\n')

  try {
    // First, refresh the token
    console.log('1. Refreshing token...')
    const refreshRes = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    })

    if (!refreshRes.ok) {
      console.log('❌ Token refresh failed')
      console.log(`   Status: ${refreshRes.status}`)
      console.log(`   Response: ${await refreshRes.text()}`)
      return
    }

    const refreshData = await refreshRes.json()
    const newAccessToken = refreshData.access_token
    console.log('✅ Token refreshed successfully')
    console.log(`   New access token: ${newAccessToken.substring(0, 20)}...`)
    console.log(
      `   Expires at: ${new Date(refreshData.expires_at * 1000).toISOString()}`
    )

    // Test activities with new token
    console.log('\n2. Testing activities with refreshed token...')
    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=5',
      {
        headers: { Authorization: `Bearer ${newAccessToken}` },
      }
    )

    if (activitiesRes.ok) {
      const activities = await activitiesRes.json()
      console.log(`✅ Retrieved ${activities.length} activities`)
      activities.forEach((activity, index) => {
        console.log(
          `   ${index + 1}. ${activity.name} - ${Math.round(
            activity.distance / 1000
          )}km`
        )
      })
    } else {
      console.log('❌ Failed to get activities')
      console.log(`   Status: ${activitiesRes.status}`)
      console.log(`   Response: ${await activitiesRes.text()}`)
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
  }
}

testRefreshedToken()
