import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  MapPin,
  Zap,
  //   Heart,
  Mountain,
  Timer,
  ThumbsUp,
  Brain,
} from 'lucide-react'
import { GetStravaActivitiesQuery } from '@/generated/graphql'
import { ViewOnStravaLink } from '@/components/ui/view-on-strava-link'
import { useRouter } from 'next/navigation'

interface ActivityCardProps {
  activity: GetStravaActivitiesQuery['getStravaActivities'][number]
  onClick: (activityId: string) => void
}

export const ActivityCard = ({ activity, onClick }: ActivityCardProps) => {
  const router = useRouter()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const getSportIcon = (sportType: string) => {
    switch (sportType) {
      case 'MountainBikeRide':
      case 'Ride':
        return Mountain
      case 'Run':
        return Timer
      default:
        return Zap
    }
  }

  const getSportColor = (sportType: string) => {
    switch (sportType) {
      case 'MountainBikeRide':
      case 'Ride':
        return 'bg-blue-100 text-blue-700'
      case 'Run':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-pulse-100 text-pulse-700'
    }
  }

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/activities/${activity.id}/insights`)
  }

  const SportIcon = getSportIcon(activity.sport_type)

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
      onClick={() => onClick(activity.id)}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {activity.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {formatDate(activity.start_date)}
                </span>
              </div>
            </div>
            <Badge className={getSportColor(activity.sport_type)}>
              <SportIcon className="w-3 h-3 mr-1" />
              {activity.sport_type.replace(/([A-Z])/g, ' $1').trim()}
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Distance</span>
              </div>
              <p className="font-semibold text-gray-900">
                {(activity.distance / 1000).toFixed(1)} km
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Time</span>
              </div>
              <p className="font-semibold text-gray-900">
                {formatTime(activity.moving_time)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Avg Speed</span>
              </div>
              <p className="font-semibold text-gray-900">
                {activity.average_speed.toFixed(1)} km/h
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-1">
                <Mountain className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Elevation</span>
              </div>
              <p className="font-semibold text-gray-900">
                {activity.total_elevation_gain}m
              </p>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            {/* {activity.average_heartrate && (
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">
                  {activity.average_heartrate} BPM
                </span>
              </div>
            )} */}

            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4 text-pulse-500" />
              <span className="text-sm text-gray-600">
                {activity.kudos_count}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleInsightsClick}
                className="flex items-center space-x-1"
              >
                <Brain className="w-3 h-3" />
                <span>Insights</span>
              </Button>

              <ViewOnStravaLink
                activityId={Number(activity.id)}
                variant="orange"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
