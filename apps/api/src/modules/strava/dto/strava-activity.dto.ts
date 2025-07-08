import { SportType as StravaSportType } from '@lominic/strava-api-types'
import {
  Field,
  Float,
  Int,
  ObjectType,
  ID,
  registerEnumType,
} from '@nestjs/graphql'
import { LatLngDto } from './stream-set.dto'
import { SummaryGearDto } from './summary-gear.dto'
import { GraphQLJSON } from 'graphql-type-json'

export enum SportType {
  AlpineSki = 'AlpineSki',
  BackcountrySki = 'BackcountrySki',
  Badminton = 'Badminton',
  Canoeing = 'Canoeing',
  Crossfit = 'Crossfit',
  EBikeRide = 'EBikeRide',
  Elliptical = 'Elliptical',
  EMountainBikeRide = 'EMountainBikeRide',
  Golf = 'Golf',
  GravelRide = 'GravelRide',
  Handcycle = 'Handcycle',
  HighIntensityIntervalTraining = 'HighIntensityIntervalTraining',
  Hike = 'Hike',
  IceSkate = 'IceSkate',
  InlineSkate = 'InlineSkate',
  Kayaking = 'Kayaking',
  Kitesurf = 'Kitesurf',
  MountainBikeRide = 'MountainBikeRide',
  NordicSki = 'NordicSki',
  Pickleball = 'Pickleball',
  Pilates = 'Pilates',
  Racquetball = 'Racquetball',
  Ride = 'Ride',
  RockClimbing = 'RockClimbing',
  RollerSki = 'RollerSki',
  Rowing = 'Rowing',
  Run = 'Run',
  Sail = 'Sail',
  Skateboard = 'Skateboard',
  Snowboard = 'Snowboard',
  Snowshoe = 'Snowshoe',
  Soccer = 'Soccer',
  Squash = 'Squash',
  StairStepper = 'StairStepper',
  StandUpPaddling = 'StandUpPaddling',
  Surfing = 'Surfing',
  Swim = 'Swim',
  TableTennis = 'TableTennis',
  Tennis = 'Tennis',
  TrailRun = 'TrailRun',
  Velomobile = 'Velomobile',
  VirtualRide = 'VirtualRide',
  VirtualRow = 'VirtualRow',
  VirtualRun = 'VirtualRun',
  Walk = 'Walk',
  WeightTraining = 'WeightTraining',
  Wheelchair = 'Wheelchair',
  Windsurf = 'Windsurf',
  Workout = 'Workout',
  Yoga = 'Yoga',
}

registerEnumType(SportType, {
  name: 'SportType',
  description: 'Strava sport types',
})

@ObjectType()
export class MetaAthleteDto {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  resource_state: number
}

@ObjectType()
export class PolylineMapDto {
  @Field()
  id: string

  @Field({ nullable: true })
  polyline?: string

  @Field(() => Int)
  resource_state: number

  @Field({ nullable: true })
  summary_polyline?: string
}

@ObjectType()
export class DetailedSegmentEffortDto {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  resource_state: number

  @Field()
  name: string

  @Field(() => MetaAthleteDto)
  athlete: MetaAthleteDto

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Int)
  moving_time: number

  @Field()
  start_date: string

  @Field()
  start_date_local: string

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  start_index: number

  @Field(() => Int)
  end_index: number

  @Field(() => Float, { nullable: true })
  average_cadence?: number

  @Field({ nullable: true })
  device_watts?: boolean

  @Field(() => Float, { nullable: true })
  average_watts?: number

  @Field(() => Int, { nullable: true })
  kom_rank?: number

  @Field(() => Int, { nullable: true })
  pr_rank?: number

  @Field({ nullable: true })
  hidden?: boolean
}

@ObjectType()
export class SplitDto {
  @Field(() => Float)
  distance: number

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Float)
  elevation_difference: number

  @Field(() => Int)
  moving_time: number

  @Field(() => Int)
  split: number

  @Field(() => Float)
  average_speed: number

  @Field(() => Int)
  pace_zone: number
}

@ObjectType()
export class LapDto {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  resource_state: number

  @Field()
  name: string

