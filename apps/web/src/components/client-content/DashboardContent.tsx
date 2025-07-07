import React from 'react'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { RecentActivities } from '@/components/dashboard/RecentActivities'
import { WeeklyProgress } from '@/components/dashboard/WeeklyProgress'

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

  const recentActivities = [
    {
      id: 1,
      name: 'Morning Mountain Ride',
      sport_type: 'MountainBikeRide',
      date: '2024-01-15',
      distance: 32.5,
      moving_time: 4320,
      average_speed: 27.1,
      total_elevation_gain: 650,
    },
    {
      id: 2,
      name: 'Evening Run',
      sport_type: 'Run',
      date: '2024-01-14',
      distance: 8.2,
      moving_time: 2280,
      average_speed: 12.9,
      total_elevation_gain: 120,
    },
    {
      id: 3,
      name: 'Weekend Adventure',
      sport_type: 'Ride',
      date: '2024-01-13',
      distance: 67.8,
      moving_time: 8940,
      average_speed: 27.3,
      total_elevation_gain: 890,
    },
    {
      id: 4,
      name: 'Quick City Ride',
      sport_type: 'Ride',
      date: '2024-01-12',
      distance: 15.3,
      moving_time: 1980,
      average_speed: 27.8,
      total_elevation_gain: 85,
    },
    {
      id: 5,
      name: 'Trail Run',
      sport_type: 'Run',
      date: '2024-01-11',
      distance: 12.1,
      moving_time: 3600,
      average_speed: 12.1,
      total_elevation_gain: 245,
    },
  ]

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
          <RecentActivities activities={recentActivities} />
        </div>
        <div className="lg:col-span-1">
          <WeeklyProgress weeklyData={weeklyData} />
        </div>
      </div>
    </div>
  )
}

export default DashboardContent
