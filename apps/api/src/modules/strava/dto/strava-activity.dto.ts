import { Field, Float, Int, ObjectType, ID } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-type-json'

@ObjectType()
export class StravaActivityDto {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  type: string

  @Field()
  sport_type: string

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  moving_time: number

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Float)
  total_elevation_gain: number

  @Field()
  start_date: string

  @Field()
  start_date_local: string

  @Field()
  timezone: string

  @Field(() => Int)
  utc_offset: number

  @Field(() => GraphQLJSON, { nullable: true })
  start_latlng?: (number | null)[]

  @Field(() => GraphQLJSON, { nullable: true })
  end_latlng?: (number | null)[]

  @Field(() => Int)
  achievement_count: number

  @Field(() => Int)
  kudos_count: number

  @Field(() => Int)
  comment_count: number

  @Field(() => Int)
  athlete_count: number

  @Field(() => Int)
  photo_count: number

  @Field()
  trainer: boolean

  @Field()
  commute: boolean

  @Field()
  manual: boolean

  @Field()
  private: boolean

  @Field()
  flagged: boolean

  @Field({ nullable: true })
  gear_id?: string

  @Field()
  from_accepted_tag: boolean

  @Field(() => Float)
  average_speed: number

  @Field(() => Float)
  max_speed: number

  @Field(() => Float, { nullable: true })
  average_cadence?: number

  @Field(() => Float, { nullable: true })
  average_temp?: number

  @Field(() => Float, { nullable: true })
  average_watts?: number

  @Field(() => Float, { nullable: true })
  weighted_average_watts?: number

  @Field(() => Float, { nullable: true })
  kilojoules?: number

  @Field({ nullable: true })
  device_watts?: boolean

  @Field()
  has_heartrate: boolean

  @Field(() => Float, { nullable: true })
  max_watts?: number

  @Field(() => Float, { nullable: true })
  elev_high?: number

  @Field(() => Float, { nullable: true })
  elev_low?: number

  @Field(() => Int)
  pr_count: number

  @Field(() => Int)
  total_photo_count: number

  @Field()
  has_kudoed: boolean

  @Field(() => Int, { nullable: true })
  workout_type?: number

  @Field(() => Int, { nullable: true })
  suffer_score?: number

  @Field({ nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  calories?: number

  @Field(() => GraphQLJSON, { nullable: true })
  polyline?: string

  // Additional fields from actual API response
  @Field(() => Int, { nullable: true })
  resource_state?: number

  @Field({ nullable: true })
  external_id?: string

  @Field(() => Int, { nullable: true })
  upload_id?: number

  @Field({ nullable: true })
  upload_id_str?: string

  @Field({ nullable: true })
  location_city?: string

  @Field({ nullable: true })
  location_state?: string

  @Field({ nullable: true })
  location_country?: string

  @Field({ nullable: true })
  visibility?: string

  @Field(() => Float, { nullable: true })
  average_heartrate?: number

  @Field(() => Float, { nullable: true })
  max_heartrate?: number

  @Field({ nullable: true })
  heartrate_opt_out?: boolean

  @Field({ nullable: true })
  display_hide_heartrate_option?: boolean
}
