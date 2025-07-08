import { Injectable } from '@nestjs/common'
import {
  DetailedActivity,
  StreamSet,
  HeartRateZoneRanges,
  ZoneRange,
} from '@lominic/strava-api-types'

@Injectable()
export class InsightsService {
  constructor() {}

  generateInsights(
    activity: DetailedActivity,
    streams: StreamSet,
    zones: HeartRateZoneRanges,
    historicalActivities: DetailedActivity[]
  ) {
    const insights = []

    // 1. Enhanced Heart Rate Zone Analysis with Advanced Calculations
    if (streams.heartrate && zones.zones) {
      const hrData = streams.heartrate.data
      const avgHr = activity.average_heartrate
      const maxHr = activity.max_heartrate

      // Basic HR stats
      insights.push(`Average HR: ${avgHr} bpm, Max HR: ${maxHr} bpm.`)

      // Calculate HR zones using percentage of max HR
      const hrZones = this.calculateHRZones(hrData, maxHr)
      const zoneNames = [
        'Recovery',
        'Aerobic',
        'Tempo',
        'Threshold',
        'Anaerobic',
      ]

      insights.push(
        `HR Zone Distribution: ${Object.entries(hrZones)
          .map(
            ([zone, count]) =>
              `${zoneNames[parseInt(zone.slice(1)) - 1]}: ${count} data points`
          )
          .join(', ')}`
      )

      // Calculate TRIMP score for training load
      const trimpScore = this.calculateTRIMP(
        avgHr,
        activity.moving_time / 60,
        60,
        maxHr
      ) // Assuming resting HR of 60
      insights.push(
        `Training Load (TRIMP): ${trimpScore.toFixed(
          1
        )} - ${this.interpretTRIMP(trimpScore)}`
      )

      // Zone distribution insights
      const totalTime = hrData.length
      const zonePercentages = Object.values(hrZones).map(
        count => (count / totalTime) * 100
      )

      // Find dominant zone
      const dominantZoneIndex = Object.values(hrZones).indexOf(
        Math.max(...Object.values(hrZones))
      )
      const dominantZoneName =
        zoneNames[dominantZoneIndex] || `Zone ${dominantZoneIndex + 1}`

      insights.push(
        `Primary training zone: ${dominantZoneName} (${zonePercentages[
          dominantZoneIndex
        ].toFixed(1)}% of time)`
      )

      // Training load assessment
      const highIntensityTime = Object.values(hrZones)
        .slice(3)
        .reduce((sum, count) => sum + count, 0)
      const highIntensityPercentage = (highIntensityTime / totalTime) * 100

      if (highIntensityPercentage > 20) {
        insights.push(
          `High-intensity session: ${highIntensityPercentage.toFixed(
            1
          )}% in threshold/anaerobic zones`
        )
      } else if (highIntensityPercentage < 5) {
        insights.push(
          `Recovery-focused session: ${highIntensityPercentage.toFixed(
            1
          )}% in high-intensity zones`
        )
      }
    }

    // 2. Elevation Analysis with Climb Stress
    if (streams.altitude && streams.heartrate) {
      const elevationData = streams.altitude.data
      const hrData = streams.heartrate.data
      const distanceData = streams.distance.data

      const elevationGain = this.calculateElevationGain(elevationData)
      insights.push(`Total elevation gain: ${elevationGain.toFixed(0)}m`)

      // Calculate climb stress score
      if (elevationGain > 0 && streams.smooth_velocity) {
        const avgPaceMps =
          streams.smooth_velocity.data.reduce((sum, v) => sum + v, 0) /
          streams.smooth_velocity.data.length
        const hrChange = Math.max(...hrData) - Math.min(...hrData)
        const climbStress = this.calculateClimbStress(
          hrChange,
          elevationGain,
          avgPaceMps
        )
        insights.push(
          `Climb stress score: ${climbStress.toFixed(
            2
          )} - ${this.interpretClimbStress(climbStress)}`
        )
      }

      const climbSegments = []
      let currentClimb = null
      for (let i = 1; i < elevationData.length; i++) {
        const elevationGain = elevationData[i] - elevationData[i - 1]
        if (elevationGain > 0) {
          if (!currentClimb) {
            currentClimb = {
              startDistance: distanceData[i - 1],
              endDistance: 0,
              elevationGain: 0,
              hr: [],
            }
          }
          currentClimb.elevationGain += elevationGain
          currentClimb.hr.push(hrData[i])
        } else if (currentClimb) {
          currentClimb.endDistance = distanceData[i - 1]
          climbSegments.push(currentClimb)
          currentClimb = null
        }
      }
      if (currentClimb) {
        currentClimb.endDistance = distanceData[distanceData.length - 1]
        climbSegments.push(currentClimb)
      }

      climbSegments.forEach(climb => {
        if (climb.elevationGain > 50) {
          const avgHr = climb.hr.reduce((a, b) => a + b, 0) / climb.hr.length
          insights.push(
            `On a ${climb.elevationGain.toFixed(
              0
            )}m climb, your average HR was ${avgHr.toFixed(0)} bpm.`
          )
        }
      })
    }

    // 3. Advanced Pacing Analysis with Segments
    if (streams.distance && streams.time && streams.smooth_velocity) {
      const velocityData = streams.smooth_velocity.data
      const distanceData = streams.distance.data
      const timeData = streams.time.data
      const totalDistance = distanceData[distanceData.length - 1]

      // Segment pace analysis
      const segmentPaces = this.segmentPace(distanceData, timeData, 4)
      const paceStrings = segmentPaces.map(
        (pace, i) => `Segment ${i + 1}: ${(1000 / pace).toFixed(2)} min/km`
      )
      insights.push(`Pacing segments: ${paceStrings.join(', ')}`)

      // Negative split analysis
      const firstHalf = velocityData.slice(
        0,
        Math.floor(velocityData.length / 2)
      )
      const secondHalf = velocityData.slice(Math.floor(velocityData.length / 2))
      const firstHalfAvg =
        firstHalf.reduce((sum, v) => sum + v, 0) / firstHalf.length
      const secondHalfAvg =
        secondHalf.reduce((sum, v) => sum + v, 0) / secondHalf.length

      if (secondHalfAvg > firstHalfAvg * 1.05) {
        insights.push('Strong negative split - excellent pacing strategy')
      } else if (firstHalfAvg > secondHalfAvg * 1.1) {
        insights.push(
          'Positive split detected - consider starting more conservatively'
        )
      }

      // Calculate pace variability
      const paces = velocityData.map(v => (v > 0 ? 1000 / v : 0)) // min/km
      const avgPace = paces.reduce((sum, pace) => sum + pace, 0) / paces.length
      const paceVariance =
        paces.reduce((sum, pace) => sum + Math.pow(pace - avgPace, 2), 0) /
        paces.length
      const paceStdDev = Math.sqrt(paceVariance)

      if (paceStdDev < 0.5) {
        insights.push('Excellent pace consistency throughout the session')
      } else if (paceStdDev > 1.5) {
        insights.push('High pace variability - consider more structured pacing')
      }
    }

    // 4. Efficiency Index Analysis
    if (streams.heartrate && streams.smooth_velocity) {
      const hrData = streams.heartrate.data
      const velocityData = streams.smooth_velocity.data

      const efficiencies = velocityData.map((speed, i) =>
        this.efficiency(speed, hrData[i] || activity.average_heartrate)
      )
      const avgEfficiency =
        efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length

      insights.push(`Efficiency index: ${avgEfficiency.toFixed(4)} m/s per BPM`)

      // Compare with historical data if available
      if (historicalActivities.length > 0) {
        const similarActivities = historicalActivities.filter(
          a =>
            a.sport_type === activity.sport_type &&
            Math.abs(a.distance - activity.distance) < activity.distance * 0.1
        )
        if (similarActivities.length > 0) {
          insights.push(
            'Efficiency trend analysis available with more historical data'
          )
        }
      }
    }

    // 5. Cadence Fatigue Detection
    if (streams.cadence && activity.sport_type === 'Run') {
      const cadenceData = streams.cadence.data
      const avgCadence =
        cadenceData.reduce((sum, c) => sum + c, 0) / cadenceData.length

      if (avgCadence > 180) {
        insights.push(
          `High cadence run: ${avgCadence.toFixed(0)} spm - excellent form`
        )
      } else if (avgCadence < 160) {
        insights.push(
          `Low cadence: ${avgCadence.toFixed(
            0
          )} spm - consider increasing stride rate`
        )
      }

      // Detect cadence drop (fatigue indicator)
      const hasCadenceDrop = this.detectCadenceDrop(cadenceData)
      if (hasCadenceDrop) {
        insights.push(
          'Cadence drop detected in second half - may indicate form fatigue'
        )
      }
    }

    // 6. Grade vs. HR Stress Correlation
    if (streams.smooth_grade && streams.heartrate) {
      const gradeData = streams.smooth_grade.data
      const hrData = streams.heartrate.data

      const correlation = this.gradeEffortCorrelation(gradeData, hrData)
      insights.push(
        `Grade-HR correlation: ${correlation.toFixed(
          3
        )} - ${this.interpretCorrelation(correlation)}`
      )
    }

    // 7. Power Analysis (for cycling)
    if (streams.power && activity.sport_type === 'Ride') {
      const powerData = streams.power.data
      const avgPower =
        powerData.reduce((sum, p) => sum + p, 0) / powerData.length
      const maxPower = Math.max(...powerData)

      insights.push(
        `Average power: ${avgPower.toFixed(0)}W, Max power: ${maxPower.toFixed(
          0
        )}W`
      )

      // Power-to-weight ratio (if weight available)
      if (
        activity.athlete &&
        'weight' in activity.athlete &&
        typeof activity.athlete.weight === 'number' &&
        activity.athlete.weight > 0
      ) {
        const powerToWeight = avgPower / activity.athlete.weight
        insights.push(`Power-to-weight ratio: ${powerToWeight.toFixed(2)} W/kg`)
      }
    }

    // 8. Compare to Historical Data
    if (historicalActivities.length > 0) {
      const similarActivities = historicalActivities.filter(
        a =>
          a.type === activity.type &&
          Math.abs(a.distance - activity.distance) < 1000
      )
      if (similarActivities.length > 0) {
        const avgHr =
          similarActivities.reduce((sum, a) => sum + a.average_heartrate, 0) /
          similarActivities.length
        if (activity.average_heartrate < avgHr) {
          insights.push(
            `Your average HR was ${
              avgHr - activity.average_heartrate
            } bpm lower than similar recent activities.`
          )
        }
      }
    }

    // 9. Fatigue & Recovery Inference
    const recentHardActivities = historicalActivities.filter(a => {
      const daysAgo =
        (new Date().getTime() - new Date(a.start_date).getTime()) /
        (1000 * 3600 * 24)
      return daysAgo <= 7 && a.suffer_score > 100
    })

    if (recentHardActivities.length >= 3) {
      insights.push(
        `You've had ${recentHardActivities.length} hard sessions in the last 7 days. Consider a recovery session.`
      )
    }

    // 10. Performance Trends
    if (historicalActivities.length > 0) {
      const similarActivities = historicalActivities.filter(
        a =>
          a.sport_type === activity.sport_type &&
          Math.abs(a.distance - activity.distance) < activity.distance * 0.1
      )

      if (similarActivities.length >= 3) {
        const avgPace =
          similarActivities.reduce(
            (sum, a) => sum + a.distance / a.moving_time,
            0
          ) / similarActivities.length
        const currentPace = activity.distance / activity.moving_time

        if (currentPace > avgPace * 1.05) {
          insights.push("Performance improvement: You're getting faster!")
        } else if (currentPace < avgPace * 0.95) {
          insights.push(
            'Slower than usual - may be due to fatigue or training load'
          )
        }
      }
    }

    // 11. Weather Impact (if temperature data available)
    if (streams.temperature) {
      const tempData = streams.temperature.data
      const avgTemp = tempData.reduce((sum, t) => sum + t, 0) / tempData.length

      if (avgTemp > 25) {
        insights.push(
          `Hot conditions (${avgTemp.toFixed(
            1
          )}°C) - performance may be affected`
        )
      } else if (avgTemp < 5) {
        insights.push(
          `Cold conditions (${avgTemp.toFixed(
            1
          )}°C) - consider warm-up adjustments`
        )
      }
    }

    return insights
  }

