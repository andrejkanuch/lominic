import { Injectable, Logger } from '@nestjs/common'
import {
  DetailedActivity,
  StreamSet,
  HeartRateZoneRanges,
  DetailedAthlete,
} from '@lominic/strava-api-types'
import { StravaService } from '../strava/strava.service'

// New interfaces for enhanced insights
interface UserGoals {
  type: 'marathon' | 'ftp_improvement' | 'general_fitness'
  targetDistance?: number // e.g., 42.2 for marathon
  targetFTP?: number
  targetDate?: string // ISO 8601
}

interface VisualizationData {
  weeklyDistance: { week: string; distance: number }[]
  hrZones: { zone: string; timeInZone: number }[]
  segmentProgress: {
    segmentId: number
    name: string
    time: number
    pr: boolean
  }[]
}

interface PhysicalStatus {
  ftp: number
  vo2Max: number
  runningEconomy: number
  criticalPower: { cp: number; wPrime: number }
  hrRecovery: number
  acwr: number
  sufferScore: number
  recommendations: string[]
  visualizations: VisualizationData
}

// Fallback data for missing fields - these would come from user profile or settings
const FALLBACK_USER_DATA = {
  age: 30,
  weight: 70, // kg
  restingHeartRate: 55,
  maxHeartRate: 190, // 220 - age, or field tested
  criticalPower: 240, // Critical Power in watts
  wPrime: 20000, // W' (W-prime) in joules
  criticalVelocity: 4.2, // m/s for running
  dPrime: 200, // D' for running in meters
}

// Performance Report Interface
export interface PerformanceReport {
  summary: ActivitySummary
  powerAnalysis?: PowerAnalysis
  hrAnalysis?: HeartRateAnalysis
  trainingLoad: TrainingLoadAnalysis
  efficiencyMetrics?: EfficiencyMetrics
  correlations?: CorrelationAnalysis
  recommendations: string[]
  riskAssessment: RiskAssessment
}

export interface ActivitySummary {
  totalActivities: number
  totalDistance: number // km
  totalTime: number // hours
  avgSpeed: number // km/h
  totalElevationGain: number // meters
  totalCalories: number
  sportTypeDistribution: Record<string, number>
}

export interface PowerAnalysis {
  averagePower: number
  maxPower: number
  normalizedPower: number
  intensityFactor: number
  trainingStressScore: number
  variabilityIndex: number
  powerDurationCurve: Map<number, number> // duration -> power
  estimatedFTP: number
  powerToWeightRatio: number
  category: string
}

export interface HeartRateAnalysis {
  averageHR: number
  maxHR: number
  hrZones: ZoneDistribution[]
  trimpScore: number
  trimpInterpretation: string
  hrVariability: number
}

export interface ZoneDistribution {
  zone: number
  minHeartRate: number
  maxHeartRate: number
  timeInZone: number
  percentage: number
}

export interface TrainingLoadAnalysis {
  acuteLoad: number
  chronicLoad: number
  acwr: number
  riskLevel: string
  fitnessScore: number
  fatigueScore: number
  performanceReadiness: number
  recommendations: string[]
}

export interface EfficiencyMetrics {
  efficiencyFactor: number
  aerobicDecoupling: number
  decouplingInterpretation: string
  energyCostOfRunning?: number
}

export interface CorrelationAnalysis {
  powerSpeedCorrelation: number
  hrPowerCorrelation: number
  gradeHrCorrelation: number
  interpretations: Record<string, string>
}

export interface RiskAssessment {
  injuryRisk: string
  acwrRisk: string
  fatigueRisk: string
  recommendations: string[]
}

@Injectable()
export class InsightsService {
  private readonly logger = new Logger(InsightsService.name)

  constructor(private readonly stravaService: StravaService) {}

  // Get athlete data from Strava API
  private async getAthleteData(userId: string): Promise<{
    weight: number
    ftp: number | null
    sex: string
    age?: number
    restingHeartRate?: number
    maxHeartRate?: number
    criticalPower: number
    wPrime: number
    criticalVelocity: number
    dPrime: number
  }> {
    try {
      const athlete = await this.stravaService.getAthlete(userId)

      // Calculate age from birth year if available (Strava doesn't provide age directly)
      let age: number | undefined
      if (athlete.created_at) {
        // Rough estimate based on account creation date
        const createdYear = new Date(athlete.created_at).getFullYear()
        const currentYear = new Date().getFullYear()
        age = currentYear - createdYear + 18 // Assume 18+ when account was created
      }

      // Calculate max heart rate based on sex and age
      let maxHeartRate: number | undefined
      if (athlete.sex && age) {
        if (athlete.sex === 'M') {
          maxHeartRate = 220 - age
        } else if (athlete.sex === 'F') {
          maxHeartRate = 226 - age
        }
      }

      return {
        weight: athlete.weight,
        ftp: athlete.ftp,
        sex: athlete.sex,
        age,
        restingHeartRate: FALLBACK_USER_DATA.restingHeartRate, // Not available from Strava
        maxHeartRate: maxHeartRate || FALLBACK_USER_DATA.maxHeartRate,
        criticalPower: athlete.ftp || FALLBACK_USER_DATA.criticalPower,
        wPrime: FALLBACK_USER_DATA.wPrime,
        criticalVelocity: FALLBACK_USER_DATA.criticalVelocity,
        dPrime: FALLBACK_USER_DATA.dPrime,
      }
    } catch (error) {
      this.logger.warn(
        `Failed to fetch athlete data for user ${userId}, using fallback data:`,
        error
      )
      return {
        weight: FALLBACK_USER_DATA.weight,
        ftp: null,
        sex: 'M',
        age: FALLBACK_USER_DATA.age,
        restingHeartRate: FALLBACK_USER_DATA.restingHeartRate,
        maxHeartRate: FALLBACK_USER_DATA.maxHeartRate,
        criticalPower: FALLBACK_USER_DATA.criticalPower,
        wPrime: FALLBACK_USER_DATA.wPrime,
        criticalVelocity: FALLBACK_USER_DATA.criticalVelocity,
        dPrime: FALLBACK_USER_DATA.dPrime,
      }
    }
  }

  generateInsights(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[],
    userId: string
  ): Promise<string[]> {
    return this.generateInsightsWithAthleteData(
      activity,
      streams,
      zones,
      historicalActivities,
      userId
    )
  }

