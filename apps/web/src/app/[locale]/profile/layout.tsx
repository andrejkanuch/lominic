import React from 'react'
import ClientLayout from '@/components/ClientLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Heart,
  Target,
  Edit,
} from 'lucide-react'

const ClientProfile = () => {
  return (
    <ClientLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information and health settings
            </p>
          </div>
          <Button className="bg-pulse-500 hover:bg-pulse-600">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-pulse-500" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Your basic profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="bg-pulse-100 text-pulse-600 text-xl font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    John Doe
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-pulse-100 text-pulse-700"
                  >
                    Premium Member
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-gray-900">john.doe@example.com</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-gray-900">+1 (555) 123-4567</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <p className="text-gray-900">San Francisco, CA</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Member Since</span>
                  </div>
                  <p className="text-gray-900">January 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-pulse-500" />
                <span>Health Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Avg Heart Rate</span>
                  </div>
                  <span className="font-semibold text-gray-900">72 BPM</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">Daily Steps</span>
                  </div>
                  <span className="font-semibold text-gray-900">8,542</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Weekly Workouts</span>
                  </div>
                  <span className="font-semibold text-gray-900">5</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">Health Score</p>
                  <div className="text-3xl font-bold text-pulse-600">
                    87/100
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    Excellent
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Goals</CardTitle>
              <CardDescription>Your current fitness objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weight Loss</span>
                  <Badge variant="outline">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Daily Steps (10,000)</span>
                  <Badge className="bg-pulse-100 text-pulse-700">
                    85% Complete
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly Workouts (5x)</span>
                  <Badge className="bg-green-100 text-green-700">
                    Completed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Your health tracking preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Units</span>
                  <span className="text-sm font-medium">Metric</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notifications</span>
                  <Badge className="bg-pulse-100 text-pulse-700">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Sync</span>
                  <Badge className="bg-green-100 text-green-700">
                    Connected
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  )
}

export default ClientProfile
