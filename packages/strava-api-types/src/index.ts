// ============================================================================
// CORE TYPES
// ============================================================================

export interface LatLng {
  0: number
  1: number
}

export interface MetaAthlete {
  id: number
  resource_state: number
}

export interface MetaActivity {
  id: number
  resource_state: number
}

export interface MetaClub {
  id: number
  resource_state: number
}

// ============================================================================
// MAP & LOCATION TYPES
// ============================================================================

export interface PolylineMap {
  id: string
  polyline: string | null
  summary_polyline: string | null
  resource_state: number
}

export interface Waypoint {
  latlng: LatLng
  target: LatLng
}

// ============================================================================
// GEAR TYPES
// ============================================================================

export interface SummaryGear {
  id: string
  primary: boolean
  name: string
  resource_state: number
  distance: number
}

export interface DetailedGear {
  id: string
  primary: boolean
  name: string
  resource_state: number
  distance: number
  brand_name: string
  model_name: string
  frame_type: number
  description: string
}

// ============================================================================
// PHOTO TYPES
// ============================================================================

export interface PhotoSummary {
  id: number | null
  unique_id: string
  urls: { [key: string]: string }
  source: number
}

export interface PhotosSummary {
  primary: PhotoSummary
  use_primary_photo: boolean
  count: number
}

// ============================================================================
// SEGMENT TYPES
// ============================================================================

export interface SummarySegment {
  id: number
  resource_state: number
  name: string
  activity_type: string
  distance: number
  average_grade: number
  maximum_grade: number
  elevation_high: number
  elevation_low: number
  start_latlng: LatLng
  end_latlng: LatLng
  climb_category: number
  city: string
  state: string
  country: string
  private: boolean
  hazardous: boolean
  starred: boolean
}

export interface DetailedSegment extends SummarySegment {
  created_at: string
  updated_at: string
  total_elevation_gain: number
  map: PolylineMap
  effort_count: number
  athlete_count: number
  star_count: number
  athlete_segment_stats: unknown // Define more specifically if needed
}

export interface SummarySegmentEffort {
  id: number
  resource_state: number
  name: string
  activity: MetaActivity
  athlete: MetaAthlete
  elapsed_time: number
  moving_time: number
  start_date: string
  start_date_local: string
  distance: number
  start_index: number
  end_index: number
  average_cadence: number
  device_watts: boolean
  average_watts: number
  segment: SummarySegment
  kom_rank: number | null
  pr_rank: number | null
  achievements: unknown[] // Define more specifically if needed
  hidden: boolean
}

export interface DetailedSegmentEffort {
  id: number
  resource_state: number
  name: string
  activity: MetaActivity
  athlete: MetaAthlete
  elapsed_time: number
  moving_time: number
  start_date: string
  start_date_local: string
  distance: number
  start_index: number
  end_index: number
  average_cadence: number
  device_watts: boolean
  average_watts: number
  segment: SummarySegment
  kom_rank: number | null
  pr_rank: number | null
  achievements: unknown[] // Define more specifically if needed
  hidden: boolean
}

// ============================================================================
// ACTIVITY TYPES
// ============================================================================

export interface SummaryActivity {
  id: number
  resource_state: number
  external_id: string | null
  upload_id: number | null
  athlete: MetaAthlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  elev_high: number | null
  elev_low: number | null
  type: string
  start_date: string
  start_date_local: string
  timezone: string
  start_latlng: LatLng | null
  end_latlng: LatLng | null
  achievement_count: number
  pr_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  total_photo_count: number
  map: PolylineMap
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  flagged: boolean
  workout_type: number | null
  gear_id: string | null
  average_speed: number
  max_speed: number
  average_cadence: number | null
  average_temp: number | null
  average_watts: number | null
  max_watts: number | null
  weighted_average_watts: number | null
  kilojoules: number | null
  device_watts: boolean | null
  has_heartrate: boolean
  average_heartrate: number | null
  max_heartrate: number | null
  calories: number | null
  suffer_score: number | null
  has_kudoed: boolean
  // Deprecated fields (still present in some responses, but not guaranteed)
  location_city?: string | null
  location_state?: string | null
  location_country?: string | null
}

export interface DetailedActivity extends SummaryActivity {
  description: string | null
  gear: SummaryGear | null
  segment_efforts: DetailedSegmentEffort[]
  splits_metric: Split[]
  splits_standard: Split[]
  laps: Lap[]
  best_efforts: DetailedSegmentEffort[]
  device_name: string | null
  embed_token: string | null
  photos: PhotosSummary | null
  sport_type: SportType
}

export interface UpdatableActivity {
  commute: boolean
  trainer: boolean
  hide_from_home: boolean
  description: string
  name: string
  type: string
  sport_type: string
  gear_id: string | null
}

// ============================================================================
// ATHLETE TYPES
// ============================================================================

