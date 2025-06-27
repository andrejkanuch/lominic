export interface LatLng {
  0: number
  1: number
}

export interface PolylineMap {
  id: string
  polyline: string | null
  summary_polyline: string | null
  resource_state: number
}

export interface MetaAthlete {
  id: number
  resource_state: number
}

export interface SummaryGear {
  id: string
  primary: boolean
  name: string
  resource_state: number
  distance: number
}

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

export interface DetailedSegmentEffort {
  id: number
  resource_state: number
  name: string
  activity: MetaAthlete // Re-using MetaAthlete as it has id and resource_state
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

export interface Split {
  distance: number
  elapsed_time: number
  elevation_difference: number
  moving_time: number
  split: number
  average_speed: number
  pace_zone: number
}

export interface Lap {
  id: number
  resource_state: number
  name: string
  activity: MetaAthlete
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

export interface HighlightedKudosers {
  destination_url: string
  display_name: string
  avatar_url: string
  show_name: boolean
}

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
  gear_id: string | null
  from_accepted_tag: boolean
  average_speed: number
  max_speed: number
  average_cadence: number | null
  average_temp: number | null
  average_watts: number | null
  weighted_average_watts: number | null
  kilojoules: number | null
  device_watts: boolean | null
  has_heartrate: boolean
  max_watts: number | null
  elev_high: number | null
  elev_low: number | null
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
  workout_type: number | null
  suffer_score: number | null
}

export interface Activity {
  id: number
  resource_state: number
  external_id: string
  upload_id: number
  upload_id_str?: string
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
  start_latlng: LatLng
  end_latlng: LatLng
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
  gear_id: string
  from_accepted_tag: boolean
  average_speed: number
  max_speed: number
  average_cadence: number
  average_temp: number
  average_watts: number
  weighted_average_watts: number
  kilojoules: number
  device_watts: boolean
  has_heartrate: boolean
  max_watts: number
  elev_high: number
  elev_low: number
  pr_count: number
  total_photo_count: number
  has_kudoed: boolean
  workout_type: number
  suffer_score: number | null
  description: string
  calories: number
  segment_efforts: DetailedSegmentEffort[]
  splits_metric: Split[]
  laps: Lap[]
  gear: SummaryGear
  partner_brand_tag: string | null
  photos: PhotosSummary
  highlighted_kudosers: HighlightedKudosers[]
  hide_from_home: boolean
  device_name: string
  embed_token: string
  segment_leaderboard_opt_out: boolean
  leaderboard_opt_out: boolean
  location_city?: string | null
  location_state?: string | null
  location_country?: string | null
  visibility?: string
  average_heartrate?: number
  max_heartrate?: number
  heartrate_opt_out?: boolean
  display_hide_heartrate_option?: boolean
}

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
  clubs: unknown[] // Define more specifically if needed
  username: string
  // Add other fields from the sample response that are not in SummaryAthlete
}