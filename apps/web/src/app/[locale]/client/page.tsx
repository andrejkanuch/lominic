'use client'

import { usePathname } from 'next/navigation'
import { UserProfile } from '@/components/UserProfile'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function ProfilePage() {
  const pathname = usePathname()

  // Determine content based on current path
  const renderContent = () => {
    if (!pathname) {
      return <UserProfile />
    }

    if (pathname.includes('/settings')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <p className="text-gray-600">Settings page coming soon...</p>
        </div>
      )
    }

    if (pathname.includes('/billing')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Billing</h2>
          <p className="text-gray-600">Billing page coming soon...</p>
        </div>
      )
    }

    if (pathname.includes('/security')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Security</h2>
          <p className="text-gray-600">Security settings coming soon...</p>
        </div>
      )
    }

    if (pathname.includes('/notifications')) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>
          <p className="text-gray-600">
            Notification preferences coming soon...
          </p>
        </div>
      )
    }

    // Default profile
    return <UserProfile />
  }

  return <ProtectedRoute>{renderContent()}</ProtectedRoute>
}
