import React, { useState } from 'react'
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
  Bike,
  Footprints,
  Trophy,
  Users,
  Crown,
} from 'lucide-react'
import { EditProfileDialog } from '@/components/profile/EditProfileDialog'
import { useQuery } from '@apollo/client'
import { GetAthleteDocument, GetAthleteQuery } from '@/generated/graphql'

const ProfileContent = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Fetch Strava athlete data
  const { data: stravaData, error: stravaError } =
    useQuery<GetAthleteQuery>(GetAthleteDocument)

  // Mock user data - in a real app, this would come from API/context
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: '',
    memberSince: 'January 2024',
    healthStats: {
      avgHeartRate: 72,
      dailySteps: 8542,
      weeklyWorkouts: 5,
      healthScore: 87,
    },
  })

  const handleSaveProfile = (data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
  }) => {
    setUserData(prev => ({
      ...prev,
      ...data,
    }))
  }

  // Format Strava data
  const formatStravaDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  const getAthleteTypeLabel = (type: number) => {
    switch (type) {
      case 0:
        return 'Cyclist'
      case 1:
        return 'Runner'
      case 2:
        return 'Triathlete'
      default:
        return 'Athlete'
    }
  }

  const getMeasurementLabel = (preference: string) => {
    return preference === 'feet' ? 'Imperial' : 'Metric'
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and health settings
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Personal Information</span>
              {stravaData?.getAthlete && (
                <Badge className="bg-orange-100 text-orange-700">
                  <Crown className="w-3 h-3 mr-1" />
                  Strava Connected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {stravaData?.getAthlete
                ? 'Your Strava profile information'
                : 'Your basic profile details'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={stravaData?.getAthlete?.profile || userData.avatar}
                  alt="Profile"
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                  {stravaData?.getAthlete
                    ? `${stravaData.getAthlete.firstname[0]}${stravaData.getAthlete.lastname[0]}`
                    : `${userData.firstName[0]}${userData.lastName[0]}`}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {stravaData?.getAthlete
                    ? `${stravaData.getAthlete.firstname} ${stravaData.getAthlete.lastname}`
                    : `${userData.firstName} ${userData.lastName}`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {stravaData?.getAthlete?.premium
                      ? 'Strava Premium'
                      : 'Premium Member'}
                  </Badge>
                  {stravaData?.getAthlete && (
                    <Badge variant="outline">
                      {getAthleteTypeLabel(stravaData.getAthlete.athlete_type)}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p className="text-foreground">{userData.email}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p className="text-foreground">{userData.phone}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-foreground">
                  {stravaData?.getAthlete
                    ? `${stravaData.getAthlete.city}, ${stravaData.getAthlete.state}`
                    : userData.location}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Member Since</span>
                </div>
                <p className="text-foreground">
                  {stravaData?.getAthlete
                    ? formatStravaDate(stravaData.getAthlete.created_at)
                    : userData.memberSince}
                </p>
              </div>

              {stravaData?.getAthlete && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Followers</span>
                    </div>
                    <p className="text-foreground">
                      {stravaData.getAthlete.follower_count}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">Following</span>
                    </div>
                    <p className="text-foreground">
                      {stravaData.getAthlete.friend_count}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Strava Gear Section */}
            {stravaData?.getAthlete &&
              (stravaData.getAthlete.bikes?.length > 0 ||
                stravaData.getAthlete.shoes?.length > 0) && (
                <div className="space-y-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground">Gear</h4>

                  {stravaData.getAthlete.bikes?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Bike className="w-4 h-4" />
                        <span className="text-sm font-medium">Bikes</span>
                      </div>
                      <div className="space-y-1">
                        {stravaData.getAthlete.bikes.map(bike => (
                          <div
                            key={bike.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground">
                              {bike.name}
                              {bike.primary && (
                                <Badge className="ml-2 text-xs">Primary</Badge>
                              )}
                            </span>
                            <span className="text-muted-foreground">
                              {(bike.distance / 1000).toFixed(1)} km
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stravaData.getAthlete.shoes?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Footprints className="w-4 h-4" />
                        <span className="text-sm font-medium">Shoes</span>
                      </div>
                      <div className="space-y-1">
                        {stravaData.getAthlete.shoes.map(shoe => (
                          <div
                            key={shoe.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-foreground">
                              {shoe.name}
                              {shoe.primary && (
                                <Badge className="ml-2 text-xs">Primary</Badge>
                              )}
                            </span>
                            <span className="text-muted-foreground">
                              {(shoe.distance / 1000).toFixed(1)} km
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
          </CardContent>
        </Card>

        {/* Health Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>Health Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium">Avg Heart Rate</span>
                </div>
                <span className="font-semibold text-foreground">
                  {userData.healthStats.avgHeartRate} BPM
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">Daily Steps</span>
                </div>
                <span className="font-semibold text-foreground">
                  {userData.healthStats.dailySteps.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-info" />
                  <span className="text-sm font-medium">Weekly Workouts</span>
                </div>
                <span className="font-semibold text-foreground">
                  {userData.healthStats.weeklyWorkouts}
                </span>
              </div>

              {stravaData?.getAthlete && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">FTP</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stravaData.getAthlete.ftp
                        ? `${stravaData.getAthlete.ftp}W`
                        : 'Not set'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">Weight</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {stravaData.getAthlete.weight > 0
                        ? `${stravaData.getAthlete.weight}kg`
                        : 'Not set'}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Health Score</p>
                <div className="text-3xl font-bold text-primary">
                  {userData.healthStats.healthScore}/100
                </div>
                <Badge className="bg-success/10 text-success">Excellent</Badge>
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
                <Badge className="bg-primary/10 text-primary">
                  85% Complete
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Weekly Workouts (5x)</span>
                <Badge className="bg-success/10 text-success">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Your health tracking preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Units</span>
                <span className="text-sm font-medium">
                  {stravaData?.getAthlete
                    ? getMeasurementLabel(
                        stravaData.getAthlete.measurement_preference
                      )
                    : 'Metric'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <Badge className="bg-primary/10 text-primary">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Sync</span>
                <Badge
                  className={
                    stravaData?.getAthlete
                      ? 'bg-success/10 text-success'
                      : 'bg-gray-100 text-gray-600'
                  }
                >
                  {stravaData?.getAthlete ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strava Connection Status */}
      {stravaError && (
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <p className="text-sm text-destructive">
                Strava Connection Error
              </p>
              <p className="text-xs text-muted-foreground">
                Unable to fetch Strava data. Please check your connection.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentData={{
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
          location: userData.location,
          avatar: userData.avatar,
        }}
        onSave={handleSaveProfile}
      />
    </div>
  )
}

export default ProfileContent
