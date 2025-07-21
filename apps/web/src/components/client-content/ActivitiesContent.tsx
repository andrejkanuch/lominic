import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Filter,
  TrendingUp,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { ActivityCard } from '@/components/ActivityCard'
import { ActivityDetailModal } from '@/components/ActivityDetailModal'
import { useGetStravaActivitiesQuery } from '@/generated/graphql'
import { useStravaError } from '@/hooks/use-strava-error'
import { StravaConnectButton } from '@/components/ui/strava-connect-button'

const ActivitiesContent: React.FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null
  )
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [selectedTimeRange, setSelectedTimeRange] = useState('all')

  const { data, loading, error, refetch } = useGetStravaActivitiesQuery({
    variables: { limit: 50 },
  })

  const { analyzeError, handleReconnect } = useStravaError()

  const activities = data?.getStravaActivities || []

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesSport =
      selectedSport === 'all' || activity.sport_type === selectedSport
    return matchesSearch && matchesSport
  })

  const handleActivityClick = (activityId: string) => {
    setSelectedActivityId(activityId)
    setIsDetailModalOpen(true)
  }

  const handleRetry = async () => {
    try {
      await refetch()
    } catch {
      // Error will be handled by the Apollo client error link
    }
  }

  const errorInfo = error ? analyzeError(error) : null

  const sportTypes = Array.from(new Set(activities.map(a => a.sport_type)))

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Activities</h1>
            <p className="text-muted-foreground mt-1">
              Loading your activities...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="grid grid-cols-2 gap-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Activities</h1>
            <p className="text-muted-foreground mt-1">
              Error loading activities
            </p>
          </div>
        </div>
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-muted-foreground">
              {errorInfo?.suggestedAction === 'reconnect' ? (
                <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              ) : (
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              )}
              <h3 className="text-lg font-semibold mb-2">
                {errorInfo?.suggestedAction === 'reconnect'
                  ? 'Strava Connection Issue'
                  : 'Failed to load activities'}
              </h3>
              <p className="mb-6">
                {errorInfo?.errorMessage ||
                  'Please try again later or check your connection'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
                {errorInfo?.suggestedAction === 'reconnect' && (
                  <StravaConnectButton onClick={handleReconnect} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground mt-1">
            Track your fitness journey and analyze your performance
          </p>
        </div>
      </div>

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
                    <SelectItem key={type} value={type || ''}>
                      {type?.replace(/([A-Z])/g, ' $1').trim()}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={handleActivityClick}
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

      {selectedActivityId && (
        <ActivityDetailModal
          activityId={selectedActivityId}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  )
}

export default ActivitiesContent
