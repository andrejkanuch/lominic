'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import {
  useGetActivityByIdQuery,
  useGetActivityInsightsDetailedQuery,
} from '@/generated/graphql'
import { ActivityMetrics } from '@/components/ActivityMetrics'
import { ActivityChart } from '@/components/ActivityChart'
import { ActivityStreamsChart } from '@/components/ActivityStreamsChart'
import { ActivityInsightsDashboard } from '@/components/insights/ActivityInsightsDashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Activity, Brain, BarChart3, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ActivityInsightsPage() {
  const params = useParams()
  const router = useRouter()
  const activityId = params?.activityId as string

  const {
    data: activityData,
    loading: activityLoading,
    error: activityError,
  } = useGetActivityByIdQuery({
    variables: { activityId },
    skip: !activityId,
  })

  const {
    data: insightsData,
    loading: insightsLoading,
    error: insightsError,
  } = useGetActivityInsightsDetailedQuery({
    variables: { activityId },
    skip: !activityId,
  })

  const activity = activityData?.getActivityById
  const insights = insightsData?.getActivityInsightsDetailed

  if (activityLoading || insightsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading activity insights...</div>
        </div>
      </div>
    )
  }

  if (activityError || !activity) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading activity</div>
        </div>
      </div>
    )
  }

  const handleBackClick = () => {
    router.back()
  }

  // Use real data from API or provide fallbacks
  const heartRateZones = insights?.heartRateZones || []
  const performanceMetrics = insights?.performanceMetrics
  const correlations = insights?.correlations
  const trainingLoad = insights?.trainingLoad
  const insightsList = insights?.insights || []

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleBackClick}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {activity.name}
            </h1>
            <p className="text-gray-500">
              {new Date(activity.start_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-pulse-500" />
          <span className="text-sm font-medium text-gray-600">
            {activity.sport_type.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Metrics</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Charts</span>
          </TabsTrigger>
          <TabsTrigger value="streams" className="flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Streams</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Activity Metrics */}
          <ActivityMetrics activity={activity} />

          {/* Insights Dashboard */}
          {insights && performanceMetrics && correlations && trainingLoad ? (
            <ActivityInsightsDashboard
              insights={insightsList}
              heartRateZones={heartRateZones}
              performanceMetrics={performanceMetrics}
              correlations={correlations}
              trainingLoad={trainingLoad}
            />
          ) : insightsError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 mb-3">
                {insightsError.message?.includes('rate limit')
                  ? 'Strava API rate limit exceeded. Please wait a few minutes and try again.'
                  : 'Unable to load detailed insights. Please try again later.'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-600">
                Detailed insights are not available for this activity.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <ActivityMetrics activity={activity} />
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activity.average_heartrate && (
              <ActivityChart activity={activity} type="heartrate" />
            )}
            <ActivityChart activity={activity} type="speed" />
          </div>
        </TabsContent>

        <TabsContent value="streams" className="space-y-6">
          <ActivityStreamsChart activityId={Number(activityId)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
