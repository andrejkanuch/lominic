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
  Zap,
  BrainCircuit,
} from 'lucide-react'
import { ActivityMetrics } from './ActivityMetrics'
import { ActivityMap } from './ActivityMap'
import { ActivityChart } from './ActivityChart'
import { ActivityStreamsChart } from './ActivityStreamsChart'
import { SportType, useGetActivityByIdQuery } from '@/generated/graphql'

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
  insights,
  loadingInsights,
}: ActivityDetailModalProps) => {
  const { data, loading, error } = useGetActivityByIdQuery({
    variables: { activityId: activityId.toString() },
    skip: !isOpen,
  })

  const activity = data?.getActivityById

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!activity) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
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
        return 'bg-pulse-100 text-pulse-700'
    }
  }

  const SportIcon = getSportIcon(activity.sport_type!)

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
                  <span>{formatDate(activity.start_date)}</span>
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

          {/* Activity Metrics */}
          <ActivityMetrics activity={activity} />

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6">
            <ActivityChart activity={activity} type="speed" />
            <ActivityStreamsChart activityId={parseInt(activity.id)} />
          </div>

          {/* Route Map */}
          {activity.polyline && activity.start_latlng && (
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

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Max Speed
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {activity.max_speed ? activity.max_speed.toFixed(1) : 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">km/h</p>
                </div>

                {activity.average_cadence && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Cadence
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.average_cadence.toFixed(1)}
                    </p>
                    <p className="text-sm text-gray-500">spm</p>
                  </div>
                )}

                {activity.average_watts && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Avg Power
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.average_watts.toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-500">W</p>
                  </div>
                )}

                {activity.max_watts && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Max Power
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.max_watts.toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-500">W</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate Data */}
          {activity.has_heartrate &&
            (activity.average_heartrate || activity.max_heartrate) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span>Heart Rate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {activity.average_heartrate && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Heart className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-gray-600">
                            Average HR
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {activity.average_heartrate}
                        </p>
                        <p className="text-sm text-gray-500">BPM</p>
                      </div>
                    )}

                    {activity.max_heartrate && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Heart className="w-5 h-5 text-red-600" />
                          <span className="text-sm font-medium text-gray-600">
                            Max HR
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {activity.max_heartrate}
                        </p>
                        <p className="text-sm text-gray-500">BPM</p>
                      </div>
                    )}

                    {activity.kilojoules && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-600">
                            Energy
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {activity.kilojoules.toFixed(0)}
                        </p>
                        <p className="text-sm text-gray-500">kJ</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          {/* Elevation Data */}
          {(activity.elev_high ||
            activity.elev_low ||
            activity.total_elevation_gain) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mountain className="w-5 h-5 text-green-500" />
                  <span>Elevation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Mountain className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Elevation Gain
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.total_elevation_gain}
                    </p>
                    <p className="text-sm text-gray-500">m</p>
                  </div>

                  {activity.elev_high && (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Mountain className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-gray-600">
                          Highest Point
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {activity.elev_high.toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-500">m</p>
                    </div>
                  )}

                  {activity.elev_low && (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Mountain className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-medium text-gray-600">
                          Lowest Point
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        {activity.elev_low.toFixed(0)}
                      </p>
                      <p className="text-sm text-gray-500">m</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Insights */}
          {insights && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BrainCircuit className="w-5 h-5 text-purple-500" />
                  <span>Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingInsights ? (
                  <div>Loading...</div>
                ) : (
                  <ul className="space-y-2">
                    {insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-4 h-4 mt-1 mr-2 bg-purple-500 rounded-full flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          )}

          {/* Social & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ThumbsUp className="w-5 h-5 text-pulse-500" />
                <span>Social & Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <ThumbsUp className="w-5 h-5 text-pulse-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Kudos
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {activity.kudos_count}
                  </p>
                </div>

                {activity.achievement_count > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Achievements
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.achievement_count}
                    </p>
                  </div>
                )}

                {activity.pr_count > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-gray-600">
                        PRs
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.pr_count}
                    </p>
                  </div>
                )}

                {activity.comment_count > 0 && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-600">
                        Comments
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {activity.comment_count}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-gray-500" />
                <span>Activity Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activity ID:</span>
                    <span className="font-mono text-gray-900">
                      {activity.id}
                    </span>
                  </div>
                  {activity.external_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">External ID:</span>
                      <span className="font-mono text-gray-900">
                        {activity.external_id}
                      </span>
                    </div>
                  )}
                  {activity.upload_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Upload ID:</span>
                      <span className="font-mono text-gray-900">
                        {activity.upload_id}
                      </span>
                    </div>
                  )}
                  {activity.gear_id && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gear:</span>
                      <span className="font-mono text-gray-900">
                        {activity.gear_id}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Timezone:</span>
                    <span className="text-gray-900">{activity.timezone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trainer:</span>
                    <span className="text-gray-900">
                      {activity.trainer ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commute:</span>
                    <span className="text-gray-900">
                      {activity.commute ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Manual:</span>
                    <span className="text-gray-900">
                      {activity.manual ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Private:</span>
                    <span className="text-gray-900">
                      {activity.private ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Device Watts:</span>
                    <span className="text-gray-900">
                      {activity.device_watts ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
