// import React from 'react'
// import Image from 'next/image'

// interface StravaConnectButtonProps {
//   onClick: () => void
//   variant?: 'orange' | 'white'
//   size?: '1x' | '2x'
//   className?: string
//   disabled?: boolean
// }

// export const StravaConnectButton: React.FC<StravaConnectButtonProps> = ({
//   onClick,
//   variant = 'orange',
//   size = '1x',
//   className = '',
//   disabled = false,
// }) => {
//   const getImagePath = () => {
//     const color = variant === 'orange' ? 'orange' : 'white'
//     const scale = size === '2x' ? '_x2' : ''
//     return `/1.1 Connect with Strava Buttons/Connect with Strava ${
//       color.charAt(0).toUpperCase() + color.slice(1)
//     }/btn_strava_connect_with_${color}${scale}.png`
//   }

//   const getImageAlt = () => {
//     return `Connect with Strava - ${variant} button`
//   }

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`inline-block transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//       style={{
//         height: size === '2x' ? '96px' : '48px',
//       }}
//     >
//       <Image
//         src={getImagePath()}
//         alt={getImageAlt()}
//         width={size === '2x' ? 400 : 200}
//         height={size === '2x' ? 96 : 48}
//         className="h-full w-auto"
//         priority
//       />
//     </button>
//   )
// }
