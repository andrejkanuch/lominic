import React from 'react'
import { MapPin } from 'lucide-react'
import { GetActivityByIdQuery } from '@/generated/graphql'

interface ActivityMapProps {
  activity: GetActivityByIdQuery['getActivityById']
}

export const ActivityMap = ({ activity }: ActivityMapProps) => {
  // For now, we'll show a placeholder map since we don't have Mapbox integrated
  // In a real implementation, this would render an actual map with the route

  return (
    <div className="space-y-4">
      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center space-y-2">
          <MapPin className="w-12 h-12 mx-auto text-gray-400" />
          <p className="text-gray-500 font-medium">Route Map</p>
          <p className="text-sm text-gray-400">Map integration coming soon</p>
        </div>
      </div>

      {/* Route Info */}
      {activity.polyline && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                Start Point
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {activity.start_latlng?.lat?.toFixed(4)},{' '}
              {activity.start_latlng?.lng?.toFixed(4)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">
                End Point
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {activity.end_latlng?.lat?.toFixed(4)},{' '}
              {activity.end_latlng?.lng?.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
