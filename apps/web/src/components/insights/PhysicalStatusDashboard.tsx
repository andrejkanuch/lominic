import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { Alert, AlertDescription } from '../ui/alert'
import { Activity, Heart, Zap, Target } from 'lucide-react'

const GET_PHYSICAL_STATUS = gql`
  query GetPhysicalStatus($userGoals: UserGoals) {
    getPhysicalStatus(userGoals: $userGoals) {
      ftp
      vo2Max
      runningEconomy
      criticalPower {
        cp
        wPrime
      }
      hrRecovery
      acwr
      sufferScore
      recommendations
      visualizations {
        weeklyDistance {
          week
          distance
        }
        hrZones {
          zone
          timeInZone
        }
        segmentProgress {
          segmentId
          name
          time
          pr
        }
      }
    }
  }
`

interface PhysicalStatusDashboardProps {
  userGoals?: {
    type: 'marathon' | 'ftp_improvement' | 'general_fitness'
    targetDistance?: number
    targetFTP?: number
    targetDate?: string
  }
}

export const PhysicalStatusDashboard: React.FC<
  PhysicalStatusDashboardProps
> = ({ userGoals }) => {
  const { data, loading, error } = useQuery(GET_PHYSICAL_STATUS, {
    variables: { userGoals },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Physical Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Failed to load physical status: {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  const status = data?.getPhysicalStatus

  if (!status) {
    return (
      <Alert>
        <AlertDescription>
          No physical status data available. Complete some activities to see
          your metrics.
        </AlertDescription>
      </Alert>
    )
  }

  const getACWRRiskLevel = (acwr: number) => {
    if (acwr > 1.5) return { level: 'High', color: 'destructive' }
    if (acwr > 1.3) return { level: 'Moderate', color: 'secondary' }
    if (acwr < 0.8) return { level: 'Low', color: 'outline' }
    return { level: 'Optimal', color: 'default' }
  }

  const acwrRisk = getACWRRiskLevel(status.acwr)

  return (
    <div className="grid gap-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">FTP</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status.ftp}W</div>
            <p className="text-xs text-muted-foreground">
              Functional Threshold Power
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VO₂ Max</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status.vo2Max.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">ml/kg/min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">HR Recovery</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.hrRecovery.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">bpm drop</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ACWR</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status.acwr.toFixed(2)}</div>
            <Badge
              variant={
                acwrRisk.color as
                  | 'default'
                  | 'secondary'
                  | 'destructive'
                  | 'outline'
              }
            >
              {acwrRisk.level}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Critical Power Model */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Power Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Critical Power (CP)</h4>
              <div className="text-2xl font-bold">
                {status.criticalPower.cp.toFixed(0)}W
              </div>
              <p className="text-sm text-muted-foreground">
                Sustainable power output
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">W' (W-prime)</h4>
              <div className="text-2xl font-bold">
                {status.criticalPower.wPrime.toFixed(0)}J
              </div>
              <p className="text-sm text-muted-foreground">
                Anaerobic work capacity
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Running Economy */}
      {status.runningEconomy > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Running Economy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {status.runningEconomy.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              kcal/km/kg - Lower is better
            </p>
            <Progress
              value={Math.min((status.runningEconomy / 1.0) * 100, 100)}
              className="mt-2"
            />
          </CardContent>
        </Card>
      )}

      {/* Training Load */}
      <Card>
        <CardHeader>
          <CardTitle>Training Load Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Suffer Score</span>
                <span className="text-sm text-muted-foreground">
                  {status.sufferScore.toFixed(1)}
                </span>
              </div>
              <Progress
                value={Math.min((status.sufferScore / 200) * 100, 100)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm">ACWR Risk</h4>
                <Badge
                  variant={
                    acwrRisk.color as
                      | 'default'
                      | 'secondary'
                      | 'destructive'
                      | 'outline'
                  }
                  className="mt-1"
                >
                  {acwrRisk.level}
                </Badge>
              </div>
              <div>
                <h4 className="font-medium text-sm">HR Recovery</h4>
                <Badge
                  variant={status.hrRecovery > 20 ? 'default' : 'destructive'}
                  className="mt-1"
                >
                  {status.hrRecovery > 20 ? 'Good' : 'Poor'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {status.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {status.recommendations.map(
                (recommendation: string, index: number) => (
                  <Alert key={index}>
                    <AlertDescription>{recommendation}</AlertDescription>
                  </Alert>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Distance Chart */}
      {status.visualizations.weeklyDistance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Distance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {status.visualizations.weeklyDistance
                .slice(-8)
                .map((week: { week: string; distance: number }) => (
                  <div
                    key={week.week}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">
                      {new Date(week.week).toLocaleDateString()}
                    </span>
                    <span className="text-sm font-medium">
                      {week.distance.toFixed(1)} km
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Heart Rate Zones */}
      {status.visualizations.hrZones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Heart Rate Zone Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {status.visualizations.hrZones.map(
                (zone: { zone: string; timeInZone: number }) => (
                  <div
                    key={zone.zone}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium">{zone.zone}</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(zone.timeInZone / 60)} min
                    </span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
