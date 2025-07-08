import React from 'react'
import Image from 'next/image'

interface StravaApiLogoProps {
  type: 'powered' | 'compatible'
  variant: 'horizontal' | 'stacked'
  color: 'orange' | 'white' | 'black'
  size?: '1x' | '2x'
  className?: string
  height?: number
}

export const StravaApiLogo: React.FC<StravaApiLogoProps> = ({
  type,
  variant,
  color,
  size = '1x',
  className = '',
  height,
}) => {
  const getImagePath = () => {
    const typePrefix = type === 'powered' ? 'pwrdBy' : 'cptblWith'
    const scale = size === '2x' ? '_x2' : ''
    const layout = variant === 'horizontal' ? 'horiz' : 'stack'

    return `/1.2-Strava-API-Logos/${
      type === 'powered' ? 'Powered by Strava' : 'Compatible with Strava'
    }/${typePrefix}_strava_${color}/api_logo_${typePrefix}_strava_${layout}_${color}${scale}.png`
  }

  const getImageAlt = () => {
    const typeText =
      type === 'powered' ? 'Powered by Strava' : 'Compatible with Strava'
    return `${typeText} - ${color} ${variant} logo`
  }

  const defaultHeight = size === '2x' ? 60 : 30

  return (
    <div className={`inline-block ${className}`}>
      <Image
        src={getImagePath()}
        alt={getImageAlt()}
        width={
          variant === 'horizontal'
            ? size === '2x'
              ? 300
              : 150
            : size === '2x'
            ? 120
            : 60
        }
        height={height || defaultHeight}
        className="h-auto w-auto"
        style={{ height: height || defaultHeight }}
      />
    </div>
  )
}
