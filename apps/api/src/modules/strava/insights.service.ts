import { Injectable, Logger } from '@nestjs/common'
import {
  DetailedActivity,
  StreamSet,
  HeartRateZoneRanges,
} from '@lominic/strava-api-types'

// Mock data for missing fields - these would come from user profile or settings
const MOCK_USER_DATA = {
  age: 30,
  weight: 70, // kg
  restingHeartRate: 55,
  maxHeartRate: 190, // 220 - age, or field tested
  ftp: 250, // Functional Threshold Power in watts
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

  constructor() {}

  generateInsights(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[]
  ): string[] {
    try {
      const insights = []

      // 1. Basic Performance Metrics
      insights.push(...this.calculateBasicPerformanceMetrics(activity, streams))

      // 2. Heart Rate Zone Analysis
      insights.push(...this.calculateHeartRateZones(activity, streams, zones))

      // 3. Power Analysis (Cycling)
      if (activity.sport_type === 'Ride' && streams.power) {
        insights.push(...this.calculatePowerMetrics(activity, streams))
      }

      // 4. Training Load Analysis
      insights.push(
        ...this.calculateTrainingLoad(activity, streams, historicalActivities)
      )

      // 5. Efficiency Metrics
      insights.push(...this.calculateEfficiencyMetrics(activity, streams))

      // 6. Aerobic Decoupling Analysis
      insights.push(...this.calculateAerobicDecoupling(activity, streams))

      // 7. Running-Specific Analysis
      if (activity.sport_type === 'Run') {
        insights.push(...this.calculateRunningMetrics(activity, streams))
      }

      // 8. Advanced Correlation Analysis
      insights.push(...this.calculateCorrelations(activity, streams))

      // 9. Performance Modeling
      insights.push(...this.calculatePerformanceModeling(activity, streams))

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

  // Generate comprehensive performance report
  async generatePerformanceReport(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet> = new Map(),
    zones?: HeartRateZoneRanges
  ): Promise<PerformanceReport> {
    try {
      if (!activities || activities.length === 0) {
        throw new Error('No activities provided for analysis')
      }

      const summary = this.calculateActivitySummary(activities)
      const trainingLoad = this.calculateComprehensiveTrainingLoad(activities)
      const recommendations = this.generateRecommendations(activities)
      const riskAssessment =
        this.calculateComprehensiveRiskAssessment(activities)

      // Power analysis for cycling activities
      const cyclingActivities = activities.filter(a => a.sport_type === 'Ride')
      const powerAnalysis =
        cyclingActivities.length > 0
          ? this.calculateComprehensivePowerAnalysis(
              cyclingActivities,
              streamsMap
            )
          : undefined

      // Heart rate analysis
      const hrActivities = activities.filter(a => a.average_heartrate)
      const hrAnalysis =
        hrActivities.length > 0 && zones
          ? this.calculateComprehensiveHRAnalysis(hrActivities, zones)
          : undefined

      // Efficiency metrics
      const efficiencyMetrics = this.calculateComprehensiveEfficiencyMetrics(
        activities,
        streamsMap
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

  // Generate detailed insights with structured data for charts
  async generateDetailedInsights(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[]
  ) {
    try {
      const insights = this.generateInsights(
        activity,
        streams,
        zones,
        historicalActivities
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

      return {
        insights,
        heartRateZones: hrZones,
        performanceMetrics,
        correlations,
        trainingLoad,
      }
    } catch (error) {
      this.logger.error(
        `Error generating detailed insights for activity ${activity.id}:`,
        error
      )
      throw new Error('Failed to generate detailed insights')
    }
  }

  // 1. Basic Performance Metrics
  private calculateBasicPerformanceMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    // Average Speed
    const avgSpeed = activity.distance / activity.moving_time // m/s
    const avgSpeedKmh = avgSpeed * 3.6 // km/h
    insights.push(
      `Average Speed: ${avgSpeedKmh.toFixed(2)} km/h (${avgSpeed.toFixed(
        2
      )} m/s)`
    )

    // Pace (for running)
    if (activity.sport_type === 'Run') {
      const paceMinKm = activity.moving_time / 60 / (activity.distance / 1000) // min/km
      insights.push(`Average Pace: ${paceMinKm.toFixed(2)} min/km`)
    }

    // Speed Variability
    if (streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length
      const variance =
        velocityData.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) /
        velocityData.length
      const stdDev = Math.sqrt(variance)
      const coefficientOfVariation = (stdDev / avgVelocity) * 100
      insights.push(
        `Speed Variability: ${coefficientOfVariation.toFixed(1)}% CV`
      )
    }

    // Power-to-Weight Ratio (Cycling)
    if (activity.sport_type === 'Ride' && activity.average_watts) {
      const powerToWeight = activity.average_watts / MOCK_USER_DATA.weight
      let category = 'Recreational'
      if (powerToWeight > 5.0) category = 'Elite'
      else if (powerToWeight > 3.5) category = 'Competitive'
      insights.push(
        `Power-to-Weight: ${powerToWeight.toFixed(2)} W/kg (${category} level)`
      )
    }

    return insights
  }

  // 2. Heart Rate Zone Analysis
  private calculateHeartRateZones(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges
  ): string[] {
    const insights = []

    if (!streams.heartrate || !activity.average_heartrate) return insights

    const hrData = streams.heartrate.data
    const avgHr = activity.average_heartrate
    const maxHr = activity.max_heartrate || MOCK_USER_DATA.maxHeartRate
    const restingHr = MOCK_USER_DATA.restingHeartRate

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

    // Training load calculation (TRIMP)
    const trimp = this.calculateTRIMP(
      avgHr,
      activity.moving_time / 60,
      restingHr,
      maxHr
    )
    insights.push(
      `Training Load (TRIMP): ${trimp.toFixed(1)} - ${this.interpretTRIMP(
        trimp
      )}`
    )

    return insights
  }

  // 3. Power Analysis (Cycling)
  private calculatePowerMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    if (!streams.power) return insights

    const powerData = streams.power.data
    const avgPower = activity.average_watts || 0
    const maxPower = activity.max_watts || Math.max(...powerData)
    const ftp = MOCK_USER_DATA.ftp

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

    // Training Stress Score
    const tss = this.calculateTSS(
      activity.moving_time,
      normalizedPower,
      intensityFactor,
      ftp
    )
    insights.push(
      `Training Stress Score: ${tss.toFixed(0)} - ${this.interpretTSS(tss)}`
    )

    // Variability Index
    const variabilityIndex = normalizedPower / avgPower
    insights.push(
      `Variability Index: ${variabilityIndex.toFixed(
        2
      )} - ${this.interpretVariabilityIndex(variabilityIndex)}`
    )

    // Power Duration Curve analysis
    const criticalPower = this.calculateCriticalPower(
      powerData,
      activity.moving_time
    )
    insights.push(`Critical Power Estimate: ${criticalPower.toFixed(0)}W`)

    return insights
  }

  // 4. Training Load Analysis
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

    // Fitness-Fatigue Model
    const fitness = this.calculateFitnessScore(historicalActivities)
    const fatigue = this.calculateFatigueScore(historicalActivities)
    const performance = fitness - fatigue
    insights.push(
      `Performance Readiness: ${performance.toFixed(
        1
      )} (Fitness: ${fitness.toFixed(1)}, Fatigue: ${fatigue.toFixed(1)})`
    )

    return insights
  }

  // 5. Efficiency Metrics
  private calculateEfficiencyMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    if (!streams.heartrate || !activity.average_heartrate) return insights

    const avgHr = activity.average_heartrate

    // Efficiency Factor
    if (activity.sport_type === 'Ride' && activity.average_watts) {
      const efficiencyFactor = activity.average_watts / avgHr
      insights.push(`Efficiency Factor: ${efficiencyFactor.toFixed(2)} W/bpm`)
    } else if (activity.sport_type === 'Run' && streams.smooth_velocity) {
      const avgVelocity =
        streams.smooth_velocity.data.reduce((sum, v) => sum + v, 0) /
        streams.smooth_velocity.data.length
      const efficiencyFactor = avgVelocity / avgHr
      insights.push(
        `Efficiency Factor: ${efficiencyFactor.toFixed(4)} m/s per bpm`
      )
    }

    // Energy Cost of Running (ECOR)
    if (activity.sport_type === 'Run' && streams.power) {
      const avgPower =
        streams.power.data.reduce((sum, p) => sum + p, 0) /
        streams.power.data.length
      const avgSpeed = activity.distance / activity.moving_time
      const ecor = avgPower / MOCK_USER_DATA.weight / avgSpeed
      insights.push(`Energy Cost of Running: ${ecor.toFixed(2)} W·s/m`)
    }

    return insights
  }

  // 6. Aerobic Decoupling Analysis
  private calculateAerobicDecoupling(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    if (!streams.heartrate || activity.moving_time < 600) return insights // Only for activities > 10 minutes

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

  // 7. Running-Specific Analysis
  private calculateRunningMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    if (activity.sport_type !== 'Run') return insights

    // Critical Velocity Model
    if (streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length
      const criticalVelocity = MOCK_USER_DATA.criticalVelocity
      const dPrime = MOCK_USER_DATA.dPrime

      const sustainableVelocity =
        criticalVelocity + dPrime / activity.moving_time
      insights.push(
        `Critical Velocity: ${criticalVelocity.toFixed(
          2
        )} m/s, Sustainable: ${sustainableVelocity.toFixed(2)} m/s`
      )
    }

    // VO2 Max Estimation (if power data available)
    if (streams.power) {
      const maxPower = Math.max(...streams.power.data)
      const vo2MaxL = 0.01141 * maxPower + 0.435
      const vo2MaxMlKg = (vo2MaxL * 1000) / MOCK_USER_DATA.weight
      insights.push(`Estimated VO2 Max: ${vo2MaxMlKg.toFixed(1)} ml/kg/min`)
    }

    // Cadence Analysis
    if (streams.cadence) {
      const cadenceData = streams.cadence.data
      const avgCadence =
        cadenceData.reduce((sum, c) => sum + c, 0) / cadenceData.length

      if (avgCadence > 180) {
        insights.push(
          `High cadence: ${avgCadence.toFixed(0)} spm - excellent form`
        )
      } else if (avgCadence < 160) {
        insights.push(
          `Low cadence: ${avgCadence.toFixed(
            0
          )} spm - consider increasing stride rate`
        )
      } else {
        insights.push(`Optimal cadence: ${avgCadence.toFixed(0)} spm`)
      }
    }

    return insights
  }

  // 8. Advanced Correlation Analysis
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

    // Heart Rate vs Power correlation
    if (streams.power && streams.heartrate) {
      const correlation = this.calculatePearsonCorrelation(
        streams.power.data,
        streams.heartrate.data
      )
      insights.push(
        `HR-Power Correlation: ${correlation.toFixed(
          3
        )} - ${this.interpretCorrelation(correlation)}`
      )
    }

    // Grade vs Heart Rate correlation
    if (streams.smooth_grade && streams.heartrate) {
      const correlation = this.calculatePearsonCorrelation(
        streams.smooth_grade.data,
        streams.heartrate.data
      )
      insights.push(
        `Grade-HR Correlation: ${correlation.toFixed(
          3
        )} - ${this.interpretCorrelation(correlation)}`
      )
    }

    return insights
  }

  // 9. Performance Modeling
  private calculatePerformanceModeling(
    activity: DetailedActivity,
    streams: StreamSet
  ): string[] {
    const insights = []

    // Critical Power Model (Cycling)
    if (activity.sport_type === 'Ride' && streams.power) {
      const powerData = streams.power.data
      const criticalPower = MOCK_USER_DATA.criticalPower
      const wPrime = MOCK_USER_DATA.wPrime

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

    // Critical Velocity Model (Running)
    if (activity.sport_type === 'Run' && streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length
      const criticalVelocity = MOCK_USER_DATA.criticalVelocity
      const dPrime = MOCK_USER_DATA.dPrime

      const sustainableVelocity =
        criticalVelocity + dPrime / activity.moving_time

      if (avgVelocity > sustainableVelocity) {
        insights.push(
          `Pace exceeded sustainable level by ${(
            (avgVelocity - sustainableVelocity) *
            3.6
          ).toFixed(2)} km/h`
        )
      } else {
        insights.push(
          `Pace within sustainable range (${(avgVelocity * 3.6).toFixed(
            2
          )} km/h vs ${(sustainableVelocity * 3.6).toFixed(2)} km/h)`
        )
      }
    }

    return insights
  }

  // 10. Injury Risk Assessment
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

    // Heart rate variability analysis (if available)
    if (historicalActivities.length > 0) {
      const recentActivities = historicalActivities.filter(a => {
        const daysAgo =
          (new Date().getTime() - new Date(a.start_date).getTime()) /
          (1000 * 3600 * 24)
        return daysAgo <= 7
      })

      if (recentActivities.length >= 3) {
        const avgHr =
          recentActivities.reduce(
            (sum, a) => sum + (a.average_heartrate || 0),
            0
          ) / recentActivities.length
        if (
          activity.average_heartrate &&
          activity.average_heartrate > avgHr * 1.1
        ) {
          insights.push(
            `⚠️ Elevated heart rate compared to recent average - may indicate fatigue`
          )
        }
      }
    }

    return insights
  }

  // Helper calculation methods
  private calculateTRIMP(
    hrAvg: number,
    durationMin: number,
    hrRest: number,
    hrMax: number
  ): number {
    const hrRatio = (hrAvg - hrRest) / (hrMax - hrRest)
    const genderCoefficient = 0.64 * Math.exp(1.92 * hrRatio) // For men
    return durationMin * hrRatio * genderCoefficient
  }

  private calculateNormalizedPower(powerData: number[]): number {
    // Simplified NP calculation - in practice, this would use 30-second rolling averages
    const validPower = powerData.filter(p => p > 0)
    if (validPower.length === 0) return 0

    const sumFourthPower = validPower.reduce(
      (sum, p) => sum + Math.pow(p, 4),
      0
    )
    return Math.pow(sumFourthPower / validPower.length, 0.25)
  }

  private calculateTSS(
    durationSeconds: number,
    normalizedPower: number,
    intensityFactor: number,
    ftp: number
  ): number {
    return (
      ((durationSeconds * normalizedPower * intensityFactor) / (ftp * 3600)) *
      100
    )
  }

  private calculateCriticalPower(
    powerData: number[],
    durationSeconds: number
  ): number {
    // Simplified CP calculation - in practice, this would use multiple time trials
    const avgPower = powerData.reduce((sum, p) => sum + p, 0) / powerData.length
    return avgPower * 0.95 // Rough estimate
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
    ) // Average over 4 weeks
  }

  private calculateFitnessScore(activities: DetailedActivity[]): number {
    // Simplified fitness calculation based on recent performance
    const recentActivities = activities.slice(0, 10) // Last 10 activities
    if (recentActivities.length === 0) return 0
    return (
      recentActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) /
      recentActivities.length
    )
  }

  private calculateFatigueScore(activities: DetailedActivity[]): number {
    // Simplified fatigue calculation based on very recent activities
    const recentActivities = activities.slice(0, 3) // Last 3 activities
    if (recentActivities.length === 0) return 0
    return (
      recentActivities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) /
      recentActivities.length
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
  private interpretTRIMP(trimp: number): string {
    if (trimp < 50) return 'Very light training load'
    if (trimp < 100) return 'Light training load'
    if (trimp < 150) return 'Moderate training load'
    if (trimp < 200) return 'Hard training load'
    return 'Very hard training load'
  }

  private interpretIntensityFactor(if_: number): string {
    if (if_ < 0.65) return 'Easy'
    if (if_ < 0.85) return 'Moderate'
    if (if_ < 1.05) return 'Hard'
    return 'Very Hard'
  }

  private interpretTSS(tss: number): string {
    if (tss < 50) return 'Recovery'
    if (tss < 100) return 'Easy'
    if (tss < 200) return 'Moderate'
    return 'Hard'
  }

  private interpretVariabilityIndex(vi: number): string {
    if (vi < 1.05) return 'Time Trial'
    if (vi < 1.2) return 'Road Race'
    return 'Criterium'
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

  // Calculate comprehensive activity summary
  private calculateActivitySummary(
    activities: DetailedActivity[]
  ): ActivitySummary {
    try {
      const totalDistance =
        activities.reduce((sum, a) => sum + a.distance, 0) / 1000 // Convert to km
      const totalTime =
        activities.reduce((sum, a) => sum + a.moving_time, 0) / 3600 // Convert to hours
      const totalElevationGain = activities.reduce(
        (sum, a) => sum + a.total_elevation_gain,
        0
      )
      const totalCalories = activities.reduce(
        (sum, a) => sum + (a.calories || 0),
        0
      )
      const avgSpeed = totalDistance / totalTime // km/h

      // Sport type distribution
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
    } catch (error) {
      this.logger.error('Error calculating activity summary:', error)
      throw new Error('Failed to calculate activity summary')
    }
  }

  // Calculate comprehensive power analysis
  private calculateComprehensivePowerAnalysis(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>
  ): PowerAnalysis {
    try {
      const powerActivities = activities.filter(a => a.average_watts)
      if (powerActivities.length === 0) {
        throw new Error('No power data available')
      }

      const averagePower =
        powerActivities.reduce((sum, a) => sum + (a.average_watts || 0), 0) /
        powerActivities.length
      const maxPower = Math.max(...powerActivities.map(a => a.max_watts || 0))
      const powerToWeightRatio = averagePower / MOCK_USER_DATA.weight

      // Calculate category
      let category = 'Recreational'
      if (powerToWeightRatio > 5.0) category = 'Elite'
      else if (powerToWeightRatio > 3.5) category = 'Competitive'

      // Calculate power duration curve
      const powerDurationCurve =
        this.calculatePowerDurationCurve(powerActivities)

      // Estimate FTP from best 20-minute effort
      const estimatedFTP = this.estimateFTPFromActivities(powerActivities)

      // Calculate average metrics across all activities
      let totalNormalizedPower = 0
      let totalTSS = 0
      let totalVI = 0
      let count = 0

      powerActivities.forEach(activity => {
        const streams = streamsMap.get(activity.id.toString())
        if (streams?.power) {
          const np = this.calculateNormalizedPower(streams.power.data)
          const if_ = np / MOCK_USER_DATA.ftp
          const tss = this.calculateTSS(
            activity.moving_time,
            np,
            if_,
            MOCK_USER_DATA.ftp
          )
          const vi = np / (activity.average_watts || 0)

          totalNormalizedPower += np
          totalTSS += tss
          totalVI += vi
          count++
        }
      })

      const avgNormalizedPower = count > 0 ? totalNormalizedPower / count : 0
      const avgTSS = count > 0 ? totalTSS / count : 0
      const avgVI = count > 0 ? totalVI / count : 0
      const avgIF = avgNormalizedPower / MOCK_USER_DATA.ftp

      return {
        averagePower,
        maxPower,
        normalizedPower: avgNormalizedPower,
        intensityFactor: avgIF,
        trainingStressScore: avgTSS,
        variabilityIndex: avgVI,
        powerDurationCurve,
        estimatedFTP,
        powerToWeightRatio,
        category,
      }
    } catch (error) {
      this.logger.error(
        'Error calculating comprehensive power analysis:',
        error
      )
      throw new Error('Failed to calculate power analysis')
    }
  }

  // Calculate power duration curve
  private calculatePowerDurationCurve(
    activities: DetailedActivity[]
  ): Map<number, number> {
    try {
      const durationPowerMap = new Map<number, number>()

      activities.forEach(activity => {
        if (activity.average_watts) {
          const duration = activity.moving_time
          const currentMax = durationPowerMap.get(duration) || 0
          if (activity.average_watts > currentMax) {
            durationPowerMap.set(duration, activity.average_watts)
          }
        }
      })

      return durationPowerMap
    } catch (error) {
      this.logger.error('Error calculating power duration curve:', error)
      return new Map()
    }
  }

  // Estimate FTP from activities
  private estimateFTPFromActivities(activities: DetailedActivity[]): number {
    try {
      // Find the best 20-minute effort (approximate)
      const twentyMinActivities = activities.filter(a => {
        const duration = a.moving_time / 60 // Convert to minutes
        return duration >= 15 && duration <= 25 // 15-25 minute range
      })

      if (twentyMinActivities.length === 0) {
        return MOCK_USER_DATA.ftp // Return default if no suitable activities
      }

      // Find the highest power output in this range
      const bestActivity = twentyMinActivities.reduce((best, current) => {
        return (current.average_watts || 0) > (best.average_watts || 0)
          ? current
          : best
      })

      return (bestActivity.average_watts || 0) * 0.95 // 95% of 20-minute power
    } catch (error) {
      this.logger.error('Error estimating FTP:', error)
      return MOCK_USER_DATA.ftp
    }
  }

  // Calculate comprehensive heart rate analysis
  private calculateComprehensiveHRAnalysis(
    activities: DetailedActivity[],
    zones: HeartRateZoneRanges
  ): HeartRateAnalysis {
    try {
      const averageHR =
        activities.reduce((sum, a) => sum + (a.average_heartrate || 0), 0) /
        activities.length
      const maxHR = Math.max(...activities.map(a => a.max_heartrate || 0))

      // Calculate TRIMP for all activities
      const trimpScores = activities.map(activity =>
        this.calculateTRIMP(
          activity.average_heartrate || 0,
          activity.moving_time / 60,
          MOCK_USER_DATA.restingHeartRate,
          MOCK_USER_DATA.maxHeartRate
        )
      )
      const avgTrimp =
        trimpScores.reduce((sum, t) => sum + t, 0) / trimpScores.length

      // Calculate HR zones distribution
      const hrZones = this.calculateComprehensiveHRZones(activities, zones)

      // Calculate HR variability (standard deviation)
      const hrValues = activities
        .map(a => a.average_heartrate || 0)
        .filter(hr => hr > 0)
      const hrVariability =
        hrValues.length > 0
          ? Math.sqrt(
              hrValues.reduce(
                (sum, hr) => sum + Math.pow(hr - averageHR, 2),
                0
              ) / hrValues.length
            )
          : 0

      return {
        averageHR,
        maxHR,
        hrZones,
        trimpScore: avgTrimp,
        trimpInterpretation: this.interpretTRIMP(avgTrimp),
        hrVariability,
      }
    } catch (error) {
      this.logger.error('Error calculating comprehensive HR analysis:', error)
      throw new Error('Failed to calculate HR analysis')
    }
  }

  // Calculate comprehensive HR zones
  private calculateComprehensiveHRZones(
    activities: DetailedActivity[],
    zones: HeartRateZoneRanges
  ): ZoneDistribution[] {
    try {
      const hrReserve =
        MOCK_USER_DATA.maxHeartRate - MOCK_USER_DATA.restingHeartRate

      const zoneRanges = [
        { zone: 1, min: 0.5, max: 0.6 },
        { zone: 2, min: 0.6, max: 0.7 },
        { zone: 3, min: 0.7, max: 0.8 },
        { zone: 4, min: 0.8, max: 0.9 },
        { zone: 5, min: 0.9, max: 1.0 },
      ]

      const zoneDistributions = zoneRanges.map(range => ({
        zone: range.zone,
        minHeartRate: Math.round(
          hrReserve * range.min + MOCK_USER_DATA.restingHeartRate
        ),
        maxHeartRate: Math.round(
          hrReserve * range.max + MOCK_USER_DATA.restingHeartRate
        ),
        timeInZone: 0,
        percentage: 0,
      }))

      // Calculate time in each zone across all activities
      let totalTime = 0
      activities.forEach(activity => {
        if (activity.average_heartrate) {
          totalTime += activity.moving_time
          const zone = this.getHeartRateZone(
            activity.average_heartrate,
            zoneDistributions
          )
          if (zone >= 0) {
            zoneDistributions[zone].timeInZone += activity.moving_time
          }
        }
      })

      // Calculate percentages
      zoneDistributions.forEach(zone => {
        zone.percentage =
          totalTime > 0 ? (zone.timeInZone / totalTime) * 100 : 0
      })

      return zoneDistributions
    } catch (error) {
      this.logger.error('Error calculating comprehensive HR zones:', error)
      return []
    }
  }

  // Get heart rate zone for a given HR value
  private getHeartRateZone(
    heartRate: number,
    zones: ZoneDistribution[]
  ): number {
    for (let i = 0; i < zones.length; i++) {
      if (
        heartRate >= zones[i].minHeartRate &&
        heartRate <= zones[i].maxHeartRate
      ) {
        return i
      }
    }
    return -1
  }

  // Calculate comprehensive training load
  private calculateComprehensiveTrainingLoad(
    activities: DetailedActivity[]
  ): TrainingLoadAnalysis {
    try {
      const acuteLoad = this.calculateAcuteLoad(activities)
      const chronicLoad = this.calculateChronicLoad(activities)
      const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : 0

      const fitnessScore = this.calculateFitnessScore(activities)
      const fatigueScore = this.calculateFatigueScore(activities)
      const performanceReadiness = fitnessScore - fatigueScore

      const riskLevel = this.assessRiskLevel(acwr)
      const recommendations = this.getLoadRecommendations(acwr)

      return {
        acuteLoad,
        chronicLoad,
        acwr,
        riskLevel,
        fitnessScore,
        fatigueScore,
        performanceReadiness,
        recommendations,
      }
    } catch (error) {
      this.logger.error('Error calculating comprehensive training load:', error)
      throw new Error('Failed to calculate training load')
    }
  }

  // Calculate comprehensive efficiency metrics
  private calculateComprehensiveEfficiencyMetrics(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>
  ): EfficiencyMetrics {
    try {
      let totalEfficiencyFactor = 0
      let totalDecoupling = 0
      let count = 0

      activities.forEach(activity => {
        const streams = streamsMap.get(activity.id.toString())
        if (streams?.heartrate && activity.average_heartrate) {
          // Calculate efficiency factor
          if (activity.sport_type === 'Ride' && activity.average_watts) {
            const ef = activity.average_watts / activity.average_heartrate
            totalEfficiencyFactor += ef
            count++
          } else if (activity.sport_type === 'Run' && streams.smooth_velocity) {
            const avgVelocity =
              streams.smooth_velocity.data.reduce((sum, v) => sum + v, 0) /
              streams.smooth_velocity.data.length
            const ef = avgVelocity / activity.average_heartrate
            totalEfficiencyFactor += ef
            count++
          }

          // Calculate aerobic decoupling
          const effortData =
            streams.power?.data || streams.smooth_velocity?.data
          if (effortData && effortData.length > 0) {
            const decoupling = this.calculateAerobicDecouplingValue(
              effortData,
              streams.heartrate.data
            )
            totalDecoupling += decoupling
          }
        }
      })

      const avgEfficiencyFactor = count > 0 ? totalEfficiencyFactor / count : 0
      const avgDecoupling = count > 0 ? totalDecoupling / count : 0

      return {
        efficiencyFactor: avgEfficiencyFactor,
        aerobicDecoupling: avgDecoupling,
        decouplingInterpretation:
          this.interpretAerobicDecoupling(avgDecoupling),
      }
    } catch (error) {
      this.logger.error(
        'Error calculating comprehensive efficiency metrics:',
        error
      )
      throw new Error('Failed to calculate efficiency metrics')
    }
  }

  // Calculate comprehensive correlations
  private calculateComprehensiveCorrelations(
    activities: DetailedActivity[],
    streamsMap: Map<string, StreamSet>
  ): CorrelationAnalysis {
    try {
      let totalPowerSpeedCorr = 0
      let totalHrPowerCorr = 0
      let totalGradeHrCorr = 0
      let count = 0

      activities.forEach(activity => {
        const streams = streamsMap.get(activity.id.toString())
        if (streams) {
          // Power vs Speed correlation
          if (streams.power && streams.smooth_velocity) {
            const correlation = this.calculatePearsonCorrelation(
              streams.power.data,
              streams.smooth_velocity.data
            )
            totalPowerSpeedCorr += correlation
            count++
          }

          // HR vs Power correlation
          if (streams.power && streams.heartrate) {
            const correlation = this.calculatePearsonCorrelation(
              streams.power.data,
              streams.heartrate.data
            )
            totalHrPowerCorr += correlation
          }

          // Grade vs HR correlation
          if (streams.smooth_grade && streams.heartrate) {
            const correlation = this.calculatePearsonCorrelation(
              streams.smooth_grade.data,
              streams.heartrate.data
            )
            totalGradeHrCorr += correlation
          }
        }
      })

      const avgPowerSpeedCorr = count > 0 ? totalPowerSpeedCorr / count : 0
      const avgHrPowerCorr = count > 0 ? totalHrPowerCorr / count : 0
      const avgGradeHrCorr = count > 0 ? totalGradeHrCorr / count : 0

      return {
        powerSpeedCorrelation: avgPowerSpeedCorr,
        hrPowerCorrelation: avgHrPowerCorr,
        gradeHrCorrelation: avgGradeHrCorr,
        interpretations: {
          powerSpeed: this.interpretCorrelation(avgPowerSpeedCorr),
          hrPower: this.interpretCorrelation(avgHrPowerCorr),
          gradeHr: this.interpretCorrelation(avgGradeHrCorr),
        },
      }
    } catch (error) {
      this.logger.error('Error calculating comprehensive correlations:', error)
      throw new Error('Failed to calculate correlations')
    }
  }

  // Generate comprehensive recommendations
  private generateRecommendations(activities: DetailedActivity[]): string[] {
    try {
      const recommendations: string[] = []

      // Sport-specific recommendations
      const cyclingActivities = activities.filter(a => a.sport_type === 'Ride')
      const runningActivities = activities.filter(a => a.sport_type === 'Run')

      if (cyclingActivities.length > 0) {
        recommendations.push(
          'Focus on power development through interval training'
        )
        if (cyclingActivities.length < 3) {
          recommendations.push(
            'Increase cycling frequency for better power gains'
          )
        }
      }

      if (runningActivities.length > 0) {
        recommendations.push(
          'Incorporate tempo runs for lactate threshold improvement'
        )
        if (runningActivities.length < 3) {
          recommendations.push(
            'Add more running sessions for endurance development'
          )
        }
      }

      // Volume-based recommendations
      const totalDistance =
        activities.reduce((sum, a) => sum + a.distance, 0) / 1000
      if (totalDistance < 50) {
        recommendations.push(
          'Gradually increase weekly distance for endurance gains'
        )
      } else if (totalDistance > 150) {
        recommendations.push('Consider reducing volume to prevent overtraining')
      }

      // Intensity-based recommendations
      const avgSufferScore =
        activities.reduce((sum, a) => sum + (a.suffer_score || 0), 0) /
        activities.length
      if (avgSufferScore < 50) {
        recommendations.push(
          'Include higher intensity sessions for performance improvement'
        )
      } else if (avgSufferScore > 150) {
        recommendations.push(
          'Add more recovery sessions to balance training load'
        )
      }

      return recommendations
    } catch (error) {
      this.logger.error('Error generating recommendations:', error)
      return ['Unable to generate recommendations at this time']
    }
  }

  // Calculate comprehensive risk assessment
  private calculateComprehensiveRiskAssessment(
    activities: DetailedActivity[]
  ): RiskAssessment {
    try {
      const acuteLoad = this.calculateAcuteLoad(activities)
      const chronicLoad = this.calculateChronicLoad(activities)
      const acwr = chronicLoad > 0 ? acuteLoad / chronicLoad : 0

      let injuryRisk = 'Low'
      let acwrRisk = 'Low'
      let fatigueRisk = 'Low'
      const recommendations: string[] = []

      // ACWR risk assessment
      if (acwr > 1.5) {
        acwrRisk = 'High'
        recommendations.push('Reduce training intensity immediately')
        recommendations.push('Focus on recovery and rest')
      } else if (acwr > 1.3) {
        acwrRisk = 'Moderate'
        recommendations.push('Monitor training load closely')
        recommendations.push('Consider reducing volume')
      }

      // Fatigue risk assessment
      const recentActivities = activities.filter(a => {
        const daysAgo =
          (new Date().getTime() - new Date(a.start_date).getTime()) /
          (1000 * 3600 * 24)
        return daysAgo <= 7
      })

      if (recentActivities.length >= 5) {
        fatigueRisk = 'High'
        recommendations.push('Take a recovery day')
        recommendations.push('Focus on sleep and nutrition')
      } else if (recentActivities.length >= 3) {
        fatigueRisk = 'Moderate'
        recommendations.push('Monitor fatigue levels')
      }

      // Overall injury risk
      if (acwrRisk === 'High' || fatigueRisk === 'High') {
        injuryRisk = 'High'
      } else if (acwrRisk === 'Moderate' || fatigueRisk === 'Moderate') {
        injuryRisk = 'Moderate'
      }

      return {
        injuryRisk,
        acwrRisk,
        fatigueRisk,
        recommendations,
      }
    } catch (error) {
      this.logger.error(
        'Error calculating comprehensive risk assessment:',
        error
      )
      return {
        injuryRisk: 'Unknown',
        acwrRisk: 'Unknown',
        fatigueRisk: 'Unknown',
        recommendations: ['Unable to assess risk at this time'],
      }
    }
  }

  // Risk level assessment helper
  private assessRiskLevel(acwr: number): string {
    if (acwr <= 0.8) return 'Low'
    if (acwr <= 1.3) return 'Optimal'
    if (acwr <= 1.5) return 'Moderate'
    return 'High'
  }

  // Load recommendations helper
  private getLoadRecommendations(acwr: number): string[] {
    if (acwr > 1.5) {
      return [
        'Reduce training intensity',
        'Focus on recovery',
        'Consider rest day',
      ]
    }
    if (acwr < 0.8) {
      return [
        'Gradually increase training load',
        'Add intensity sessions',
        'Monitor for fitness gains',
      ]
    }
    return ['Maintain current training load', 'Continue progressive overload']
  }

  // Calculate detailed heart rate zones with metadata
  private calculateDetailedHRZones(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges
  ) {
    if (!streams.heartrate || !activity.average_heartrate) {
      return this.getDefaultHRZones()
    }

    const hrData = streams.heartrate.data
    const maxHr = activity.max_heartrate || MOCK_USER_DATA.maxHeartRate
    const restingHr = MOCK_USER_DATA.restingHeartRate
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

  // Get default HR zones when no data is available
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

  // Calculate detailed performance metrics
  private calculateDetailedPerformanceMetrics(
    activity: DetailedActivity,
    streams: StreamSet
  ) {
    const avgSpeed = activity.distance / activity.moving_time // m/s
    const avgSpeedKmh = avgSpeed * 3.6 // km/h
    const avgPace = activity.moving_time / 60 / (activity.distance / 1000) // min/km

    let speedVariability = 0
    if (streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const avgVelocity =
        velocityData.reduce((sum, v) => sum + v, 0) / velocityData.length
      const variance =
        velocityData.reduce((sum, v) => sum + Math.pow(v - avgVelocity, 2), 0) /
        velocityData.length
      const stdDev = Math.sqrt(variance)
      speedVariability = (stdDev / avgVelocity) * 100
    }

    const avgHr = activity.average_heartrate || 0
    const maxHr = activity.max_heartrate || 0
    const trimp = this.calculateTRIMP(
      avgHr,
      activity.moving_time / 60,
      MOCK_USER_DATA.restingHeartRate,
      MOCK_USER_DATA.maxHeartRate
    )

    let efficiencyFactor = 0
    if (activity.sport_type === 'Ride' && activity.average_watts) {
      efficiencyFactor = activity.average_watts / avgHr
    } else if (activity.sport_type === 'Run' && streams.smooth_velocity) {
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
      const maxPower = activity.max_watts || Math.max(...powerData)
      const normalizedPower = this.calculateNormalizedPower(powerData)
      const intensityFactor = normalizedPower / MOCK_USER_DATA.ftp
      const tss = this.calculateTSS(
        activity.moving_time,
        normalizedPower,
        intensityFactor,
        MOCK_USER_DATA.ftp
      )
      const variabilityIndex = normalizedPower / avgPower

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

  // Calculate detailed correlations
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

  // Calculate detailed training load
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
}
