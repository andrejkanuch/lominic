import { Field, Int, Float, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ActivityTotal {
  @Field(() => Int)
  count: number

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  moving_time: number

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Float)
  elevation_gain: number

  @Field(() => Int, { nullable: true })
  achievement_count?: number
}

@ObjectType()
export class ActivityStats {
  @Field(() => ActivityTotal)
  recent_run_totals: ActivityTotal

  @Field(() => ActivityTotal)
  all_run_totals: ActivityTotal

  @Field(() => ActivityTotal)
  recent_swim_totals: ActivityTotal

  @Field(() => Float)
  biggest_ride_distance: number

  @Field(() => ActivityTotal)
  ytd_swim_totals: ActivityTotal

  @Field(() => ActivityTotal)
  all_swim_totals: ActivityTotal

  @Field(() => ActivityTotal)
  recent_ride_totals: ActivityTotal

  @Field(() => Float)
  biggest_climb_elevation_gain: number

  @Field(() => ActivityTotal)
  ytd_ride_totals: ActivityTotal

  @Field(() => ActivityTotal)
  all_ride_totals: ActivityTotal

  @Field(() => ActivityTotal)
  ytd_run_totals: ActivityTotal
}
