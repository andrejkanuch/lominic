import React from 'react'
import { Button } from './button'
import { Watch, Loader2 } from 'lucide-react'

interface GarminConnectButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
  loading?: boolean
}

export function GarminConnectButton({
  onClick,
  disabled = false,
  className = '',
  children,
  loading = false,
}: GarminConnectButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Watch className="w-4 h-4 mr-2" />
          {children || 'Connect with Garmin'}
        </>
      )}
    </Button>
  )
}
