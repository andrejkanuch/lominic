import { InsightsService } from './insights.service'

// Test data for calculations
const mockHRData = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210]
const mockMaxHR = 220
const mockAltitudeData = [100, 105, 110, 115, 120, 125, 130, 135, 140, 145]
const mockDistanceData = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const mockTimeData = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270]
const mockVelocityData = [
  3.33, 3.33, 3.33, 3.33, 3.33, 3.33, 3.33, 3.33, 3.33, 3.33,
] // 12 min/km pace
const mockCadenceData = [180, 182, 178, 175, 172, 170, 168, 165, 162, 160] // Shows fatigue
const mockGradeData = [0, 2, 5, 8, 10, 8, 5, 2, 0, -2]

describe('InsightsService Advanced Calculations', () => {
  let insightsService: InsightsService

  beforeEach(() => {
    insightsService = new InsightsService()
  })

  describe('Heart Rate Zone Calculations', () => {
    it('should calculate HR zones correctly', () => {
      const zones = (insightsService as any).calculateHRZones(
        mockHRData,
        mockMaxHR
      )

      expect(zones.Z1).toBeGreaterThan(0) // Recovery zone
      expect(zones.Z2).toBeGreaterThan(0) // Aerobic zone
      expect(zones.Z3).toBeGreaterThan(0) // Tempo zone
      expect(zones.Z4).toBeGreaterThan(0) // Threshold zone
      expect(zones.Z5).toBeGreaterThan(0) // Anaerobic zone

      // Total should equal data points
      const total = Object.values(zones).reduce(
        (sum: number, count: unknown) => sum + (count as number),
        0
      )
      expect(total).toBe(mockHRData.length)
    })

    it('should calculate TRIMP score correctly', () => {
      const avgHR = 150
      const durationMin = 60
      const restingHR = 60
      const maxHR = 220

      const trimp = (insightsService as any).calculateTRIMP(
        avgHR,
        durationMin,
        restingHR,
        maxHR
      )

      expect(trimp).toBeGreaterThan(0)
      expect(trimp).toBeLessThan(1000) // Reasonable range for 1-hour activity
    })
  })

  describe('Elevation Analysis', () => {
    it('should calculate elevation gain correctly', () => {
      const gain = (insightsService as any).calculateElevationGain(
        mockAltitudeData
      )

      // Should be 45m (145 - 100)
      expect(gain).toBe(45)
    })

    it('should calculate climb stress score', () => {
      const hrChange = 50 // Max HR - Min HR
      const elevationGain = 45
      const avgPaceMps = 3.33

      const stress = (insightsService as any).calculateClimbStress(
        hrChange,
        elevationGain,
        avgPaceMps
      )

      expect(stress).toBeGreaterThan(0)
    })
  })

  describe('Pacing Analysis', () => {
    it('should segment pace correctly', () => {
      const segments = (insightsService as any).segmentPace(
        mockDistanceData,
        mockTimeData,
        4
      )

      expect(segments).toHaveLength(4)
      segments.forEach(pace => {
        expect(pace).toBeGreaterThan(0)
      })
    })

    it('should detect cadence drop', () => {
      const hasDrop = (insightsService as any).detectCadenceDrop(
        mockCadenceData
      )

      // Should detect drop from ~180 to ~160
      expect(hasDrop).toBe(true)
    })
  })

  describe('Efficiency Analysis', () => {
    it('should calculate efficiency index', () => {
      const speed = 3.33 // m/s
      const hr = 150 // bpm

      const efficiency = (insightsService as any).efficiency(speed, hr)

      expect(efficiency).toBe(3.33 / 150) // m/s per beat
      expect(efficiency).toBeGreaterThan(0)
    })
  })

  describe('Correlation Analysis', () => {
    it('should calculate grade-effort correlation', () => {
      const correlation = (insightsService as any).gradeEffortCorrelation(
        mockGradeData,
        mockHRData
      )

      expect(correlation).toBeGreaterThanOrEqual(-1)
      expect(correlation).toBeLessThanOrEqual(1)
    })
  })

  describe('Interpretation Helpers', () => {
    it('should interpret TRIMP scores correctly', () => {
      const lightTRIMP = (insightsService as any).interpretTRIMP(75)
      const hardTRIMP = (insightsService as any).interpretTRIMP(175)

      expect(lightTRIMP).toContain('Light')
      expect(hardTRIMP).toContain('Hard')
    })

    it('should interpret climb stress correctly', () => {
      const lowStress = (insightsService as any).interpretClimbStress(0.05)
      const highStress = (insightsService as any).interpretClimbStress(0.6)

      expect(lowStress).toContain('Low')
      expect(highStress).toContain('Very high')
    })

    it('should interpret correlation correctly', () => {
      const weakCorr = (insightsService as any).interpretCorrelation(0.2)
      const strongCorr = (insightsService as any).interpretCorrelation(0.8)

      expect(weakCorr).toContain('Weak')
      expect(strongCorr).toContain('Very strong')
    })
  })
})

// Example usage and expected outputs
console.log('=== Example Calculations ===')

const service = new InsightsService()

// HR Zones
const zones = (service as any).calculateHRZones(mockHRData, mockMaxHR)
console.log('HR Zones:', zones)

// TRIMP Score
const trimp = (service as any).calculateTRIMP(150, 60, 60, 220)
console.log('TRIMP Score:', trimp.toFixed(1))

// Elevation Gain
const elevationGain = (service as any).calculateElevationGain(mockAltitudeData)
console.log('Elevation Gain:', elevationGain, 'm')

// Climb Stress
const climbStress = (service as any).calculateClimbStress(
  50,
  elevationGain,
  3.33
)
console.log('Climb Stress:', climbStress.toFixed(3))

// Pace Segments
const paceSegments = (service as any).segmentPace(
  mockDistanceData,
  mockTimeData,
  4
)
console.log(
  'Pace Segments (m/s):',
  paceSegments.map(p => p.toFixed(2))
)

// Efficiency
const efficiency = (service as any).efficiency(3.33, 150)
console.log('Efficiency Index:', efficiency.toFixed(4), 'm/s per BPM')

// Cadence Drop
const cadenceDrop = (service as any).detectCadenceDrop(mockCadenceData)
console.log('Cadence Drop Detected:', cadenceDrop)

// Correlation
const correlation = (service as any).gradeEffortCorrelation(
  mockGradeData,
  mockHRData
)
console.log('Grade-HR Correlation:', correlation.toFixed(3))

// Interpretations
console.log('TRIMP Interpretation:', (service as any).interpretTRIMP(trimp))
console.log(
  'Climb Stress Interpretation:',
  (service as any).interpretClimbStress(climbStress)
)
console.log(
  'Correlation Interpretation:',
  (service as any).interpretCorrelation(correlation)
)
