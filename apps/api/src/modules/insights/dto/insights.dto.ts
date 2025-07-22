import { Field, ObjectType, InputType } from '@nestjs/graphql'

@ObjectType()
export class UserGoals {
  @Field()
  type: string

  @Field({ nullable: true })
  targetDistance?: number

  @Field({ nullable: true })
  targetFTP?: number

  @Field({ nullable: true })
  targetDate?: string
}

@InputType()
export class UserGoalsInput {
  @Field()
  type: string

  @Field({ nullable: true })
  targetDistance?: number

  @Field({ nullable: true })
  targetFTP?: number

  @Field({ nullable: true })
  targetDate?: string
}

@ObjectType()
export class WeeklyDistance {
  @Field()
  week: string

  @Field()
  distance: number
}

@ObjectType()
export class HRZone {
  @Field()
  zone: string

  @Field()
  timeInZone: number
}

@ObjectType()
export class SegmentProgress {
  @Field()
  segmentId: number

  @Field()
  name: string

  @Field()
  time: number

  @Field()
  pr: boolean
}

@ObjectType()
export class CriticalPower {
  @Field()
  cp: number

  @Field()
  wPrime: number
}

@ObjectType()
export class VisualizationData {
  @Field(() => [WeeklyDistance])
  weeklyDistance: WeeklyDistance[]

  @Field(() => [HRZone])
  hrZones: HRZone[]

  @Field(() => [SegmentProgress])
  segmentProgress: SegmentProgress[]
}

@ObjectType()
export class PhysicalStatus {
  @Field()
  ftp: number

  @Field()
  vo2Max: number

  @Field()
  runningEconomy: number

  @Field(() => CriticalPower)
  criticalPower: CriticalPower

  @Field()
  hrRecovery: number

  @Field()
  acwr: number

  @Field()
  sufferScore: number

  @Field(() => [String])
  recommendations: string[]

  @Field(() => VisualizationData)
  visualizations: VisualizationData
}