  // Advanced calculation methods
  private calculateHRZones(
    hrData: number[],
    hrMax: number
  ): Record<string, number> {
    const zones = { Z1: 0, Z2: 0, Z3: 0, Z4: 0, Z5: 0 }
    hrData.forEach(hr => {
      const pct = hr / hrMax
      if (pct < 0.6) zones.Z1++
      else if (pct < 0.7) zones.Z2++
      else if (pct < 0.8) zones.Z3++
      else if (pct < 0.9) zones.Z4++
      else zones.Z5++
    })
    return zones
  }

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

  private calculateElevationGain(altitudeData: number[]): number {
    let gain = 0
    for (let i = 1; i < altitudeData.length; i++) {
      const delta = altitudeData[i] - altitudeData[i - 1]
      if (delta > 1) gain += delta
    }
    return gain
  }

  private calculateClimbStress(
    hrChange: number,
    elevationGain: number,
    avgPaceMps: number
  ): number {
    if (elevationGain === 0) return 0
    return (hrChange / elevationGain) * (1 / avgPaceMps)
  }

  private segmentPace(
    distance: number[],
    time: number[],
    segments = 4
  ): number[] {
    const total = time.length
    const step = Math.floor(total / segments)
    const paces = []
    for (let i = 0; i < segments; i++) {
      const t0 = i * step
      const t1 = (i + 1) * step
      const d = distance[t1 - 1] - distance[t0]
      const dt = time[t1 - 1] - time[t0]
      paces.push(d / dt) // in m/s
    }
    return paces
  }

