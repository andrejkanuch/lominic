import React from 'react'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentActivities } from '@/components/dashboard/RecentActivities'
import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress'
import { useGetStravaActivitiesQuery } from '@/generated/graphql'

const DashboardContent: React.FC = () => {
  // Mock data - in a real app, this would come from API
  const userStats = {
    totalActivities: 47,
    totalDistance: 1247.5,
    totalTime: 89400, // seconds
    averageSpeed: 23.8,
    thisWeekActivities: 4,
    thisMonthDistance: 287.3,
    longestRide: 89.2,
    averageHeartRate: 152,
  }

  const { data: recentActivities } = useGetStravaActivitiesQuery({
    variables: {
      limit: 10,
    },
  })

  const weeklyData = [
    { day: 'Mon', distance: 15.3, activities: 1, time: 1980 },
    { day: 'Tue', distance: 32.5, activities: 1, time: 4320 },
    { day: 'Wed', distance: 0, activities: 0, time: 0 },
    { day: 'Thu', distance: 8.2, activities: 1, time: 2280 },
    { day: 'Fri', distance: 67.8, activities: 1, time: 8940 },
    { day: 'Sat', distance: 12.1, activities: 1, time: 3600 },
    { day: 'Sun', distance: 0, activities: 0, time: 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's your activity overview and recent progress.
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats stats={userStats} />

      {/* Recent Activities and Weekly Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivities
            activities={recentActivities?.getStravaActivities || []}
          />
        </div>
        <div className="lg:col-span-1">
          <WeeklyProgress weeklyData={weeklyData} />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