export interface SummaryAthlete {
  id: number
  resource_state: number
  firstname: string
  lastname: string
  profile_medium: string
  profile: string
  city: string
  state: string
  country: string
  sex: string
  premium: boolean
  summit: boolean
  created_at: string
  updated_at: string
  badge_type_id: number
  weight: number
  ftp: number | null
  bikes: SummaryGear[]
  shoes: SummaryGear[]
}

export interface DetailedAthlete extends SummaryAthlete {
  follower_count: number
  friend_count: number
  mutual_friend_count: number
  athlete_type: number
  date_preference: string
  measurement_preference: string
  clubs: SummaryClub[]
  username: string
}

// ============================================================================
// CLUB TYPES
// ============================================================================

export interface SummaryClub {
  id: number
  resource_state: number
  name: string
  profile_medium: string
  cover_photo: string
  cover_photo_small: string
  sport_type: string
  activity_types: ActivityType[]
  city: string
  state: string
  country: string
  private: boolean
  member_count: number
  featured: boolean
  verified: boolean
  url: string
  membership: string
  admin: boolean
  owner: boolean
  following_count: number
}

export interface DetailedClub extends SummaryClub {
  description: string
  club_type: string
  overall_activity_count: number
  recent_activity_count: number
}

export interface ClubActivity {
  id: number
  resource_state: number
  external_id: string | null
  upload_id: number | null
  athlete: MetaAthlete
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  sport_type: string
  start_date: string
  start_date_local: string
  timezone: string
  utc_offset: number
  start_latlng: LatLng | null
  end_latlng: LatLng | null
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: PolylineMap
  trainer: boolean
  commute: boolean
  manual: boolean
  private: boolean
  flagged: boolean
  workout_type: number | null
  upload_id_str: string | null
  average_speed: number
  max_speed: number
  has_kudoed: boolean
  hide_from_home: boolean
  gear_id: string | null
  kilojoules: number | null
  average_watts: number | null
  device_watts: boolean | null
  average_cadence: number | null
  average_temp: number | null
  average_heartrate: number | null
  max_heartrate: number | null
  elev_high: number | null
  elev_low: number | null
  pr_count: number
  total_photo_count: number
  suffer_score: number | null
  from_accepted_tag: boolean
  location_city: string | null
  location_state: string | null
  location_country: string | null
}

export interface ClubAthlete {
  firstname: string
  lastname: string
  member: string
  admin: boolean
  owner: boolean
}

// ============================================================================
// ROUTE TYPES
// ============================================================================

export interface Route {
  athlete: SummaryAthlete
  description: string
  distance: number
  elevation_gain: number
  id: number
  id_str: string
  map: PolylineMap
  name: string
  private: boolean
  resource_state: number
  starred: boolean
  sub_type: number
  timestamp: number
  type: number
  waypoints: Waypoint[]
}

// ============================================================================
// LAP & SPLIT TYPES
// ============================================================================

export interface Lap {
  id: number
  resource_state: number
  name: string
  activity: MetaActivity
  athlete: MetaAthlete
  elapsed_time: number
  moving_time: number
  start_date: string
  start_date_local: string
  distance: number
  start_index: number
  end_index: number
  total_elevation_gain: number
  average_speed: number
  max_speed: number
  average_cadence: number
  device_watts: boolean
  average_watts: number
  lap_index: number
  split: number
}

export interface Split {
  distance: number
  elapsed_time: number
  elevation_difference: number
  moving_time: number
  split: number
  average_speed: number
  pace_zone: number
}

// ============================================================================
// ZONE TYPES
// ============================================================================

export interface ZoneBucket {
  max: number
  min: number
  time: number
}

export interface ZoneRange {
  min: number
  max: number
}

export interface HeartRateZoneRanges {
  custom_zones: boolean
  zones: ZoneRange[]
}

export interface PowerZoneRanges {
  zones: ZoneRange[]
}

export interface ActivityZone {
  score: number
  distribution_buckets: ZoneBucket[]
  type: string
  sensor_based: boolean
  points: number
  custom_zones: boolean
  max: number
}

export interface HeartRateZone {
  min: number
  max: number
}

export interface PowerZone {
  zone: {
    min: number
    max: number
  }
  distribution_buckets: ZoneBucket[]
  type: string
  resource_state: number
  sensor_based: boolean
}

export interface Zones {
  heart_rate?: HeartRateZone
  power?: PowerZone
}

export interface TimedZoneRange {
  min: number
  max: number
  time: number
}

export interface TimedZoneDistribution {
  heart_rate: TimedZoneRange[]
  power: TimedZoneRange[]
}

// ============================================================================
// STREAM TYPES
// ============================================================================

export interface BaseStream {
  type: string
  data: number[]
  series_type: string
  original_size: number
  resolution: string
}

export interface AltitudeStream extends BaseStream {
  type: 'altitude'
}

export interface CadenceStream extends BaseStream {
  type: 'cadence'
}