  private async generateInsightsWithAthleteData(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[],
    userId: string
  ): Promise<string[]> {
    try {
      const athleteData = await this.getAthleteData(userId)
      const insights = []

      // 1. Basic Performance Metrics
      insights.push(
        ...this.calculateBasicPerformanceMetrics(activity, streams, athleteData)
      )

      // 2. Heart Rate Zone Analysis
      insights.push(
        ...this.calculateHeartRateZones(activity, streams, zones, athleteData)
      )

      // 3. Power Analysis (Cycling)
      if (activity.sport_type === 'Ride' && streams.power) {
        insights.push(
          ...this.calculatePowerMetrics(activity, streams, athleteData)
        )
      }

      // 4. Training Load Analysis
      insights.push(
        ...this.calculateTrainingLoad(activity, streams, historicalActivities)
      )

      // 5. Efficiency Metrics
      insights.push(
        ...this.calculateEfficiencyMetrics(activity, streams, athleteData)
      )

      // 6. Aerobic Decoupling Analysis
      insights.push(...this.calculateAerobicDecoupling(activity, streams))

      // 7. Running-Specific Analysis
      if (activity.sport_type === 'Run') {
        insights.push(
          ...this.calculateRunningMetrics(activity, streams, athleteData)
        )
      }

      // 8. Advanced Correlation Analysis
      insights.push(...this.calculateCorrelations(activity, streams))

      // 9. Performance Modeling
      insights.push(
        ...this.calculatePerformanceModeling(activity, streams, athleteData)
      )

      // 10. Injury Risk Assessment
      insights.push(...this.calculateInjuryRisk(activity, historicalActivities))

      return insights
    } catch (error) {
      this.logger.error(
        `Error generating insights for activity ${activity.id}:`,
        error
      )
      return ['Error generating insights. Please try again.']
    }
  }

  // Main resolver function for comprehensive physical status
  async resolvePhysicalStatus(
    userId: string,
    userGoals?: UserGoals
  ): Promise<PhysicalStatus> {
    try {
      const athleteData = await this.getAthleteData(userId)
      const activities = await this.stravaService.getRecentActivities(
        userId,
        100
      )
      const zones = await this.stravaService.getAthleteZones(userId)

      // Get streams for recent activities for detailed analysis
      const recentActivities = activities.slice(0, 10)
      const activityStreams = await Promise.all(
        recentActivities.map(activity =>
          this.stravaService.getActivityStreams(userId, parseInt(activity.id))
        )
      )

      // Calculate advanced metrics with type casting
      const ftpData = this.estimateFTP(activities as any[])
      const criticalPower = await this.calculateCriticalPower(
        activities as any[]
      )

      const runningEconomy =
        activityStreams.reduce(
          (sum, streams, i) =>
            sum +
            this.calculateRunningEconomy(
              recentActivities[i] as any,
              streams as any,
              athleteData.weight
            ),
          0
        ) / activityStreams.length

      const vo2Max = activities
        .filter(a => a.sport_type === 'Run')
        .reduce((max, a) => Math.max(max, this.estimateVO2MaxRun(a as any)), 0)

      const hrRecovery =
        activityStreams.reduce(
          (sum, streams) => sum + this.calculateHRRecovery(streams as any),
          0
        ) / activityStreams.length

      const acwr = this.calculateACWR(activities as any[])

      const sufferScore =
        activityStreams.reduce(
          (sum, streams, i) =>
            sum +
            this.calculateSufferScore(
              recentActivities[i] as any,
              streams as any,
              zones as any
            ),
          0
        ) / activityStreams.length

      const status: PhysicalStatus = {
        ftp: ftpData.ftp,
        vo2Max,
        runningEconomy,
        criticalPower,
        hrRecovery,
        acwr,
        sufferScore,
        recommendations: [],
        visualizations: {
          weeklyDistance: [],
          hrZones: [],
          segmentProgress: [],
        },
      }

      status.recommendations = this.generateRecommendations(
        status,
        activities as any[],
        userGoals
      )
      status.visualizations = this.generateVisualizationData(
        activities as any[]
      )

      return status
    } catch (error) {
      this.logger.error('Error resolving physical status:', error)

      // Check if it's a rate limit error
      if (error instanceof Error && error.message.includes('Rate Limit')) {
        throw new Error('Strava rate limit exceeded. Please try again later.')
      }

      throw new Error('Failed to fetch or process data')
    }
  }

  // Enhanced generateDetailedInsights method
  async generateDetailedInsights(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[],
    userId: string
  ) {
    try {
      const insights = await this.generateInsights(
        activity,
        streams,
        zones,
        historicalActivities,
        userId
      )

      // Calculate heart rate zones with additional metadata
      const hrZones = this.calculateDetailedHRZones(activity, streams, zones)

      // Calculate performance metrics
      const performanceMetrics = this.calculateDetailedPerformanceMetrics(
        activity,
        streams
      )

      // Calculate correlations
      const correlations = this.calculateDetailedCorrelations(activity, streams)

      // Calculate training load
      const trainingLoad = this.calculateDetailedTrainingLoad(
        activity,
        historicalActivities
      )

      // Try to get physical status, but don't fail if rate limited
      let physicalStatus = null
      try {
        physicalStatus = await this.resolvePhysicalStatus(userId)
      } catch (error) {
        this.logger.warn(
          `Could not fetch physical status due to rate limit or other error, using fallback data:`,
          error
        )
        // Provide fallback physical status data
        physicalStatus = {
          ftp: FALLBACK_USER_DATA.criticalPower,
          vo2Max: 50,
          runningEconomy: 0.8,
          criticalPower: {
            cp: FALLBACK_USER_DATA.criticalPower,
            wPrime: FALLBACK_USER_DATA.wPrime,
          },
          hrRecovery: 25,
          acwr: 1.0,
          sufferScore: 50,
          recommendations: ['Continue with current training plan'],
          visualizations: {
            weeklyDistance: [],
            hrZones: [],
            segmentProgress: [],
          },
        }
      }

      return {
        insights,
        heartRateZones: hrZones,
        performanceMetrics,
        correlations,
        trainingLoad,
        physicalStatus,
      }
    } catch (error) {
      this.logger.error(
        `Error generating detailed insights for activity ${activity.id}:`,
        error
      )
      throw new Error('Failed to generate detailed insights')
    }
  }

