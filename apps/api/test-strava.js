import fetch from 'node-fetch'

// Hardcoded credentials for testing
const ACCESS_TOKEN = 'c7f75a09288d1cb61459507ce72d9bca4a7d32d9'
const REFRESH_TOKEN = '2f5e6e7e672585ca6a7a5c5cec3be2a03bb5e31e'
const CLIENT_ID = '165965'
const CLIENT_SECRET = '8f0119291cb417f21921608020f29ec51ae2bf81'

async function testStravaAPI() {
  console.log('🧪 Testing Strava API connection...\n')

  try {
    // Test 1: Get athlete profile
    console.log('1. Testing athlete profile...')
    const athleteRes = await fetch('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    })

    if (athleteRes.ok) {
      const athlete = await athleteRes.json()
      console.log('✅ Athlete profile retrieved successfully')
      console.log(`   Name: ${athlete.firstname} ${athlete.lastname}`)
      console.log(`   ID: ${athlete.id}`)
      console.log(`   Username: ${athlete.username}`)
    } else {
      console.log('❌ Failed to get athlete profile')
      console.log(`   Status: ${athleteRes.status}`)
      console.log(`   Response: ${await athleteRes.text()}`)
    }

    console.log('\n2. Testing recent activities...')
    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=5',
      {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
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

    console.log('\n3. Testing token refresh...')
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

    if (refreshRes.ok) {
      const refreshData = await refreshRes.json()
      console.log('✅ Token refresh successful')
      console.log(
        `   New access token: ${refreshData.access_token.substring(0, 20)}...`
      )
      console.log(
        `   Expires at: ${new Date(
          refreshData.expires_at * 1000
        ).toISOString()}`
      )
    } else {
      console.log('❌ Token refresh failed')
      console.log(`   Status: ${refreshRes.status}`)
      console.log(`   Response: ${await refreshRes.text()}`)
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
  }
}

testStravaAPI()
