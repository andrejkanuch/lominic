import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HeartRateZoneChart } from './HeartRateZoneChart'
import {
  Activity,
  TrendingUp,
  Heart,
  Zap,
  Target,
  BarChart3,
  Clock,
  Gauge,
} from 'lucide-react'

interface PerformanceMetrics {
  averageSpeed: number
  averagePace: number
  speedVariability: number
  averageHeartRate: number
  maxHeartRate: number
  trimpScore: number
  efficiencyFactor: number
  aerobicDecoupling: number
  powerAnalysis?: {
    averagePower: number | null
    maxPower: number | null
    normalizedPower: number | null
    intensityFactor: number | null
    trainingStressScore: number | null
    variabilityIndex: number | null
  } | null
}

interface CorrelationAnalysis {
  powerSpeedCorrelation: number
  hrPowerCorrelation: number
  gradeHrCorrelation: number
}

interface TrainingLoadAnalysis {
  acuteLoad: number
  chronicLoad: number
  acwr: number
  riskLevel: string
  fitnessScore: number
  fatigueScore: number
  performanceReadiness: number
}

interface HeartRateZone {
  zone: number
  minHeartRate: number
  maxHeartRate: number
  timeInZone: number
  percentage: number
  description: string
  color: string
}

interface ActivityInsightsDashboardProps {
  insights: string[]
  heartRateZones: HeartRateZone[]
  performanceMetrics: PerformanceMetrics
  correlations: CorrelationAnalysis
  trainingLoad: TrainingLoadAnalysis
}

export const ActivityInsightsDashboard: React.FC<
  ActivityInsightsDashboardProps
> = ({
  insights,
  heartRateZones,
  performanceMetrics,
  correlations,
  trainingLoad,
}) => {
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCorrelationStrength = (correlation: number) => {
    const absCorr = Math.abs(correlation)
    if (absCorr < 0.1) return 'None'
    if (absCorr < 0.3) return 'Weak'
    if (absCorr < 0.5) return 'Moderate'
    if (absCorr < 0.7) return 'Strong'
    return 'Very Strong'
  }

  return (
    <div className="space-y-6">
      {/* Heart Rate Zones Chart */}
      <HeartRateZoneChart zones={heartRateZones} />

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.averageSpeed} km/h
            </div>
            <p className="text-xs text-muted-foreground">
              {performanceMetrics.averagePace} min/km pace
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.averageHeartRate} bpm
            </div>
            <p className="text-xs text-muted-foreground">
              Max: {performanceMetrics.maxHeartRate} bpm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Load</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.trimpScore}
            </div>
            <p className="text-xs text-muted-foreground">TRIMP Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceMetrics.efficiencyFactor}
            </div>
            <p className="text-xs text-muted-foreground">Efficiency Factor</p>
          </CardContent>
        </Card>
      </div>

      {/* Power Analysis (if available) */}
      {performanceMetrics.powerAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Power Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium">Average Power</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis?.averagePower || 'N/A'}W
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Max Power</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis?.maxPower || 'N/A'}W
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Normalized Power</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis?.normalizedPower || 'N/A'}W
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Intensity Factor</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis.intensityFactor}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">TSS</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis.trainingStressScore}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Variability Index</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.powerAnalysis.variabilityIndex}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training Load Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gauge className="h-5 w-5" />
            <span>Training Load Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm font-medium">Acute Load</div>
              <div className="text-2xl font-bold">{trainingLoad.acuteLoad}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Chronic Load</div>
              <div className="text-2xl font-bold">
                {trainingLoad.chronicLoad}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">ACWR</div>
              <div className="text-2xl font-bold">{trainingLoad.acwr}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Risk Level</div>
              <Badge className={getRiskLevelColor(trainingLoad.riskLevel)}>
                {trainingLoad.riskLevel}
              </Badge>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium">Fitness Score</div>
              <div className="text-xl font-bold">
                {trainingLoad.fitnessScore}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Fatigue Score</div>
              <div className="text-xl font-bold">
                {trainingLoad.fatigueScore}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Performance Readiness</div>
              <div className="text-xl font-bold">
                {trainingLoad.performanceReadiness}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Correlations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Correlation Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium">Power-Speed</div>
              <div className="text-2xl font-bold">
                {correlations.powerSpeedCorrelation}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCorrelationStrength(correlations.powerSpeedCorrelation)}{' '}
                correlation
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">HR-Power</div>
              <div className="text-2xl font-bold">
                {correlations.hrPowerCorrelation}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCorrelationStrength(correlations.hrPowerCorrelation)}{' '}
                correlation
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Grade-HR</div>
              <div className="text-2xl font-bold">
                {correlations.gradeHrCorrelation}
              </div>
              <div className="text-xs text-muted-foreground">
                {getCorrelationStrength(correlations.gradeHrCorrelation)}{' '}
                correlation
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Additional Metrics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium">Speed Variability</div>
              <div className="text-xl font-bold">
                {performanceMetrics.speedVariability}%
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Aerobic Decoupling</div>
              <div className="text-xl font-bold">
                {performanceMetrics.aerobicDecoupling}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Activity Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="text-sm text-gray-700">
                • {insight}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