  // Generate comprehensive performance report
  async generatePerformanceReport(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet> = new Map(),
    zones?: HeartRateZoneRanges,
    userId?: string
  ): Promise<PerformanceReport> {
    try {
      if (!activities || activities.length === 0) {
        throw new Error('No activities provided for analysis')
      }

      // Get athlete data if userId is provided
      let athleteData: any = null
      if (userId) {
        try {
          athleteData = await this.getAthleteData(userId)
        } catch (error) {
          this.logger.warn(
            `Failed to fetch athlete data for performance report, using fallback data:`,
            error
          )
        }
      }

      const summary = this.calculateActivitySummary(activities)
      const trainingLoad = this.calculateComprehensiveTrainingLoad(activities)
      const recommendations = [
        'Focus on consistent training',
        'Monitor recovery',
      ]
      const riskAssessment =
        this.calculateComprehensiveRiskAssessment(activities)

      // Power analysis for cycling activities
      const cyclingActivities = activities.filter(a => a.sport_type === 'Ride')
      const powerAnalysis =
        cyclingActivities.length > 0
          ? this.calculateComprehensivePowerAnalysis(
              cyclingActivities,
              streamsMap,
              athleteData
            )
          : undefined

      // Heart rate analysis
      const hrActivities = activities.filter(a => a.average_heartrate)
      const hrAnalysis =
        hrActivities.length > 0 && zones
          ? this.calculateComprehensiveHRAnalysis(
              hrActivities,
              zones,
              athleteData
            )
          : undefined

      // Efficiency metrics
      const efficiencyMetrics = this.calculateComprehensiveEfficiencyMetrics(
        activities,
        streamsMap,
        athleteData
      )

      // Correlations
      const correlations = this.calculateComprehensiveCorrelations(
        activities,
        streamsMap
      )

      return {
        summary,
        powerAnalysis,
        hrAnalysis,
        trainingLoad,
        efficiencyMetrics,
        correlations,
        recommendations,
        riskAssessment,
      }
    } catch (error) {
      this.logger.error('Error generating performance report:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Failed to generate performance report: ${errorMessage}`)
    }
  }

  // Helper methods (simplified versions for brevity)
  private calculateBasicPerformanceMetrics(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    // Average Speed
    const avgSpeed =
      activity.moving_time > 0 ? activity.distance / activity.moving_time : 0 // m/s
    const avgSpeedKmh = avgSpeed * 3.6 // km/h
    insights.push(
      `Average Speed: ${avgSpeedKmh.toFixed(2)} km/h (${avgSpeed.toFixed(
        2
      )} m/s)`
    )

    // Power-to-Weight Ratio (Cycling)
    if (activity.sport_type === 'Ride' && activity.average_watts) {
      const powerToWeight = activity.average_watts / athleteData.weight
      let category = 'Recreational'
      if (powerToWeight > 5.0) category = 'Elite'
      else if (powerToWeight > 3.5) category = 'Competitive'
      insights.push(
        `Power-to-Weight: ${powerToWeight.toFixed(2)} W/kg (${category} level)`
      )
    }

    return insights
  }

  private calculateHeartRateZones(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    if (!streams.heartrate || !activity.average_heartrate) return insights

    const hrData = streams.heartrate.data
    const avgHr = activity.average_heartrate
    const maxHr = activity.max_heartrate || athleteData.maxHeartRate
    const restingHr = athleteData.restingHeartRate

    // Heart Rate Reserve
    const hrReserve = maxHr - restingHr

    // Calculate zones using Karvonen method
    const zoneTargets = {
      Z1: hrReserve * 0.5 + restingHr,
      Z2: hrReserve * 0.6 + restingHr,
      Z3: hrReserve * 0.7 + restingHr,
      Z4: hrReserve * 0.8 + restingHr,
      Z5: hrReserve * 0.9 + restingHr,
    }

    // Zone distribution
    const zoneCounts = { Z1: 0, Z2: 0, Z3: 0, Z4: 0, Z5: 0 }
    hrData.forEach(hr => {
      if (hr < zoneTargets.Z2) zoneCounts.Z1++
      else if (hr < zoneTargets.Z3) zoneCounts.Z2++
      else if (hr < zoneTargets.Z4) zoneCounts.Z3++
      else if (hr < zoneTargets.Z5) zoneCounts.Z4++
      else zoneCounts.Z5++
    })

    const totalPoints = hrData.length
    const zonePercentages = Object.entries(zoneCounts).map(([zone, count]) => ({
      zone,
      percentage: (count / totalPoints) * 100,
    }))

    insights.push(
      `HR Zone Distribution: ${zonePercentages
        .map(z => `${z.zone}: ${z.percentage.toFixed(1)}%`)
        .join(', ')}`
    )

    return insights
  }

  private calculatePowerMetrics(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    if (!streams.power) return insights

    const powerData = streams.power.data
    const avgPower = activity.average_watts || 0
    const maxPower =
      activity.max_watts || (powerData.length > 0 ? Math.max(...powerData) : 0)
    const ftp = athleteData.criticalPower

    // Normalized Power calculation
    const normalizedPower = this.calculateNormalizedPower(powerData)
    insights.push(`Normalized Power: ${normalizedPower.toFixed(0)}W`)

    // Intensity Factor
    const intensityFactor = normalizedPower / ftp
    insights.push(
      `Intensity Factor: ${intensityFactor.toFixed(
        2
      )} - ${this.interpretIntensityFactor(intensityFactor)}`
    )

    return insights
  }

  private calculateTrainingLoad(
    activity: DetailedActivity,
    streams: StreamSet,
    historicalActivities: DetailedActivity[]
  ): string[] {
    const insights = []

    // Acute:Chronic Workload Ratio (ACWR)
    const acuteLoad = this.calculateAcuteLoad(historicalActivities)
    const chronicLoad = this.calculateChronicLoad(historicalActivities)

    if (chronicLoad > 0) {
      const acwr = acuteLoad / chronicLoad
      insights.push(`ACWR: ${acwr.toFixed(2)} - ${this.interpretACWR(acwr)}`)
    }

    return insights
  }

  private calculateEfficiencyMetrics(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    if (!streams.heartrate || !activity.average_heartrate) return insights

    const avgHr = activity.average_heartrate

    // Efficiency Factor
    if (activity.sport_type === 'Ride' && activity.average_watts && avgHr > 0) {
      const efficiencyFactor = activity.average_watts / avgHr
      insights.push(`Efficiency Factor: ${efficiencyFactor.toFixed(2)} W/bpm`)
    }

    return insights
  }

  private calculateAerobicDecoupling(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    if (!streams.heartrate || activity.moving_time < 600) return insights

    const hrData = streams.heartrate.data
    const effortData = streams.power?.data || streams.smooth_velocity?.data

    if (!effortData) return insights

    const decoupling = this.calculateAerobicDecouplingValue(effortData, hrData)
    insights.push(
      `Aerobic Decoupling: ${decoupling.toFixed(
        2
      )}% - ${this.interpretAerobicDecoupling(decoupling)}`
    )

    return insights
  }

  private calculateRunningMetrics(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    if (activity.sport_type !== 'Run') return insights

    // Critical Velocity Model
    if (streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length
      const criticalVelocity = athleteData.criticalVelocity
      const dPrime = athleteData.dPrime

      const sustainableVelocity =
        criticalVelocity + dPrime / activity.moving_time
      insights.push(
        `Critical Velocity: ${criticalVelocity.toFixed(
          2
        )} m/s, Sustainable: ${sustainableVelocity.toFixed(2)} m/s`
      )
    }

    return insights
  }

  private calculateCorrelations(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    // Power vs Speed correlation
    if (streams.power && streams.smooth_velocity) {
      const correlation = this.calculatePearsonCorrelation(
        streams.power.data,
        streams.smooth_velocity.data
      )
      insights.push(
        `Power-Speed Correlation: ${correlation.toFixed(
          3
        )} - ${this.interpretCorrelation(correlation)}`
      )
    }

    return insights
  }

  private calculatePerformanceModeling(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteData: {
      weight: number
      ftp: number | null
      sex: string
      age?: number
      restingHeartRate?: number
      maxHeartRate?: number
      criticalPower: number
      wPrime: number
      criticalVelocity: number
      dPrime: number
    }
  ): string[] {
    const insights = []

    // Critical Power Model (Cycling)
    if (activity.sport_type === 'Ride' && streams.power) {
      const powerData = streams.power.data
      const criticalPower = athleteData.criticalPower
      const wPrime = athleteData.wPrime

      const sustainablePower = criticalPower + wPrime / activity.moving_time
      const avgPower =
        powerData.reduce((sum, p) => sum + p, 0) / powerData.length

      if (avgPower > sustainablePower) {
        insights.push(
          `Power exceeded sustainable level by ${(
            avgPower - sustainablePower
          ).toFixed(0)}W`
        )
      } else {
        insights.push(
          `Power within sustainable range (${avgPower.toFixed(
            0
          )}W vs ${sustainablePower.toFixed(0)}W)`
        )
      }
    }

    return insights
  }

  private calculateInjuryRisk(
    activity: DetailedActivity,
    historicalActivities: DetailedActivity[]
  ): string[] {
    const insights = []

    // Acute:Chronic Workload Ratio risk assessment
    const acuteLoad = this.calculateAcuteLoad(historicalActivities)
    const chronicLoad = this.calculateChronicLoad(historicalActivities)

    if (chronicLoad > 0) {
      const acwr = acuteLoad / chronicLoad
      if (acwr > 1.5) {
        insights.push(
          `⚠️ High injury risk: ACWR of ${acwr.toFixed(
            2
          )} exceeds safe threshold`
        )
      } else if (acwr > 1.3) {
        insights.push(
          `⚠️ Moderate injury risk: ACWR of ${acwr.toFixed(
            2
          )} approaching threshold`
        )
      }
    }

    return insights
  }

  // Helper calculation methods
  private calculateNormalizedPower(powerData: number[]): number {
    const validPower = powerData.filter(p => p > 0)
    if (validPower.length === 0) return 0

    const sumFourthPower = validPower.reduce(
      (sum, p) => sum + Math.pow(p, 4),
      0
    )
    return Math.pow(sumFourthPower / validPower.length, 0.25)
  }

  private calculateAcuteLoad(activities: DetailedActivity[]): number {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return activities
      .filter(a => new Date(a.start_date) >= sevenDaysAgo)
      .reduce((sum, a) => sum + (a.suffer_score || 0), 0)
  }

  private calculateChronicLoad(activities: DetailedActivity[]): number {
    const twentyEightDaysAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000)
    const recentActivities = activities.filter(
      a => new Date(a.start_date) >= twentyEightDaysAgo
    )
    if (recentActivities.length === 0) return 0
    return (
      recentActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) / 4
    )
  }

  private calculateAerobicDecouplingValue(
    effortData: number[],
    hrData: number[]
  ): number {
    const n = Math.min(effortData.length, hrData.length)
    if (n < 2) return 0

    const midPoint = Math.floor(n / 2)
    const firstHalfEffort = effortData.slice(0, midPoint)
    const firstHalfHr = hrData.slice(0, midPoint)
    const secondHalfEffort = effortData.slice(midPoint)
    const secondHalfHr = hrData.slice(midPoint)

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length

    const firstHalfEffortAvg = avg(firstHalfEffort)
    const firstHalfHrAvg = avg(firstHalfHr)
    const secondHalfEffortAvg = avg(secondHalfEffort)
    const secondHalfHrAvg = avg(secondHalfHr)

    if (firstHalfEffortAvg === 0 || firstHalfHrAvg === 0) return 0

    const firstHalfRatio = firstHalfEffortAvg / firstHalfHrAvg
    const secondHalfRatio = secondHalfEffortAvg / secondHalfHrAvg

    return ((firstHalfRatio - secondHalfRatio) / firstHalfRatio) * 100
  }

  private calculatePearsonCorrelation(x: number[], y: number[]): number {
    const n = Math.min(x.length, y.length)
    if (n < 2) return 0

    const avgX = x.slice(0, n).reduce((a, b) => a + b, 0) / n
    const avgY = y.slice(0, n).reduce((a, b) => a + b, 0) / n

    let numerator = 0
    let denominatorX = 0
    let denominatorY = 0

    for (let i = 0; i < n; i++) {
      const diffX = x[i] - avgX
      const diffY = y[i] - avgY
      numerator += diffX * diffY
      denominatorX += diffX * diffX
      denominatorY += diffY * diffY
    }

    if (denominatorX === 0 || denominatorY === 0) return 0
    return numerator / Math.sqrt(denominatorX * denominatorY)
  }

  // Interpretation helpers
  private interpretIntensityFactor(if_: number): string {
    if (if_ < 0.65) return 'Easy'
    if (if_ < 0.85) return 'Moderate'
    if (if_ < 1.05) return 'Hard'
    return 'Very Hard'
  }

  private interpretACWR(acwr: number): string {
    if (acwr < 0.8) return 'Detraining risk'
    if (acwr < 1.3) return 'Low injury risk'
    if (acwr < 1.5) return 'Moderate injury risk'
    return 'High injury risk'
  }

  private interpretAerobicDecoupling(decoupling: number): string {
    if (decoupling < 0) return 'Excellent aerobic fitness'
    if (decoupling < 5) return 'Good aerobic fitness'
    if (decoupling < 12) return 'Moderate cardiovascular drift'
    return 'Significant cardiovascular drift'
  }

  private interpretCorrelation(correlation: number): string {
    const absCorr = Math.abs(correlation)
    if (absCorr < 0.1) return 'No correlation'
    if (absCorr < 0.3) return 'Weak correlation'
    if (absCorr < 0.5) return 'Moderate correlation'
    if (absCorr < 0.7) return 'Strong correlation'
    return 'Very strong correlation'
  }

  // Additional methods for comprehensive analysis (simplified)
  private calculateActivitySummary(
    activities: DetailedActivity[]
  ): ActivitySummary {
    const totalDistance =
      activities.reduce((sum, a) => sum + a.distance, 0) / 1000
    const totalTime =
      activities.reduce((sum, a) => sum + a.moving_time, 0) / 3600
    const totalElevationGain = activities.reduce(
      (sum, a) => sum + a.total_elevation_gain,
      0
    )
    const totalCalories = activities.reduce(
      (sum, a) => sum + (a.calories || 0),
      0
    )
    const avgSpeed = totalTime > 0 ? totalDistance / totalTime : 0

    const sportTypeDistribution = activities.reduce(
      (acc, activity) => {
        acc[activity.sport_type] = (acc[activity.sport_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    return {
      totalActivities: activities.length,
      totalDistance,
      totalTime,
      avgSpeed,
      totalElevationGain,
      totalCalories,
      sportTypeDistribution,
    }
  }

  private calculateComprehensiveTrainingLoad(
    activities: DetailedActivity[]
  ): TrainingLoadAnalysis {
    const acuteLoad = this.calculateAcuteLoad(activities)
    const chronicLoad = this.calculateChronicLoad(activities)
    const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : 0

    return {
      acuteLoad,
      chronicLoad,
      acwr,
      riskLevel: this.assessRiskLevel(acwr),
      fitnessScore: 0,
      fatigueScore: 0,
      performanceReadiness: 0,
      recommendations: this.getLoadRecommendations(acwr),
    }
  }

  private calculateComprehensivePowerAnalysis(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>,
    athleteData?: any
  ): PowerAnalysis {
    const powerActivities = activities.filter(a => a.average_watts)
    if (powerActivities.length === 0) {
      throw new Error('No power data available')
    }

    const data = athleteData || {
      weight: FALLBACK_USER_DATA.weight,
      criticalPower: FALLBACK_USER_DATA.criticalPower,
    }

    const averagePower =
      powerActivities.reduce((sum, a) => sum + (a.average_watts || 0), 0) /
      powerActivities.length
    const maxPower =
      powerActivities.length > 0
        ? Math.max(...powerActivities.map(a => a.max_watts || 0))
        : 0
    const powerToWeightRatio = averagePower / data.weight

    let category = 'Recreational'
    if (powerToWeightRatio > 5.0) category = 'Elite'
    else if (powerToWeightRatio > 3.5) category = 'Competitive'

    return {
      averagePower,
      maxPower,
      normalizedPower: 0,
      intensityFactor: 0,
      trainingStressScore: 0,
      variabilityIndex: 0,
      powerDurationCurve: new Map(),
      estimatedFTP: data.criticalPower,
      powerToWeightRatio,
      category,
    }
  }

  private calculateComprehensiveHRAnalysis(
    activities: DetailedActivity[],
    zones: HeartRateZoneRanges,
    athleteData?: any
  ): HeartRateAnalysis {
    const data = athleteData || {
      restingHeartRate: FALLBACK_USER_DATA.restingHeartRate,
      maxHeartRate: FALLBACK_USER_DATA.maxHeartRate,
    }

    const averageHR =
      activities.reduce((sum, a) => sum + (a.average_heartrate || 0), 0) /
      activities.length
    const maxHR =
      activities.length > 0
        ? Math.max(...activities.map(a => a.max_heartrate || 0))
        : 0

    return {
      averageHR,
      maxHR,
      hrZones: [],
      trimpScore: 0,
      trimpInterpretation: 'Unknown',
      hrVariability: 0,
    }
  }

  private calculateComprehensiveEfficiencyMetrics(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>,
    athleteData?: any
  ): EfficiencyMetrics {
    return {
      efficiencyFactor: 0,
      aerobicDecoupling: 0,
      decouplingInterpretation: 'Unknown',
    }
  }

  private calculateComprehensiveCorrelations(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>
  ): CorrelationAnalysis {
    return {
      powerSpeedCorrelation: 0,
      hrPowerCorrelation: 0,
      gradeHrCorrelation: 0,
      interpretations: {},
    }
  }

  private calculateComprehensiveRiskAssessment(
    activities: DetailedActivity[]
  ): RiskAssessment {
    return {
      injuryRisk: 'Low',
      acwrRisk: 'Low',
      fatigueRisk: 'Low',
      recommendations: ['Continue current training load'],
    }
  }

  private assessRiskLevel(acwr: number): string {
    if (acwr <= 0.8) return 'Low'
    if (acwr <= 1.3) return 'Optimal'
    if (acwr <= 1.5) return 'Moderate'
    return 'High'
  }

  private getLoadRecommendations(acwr: number): string[] {
    if (acwr > 1.5) {
      return ['Reduce training intensity', 'Focus on recovery']
    }
    if (acwr < 0.8) {
      return ['Gradually increase training load']
    }
    return ['Maintain current training load']
  }

  private calculateDetailedHRZones(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges
  ) {
    if (!streams.heartrate || !activity.average_heartrate) {
      return this.getDefaultHRZones()
    }

    const hrData = streams.heartrate.data
    const maxHr = activity.max_heartrate || FALLBACK_USER_DATA.maxHeartRate
    const restingHr = FALLBACK_USER_DATA.restingHeartRate
    const hrReserve = maxHr - restingHr

    // Zone definitions with metadata
    const zoneDefinitions = [
      {
        zone: 1,
        min: 0.5,
        max: 0.6,
        description: 'Active Recovery',
        color: '#2E8B57',
      },
      {
        zone: 2,
        min: 0.6,
        max: 0.7,
        description: 'Aerobic Base',
        color: '#4682B4',
      },
      { zone: 3, min: 0.7, max: 0.8, description: 'Aerobic', color: '#FFD700' },
      {
        zone: 4,
        min: 0.8,
        max: 0.9,
        description: 'Threshold',
        color: '#FF6347',
      },
      {
        zone: 5,
        min: 0.9,
        max: 1.0,
        description: 'Neuromuscular',
        color: '#DC143C',
      },
    ]

    const zoneCounts = { Z1: 0, Z2: 0, Z3: 0, Z4: 0, Z5: 0 }
    const zoneTargets = {
      Z1: hrReserve * 0.5 + restingHr,
      Z2: hrReserve * 0.6 + restingHr,
      Z3: hrReserve * 0.7 + restingHr,
      Z4: hrReserve * 0.8 + restingHr,
      Z5: hrReserve * 0.9 + restingHr,
    }

    hrData.forEach(hr => {
      if (hr < zoneTargets.Z2) zoneCounts.Z1++
      else if (hr < zoneTargets.Z3) zoneCounts.Z2++
      else if (hr < zoneTargets.Z4) zoneCounts.Z3++
      else if (hr < zoneTargets.Z5) zoneCounts.Z4++
      else zoneCounts.Z5++
    })

    const totalPoints = hrData.length
    const timePerPoint = activity.moving_time / totalPoints

    return zoneDefinitions.map((def, index) => {
      const zoneKey = `Z${def.zone}` as keyof typeof zoneCounts
      const count = zoneCounts[zoneKey]
      const percentage = (count / totalPoints) * 100
      const timeInZone = count * timePerPoint

      return {
        zone: def.zone,
        minHeartRate: Math.round(hrReserve * def.min + restingHr),
        maxHeartRate: Math.round(hrReserve * def.max + restingHr),
        timeInZone: Math.round(timeInZone),
        percentage: Math.round(percentage * 10) / 10,
        description: def.description,
        color: def.color,
      }
    })
  }

  private getDefaultHRZones() {
    return [
      {
        zone: 1,
        minHeartRate: 95,
        maxHeartRate: 114,
        timeInZone: 0,
        percentage: 0,
        description: 'Active Recovery',
        color: '#2E8B57',
      },
      {
        zone: 2,
        minHeartRate: 115,
        maxHeartRate: 133,
        timeInZone: 0,
        percentage: 0,
        description: 'Aerobic Base',
        color: '#4682B4',
      },
      {
        zone: 3,
        minHeartRate: 134,
        maxHeartRate: 152,
        timeInZone: 0,
        percentage: 0,
        description: 'Aerobic',
        color: '#FFD700',
      },
      {
        zone: 4,
        minHeartRate: 153,
        maxHeartRate: 171,
        timeInZone: 0,
        percentage: 0,
        description: 'Threshold',
        color: '#FF6347',
      },
      {
        zone: 5,
        minHeartRate: 172,
        maxHeartRate: 190,
        timeInZone: 0,
        percentage: 0,
        description: 'Neuromuscular',
        color: '#DC143C',
      },
    ]
  }

  // Additional helper methods
  private calculateTRIMP(
    hrAvg: number,
    durationMin: number,
    hrRest: number,
    hrMax: number
  ): number {
    const hrReserve = hrMax - hrRest
    if (hrReserve <= 0) return 0

    const hrRatio = (hrAvg - hrRest) / hrReserve
    const genderCoefficient = 0.64 * Math.exp(1.92 * hrRatio) // For men
    return durationMin * hrRatio * genderCoefficient
  }

  private calculateTSS(
    durationSeconds: number,
    normalizedPower: number,
    intensityFactor: number,
    ftp: number
  ): number {
    if (ftp <= 0) return 0
    return (
      ((durationSeconds * normalizedPower * intensityFactor) / (ftp * 3600)) *
      100
    )
  }

  private calculateFitnessScore(activities: DetailedActivity[]): number {
    const recentActivities = activities.slice(0, 10)
    if (recentActivities.length === 0) return 0
    return (
      recentActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) /
      recentActivities.length
    )
  }

  private calculateFatigueScore(activities: DetailedActivity[]): number {
    const recentActivities = activities.slice(0, 3)
    if (recentActivities.length === 0) return 0
    return (
      recentActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) /
      recentActivities.length
    )
  }

  private calculateDetailedPerformanceMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ) {
    const avgSpeed =
      activity.moving_time > 0 ? activity.distance / activity.moving_time : 0 // m/s
    const avgSpeedKmh = avgSpeed * 3.6 // km/h
    // Calculate pace safely to avoid division by zero
    const distanceKm = activity.distance / 1000
    const avgPace = distanceKm > 0 ? activity.moving_time / 60 / distanceKm : 0 // min/km

    let speedVariability = 0
    if (streams.smooth_velocity && streams.smooth_velocity.data.length > 0) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length

      // Only calculate variability if average velocity is not zero
      if (avgVelocity > 0) {
        const variance =
          velocityData.reduce(
            (sum, v) => sum + Math.pow(v - avgVelocity, 2),
            0
          ) / velocityData.length
        const stdDev = Math.sqrt(variance)
        speedVariability = (stdDev / avgVelocity) * 100
      }
    }

    const avgHr = activity.average_heartrate || 0
    const maxHr = activity.max_heartrate || 0
    const trimp = this.calculateTRIMP(
      avgHr,
      activity.moving_time / 60,
      FALLBACK_USER_DATA.restingHeartRate,
      FALLBACK_USER_DATA.maxHeartRate
    )

    let efficiencyFactor = 0
    if (activity.sport_type === 'Ride' && activity.average_watts && avgHr > 0) {
      efficiencyFactor = activity.average_watts / avgHr
    } else if (
      activity.sport_type === 'Run' &&
      streams.smooth_velocity &&
      avgHr > 0
    ) {
      const avgVelocity =
        streams.smooth_velocity.data.reduce((sum, v) => sum + v, 0) /
        streams.smooth_velocity.data.length
      efficiencyFactor = avgVelocity / avgHr
    }

    let aerobicDecoupling = 0
    if (streams.heartrate && activity.moving_time >= 600) {
      const effortData = streams.power?.data || streams.smooth_velocity?.data
      if (effortData) {
        aerobicDecoupling = this.calculateAerobicDecouplingValue(
          effortData,
          streams.heartrate.data
        )
      }
    }

    let powerAnalysis = undefined
    if (activity.sport_type === 'Ride' && streams.power) {
      const powerData = streams.power.data
      const avgPower = activity.average_watts || 0
      const maxPower =
        activity.max_watts ||
        (powerData.length > 0 ? Math.max(...powerData) : 0)
      const normalizedPower = this.calculateNormalizedPower(powerData)
      const intensityFactor =
        FALLBACK_USER_DATA.criticalPower > 0
          ? normalizedPower / FALLBACK_USER_DATA.criticalPower
          : 0
      const tss = this.calculateTSS(
        activity.moving_time,
        normalizedPower,
        intensityFactor,
        FALLBACK_USER_DATA.criticalPower
      )
      const variabilityIndex = avgPower > 0 ? normalizedPower / avgPower : 0

      powerAnalysis = {
        averagePower: avgPower,
        maxPower,
        normalizedPower,
        intensityFactor,
        trainingStressScore: tss,
        variabilityIndex,
      }
    }

    return {
      averageSpeed: Math.round(avgSpeedKmh * 100) / 100,
      averagePace: Math.round(avgPace * 100) / 100,
      speedVariability: Math.round(speedVariability * 10) / 10,
      averageHeartRate: avgHr,
      maxHeartRate: maxHr,
      trimpScore: Math.round(trimp * 10) / 10,
      efficiencyFactor: Math.round(efficiencyFactor * 10000) / 10000,
      aerobicDecoupling: Math.round(aerobicDecoupling * 100) / 100,
      powerAnalysis,
    }
  }

  private calculateDetailedCorrelations(
    activity: DetailedActivity,
    streams: StreamSet
  ) {
    let powerSpeedCorrelation = 0
    let hrPowerCorrelation = 0
    let gradeHrCorrelation = 0

    if (streams.power && streams.smooth_velocity) {
      powerSpeedCorrelation = this.calculatePearsonCorrelation(
        streams.power.data,
        streams.smooth_velocity.data
      )
    }

    if (streams.power && streams.heartrate) {
      hrPowerCorrelation = this.calculatePearsonCorrelation(
        streams.power.data,
        streams.heartrate.data
      )
    }

    if (streams.smooth_grade && streams.heartrate) {
      gradeHrCorrelation = this.calculatePearsonCorrelation(
        streams.smooth_grade.data,
        streams.heartrate.data
      )
    }

    return {
      powerSpeedCorrelation: Math.round(powerSpeedCorrelation * 1000) / 1000,
      hrPowerCorrelation: Math.round(hrPowerCorrelation * 1000) / 1000,
      gradeHrCorrelation: Math.round(gradeHrCorrelation * 1000) / 1000,
    }
  }

  private calculateDetailedTrainingLoad(
    activity: DetailedActivity,
    historicalActivities: DetailedActivity[]
  ) {
    const acuteLoad = this.calculateAcuteLoad(historicalActivities)
    const chronicLoad = this.calculateChronicLoad(historicalActivities)
    const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : 0
    const fitnessScore = this.calculateFitnessScore(historicalActivities)
    const fatigueScore = this.calculateFatigueScore(historicalActivities)
    const performanceReadiness = fitnessScore - fatigueScore

    let riskLevel = 'Low'
    if (acwr > 1.5) riskLevel = 'High'
    else if (acwr > 1.3) riskLevel = 'Moderate'

    return {
      acuteLoad: Math.round(acuteLoad * 10) / 10,
      chronicLoad: Math.round(chronicLoad * 10) / 10,
      acwr: Math.round(acwr * 100) / 100,
      riskLevel,
      fitnessScore: Math.round(fitnessScore * 10) / 10,
      fatigueScore: Math.round(fatigueScore * 10) / 10,
      performanceReadiness: Math.round(performanceReadiness * 10) / 10,
    }
  }

  // Estimate FTP using multiple efforts
  private estimateFTP(activities: DetailedActivity[]): {
    ftp: number
    confidence: number
  } {
    const twentyMinEfforts = activities
      .filter(
        a =>
          a.moving_time >= 15 * 60 &&
          a.moving_time <= 25 * 60 &&
          a.average_watts
      )
      .map(a => a.average_watts || 0)
    const fiveMinEfforts = activities
      .filter(
        a => a.moving_time >= 4 * 60 && a.moving_time <= 6 * 60 && a.max_watts
      )
      .map(a => a.max_watts || 0)

    const best20Min =
      twentyMinEfforts.length > 0 ? Math.max(...twentyMinEfforts) : 0
    const best5Min = fiveMinEfforts.length > 0 ? Math.max(...fiveMinEfforts) : 0
    const ftp = best20Min ? best20Min * 0.95 : best5Min ? best5Min * 0.9 : 200 // Fallback
    const confidence =
      twentyMinEfforts.length >= 3
        ? 0.9
        : twentyMinEfforts.length >= 1
        ? 0.7
        : 0.5
    return { ftp, confidence }
  }

  // Calculate critical power and W' using Monod-Scherrer model
  private async calculateCriticalPower(
    activities: DetailedActivity[]
  ): Promise<{ cp: number; wPrime: number }> {
    try {
      const durations = [180, 300, 1200] // 3min, 5min, 20min
      const powerActivities = activities.filter(
        a => a.average_watts && a.moving_time >= 180
      )

      if (powerActivities.length < 3) {
        return {
          cp: FALLBACK_USER_DATA.criticalPower,
          wPrime: FALLBACK_USER_DATA.wPrime,
        }
      }

      const points = powerActivities.slice(0, 10).map(activity => ({
        duration: activity.moving_time / 60, // Convert to minutes
        power: activity.average_watts || 0,
      }))

      // Simple linear regression for critical power model
      const regression = this.calculateLinearRegression(points)
      return {
        cp: Math.max(regression.slope, 100), // Minimum 100W
        wPrime: Math.max(regression.intercept, 5000), // Minimum 5000J
      }
    } catch (error) {
      this.logger.warn(
        'Failed to calculate critical power, using fallback values:',
        error
      )
      return {
        cp: FALLBACK_USER_DATA.criticalPower,
        wPrime: FALLBACK_USER_DATA.wPrime,
      }
    }
  }

  // Calculate running economy
  private calculateRunningEconomy(
    activity: DetailedActivity,
    streams: StreamSet,
    athleteWeight: number
  ): number {
    if (
      !streams.smooth_velocity ||
      !streams.heartrate ||
      !activity.average_heartrate ||
      activity.sport_type !== 'Run'
    ) {
      return 0
    }

    const avgSpeed = activity.distance / activity.moving_time // m/s
    const avgHr = activity.average_heartrate
    const gradeAdjustedSpeed = this.adjustSpeedForGrade(
      streams.smooth_velocity.data,
      streams.smooth_grade?.data
    )

    const avgGradeAdjustedSpeed =
      gradeAdjustedSpeed.reduce((sum, speed) => sum + speed, 0) /
      gradeAdjustedSpeed.length
    return (avgHr / avgGradeAdjustedSpeed) * athleteWeight // kcal/km/kg
  }

  // Adjust speed for grade
  private adjustSpeedForGrade(
    velocities: number[],
    grades?: number[]
  ): number[] {
    if (!grades) return velocities
    return velocities.map((v, i) => v / (1 + (grades[i] || 0) / 100))
  }

  // Estimate VO2 max for running
  private estimateVO2MaxRun(activity: DetailedActivity): number {
    if (activity.sport_type !== 'Run') return 0

    // Calculate speed safely to avoid division by zero
    const distanceKm = activity.distance / 1000
    const timeMin = activity.moving_time / 60
    const speedMPerMin =
      distanceKm > 0 && timeMin > 0 ? (1000 / (timeMin / distanceKm)) * 60 : 0

    // Daniels and Gilbert formula
    const vo2Max =
      (-4.6 + 0.182258 * speedMPerMin + 0.000104 * speedMPerMin ** 2) /
      (0.8 +
        0.1894393 * Math.exp(-0.012778 * timeMin) +
        0.2989558 * Math.exp(-0.1932605 * timeMin))

    return Math.max(vo2Max, 30) // Minimum 30 ml/kg/min
  }

  // Calculate heart rate recovery
  private calculateHRRecovery(streams: StreamSet): number {
    if (!streams.heartrate || !streams.power) return 0

    const intenseSegments = this.identifyIntenseSegments(streams.power.data)
    const recoveryDrops = intenseSegments.map(segment => {
      const postSegmentHR = streams.heartrate.data.slice(
        segment.end + 60,
        segment.end + 120
      )
      return segment.peakHR - Math.min(...postSegmentHR)
    })

    return recoveryDrops.length > 0
      ? recoveryDrops.reduce((sum, d) => sum + d, 0) / recoveryDrops.length
      : 0
  }

  private identifyIntenseSegments(
    powerData: number[]
  ): { peakHR: number; end: number }[] {
    const segments: { peakHR: number; end: number }[] = []
    const threshold = powerData.length > 0 ? Math.max(...powerData) * 0.8 : 0 // 80% of max power

    const currentSegment = { start: 0, peakHR: 0, end: 0 }
    let inSegment = false

    for (let i = 0; i < powerData.length; i++) {
      if (powerData[i] > threshold) {
        if (!inSegment) {
          currentSegment.start = i
          inSegment = true
        }
        // Track peak HR during segment (would need HR data here)
      } else if (inSegment) {
        currentSegment.end = i
        segments.push({
          peakHR: currentSegment.peakHR,
          end: currentSegment.end,
        })
        inSegment = false
      }
    }

    return segments
  }

  // Calculate Acute-to-Chronic Workload Ratio (ACWR) - enhanced version
  private calculateACWR(activities: DetailedActivity[]): number {
    const now = Date.now()
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
    const twentyEightDaysAgo = now - 28 * 24 * 60 * 60 * 1000

    const acuteActivities = activities.filter(
      a => new Date(a.start_date).getTime() >= sevenDaysAgo
    )
    const chronicActivities = activities.filter(
      a => new Date(a.start_date).getTime() >= twentyEightDaysAgo
    )

    const acuteLoad = acuteActivities.reduce(
      (sum, a) => sum + (a.suffer_score || 0),
      0
    )
    const chronicLoad =
      chronicActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) / 4

    return chronicLoad > 0 ? acuteLoad / chronicLoad : 0
  }

  // Calculate suffer score (custom metric)
  private calculateSufferScore(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges
  ): number {
    if (!streams.heartrate || !zones.zones) return 0

    const timeInZones = this.calculateTimeInHRZones(
      streams.heartrate.data,
      zones.zones
    )
    return (
      timeInZones.reduce((score, time, i) => score + time * (i + 1), 0) /
      (activity.moving_time || 1)
    )
  }

  private calculateTimeInHRZones(hrData: number[], hrZones: any[]): number[] {
    const timeInZones = Array(hrZones.length).fill(0)

    for (const hr of hrData) {
      for (let i = hrZones.length - 1; i >= 0; i--) {
        if (hr >= hrZones[i].min) {
          timeInZones[i]++
          break
        }
      }
    }

    return timeInZones
  }

  // Generate personalized recommendations
  private generateRecommendations(
    status: PhysicalStatus,
    activities: DetailedActivity[],
    userGoals?: UserGoals
  ): string[] {
    const recommendations: string[] = []
    const { ftp, vo2Max, runningEconomy, hrRecovery, acwr } = status

    if (acwr > 1.5) {
      recommendations.push(
        'High ACWR detected (>1.5). Consider reducing training intensity or volume to prevent overtraining.'
      )
    }
    if (hrRecovery < 20) {
      recommendations.push(
        'Low HR recovery (<20 bpm). Focus on recovery strategies like sleep and nutrition.'
      )
    }
    if (userGoals?.type === 'marathon' && runningEconomy > 0.8) {
      recommendations.push(
        'Running economy is high (>0.8 kcal/km/kg). Include drills and strength training to improve efficiency.'
      )
    }
    if (
      userGoals?.type === 'ftp_improvement' &&
      userGoals.targetFTP &&
      ftp < userGoals.targetFTP
    ) {
      recommendations.push(
        `FTP (${ftp}W) is below target (${userGoals.targetFTP}W). Incorporate interval training to boost power output.`
      )
    }

    return recommendations
  }

  // Generate visualization data
  private generateVisualizationData(
    activities: DetailedActivity[]
  ): VisualizationData {
    const weeklyDistance = this.calculateWeeklyDistance(activities)
    const hrZones = this.calculateHRZoneDistribution(activities)
    const segmentProgress = this.calculateSegmentProgress(activities)

    return { weeklyDistance, hrZones, segmentProgress }
  }

  private calculateWeeklyDistance(
    activities: DetailedActivity[]
  ): { week: string; distance: number }[] {
    const weeklyMap = new Map<string, number>()

    for (const activity of activities) {
      const week = new Date(activity.start_date).toISOString().slice(0, 10)
      weeklyMap.set(week, (weeklyMap.get(week) || 0) + activity.distance / 1000) // Convert to km
    }

    return Array.from(weeklyMap, ([week, distance]) => ({ week, distance }))
  }

  private calculateHRZoneDistribution(
    activities: DetailedActivity[]
  ): { zone: string; timeInZone: number }[] {
    const zoneMap = new Map<string, number>()

    activities.forEach(activity => {
      if (activity.average_heartrate) {
        const zone = this.getHRZone(activity.average_heartrate)
        zoneMap.set(zone, (zoneMap.get(zone) || 0) + activity.moving_time)
      }
    })

    return Array.from(zoneMap, ([zone, time]) => ({ zone, timeInZone: time }))
  }

  private getHRZone(hr: number): string {
    if (hr < 120) return 'Z1'
    if (hr < 140) return 'Z2'
    if (hr < 160) return 'Z3'
    if (hr < 180) return 'Z4'
    return 'Z5'
  }

  private calculateSegmentProgress(
    activities: DetailedActivity[]
  ): { segmentId: number; name: string; time: number; pr: boolean }[] {
    // This would require segment effort data from Strava API
    // For now, return empty array as segment data isn't available in current structure
    return []
  }

  // Helper method for linear regression
  private calculateLinearRegression(
    points: { duration: number; power: number }[]
  ): { slope: number; intercept: number } {
    const n = points.length
    if (n < 2) return { slope: 0, intercept: 0 }

    const sumX = points.reduce((sum, p) => sum + p.duration, 0)
    const sumY = points.reduce((sum, p) => sum + p.power, 0)
    const sumXY = points.reduce((sum, p) => sum + p.duration * p.power, 0)
    const sumXX = points.reduce((sum, p) => sum + p.duration * p.duration, 0)

    const denominator = n * sumXX - sumX * sumX
    if (denominator === 0) return { slope: 0, intercept: 0 }

    const slope = (n * sumXY - sumX * sumY) / denominator
    const intercept = (sumY - slope * sumX) / n

    return { slope, intercept }
  }
}
