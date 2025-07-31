import React from 'react'
import { GarminConnectionStatus } from '../ui/garmin-connection-status'
import { GarminVerificationPage } from './GarminVerificationPage'

interface GarminIntegrationExampleProps {
  variant?: 'simple' | 'full'
}

export function GarminIntegrationExample({
  variant = 'simple',
}: GarminIntegrationExampleProps) {
  if (variant === 'full') {
    return <GarminVerificationPage />
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Garmin Integration
        </h2>
        <p className="text-gray-600">
          Simple integration example - use this component anywhere in your app
        </p>
      </div>

      <GarminConnectionStatus />
    </div>
  )
}
