import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Activity,
  MapPin,
  Clock,
  Zap,
  Heart,
  Calendar,
  TrendingUp,
  Target,
} from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    totalActivities: number
    totalDistance: number
    totalTime: number
    averageSpeed: number
    thisWeekActivities: number
    thisMonthDistance: number
    longestRide: number
    averageHeartRate: number
  }
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const statCards = [
    {
      title: 'Total Activities',
      value: stats.totalActivities,
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Distance',
      value: `${stats.totalDistance.toFixed(1)} km`,
      icon: MapPin,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Time',
      value: formatTime(stats.totalTime),
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Average Speed',
      value: `${stats.averageSpeed.toFixed(1)} km/h`,
      icon: Zap,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'This Week',
      value: `${stats.thisWeekActivities} activities`,
      icon: Calendar,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'This Month',
      value: `${stats.thisMonthDistance.toFixed(1)} km`,
      icon: TrendingUp,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Longest Ride',
      value: `${stats.longestRide.toFixed(1)} km`,
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Avg Heart Rate',
      value: `${stats.averageHeartRate} BPM`,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
