import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  IsGarminConnectedDocument,
  GetGarminAuthUrlDocument,
  GetGarminAccountDocument,
  DisconnectGarminAccountDocument,
  GetGarminAccountQuery,
} from '../generated/graphql'

interface GarminAuthState {
  isConnected: boolean
  isConnecting: boolean
  isLoading: boolean
  error: string | null
  account: GetGarminAccountQuery['getGarminAccount'] | null
}

export function useGarminAuth() {
  const [state, setState] = useState<GarminAuthState>({
    isConnected: false,
    isConnecting: false,
    isLoading: true,
    error: null,
    account: null,
  })

  // Queries
  const {
    data: connectionData,
    loading: connectionLoading,
    refetch: refetchConnection,
    error: connectionError,
  } = useQuery(IsGarminConnectedDocument)

  const {
    data: authUrlData,
    loading: authUrlLoading,
    error: authUrlError,
  } = useQuery(GetGarminAuthUrlDocument, {
    skip: connectionData?.isGarminConnected !== false,
  })

  const {
    data: accountData,
    loading: accountLoading,
    error: accountError,
  } = useQuery(GetGarminAccountDocument, {
    skip: !connectionData?.isGarminConnected,
  })

  // Mutations
  const [disconnectGarmin] = useMutation(DisconnectGarminAccountDocument)

  // Update state when data changes
  useEffect(() => {
    const isConnected = connectionData?.isGarminConnected || false
    const account = accountData?.getGarminAccount || null
    const isLoading = connectionLoading || (isConnected && accountLoading)
    const error =
      connectionError?.message ||
      authUrlError?.message ||
      accountError?.message ||
      null

    setState(prev => ({
      ...prev,
      isConnected,
      isLoading,
      error,
      account,
    }))
  }, [
    connectionData,
    accountData,
    connectionLoading,
    accountLoading,
    connectionError,
    authUrlError,
    accountError,
  ])

  // Handle OAuth popup
  const handleConnect = useCallback(async () => {
    const authUrl = authUrlData?.getGarminAuthUrl
    if (!authUrl) {
      setState(prev => ({ ...prev, error: 'Authorization URL not available' }))
      return
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      // Open popup for Garmin OAuth
      const popup = window.open(
        authUrl,
        'garmin-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes,status=yes'
      )

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site.')
      }

      // Listen for messages from popup
      const handleMessage = async (event: MessageEvent) => {
        if (event.data.type === 'GARMIN_OAUTH_SUCCESS') {
          console.log('Garmin OAuth success message received:', event.data)

          try {
            // Exchange the code for tokens using REST API
            const apiBase =
              process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
            // Remove /graphql suffix if present
            const baseUrl = apiBase.replace(/\/graphql$/, '')

            const response = await fetch(
              `${baseUrl}/api/garmin/exchange-token`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem(
                    'access_token'
                  )}`,
                },
                body: JSON.stringify({
                  code: event.data.code,
                  state: event.data.state,
                }),
              }
            )

            if (!response.ok) {
              throw new Error(`Token exchange failed: ${response.status}`)
            }

            const result = await response.json()
            console.log('Token exchange successful:', result)

            setState(prev => ({ ...prev, isConnecting: false }))
            refetchConnection()
          } catch (error) {
            console.error('Token exchange error:', error)
            setState(prev => ({
              ...prev,
              isConnecting: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Token exchange failed',
            }))
          }

          window.removeEventListener('message', handleMessage)
        } else if (event.data.type === 'GARMIN_OAUTH_ERROR') {
          console.error('Garmin OAuth error message received:', event.data)
          setState(prev => ({
            ...prev,
            isConnecting: false,
            error: event.data.message || 'OAuth failed',
          }))
          window.removeEventListener('message', handleMessage)
        }
      }

      window.addEventListener('message', handleMessage)

      // Check if popup closed
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed)
          setState(prev => ({ ...prev, isConnecting: false }))
          refetchConnection()
          window.removeEventListener('message', handleMessage)
        }
      }, 1000)

      // Timeout after 5 minutes
      setTimeout(
        () => {
          clearInterval(checkClosed)
          if (popup && !popup.closed) {
            popup.close()
          }
          setState(prev => ({
            ...prev,
            isConnecting: false,
            error: 'OAuth timeout. Please try again.',
          }))
          window.removeEventListener('message', handleMessage)
        },
        5 * 60 * 1000
      )
    } catch (error) {
      console.error('Error connecting to Garmin:', error)
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      }))
    }
  }, [authUrlData?.getGarminAuthUrl, refetchConnection])

  // Handle disconnect
  const handleDisconnect = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      await disconnectGarmin()

      setState(prev => ({
        ...prev,
        isConnected: false,
        account: null,
        isLoading: false,
      }))

      refetchConnection()
    } catch (error) {
      console.error('Error disconnecting Garmin:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Disconnect failed',
      }))
    }
  }, [disconnectGarmin, refetchConnection])

  // Refresh connection status
  const refreshStatus = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
    refetchConnection()
  }, [refetchConnection])

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    authUrl: authUrlData?.getGarminAuthUrl,
    authUrlLoading,
    connect: handleConnect,
    disconnect: handleDisconnect,
    refresh: refreshStatus,
    clearError,
  }
}
