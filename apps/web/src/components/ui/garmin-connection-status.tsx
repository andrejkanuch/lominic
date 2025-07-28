import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { IsGarminConnectedDocument, GetGarminAuthUrlDocument } from '../../generated/graphql'
import { GarminConnectButton } from './garmin-connect-button'
import { Alert, AlertDescription } from './alert'
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

export function GarminConnectionStatus() {
  const [isConnecting, setIsConnecting] = useState(false)
  
  const { data: connectionData, loading: connectionLoading, refetch: refetchConnection } = useQuery(IsGarminConnectedDocument)
  const { data: authUrlData, loading: authUrlLoading } = useQuery(GetGarminAuthUrlDocument, {
    skip: connectionData?.isGarminConnected !== false
  })

  const isConnected = connectionData?.isGarminConnected
  const authUrl = authUrlData?.getGarminAuthUrl

  const handleConnect = async () => {
    if (!authUrl) return
    
    setIsConnecting(true)
    
    try {
      // Open popup for Garmin OAuth
      const popup = window.open(
        authUrl,
        'garmin-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes'
      )

      // Wait for popup to close or handle the callback
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed)
          setIsConnecting(false)
          // Refetch connection status
          refetchConnection()
        }
      }, 1000)

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(checkClosed)
        if (popup && !popup.closed) {
          popup.close()
        }
        setIsConnecting(false)
      }, 5 * 60 * 1000)
    } catch (error) {
      console.error('Error connecting to Garmin:', error)
      setIsConnecting(false)
    }
  }

  const handleRefresh = () => {
    refetchConnection()
  }

  if (connectionLoading) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
        <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-600">Checking Garmin connection...</span>
      </div>
    )
  }

  if (isConnected) {
    return (
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Garmin account connected successfully
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          {isConnected === false 
            ? 'Garmin authentication expired. Please reconnect your account.'
            : 'Connect your Garmin account to sync your activities.'
          }
        </AlertDescription>
      </Alert>
      
      <div className="flex items-center space-x-3">
        <GarminConnectButton
          onClick={handleConnect}
          loading={isConnecting || authUrlLoading}
          disabled={!authUrl}
        >
          {isConnected === false ? 'Reconnect Garmin' : 'Connect with Garmin'}
        </GarminConnectButton>
        
        <button
          onClick={handleRefresh}
          disabled={connectionLoading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh connection status"
        >
          <RefreshCw className={`w-4 h-4 ${connectionLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  )
} 