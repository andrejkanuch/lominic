import { Field, ObjectType, Float, Int } from '@nestjs/graphql'

@ObjectType()
export class HeartRateZoneDetail {
  @Field(() => Int)
  zone: number

  @Field(() => Int)
  minHeartRate: number

  @Field(() => Int)
  maxHeartRate: number

  @Field(() => Int)
  timeInZone: number

  @Field(() => Float)
  percentage: number

  @Field(() => String)
  description: string

  @Field(() => String)
  color: string
}

@ObjectType()
export class PowerAnalysis {
  @Field(() => Float, { nullable: true })
  averagePower?: number

  @Field(() => Float, { nullable: true })
  maxPower?: number

  @Field(() => Float, { nullable: true })
  normalizedPower?: number

  @Field(() => Float, { nullable: true })
  intensityFactor?: number

  @Field(() => Float, { nullable: true })
  trainingStressScore?: number

  @Field(() => Float, { nullable: true })
  variabilityIndex?: number
}

@ObjectType()
export class PerformanceMetrics {
  @Field(() => Float)
  averageSpeed: number

  @Field(() => Float)
  averagePace: number

  @Field(() => Float)
  speedVariability: number

  @Field(() => Float)
  averageHeartRate: number

  @Field(() => Float)
  maxHeartRate: number

  @Field(() => Float)
  trimpScore: number

  @Field(() => Float)
  efficiencyFactor: number

  @Field(() => Float)
  aerobicDecoupling: number

  @Field(() => PowerAnalysis, { nullable: true })
  powerAnalysis?: PowerAnalysis
}

@ObjectType()
export class CorrelationAnalysis {
  @Field(() => Float)
  powerSpeedCorrelation: number

  @Field(() => Float)
  hrPowerCorrelation: number

  @Field(() => Float)
  gradeHrCorrelation: number
}

@ObjectType()
export class TrainingLoadAnalysis {
  @Field(() => Float)
  acuteLoad: number

  @Field(() => Float)
  chronicLoad: number

  @Field(() => Float)
  acwr: number

  @Field(() => String)
  riskLevel: string

  @Field(() => Float)
  fitnessScore: number

  @Field(() => Float)
  fatigueScore: number

  @Field(() => Float)
  performanceReadiness: number
}

@ObjectType()
export class DetailedInsightsResponse {
  @Field(() => [String])
  insights: string[]

  @Field(() => [HeartRateZoneDetail])
  heartRateZones: HeartRateZoneDetail[]

  @Field(() => PerformanceMetrics)
  performanceMetrics: PerformanceMetrics

  @Field(() => CorrelationAnalysis)
  correlations: CorrelationAnalysis

  @Field(() => TrainingLoadAnalysis)
  trainingLoad: TrainingLoadAnalysis
}
