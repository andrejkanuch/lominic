import { ObjectType, Field, ID, Float } from '@nestjs/graphql'
import {
  PolylineMap,
  DetailedSegmentEffort,
  Split,
  Lap,
  SummaryGear,
  PhotosSummary,
  HighlightedKudosers,
} from '@lominic/strava-api-types'

@ObjectType()
export class ActivityDto {
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

  @Field(() => Float)
  moving_time: number

  @Field(() => Float)
  elapsed_time: number

  @Field(() => Float)
  total_elevation_gain: number

  @Field()
  start_date: string

  @Field()
  start_date_local: string

  @Field()
  timezone: string

  @Field(() => Float)
  utc_offset: number

  @Field(() => [Float], { nullable: true })
  start_latlng?: number[]

  @Field(() => [Float], { nullable: true })
  end_latlng?: number[]

  @Field(() => Float)
  achievement_count: number

  @Field(() => Float)
  kudos_count: number

  @Field(() => Float)
  comment_count: number

  @Field(() => Float)
  athlete_count: number

  @Field(() => Float)
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

  @Field(() => Float)
  pr_count: number

  @Field(() => Float)
  total_photo_count: number

  @Field()
  has_kudoed: boolean

  @Field(() => Float, { nullable: true })
  workout_type?: number

  @Field(() => Float, { nullable: true })
  suffer_score?: number

  @Field({ nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  calories?: number

  @Field({ nullable: true })
  polyline?: string
}
