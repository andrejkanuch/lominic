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

  @Field()
  averageHeartRate: number

  @Field()
  maxHeartRate: number

  @Field()
  averageSpeed: number

  @Field()
  maxSpeed: number

  @Field()
  averagePace: number

  @Field()
  maxPace: number

  @Field()
  totalAscent: number

  @Field()
  totalDescent: number

  @Field()
  startLatitude: number

  @Field()
  startLongitude: number

  @Field()
  endLatitude: number

  @Field()
  endLongitude: number

  @Field()
  timeZone: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
