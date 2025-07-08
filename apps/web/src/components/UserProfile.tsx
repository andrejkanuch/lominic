'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRBAC, Permission } from '@/hooks/use-rbac'
import {
  useUpdateOwnProfileMutation,
  GetCurrentUserDocument,
  useGetStravaActivitiesQuery,
} from '@/generated/graphql'
import { useApolloClient } from '@apollo/client'
import { RoleBasedComponent } from '@/components/RoleBasedComponent'
import { StravaConnectButton } from '@/components/ui/strava-connect-button'

export function UserProfile() {
  const { user, hasPermission } = useRBAC()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const { data, loading, error, refetch } = useGetStravaActivitiesQuery({
    variables: { limit: 5 as never },
    skip: !user,
  })

  const [updateProfile, { loading: saving }] = useUpdateOwnProfileMutation()
  const apolloClient = useApolloClient()

  const handleSave = async () => {
    if (!hasPermission(Permission.UPDATE_OWN_PROFILE)) {
      toast.error("You don't have permission to update your profile")
      return
    }

    try {
      await updateProfile({
        variables: {
          updateUserInput: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      })

      await apolloClient.refetchQueries({ include: [GetCurrentUserDocument] })

      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update profile')
      console.error(error)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    })
    setIsEditing(false)
  }

  const handleStravaConnect = () => {
    if (!user || !user.id) {
      toast.error(
        'User information not available. Please try logging in again.'
      )
      return
    }

    const apiBase = (
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/graphql'
    ).replace(/\/?graphql$/, '')
    const connectUrl = `${apiBase}/api/strava/connect?state=${user.id}`

    // Open in popup window
    const popup = window.open(
      connectUrl,
      'strava-connect',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    )

    // Check if popup was blocked
    if (!popup) {
      toast.error('Popup blocked! Please allow popups for this site.')
      return
    }

    // Listen for the popup to close, then refetch the data.
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed)
        toast.success('Strava connection process finished.')
        refetch() // Refresh activities data
      }
    }, 1000)
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Strava Activities</h2>
            {loading && <p>Loading activities...</p>}
            {error && (
              <div className="space-y-2">
                <p className="text-gray-600 mb-2">
                  Connect your account to Strava to see recent activities.
                </p>
                <div className="flex gap-2">
                  <StravaConnectButton onClick={handleStravaConnect} />
                </div>
              </div>
            )}
            {data?.getStravaActivities && (
              <div>
                <h3 className="text-lg font-medium mb-2">Recent Activities</h3>
                <ul className="space-y-2">
                  {data.getStravaActivities.map(act => (
                    <li key={act.id} className="border p-3 rounded">
                      <div className="font-medium">{act.name}</div>
                      <div className="text-sm text-gray-600">
                        {Math.round(act.distance / 1000)} km –{' '}
                        {Math.round(act.moving_time / 60)} min
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <RoleBasedComponent permissions={Permission.UPDATE_OWN_PROFILE}>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </RoleBasedComponent>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData(prev => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData(prev => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.lastName}</p>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData(prev => ({ ...prev, email: e.target.value }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label>Email Verified</Label>
              <p className="text-gray-600">
                {user.isEmailVerified ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <Label>Member Since</Label>
              <p className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RoleBasedComponent permissions={Permission.VIEW_ANALYTICS}>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have access to view analytics and system data.
            </p>
          </CardContent>
        </Card>
      </RoleBasedComponent>

      <RoleBasedComponent permissions={Permission.MANAGE_ROLES}>
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have permission to manage user roles and permissions.
            </p>
          </CardContent>
        </Card>
      </RoleBasedComponent>
    </div>
  )
}
