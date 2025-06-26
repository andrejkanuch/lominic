'use client'

import { usePathname } from 'next/navigation'

export default function ClientDashboard() {
  const pathname = usePathname()

  // Determine content based on current path
  const renderContent = () => {
    if (!pathname) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
      )
    }

    if (pathname.includes('/training')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Training Plan</h2>
          <p className="text-gray-600">
            Your training schedule will appear here.
          </p>
        </div>
      )
    }

    if (pathname.includes('/stats')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Statistics</h2>
          <p className="text-gray-600">
            Stats and progress graphs coming soon.
          </p>
        </div>
      )
    }

    if (pathname.includes('/settings')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-gray-600">Update your preferences here.</p>
        </div>
      )
    }

    // Default overview
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-600">Welcome to your dashboard!</p>
      </div>
    )
  }

  return renderContent()
}
