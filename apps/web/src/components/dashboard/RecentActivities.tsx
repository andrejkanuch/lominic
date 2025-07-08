import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  MapPin,
  Zap,
  Mountain,
  Timer,
  BrainCircuit,
} from 'lucide-react'
import { ActivityDetailModal } from '../ActivityDetailModal'
import {
  GetStravaActivitiesQuery,
  useGetActivityInsightsLazyQuery,
} from '@/generated/graphql'

interface RecentActivitiesProps {
  activities: GetStravaActivitiesQuery['getStravaActivities']
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const [selectedActivity, setSelectedActivity] = useState<
    GetStravaActivitiesQuery['getStravaActivities'][number] | null
  >(null)
  const [getInsights, { loading, data }] = useGetActivityInsightsLazyQuery()

  const handleViewInsights = (
    activity: GetStravaActivitiesQuery['getStravaActivities'][number]
  ) => {
    setSelectedActivity(activity)
    getInsights({ variables: { activityId: activity.id.toString() } })
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
        return 'bg-purple-100 text-purple-700'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          <span>Recent Activities</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map(activity => {
            const SportIcon = getSportIcon(activity.type)
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Badge className={getSportColor(activity.sport_type)}>
                    <SportIcon className="w-3 h-3 mr-1" />
                    {activity.sport_type.replace(/([A-Z])/g, ' $1').trim()}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-gray-900 truncate max-w-xs">
                      {activity.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(activity.start_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.distance.toFixed(1)} km</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(activity.moving_time)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>{activity.average_speed.toFixed(1)} km/h</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewInsights(activity)}
                  >
                    <BrainCircuit className="w-4 h-4 mr-2" />
                    View Insights
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        {selectedActivity && (
          <ActivityDetailModal
            isOpen={!!selectedActivity}
            onClose={() => setSelectedActivity(null)}
            activityId={selectedActivity.id}
            insights={data?.getActivityInsights}
            loadingInsights={loading}
          />
        )}
      </CardContent>
    </Card>
  )
}