  private efficiency(speed: number, hr: number): number {
    return speed / hr // m/s per beat
  }

  private detectCadenceDrop(cadence: number[]): boolean {
    const startAvg =
      cadence.slice(0, cadence.length / 2).reduce((a, b) => a + b) /
      (cadence.length / 2)
    const endAvg =
      cadence.slice(cadence.length / 2).reduce((a, b) => a + b) /
      (cadence.length / 2)
    return endAvg < startAvg * 0.95
  }

  private gradeEffortCorrelation(grade: number[], hr: number[]): number {
    const n = Math.min(grade.length, hr.length)
    const avgG = grade.slice(0, n).reduce((a, b) => a + b) / n
    const avgH = hr.slice(0, n).reduce((a, b) => a + b) / n
    let num = 0,
      denG = 0,
      denH = 0
    for (let i = 0; i < n; i++) {
      num += (grade[i] - avgG) * (hr[i] - avgH)
      denG += Math.pow(grade[i] - avgG, 2)
      denH += Math.pow(hr[i] - avgH, 2)
    }
    return num / Math.sqrt(denG * denH) // Pearson correlation
  }

  // Interpretation helpers
  private interpretTRIMP(trimp: number): string {
    if (trimp < 50) return 'Very light training load'
    if (trimp < 100) return 'Light training load'
    if (trimp < 150) return 'Moderate training load'
    if (trimp < 200) return 'Hard training load'
    return 'Very hard training load'
  }

  private interpretClimbStress(stress: number): string {
    if (stress < 0.1) return 'Low climb stress'
    if (stress < 0.3) return 'Moderate climb stress'
    if (stress < 0.5) return 'High climb stress'
    return 'Very high climb stress'
  }

  private interpretCorrelation(correlation: number): string {
    const absCorr = Math.abs(correlation)
    if (absCorr < 0.1) return 'No correlation'
    if (absCorr < 0.3) return 'Weak correlation'
    if (absCorr < 0.5) return 'Moderate correlation'
    if (absCorr < 0.7) return 'Strong correlation'
    return 'Very strong correlation'
  }
}
