import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Heart,
  Mountain,
  Timer,
  ThumbsUp,
  TrendingUp,
  Target,
  Activity,
  Map as MapIcon,
  X,
} from 'lucide-react'
import { ActivityMetrics } from './ActivityMetrics'
import { ActivityMap } from './ActivityMap'
import { ActivityChart } from './ActivityChart'

interface ActivityDetailModalProps {
  activity: {
    id: number
    name: string
    type: string
    sport_type: string
    date: string
    distance: number
    moving_time: number
    total_elevation_gain: number
    average_speed: number
    max_speed: number
    average_heartrate?: number
    max_heartrate?: number
    kudos_count: number
    description: string
    map?: {
      summary_polyline: string
    }
    start_latlng?: [number, number]
    end_latlng?: [number, number]
  }
  isOpen: boolean
  onClose: () => void
}

export const ActivityDetailModal = ({
  activity,
  isOpen,
  onClose,
}: ActivityDetailModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
        return Activity
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

  const SportIcon = getSportIcon(activity.sport_type)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {activity.name}
              </DialogTitle>
              <div className="flex items-center space-x-4 mt-2">
                <Badge className={getSportColor(activity.sport_type)}>
                  <SportIcon className="w-4 h-4 mr-2" />
                  {activity.sport_type.replace(/([A-Z])/g, ' $1').trim()}
                </Badge>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(activity.date)}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          {activity.description && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700">{activity.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Key Metrics */}
          <ActivityMetrics activity={activity} />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityChart activity={activity} type="speed" />
            {activity.average_heartrate && (
              <ActivityChart activity={activity} type="heartrate" />
            )}
          </div>

          {/* Map */}
          {activity.map && activity.start_latlng && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapIcon className="w-5 h-5 text-pulse-500" />
                  <span>Route Map</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityMap activity={activity} />
              </CardContent>
            </Card>
          )}

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <ThumbsUp className="w-5 h-5 text-pulse-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Kudos
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {activity.kudos_count}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Max Speed
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {activity.max_speed.toFixed(1)}
                </p>
                <p className="text-sm text-gray-500">km/h</p>
              </CardContent>
            </Card>

            {activity.max_heartrate && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Max HR
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {activity.max_heartrate}
                  </p>
                  <p className="text-sm text-gray-500">BPM</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">
                    Pace
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {(activity.moving_time / 60 / activity.distance).toFixed(1)}
                </p>
                <p className="text-sm text-gray-500">min/km</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
