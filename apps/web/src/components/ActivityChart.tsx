import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { XAxis, YAxis, AreaChart, Area } from 'recharts'
import { Activity, Heart, Zap } from 'lucide-react'

interface ActivityChartProps {
  activity: {
    distance: number
    moving_time: number
    average_speed: number
    average_heartrate?: number
  }
  type: 'speed' | 'heartrate' | 'elevation'
}

export const ActivityChart = ({ activity, type }: ActivityChartProps) => {
  // Generate mock data based on activity duration
  const generateMockData = (type: string) => {
    const dataPoints = Math.min(Math.floor(activity.moving_time / 60), 60) // Max 60 points
    const data = []

    for (let i = 0; i < dataPoints; i++) {
      const timeMinutes = (i * activity.moving_time) / (dataPoints * 60)

      if (type === 'speed') {
        // Generate speed data with some variation
        const baseSpeed = activity.average_speed
        const variation =
          baseSpeed * 0.3 * (Math.sin(i * 0.1) + Math.random() * 0.4 - 0.2)
        data.push({
          time: timeMinutes.toFixed(1),
          value: Math.max(0, baseSpeed + variation),
          label: `${timeMinutes.toFixed(1)} min`,
        })
      } else if (type === 'heartrate' && activity.average_heartrate) {
        // Generate heart rate data
        const baseHR = activity.average_heartrate
        const variation = 15 * (Math.sin(i * 0.15) + Math.random() * 0.6 - 0.3)
        data.push({
          time: timeMinutes.toFixed(1),
          value: Math.max(60, Math.min(200, baseHR + variation)),
          label: `${timeMinutes.toFixed(1)} min`,
        })
      }
    }

    return data
  }

  const data = generateMockData(type)

  const getChartConfig = () => {
    switch (type) {
      case 'speed':
        return {
          title: 'Speed Profile',
          icon: Zap,
          color: '#8b5cf6',
          unit: 'km/h',
          chartConfig: {
            value: {
              label: 'Speed',
              color: '#8b5cf6',
            },
          },
        }
      case 'heartrate':
        return {
          title: 'Heart Rate',
          icon: Heart,
          color: '#ef4444',
          unit: 'BPM',
          chartConfig: {
            value: {
              label: 'Heart Rate',
              color: '#ef4444',
            },
          },
        }
      default:
        return {
          title: 'Activity Data',
          icon: Activity,
          color: '#06b6d4',
          unit: '',
          chartConfig: {
            value: {
              label: 'Value',
              color: '#06b6d4',
            },
          },
        }
    }
  }

  const config = getChartConfig()
  const IconComponent = config.icon

  if (type === 'heartrate' && !activity.average_heartrate) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <IconComponent
            className={`w-5 h-5`}
            style={{ color: config.color }}
          />
          <span>{config.title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={config.chartConfig}
          className="h-[200px] w-full"
        >
          <AreaChart data={data}>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}m`}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value =>
                `${value.toFixed(0)}${config.unit ? ' ' + config.unit : ''}`
              }
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={value => [
                    `${Number(value).toFixed(1)} ${config.unit}`,
                    config.title,
                  ]}
                  labelFormatter={label => `Time: ${label} min`}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={config.color}
              strokeWidth={2}
              fill={config.color}
              fillOpacity={0.1}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
