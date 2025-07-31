import React from 'react'
import { useGarminAuth } from '../../hooks/use-garmin-auth'
import { GarminConnectButton } from './garmin-connect-button'
import { Alert, AlertDescription } from './alert'
import { AlertTriangle, CheckCircle, RefreshCw, X } from 'lucide-react'

export function GarminConnectionStatus() {
  const {
    isConnected,
    isConnecting,
    isLoading,
    error,
    account,
    connect,
    disconnect,
    refresh,
    clearError,
  } = useGarminAuth()

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
        <RefreshCw className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-600">
          Checking Garmin connection...
        </span>
      </div>
    )
  }

  if (isConnected) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Garmin account connected successfully
            {account && (
              <div className="mt-2 text-sm text-green-700">
                <div>User ID: {account.garminUserId}</div>
                <div>Permissions: {account.scope?.join(', ')}</div>
                <div>
                  Connected: {new Date(account.createdAt).toLocaleDateString()}
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex items-center space-x-3">
          <button
            onClick={disconnect}
            className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            Disconnect Garmin
          </button>

          <button
            onClick={refresh}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Refresh connection status"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="p-1 hover:bg-red-100 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </AlertDescription>
        </Alert>
      )}

      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          Connect your Garmin account to sync your activities and get insights.
        </AlertDescription>
      </Alert>

      <div className="flex items-center space-x-3">
        <GarminConnectButton onClick={connect} loading={isConnecting}>
          Connect with Garmin
        </GarminConnectButton>

        <button
          onClick={refresh}
          disabled={isLoading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh connection status"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  )
}
