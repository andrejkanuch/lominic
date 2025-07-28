import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/client?error=garmin_auth_failed&message=${error}`, request.url)
    )
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/client?error=missing_params', request.url)
    )
  }

  try {
    // Call your API to exchange the code for tokens
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const baseUrl = apiBase.replace(/\/graphql$/, '')

    console.log(
      'Making token exchange request to:',
      `${baseUrl}/api/garmin/exchange-token`
    )

    const response = await fetch(`${baseUrl}/api/garmin/exchange-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, state }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Token exchange failed:', response.status, errorText)
      throw new Error(
        `Token exchange failed: ${response.status} - ${errorText}`
      )
    }

    const result = await response.json()
    console.log('Token exchange successful:', result)

    // Send success message to parent window and close popup
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Garmin Connected</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .container {
              text-align: center;
              background: rgba(255,255,255,0.1);
              padding: 2rem;
              border-radius: 1rem;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }
            .success-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            h1 { margin: 0 0 1rem 0; font-weight: 600; }
            p { margin: 0; opacity: 0.9; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✅</div>
            <h1>Successfully Connected!</h1>
            <p>Your Garmin account has been linked to Lominic.</p>
            <p>This window will close automatically...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GARMIN_OAUTH_SUCCESS' }, '*');
              setTimeout(() => window.close(), 2000);
            } else {
              window.location.href = '/client?success=garmin_connected';
            }
          </script>
        </body>
      </html>
    `
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (error) {
    console.error('Garmin OAuth callback error:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connection Failed</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
              color: white;
            }
            .container {
              text-align: center;
              background: rgba(255,255,255,0.1);
              padding: 2rem;
              border-radius: 1rem;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0,0,0,0.1);
              max-width: 400px;
            }
            .error-icon {
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            h1 { margin: 0 0 1rem 0; font-weight: 600; }
            p { margin: 0 0 0.5rem 0; opacity: 0.9; }
            .error-details {
              background: rgba(0,0,0,0.2);
              padding: 1rem;
              border-radius: 0.5rem;
              margin: 1rem 0;
              font-size: 0.9rem;
              word-break: break-word;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">❌</div>
            <h1>Connection Failed</h1>
            <p>We couldn't connect your Garmin account.</p>
            <div class="error-details">
              ${errorMessage.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
            <p>This window will close automatically...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'GARMIN_OAUTH_ERROR',
                message: '${errorMessage.replace(/'/g, "\\'")}'
              }, '*');
              setTimeout(() => window.close(), 3000);
            } else {
              window.location.href = '/client?error=garmin_auth_failed';
            }
          </script>
        </body>
      </html>
    `
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  }
}