  @Field(() => MetaAthleteDto)
  athlete: MetaAthleteDto

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Int)
  moving_time: number

  @Field()
  start_date: string

  @Field()
  start_date_local: string

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  start_index: number

  @Field(() => Int)
  end_index: number

  @Field(() => Float)
  total_elevation_gain: number

  @Field(() => Float)
  average_speed: number

  @Field(() => Float)
  max_speed: number

  @Field(() => Float, { nullable: true })
  average_cadence?: number

  @Field({ nullable: true })
  device_watts?: boolean

  @Field(() => Float, { nullable: true })
  average_watts?: number

  @Field(() => Int)
  lap_index: number

  @Field(() => Int)
  split: number
}

@ObjectType()
export class StravaActivityDto {
  @Field(() => ID)
  id: string

  @Field(() => Int)
  resource_state: number

  @Field({ nullable: true })
  external_id?: string

  @Field({ nullable: true })
  upload_id?: string

  @Field(() => MetaAthleteDto)
  athlete: MetaAthleteDto

  @Field()
  name: string

  @Field(() => Float)
  distance: number

  @Field(() => Int)
  moving_time: number

  @Field(() => Int)
  elapsed_time: number

  @Field(() => Float)
  total_elevation_gain: number

  @Field(() => Float, { nullable: true })
  elev_high?: number

  @Field(() => Float, { nullable: true })
  elev_low?: number

  @Field()
  type: string

  @Field()
  start_date: string

  @Field()
  start_date_local: string

  @Field()
  timezone: string

  @Field(() => LatLngDto, { nullable: true })
  start_latlng?: LatLngDto

  @Field(() => LatLngDto, { nullable: true })
  end_latlng?: LatLngDto

  @Field(() => Int)
  achievement_count: number

  @Field(() => Int)
  pr_count: number

  @Field(() => Int)
  kudos_count: number

  @Field(() => Int)
  comment_count: number

  @Field(() => Int)
  athlete_count: number

  @Field(() => Int)
  photo_count: number

  @Field(() => Int)
  total_photo_count: number

  @Field(() => PolylineMapDto)
  map: PolylineMapDto

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

  @Field(() => Int, { nullable: true })
  workout_type?: number

  @Field({ nullable: true })
  gear_id?: string

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
  max_watts?: number

  @Field(() => Float, { nullable: true })
  weighted_average_watts?: number

  @Field(() => Float, { nullable: true })
  kilojoules?: number

  @Field({ nullable: true })
  device_watts?: boolean

  @Field()
  has_heartrate: boolean

  @Field(() => Float, { nullable: true })
  average_heartrate?: number

  @Field(() => Float, { nullable: true })
  max_heartrate?: number

  @Field(() => Float, { nullable: true })
  calories?: number

  @Field(() => Int, { nullable: true })
  suffer_score?: number

  @Field()
  has_kudoed: boolean

  // Deprecated fields (optional)
  @Field({ nullable: true })
  location_city?: string

  @Field({ nullable: true })
  location_state?: string

  @Field({ nullable: true })
  location_country?: string

  // DetailedActivity only fields (optional)
  @Field({ nullable: true })
  description?: string

  @Field(() => SummaryGearDto, { nullable: true })
  gear?: SummaryGearDto

  @Field(() => [DetailedSegmentEffortDto], { nullable: true })
  segment_efforts?: DetailedSegmentEffortDto[]

  @Field(() => [SplitDto], { nullable: true })
  splits_metric?: SplitDto[]

  @Field(() => [SplitDto], { nullable: true })
  splits_standard?: SplitDto[]

  @Field(() => [LapDto], { nullable: true })
  laps?: LapDto[]

  @Field(() => [DetailedSegmentEffortDto], { nullable: true })
  best_efforts?: DetailedSegmentEffortDto[]

  @Field({ nullable: true })
  device_name?: string

  @Field({ nullable: true })
  embed_token?: string

  @Field(() => GraphQLJSON, { nullable: true })
  photos?: Record<string, unknown>

  @Field(() => Int, { nullable: true })
  utc_offset?: number

  @Field({ nullable: true })
  from_accepted_tag?: boolean

  @Field({ nullable: true })
  polyline?: string

  @Field(() => SportType)
  sport_type: StravaSportType
}
