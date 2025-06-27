import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Filter, TrendingUp } from 'lucide-react'
import { ActivityCard } from '@/components/ActivityCard'
import { ActivityDetailModal } from '@/components/ActivityDetailModal'

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    name: 'Morning Mountain Bike Ride',
    type: 'Ride',
    sport_type: 'MountainBikeRide',
    date: '2024-06-27',
    distance: 25.4,
    moving_time: 3600,
    total_elevation_gain: 450,
    average_speed: 25.4,
    max_speed: 52.1,
    average_heartrate: 142,
    max_heartrate: 178,
    kudos_count: 12,
    description:
      'Epic morning ride through the mountain trails. Perfect weather and amazing views!',
    map: {
      summary_polyline: 'encoded_polyline_data',
    },
    start_latlng: [37.7749, -122.4194],
    end_latlng: [37.7849, -122.4094],
  },
  {
    id: 2,
    name: 'Evening Run',
    type: 'Run',
    sport_type: 'Run',
    date: '2024-06-26',
    distance: 8.2,
    moving_time: 2400,
    total_elevation_gain: 85,
    average_speed: 12.3,
    max_speed: 18.5,
    average_heartrate: 155,
    max_heartrate: 172,
    kudos_count: 8,
    description:
      'Nice evening run around the neighborhood. Felt strong throughout!',
    map: {
      summary_polyline: 'encoded_polyline_data',
    },
    start_latlng: [37.7649, -122.4294],
    end_latlng: [37.7749, -122.4194],
  },
  {
    id: 3,
    name: 'Weekend Road Cycling',
    type: 'Ride',
    sport_type: 'Ride',
    date: '2024-06-25',
    distance: 65.8,
    moving_time: 7200,
    total_elevation_gain: 890,
    average_speed: 32.9,
    max_speed: 67.2,
    average_heartrate: 138,
    max_heartrate: 165,
    kudos_count: 15,
    description:
      'Long weekend ride with the cycling group. Challenging climbs but rewarding descents!',
    map: {
      summary_polyline: 'encoded_polyline_data',
    },
    start_latlng: [37.7849, -122.4094],
    end_latlng: [37.8049, -122.3894],
  },
]

const ActivitiesContent: React.FC = () => {
  const [activities] = useState<Activity[]>(mockActivities)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  )
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedTimeRange, setSelectedTimeRange] = useState('all')

  const filteredActivities = activities.filter(activity => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport =
      selectedSport === 'all' || activity.sport_type === selectedSport
    return matchesSearch && matchesSport
  })

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setIsDetailModalOpen(true)
  }

  const sportTypes = Array.from(new Set(activities.map(a => a.sport_type)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground mt-1">
            Track your fitness journey and analyze your performance
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-pulse-500" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Search Activities
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Sport Type
              </label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sport type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  {sportTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Time Range
              </label>
              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity as any}
            onClick={() => handleActivityClick(activity)}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">
                No activities found
              </h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Detail Modal */}
      {selectedActivity && (
        <ActivityDetailModal
          activity={selectedActivity}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ActivitiesContent
