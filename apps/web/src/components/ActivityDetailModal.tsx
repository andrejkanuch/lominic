import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetActivityByIdQuery } from '@/generated/graphql'
import { SportType } from '@/generated/graphql'
import {
  Activity,
  Mountain,
  Timer,
  MapPin,
  Clock,
  Zap,
  TrendingUp,
  Heart,
} from 'lucide-react'

interface ActivityDetailModalProps {
  activityId: string
  isOpen: boolean
  onClose: () => void
  insights?: string[]
  loadingInsights?: boolean
}

export const ActivityDetailModal = ({
  activityId,
  isOpen,
  onClose,
  insights: basicInsights,
  loadingInsights: loadingBasicInsights,
}: ActivityDetailModalProps) => {
  const { data: activityData, loading: loadingActivity } =
    useGetActivityByIdQuery({
      variables: { activityId },
      skip: !isOpen,
    })

  const activity = activityData?.getActivityById

  if (loadingActivity) return <div>Loading...</div>
  if (!activity) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const getSportIcon = (sportType: SportType) => {
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

  const getSportColor = (sportType: SportType) => {
    switch (sportType) {
      case 'MountainBikeRide':
      case 'Ride':
        return 'bg-blue-100 text-blue-700'
      case 'Run':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-purple-100 text-purple-700'
    }
  }

  const SportIcon = getSportIcon(activity.sport_type!)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <SportIcon className="h-5 w-5" />
              <span>{activity.name}</span>
              <Badge className={getSportColor(activity.sport_type!)}>
                {activity.sport_type}
              </Badge>
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {(activity.distance / 1000).toFixed(1)} km
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {formatTime(activity.moving_time)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {(activity.average_speed * 3.6).toFixed(1)} km/h
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {activity.total_elevation_gain}m elevation
                </span>
              </div>
            </div>

            {activity.average_heartrate && (
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Avg HR: {activity.average_heartrate} bpm
                  {activity.max_heartrate &&
                    ` (Max: ${activity.max_heartrate} bpm)`}
                </span>
              </div>
            )}

            <div className="text-sm text-gray-600">
              <p>Date: {formatDate(activity.start_date)}</p>
              {activity.description && (
                <p>Description: {activity.description}</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="basic">
            {loadingBasicInsights ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Loading insights...
                  </p>
                </div>
              </div>
            ) : basicInsights && basicInsights.length > 0 ? (
              <div className="space-y-2">
                {basicInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="text-sm text-gray-700 p-2 bg-gray-50 rounded"
                  >
                    • {insight}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No insights available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
