import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'

interface WeeklyProgressProps {
  weeklyData: {
    day: string
    distance: number
    activities: number
    time: number
  }[]
}

export const WeeklyProgress = ({ weeklyData }: WeeklyProgressProps) => {
  const chartConfig = {
    distance: {
      label: 'Distance (km)',
      color: '#8b5cf6',
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <span>This Week's Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={weeklyData}>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `${value}km`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={value => [
                    `${Number(value).toFixed(1)} km`,
                    'Distance',
                  ]}
                  labelFormatter={label => `${label}`}
                />
              }
            />
            <Bar dataKey="distance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
