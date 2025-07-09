import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface HeartRateZone {
  zone: number
  minHeartRate: number
  maxHeartRate: number
  timeInZone: number
  percentage: number
  description: string
  color: string
}

interface HeartRateZoneChartProps {
  zones: HeartRateZone[]
  title?: string
}

export const HeartRateZoneChart: React.FC<HeartRateZoneChartProps> = ({
  zones,
  title = 'Heart Rate Training Zones',
}) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const totalTime = zones.reduce((sum, zone) => sum + zone.timeInZone, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {zones.map(zone => (
            <div key={zone.zone} className="flex items-center space-x-4">
              {/* Zone Label */}
              <div className="w-24 text-sm font-medium">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <span>Zone {zone.zone}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {zone.description}
                </div>
              </div>

              {/* HR Range */}
              <div className="w-20 text-xs text-gray-600">
                {zone.minHeartRate}-{zone.maxHeartRate} bpm
              </div>

              {/* Progress Bar */}
              <div className="flex-1">
                <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: `${zone.percentage}%`,
                      backgroundColor: zone.color,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-white drop-shadow-sm">
                      {zone.percentage > 5
                        ? `${zone.percentage.toFixed(1)}%`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time in Zone */}
              <div className="w-16 text-xs text-gray-600 text-right">
                {zone.timeInZone > 0 ? formatTime(zone.timeInZone) : '-'}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {totalTime > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Total Time: {formatTime(totalTime)}</span>
              <span>
                Primary Zone:{' '}
                {
                  zones.reduce((max, zone) =>
                    zone.percentage > max.percentage ? zone : max
                  ).description
                }
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
