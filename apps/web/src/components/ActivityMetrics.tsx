import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MapPin,
  Clock,
  Zap,
  Mountain,
  Heart,
  Timer,
  TrendingUp,
} from 'lucide-react'
import { SportType } from '@/generated/graphql'

interface ActivityMetricsProps {
  activity: {
    distance: number
    moving_time: number
    total_elevation_gain: number
    average_speed: number
    average_heartrate?: number | null
    sport_type: SportType
  }
}

export const ActivityMetrics = ({ activity }: ActivityMetricsProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs
          .toString()
          .padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const metrics = [
    {
      icon: MapPin,
      label: 'Distance',
      value: `${(activity.distance / 1000).toFixed(2)} km`,
      color: 'text-blue-500',
    },
    {
      icon: Clock,
      label: 'Moving Time',
      value: formatTime(activity.moving_time),
      color: 'text-green-500',
    },
    {
      icon: Zap,
      label: 'Average Speed',
      value: `${activity.average_speed.toFixed(1)} km/h`,
      color: 'text-purple-500',
    },
    {
      icon: Mountain,
      label: 'Elevation Gain',
      value: `${activity.total_elevation_gain} m`,
      color: 'text-orange-500',
    },
    {
      icon: TrendingUp,
      label: 'Average Pace',
      value: `${(
        activity.moving_time /
        60 /
        (activity.distance / 1000)
      ).toFixed(1)} min/km`,
      color: 'text-indigo-500',
    },
  ]

  if (activity.average_heartrate) {
    metrics.push({
      icon: Heart,
      label: 'Average Heart Rate',
      value: `${activity.average_heartrate} BPM`,
      color: 'text-red-500',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-pulse-500" />
          <span>Activity Metrics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  <IconComponent className={`w-8 h-8 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