export interface DistanceStream extends BaseStream {
  type: 'distance'
}

export interface HeartrateStream extends BaseStream {
  type: 'heartrate'
}

export interface LatLngStream {
  type: 'latlng'
  data: LatLng[]
  series_type: string
  original_size: number
  resolution: string
}

export interface MovingStream {
  type: 'moving'
  data: boolean[]
  series_type: string
  original_size: number
  resolution: string
}

export interface PowerStream extends BaseStream {
  type: 'power'
}

export interface SmoothGradeStream extends BaseStream {
  type: 'smooth_grade'
}

export interface SmoothVelocityStream extends BaseStream {
  type: 'smooth_velocity'
}

export interface TemperatureStream extends BaseStream {
  type: 'temperature'
}

export interface TimeStream extends BaseStream {
  type: 'time'
}

export interface StreamSet {
  altitude?: AltitudeStream
  cadence?: CadenceStream
  distance?: DistanceStream
  heartrate?: HeartrateStream
  latlng?: LatLngStream
  moving?: MovingStream
  power?: PowerStream
  smooth_grade?: SmoothGradeStream
  smooth_velocity?: SmoothVelocityStream
  temperature?: TemperatureStream
  time?: TimeStream
}

// ============================================================================
// COMMENT & KUDO TYPES
// ============================================================================

export interface CommentAthlete {
  firstname: string
  lastname: string
}

export interface Comment {
  id: number
  activity_id: number
  post_id: number | null
  resource_state: number
  text: string
  mentions_metadata: null
  created_at: string
  athlete: CommentAthlete
  cursor: string
}

export interface Kudoer {
  firstname: string
  lastname: string
}

export interface HighlightedKudosers {
  destination_url: string
  display_name: string
  avatar_url: string
  show_name: boolean
}

// ============================================================================
// UPLOAD TYPES
// ============================================================================

export interface Upload {
  id: number
  id_str: string
  external_id: string
  error: string | null
  status: string
  activity_id: number | null
}

// ============================================================================
// STATS & TOTALS TYPES
// ============================================================================

export interface ActivityTotal {
  count: number
  distance: number
  moving_time: number
  elapsed_time: number
  elevation_gain: number
  achievement_count?: number
}

export interface ActivityStats {
  recent_run_totals: ActivityTotal
  all_run_totals: ActivityTotal
  recent_swim_totals: ActivityTotal
  biggest_ride_distance: number
  ytd_swim_totals: ActivityTotal
  all_swim_totals: ActivityTotal
  recent_ride_totals: ActivityTotal
  biggest_climb_elevation_gain: number
  ytd_ride_totals: ActivityTotal
  all_ride_totals: ActivityTotal
  ytd_run_totals: ActivityTotal
}

// ============================================================================
// ENUM TYPES
// ============================================================================

export interface ActivityType {
  meta: boolean
  name: string
}

export type SportType =
  | 'AlpineSki'
  | 'BackcountrySki'
  | 'Badminton'
  | 'Canoeing'
  | 'Crossfit'
  | 'EBikeRide'
  | 'Elliptical'
  | 'EMountainBikeRide'
  | 'Golf'
  | 'GravelRide'
  | 'Handcycle'
  | 'HighIntensityIntervalTraining'
  | 'Hike'
  | 'IceSkate'
  | 'InlineSkate'
  | 'Kayaking'
  | 'Kitesurf'
  | 'MountainBikeRide'
  | 'NordicSki'
  | 'Pickleball'
  | 'Pilates'
  | 'Racquetball'
  | 'Ride'
  | 'RockClimbing'
  | 'RollerSki'
  | 'Rowing'
  | 'Run'
  | 'Sail'
  | 'Skateboard'
  | 'Snowboard'
  | 'Snowshoe'
  | 'Soccer'
  | 'Squash'
  | 'StairStepper'
  | 'StandUpPaddling'
  | 'Surfing'
  | 'Swim'
  | 'TableTennis'
  | 'Tennis'
  | 'TrailRun'
  | 'Velomobile'
  | 'VirtualRide'
  | 'VirtualRow'
  | 'VirtualRun'
  | 'Walk'
  | 'WeightTraining'
  | 'Wheelchair'
  | 'Windsurf'
  | 'Workout'
  | 'Yoga'

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface Error {
  code: string
  field: string
  resource: string
}

export interface Fault {
  message: string
  errors: Error[]
}

// ============================================================================
// EXPLORER TYPES
// ============================================================================

export interface ExplorerSegment {
  id: number
  name: string
  climb_category: number
  climb_category_desc: string
  avg_grade: number
  start_latlng: LatLng
  end_latlng: LatLng
  elev_difference: number
  distance: number
  points: string
  starred: boolean
}

export interface ExplorerResponse {
  segments: ExplorerSegment[]
}

// ============================================================================
// LEGACY ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================

// Keep the old Activity interface as an alias for DetailedActivity
export type Activity = DetailedActivity
