import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType()
export class GarminActivity {
  @Field(() => ID)
  id: string

  @Field()
  activityId: string

  @Field()
  activityName: string

  @Field()
  activityType: string

  @Field()
  startTime: Date

  @Field()
  endTime: Date

  @Field()
  duration: number

  @Field()
  distance: number

  @Field()
  calories: number

  @Field({ nullable: true })
  averageHeartRate?: number

  @Field({ nullable: true })
  maxHeartRate?: number

  @Field({ nullable: true })
  averageSpeed?: number

  @Field({ nullable: true })
  maxSpeed?: number

  @Field({ nullable: true })
  averagePace?: number

  @Field({ nullable: true })
  maxPace?: number

  @Field({ nullable: true })
  totalAscent?: number

  @Field({ nullable: true })
  totalDescent?: number

  @Field({ nullable: true })
  startLatitude?: number

  @Field({ nullable: true })
  startLongitude?: number

  @Field({ nullable: true })
  endLatitude?: number

  @Field({ nullable: true })
  endLongitude?: number

  @Field()
  timeZone: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
} 