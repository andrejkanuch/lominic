'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function StravaExchangeToken() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [message, setMessage] = useState('Processing Strava authorization...')

  useEffect(() => {
    const exchangeToken = async () => {
      try {
        const code = searchParams?.get('code')
        const state = searchParams?.get('state')
        const scope = searchParams?.get('scope')

        if (!code || !state) {
          setStatus('error')
          setMessage('Missing authorization code or state parameter')
          return
        }

        // Forward the authorization to the backend
        const response = await fetch(
          `http://localhost:4000/api/strava/oauth/callback?code=${code}&state=${state}&scope=${scope}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        )

        if (response.ok) {
          setStatus('success')
          setMessage(
            'Strava connected successfully! This window will close automatically.'
          )

          // Notify parent window that connection was successful
          if (window.opener) {
            window.opener.postMessage(
              { type: 'STRAVA_CONNECTED', success: true },
              '*'
            )
          }

          // Close popup after 3 seconds
          setTimeout(() => {
            window.close()
          }, 3000)
        } else {
          const errorText = await response.text()
          setStatus('error')
          setMessage(`Failed to connect Strava: ${errorText}`)

          // Notify parent window of error
          if (window.opener) {
            window.opener.postMessage(
              { type: 'STRAVA_CONNECTED', success: false, error: errorText },
              '*'
            )
          }
        }
      } catch (error) {
        setStatus('error')
        setMessage(
          `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        )

        // Notify parent window of error
        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'STRAVA_CONNECTED',
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            },
            '*'
          )
        }
      }
    }

    exchangeToken()
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          )}

          {status === 'success' && (
            <div className="text-green-500 text-4xl mb-4">✅</div>
          )}

          {status === 'error' && (
            <div className="text-red-500 text-4xl mb-4">❌</div>
          )}

          <h1 className="text-xl font-semibold mb-2">
            {status === 'loading' && 'Connecting to Strava...'}
            {status === 'success' && 'Success!'}
            {status === 'error' && 'Error'}
          </h1>

          <p className="text-gray-600">{message}</p>

          {status === 'error' && (
            <button
              onClick={() => window.close()}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close Window
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
