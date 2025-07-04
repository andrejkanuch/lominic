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
import { Heart } from 'lucide-react'
import { useGetActivityStreamsQuery } from '@/generated/graphql'

interface HeartRateChartProps {
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

export const HeartRateChart = ({ activityId }: HeartRateChartProps) => {
  const { data, loading, error } = useGetActivityStreamsQuery({
    variables: { activityId: activityId.toString() },
  })

  const chartData = useMemo(() => {
    console.log('Heart rate data:', data?.getActivityStreams?.heartrate)
    console.log('Time data:', data?.getActivityStreams?.time)

    if (
      !data?.getActivityStreams?.heartrate?.data ||
      !data?.getActivityStreams?.time?.data
    ) {
      console.log('Missing heart rate or time data')
      return []
    }

    const heartrateData = data.getActivityStreams.heartrate.data
    const timeData = data.getActivityStreams.time.data

    console.log('Heart rate data length:', heartrateData.length)
    console.log('Time data length:', timeData.length)
    console.log('First few HR values:', heartrateData.slice(0, 5))
    console.log('First few time values:', timeData.slice(0, 5))

    // Downsample for performance (max 200 points)
    const maxPoints = 200
    const downsampledHR = downsampleData(heartrateData, maxPoints)
    const downsampledTime = downsampleData(timeData, maxPoints)

    const result = downsampledHR.map((hr, index) => ({
      time: downsampledTime[index],
      heartrate: hr,
      timeFormatted: formatTime(downsampledTime[index]),
    }))

    console.log('Chart data length:', result.length)
    console.log('First few chart data points:', result.slice(0, 3))
    console.log('Chart data structure:', result[0])

    return result
  }, [data])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Heart Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">Loading heart rate data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Heart Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-red-500">Error loading heart rate data</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!chartData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Heart Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-gray-500">No heart rate data available</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Debug: Show raw data if chart doesn't render
  console.log('Rendering chart with data:', chartData.length, 'points')
  console.log('Sample data point:', chartData[0])

  // Calculate heart rate zones (simplified)
  const maxHR = Math.max(...chartData.map(d => d.heartrate))
  const minHR = Math.min(...chartData.map(d => d.heartrate))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-red-500" />
          <span>Heart Rate</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 border border-gray-200 bg-gray-50">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="heartRateGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="timeFormatted"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
                tickFormatter={(value, index) => {
                  // Show fewer time labels to avoid crowding
                  if (index % Math.ceil(chartData.length / 8) === 0) {
                    return value
                  }
                  return ''
                }}
              />
              <YAxis
                domain={[Math.floor(minHR * 0.9), Math.ceil(maxHR * 1.1)]}
                tick={{ fontSize: 12 }}
                label={{ value: 'BPM', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                        <p className="text-sm text-gray-600">Time: {label}</p>
                        <p className="text-lg font-semibold text-red-600">
                          {payload[0].value} BPM
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="heartrate"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#heartRateGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Heart Rate Summary */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-gray-600">Max HR</div>
            <div className="text-xl font-bold text-red-600">{maxHR} BPM</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600">Min HR</div>
            <div className="text-xl font-bold text-blue-600">{minHR} BPM</div>
          </div>
          <div className="text-center">
            <div className="text-gray-600">Avg HR</div>
            <div className="text-xl font-bold text-green-600">
              {Math.round(
                chartData.reduce((sum, d) => sum + d.heartrate, 0) /
                  chartData.length
              )}{' '}
              BPM
            </div>
          </div>
          <div className="text-center">
            <div className="text-gray-600">Duration</div>
            <div className="text-xl font-bold text-purple-600">
              {formatTime(chartData[chartData.length - 1]?.time || 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
