import { useCallback } from 'react'
import { logout } from '@/lib/apollo-client'
import { toast } from 'sonner'

export interface StravaErrorInfo {
  isStravaTokenError: boolean
  isStravaConnectionError: boolean
  isStravaRateLimitError: boolean
  isStravaServiceError: boolean
  errorMessage: string
  suggestedAction: 'retry' | 'reconnect' | 'wait' | 'contact_support'
}

export const useStravaError = () => {
  const analyzeError = useCallback((error: unknown): StravaErrorInfo => {
    const message = (error as Error)?.message || ''

    const isStravaTokenError =
      message.includes('Failed to refresh Strava token') ||
      message.includes('Strava account not found') ||
      message.includes('Please reconnect your account') ||
      message.includes('Your Strava connection has expired') ||
      message.includes('Your Strava access has expired')

    const isStravaConnectionError =
      message.includes('Strava application configuration error') ||
      message.includes('You do not have permission to access this data')

    const isStravaRateLimitError =
      message.includes('Strava rate limit exceeded') ||
      message.includes('rate limit')

    const isStravaServiceError =
      message.includes('Strava service is temporarily unavailable') ||
      message.includes('temporarily unavailable')

    let suggestedAction: StravaErrorInfo['suggestedAction'] = 'retry'
    let errorMessage = message

    if (isStravaTokenError) {
      suggestedAction = 'reconnect'
      errorMessage =
        'Your Strava connection needs to be refreshed. This usually happens when your Strava token expires.'
    } else if (isStravaConnectionError) {
      suggestedAction = 'contact_support'
      errorMessage =
        'There is a configuration issue with your Strava connection. Please contact support.'
    } else if (isStravaRateLimitError) {
      suggestedAction = 'wait'
      errorMessage =
        'Strava is limiting requests. Please wait a moment and try again.'
    } else if (isStravaServiceError) {
      suggestedAction = 'wait'
      errorMessage =
        'Strava service is temporarily unavailable. Please try again later.'
    }

    return {
      isStravaTokenError,
      isStravaConnectionError,
      isStravaRateLimitError,
      isStravaServiceError,
      errorMessage,
      suggestedAction,
    }
  }, [])

  const handleStravaError = useCallback(
    (error: unknown) => {
      const errorInfo = analyzeError(error)

      switch (errorInfo.suggestedAction) {
        case 'reconnect':
          toast.error('Strava connection expired. Redirecting to login...')
          setTimeout(() => logout(), 2000)
          break
        case 'contact_support':
          toast.error('Configuration error. Please contact support.')
          break
        case 'wait':
          toast.error(errorInfo.errorMessage)
          break
        default:
          toast.error('An error occurred. Please try again.')
      }

      return errorInfo
    },
    [analyzeError]
  )

  const handleReconnect = useCallback(() => {
    toast.info('Redirecting to Strava connection...')
    logout()
  }, [])

  return {
    analyzeError,
    handleStravaError,
    handleReconnect,
  }
}
