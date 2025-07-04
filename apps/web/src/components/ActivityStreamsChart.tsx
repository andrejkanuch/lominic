import React, { useMemo } from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Heart,
  Mountain,
  Gauge,
  Route,
  Zap,
  TrendingUp,
  Activity,
} from 'lucide-react'
import { useGetActivityStreamsQuery } from '@/generated/graphql'

interface ActivityStreamsChartProps {
  activityId: number
}

// Downsample data for better performance
function downsampleData(data: number[], targetPoints: number = 200): number[] {
  if (data.length <= targetPoints) return data

  const step = data.length / targetPoints
  const result = []

  for (let i = 0; i < targetPoints; i++) {
    const index = Math.floor(i * step)
    result.push(data[index])
  }

  return result
}

// Format time for display
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Format distance for display
function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)}km`
  }
  return `${Math.round(meters)}m`
}

// Format speed for display
function formatSpeed(mps: number): string {
  const kmh = mps * 3.6
  return `${kmh.toFixed(1)} km/h`
}

// Format power for display
function formatPower(watts: number): string {
  return `${Math.round(watts)}W`
}

// Format altitude for display
function formatAltitude(meters: number): string {
  return `${Math.round(meters)}m`
}

// Format grade for display
function formatGrade(percent: number): string {
  return `${percent.toFixed(1)}%`
}

export const ActivityStreamsChart = ({
  activityId,
}: ActivityStreamsChartProps) => {
  const { data, loading, error } = useGetActivityStreamsQuery({
    variables: { activityId: activityId.toString() },
  })

  const streamData = useMemo(() => {
    if (!data?.getActivityStreams) return {}

    const streams = data.getActivityStreams
    const maxPoints = 200

    const result: Record<string, Array<Record<string, number | string>>> = {}

    // Time stream (used as x-axis for all charts)
    if (streams.time?.data) {
      const timeData = downsampleData(streams.time.data, maxPoints)
      result.time = timeData.map((time, index) => ({
        time,
        timeFormatted: formatTime(time),
        index,
      }))
    }

    // Heart rate stream
    if (streams.heartrate?.data) {
      const hrData = downsampleData(streams.heartrate.data, maxPoints)
      result.heartrate = hrData.map((hr, index) => ({
        heartrate: hr,
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Distance stream
    if (streams.distance?.data) {
      const distanceData = downsampleData(streams.distance.data, maxPoints)
      result.distance = distanceData.map((distance, index) => ({
        distance,
        distanceFormatted: formatDistance(distance),
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Altitude stream
    if (streams.altitude?.data) {
      const altitudeData = downsampleData(streams.altitude.data, maxPoints)
      result.altitude = altitudeData.map((altitude, index) => ({
        altitude,
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Power stream
    if (streams.power?.data) {
      const powerData = downsampleData(streams.power.data, maxPoints)
      result.power = powerData.map((power, index) => ({
        power,
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Velocity stream
    if (streams.smooth_velocity?.data) {
      const velocityData = downsampleData(
        streams.smooth_velocity.data,
        maxPoints
      )
      result.velocity = velocityData.map((velocity, index) => ({
        velocity,
        velocityFormatted: formatSpeed(velocity),
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Grade stream
    if (streams.smooth_grade?.data) {
      const gradeData = downsampleData(streams.smooth_grade.data, maxPoints)
      result.grade = gradeData.map((grade, index) => ({
        grade,
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    // Cadence stream
    if (streams.cadence?.data) {
      const cadenceData = downsampleData(streams.cadence.data, maxPoints)
      result.cadence = cadenceData.map((cadence, index) => ({
        cadence,
        time: result.time?.[index]?.time || 0,
        timeFormatted: result.time?.[index]?.timeFormatted || '0:00',
      }))
    }

    return result
  }, [data])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">Loading activity data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-red-500">Error loading activity data</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const availableStreams = Object.keys(streamData).filter(key => key !== 'time')

  if (availableStreams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activity Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">No stream data available</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getStreamConfig = (streamType: string) => {
    const configs = {
      heartrate: {
        title: 'Heart Rate',
        icon: Heart,
        color: '#ef4444',
        dataKey: 'heartrate',
        unit: 'BPM',
        formatter: (value: number) => `${value} BPM`,
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.heartrate as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [Math.floor(Math.min(...values) * 0.9), Math.ceil(max * 1.1)]
        },
      },
      distance: {
        title: 'Distance',
        icon: Route,
        color: '#3b82f6',
        dataKey: 'distance',
        unit: 'm',
        formatter: (value: number) => formatDistance(value),
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.distance as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [0, Math.ceil(max * 1.1)]
        },
      },
      altitude: {
        title: 'Altitude',
        icon: Mountain,
        color: '#10b981',
        dataKey: 'altitude',
        unit: 'm',
        formatter: (value: number) => formatAltitude(value),
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.altitude as number)
            .filter(v => v !== null)
          const min = Math.min(...values)
          const max = Math.max(...values)
          return [Math.floor(min * 0.95), Math.ceil(max * 1.05)]
        },
      },
      power: {
        title: 'Power',
        icon: Zap,
        color: '#f59e0b',
        dataKey: 'power',
        unit: 'W',
        formatter: (value: number) => formatPower(value),
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.power as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [0, Math.ceil(max * 1.1)]
        },
      },
      velocity: {
        title: 'Speed',
        icon: Gauge,
        color: '#8b5cf6',
        dataKey: 'velocity',
        unit: 'km/h',
        formatter: (value: number) => formatSpeed(value),
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.velocity as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [0, Math.ceil(max * 1.1)]
        },
      },
      grade: {
        title: 'Grade',
        icon: TrendingUp,
        color: '#06b6d4',
        dataKey: 'grade',
        unit: '%',
        formatter: (value: number) => formatGrade(value),
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.grade as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [0, Math.ceil(max * 1.1)]
        },
      },
      cadence: {
        title: 'Cadence',
        icon: Activity,
        color: '#ec4899',
        dataKey: 'cadence',
        unit: 'rpm',
        formatter: (value: number) => `${Math.round(value)} rpm`,
        domain: (data: Array<Record<string, number | string>>) => {
          const values = data
            .map(d => d.cadence as number)
            .filter(v => v !== null)
          const max = Math.max(...values)
          return [0, Math.ceil(max * 1.1)]
        },
      },
    }
    return configs[streamType as keyof typeof configs]
  }

  const renderChart = (streamType: string) => {
    const config = getStreamConfig(streamType)
    if (!config || !streamData[streamType]) return null

    const chartData = streamData[streamType]
    const Icon = config.icon

    return (
      <Card key={streamType}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon className="w-5 h-5" style={{ color: config.color }} />
            <span>{config.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id={`${streamType}Gradient`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={config.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={config.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="timeFormatted"
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                  tickFormatter={(value, index) => {
                    if (index % Math.ceil(chartData.length / 8) === 0) {
                      return value
                    }
                    return ''
                  }}
                />
                <YAxis
                  domain={config.domain(chartData)}
                  tick={{ fontSize: 12 }}
                  label={{
                    value: config.unit,
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="text-sm text-gray-600">Time: {label}</p>
                          <p
                            className="text-lg font-semibold"
                            style={{ color: config.color }}
                          >
                            {config.formatter(payload[0].value)}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  strokeWidth={2}
                  fill={`url(#${streamType}Gradient)`}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary stats */}
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-600">Max</div>
              <div
                className="text-xl font-bold"
                style={{ color: config.color }}
              >
                {config.formatter(
                  Math.max(
                    ...chartData
                      .map(d => d[config.dataKey] as number)
                      .filter(v => v !== null)
                  )
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Min</div>
              <div
                className="text-xl font-bold"
                style={{ color: config.color }}
              >
                {config.formatter(
                  Math.min(
                    ...chartData
                      .map(d => d[config.dataKey] as number)
                      .filter(v => v !== null)
                  )
                )}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Avg</div>
              <div
                className="text-xl font-bold"
                style={{ color: config.color }}
              >
                {config.formatter(
                  Math.round(
                    chartData
                      .map(d => d[config.dataKey] as number)
                      .filter(v => v !== null)
                      .reduce((sum, val) => sum + val, 0) /
                      chartData.filter(d => d[config.dataKey] !== null).length
                  )
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue={availableStreams[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {availableStreams.map(streamType => {
            const config = getStreamConfig(streamType)
            if (!config) return null
            const Icon = config.icon
            return (
              <TabsTrigger
                key={streamType}
                value={streamType}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{config.title}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {availableStreams.map(streamType => (
          <TabsContent key={streamType} value={streamType}>
            {renderChart(streamType)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
