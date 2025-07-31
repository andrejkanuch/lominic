'use client'
import React from 'react'
import { useGarminAuth } from '@/hooks/use-garmin-auth'
import { GarminConnectButton } from '@/components/ui/garmin-connect-button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  X,
  Watch,
  User,
  Calendar,
  Shield,
  Activity,
} from 'lucide-react'

export default function GarminVerificationPage() {
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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Checking Garmin connection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Garmin Connect Integration
        </h1>
        <p className="text-gray-600">
          Connect your Garmin account to sync activities and get personalized
          insights
        </p>
      </div>

      {/* Error Alert */}
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

      {/* Connection Status */}
      {isConnected ? (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-800">
                Connected to Garmin
              </CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Your Garmin account is successfully connected and ready to sync
              data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Account Details */}
            {account && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Garmin User ID:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                    {account.garminUserId}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Connected:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(account.createdAt).toLocaleDateString()} at{' '}
                    {new Date(account.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}

            {/* Permissions */}
            {account?.scope && account.scope.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Granted Permissions:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {account.scope.map((permission: string) => (
                    <Badge
                      key={permission}
                      variant="secondary"
                      className="text-xs"
                    >
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-3 pt-4 border-t border-green-200">
              <Button
                onClick={disconnect}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Disconnect Account
              </Button>

              <Button
                onClick={refresh}
                variant="ghost"
                size="sm"
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
                />
                Refresh Status
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Watch className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800">Not Connected</CardTitle>
            </div>
            <CardDescription className="text-orange-700">
              Connect your Garmin account to start syncing your activities and
              get personalized insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">
                  Activity Sync
                </h3>
                <p className="text-sm text-gray-600">
                  Automatically sync your workouts and activities
                </p>
              </div>

              <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">
                  Secure Connection
                </h3>
                <p className="text-sm text-gray-600">
                  OAuth2 PKCE ensures your data stays secure
                </p>
              </div>

              <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
                <RefreshCw className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-900 mb-1">
                  Real-time Updates
                </h3>
                <p className="text-sm text-gray-600">
                  Get insights and updates as you train
                </p>
              </div>
            </div>

            {/* Connect Button */}
            <div className="flex justify-center pt-4">
              <GarminConnectButton
                onClick={connect}
                loading={isConnecting}
                className="text-lg px-8 py-4"
              >
                Connect with Garmin
              </GarminConnectButton>
            </div>

            {/* Info */}
            <div className="text-center text-sm text-gray-500">
              <p>
                You'll be redirected to Garmin Connect to authorize this
                application.
                <br />
                We only request the permissions you choose to grant.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How Garmin Integration Works</CardTitle>
          <CardDescription>
            Learn about the secure OAuth2 flow and data handling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Security</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• OAuth2 PKCE (Proof Key for Code Exchange)</li>
                <li>• No password sharing with third parties</li>
                <li>• Encrypted token storage</li>
                <li>• Automatic token refresh</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Privacy</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• You control what data is shared</li>
                <li>• Can disconnect at any time</li>
                <li>• Data retention policies apply</li>
                <li>• GDPR compliant</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
