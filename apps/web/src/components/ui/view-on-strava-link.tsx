import React from 'react'
import { ExternalLink } from 'lucide-react'

interface ViewOnStravaLinkProps {
  activityId: number
  className?: string
  variant?: 'bold' | 'underline' | 'orange'
}

export const ViewOnStravaLink: React.FC<ViewOnStravaLinkProps> = ({
  activityId,
  className = '',
  variant = 'orange',
}) => {
  const getLinkStyles = () => {
    switch (variant) {
      case 'bold':
        return 'font-bold text-foreground hover:text-foreground/80'
      case 'underline':
        return 'underline text-foreground hover:text-foreground/80'
      case 'orange':
        return 'text-[#FC5200] hover:text-[#FC5200]/80'
      default:
        return 'text-foreground hover:text-foreground/80'
    }
  }

  const stravaUrl = `https://www.strava.com/activities/${activityId}`

  return (
    <a
      href={stravaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 transition-colors ${getLinkStyles()} ${className}`}
    >
      View on Strava
      <ExternalLink className="w-3 h-3" />
    </a>
  )
}
