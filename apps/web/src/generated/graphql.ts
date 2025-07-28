import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: Record<string, any>; output: Record<string, any>; }
};

export type ActivityStats = {
  __typename?: 'ActivityStats';
  all_ride_totals: ActivityTotal;
  all_run_totals: ActivityTotal;
  all_swim_totals: ActivityTotal;
  biggest_climb_elevation_gain: Scalars['Float']['output'];
  biggest_ride_distance: Scalars['Float']['output'];
  recent_ride_totals: ActivityTotal;
  recent_run_totals: ActivityTotal;
  recent_swim_totals: ActivityTotal;
  ytd_ride_totals: ActivityTotal;
  ytd_run_totals: ActivityTotal;
  ytd_swim_totals: ActivityTotal;
};

export type ActivityTotal = {
  __typename?: 'ActivityTotal';
  achievement_count: Maybe<Scalars['Int']['output']>;
  count: Scalars['Int']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  elevation_gain: Scalars['Float']['output'];
  moving_time: Scalars['Int']['output'];
};

export type ActivityZoneDto = {
  __typename?: 'ActivityZoneDto';
  custom_zones: Scalars['Boolean']['output'];
  distribution_buckets: Maybe<Array<ZoneBucket>>;
  max: Scalars['Float']['output'];
  points: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  sensor_based: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type AltitudeStreamDto = {
  __typename?: 'AltitudeStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type CadenceStreamDto = {
  __typename?: 'CadenceStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type CommentDto = {
  __typename?: 'CommentDto';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type CorrelationAnalysis = {
  __typename?: 'CorrelationAnalysis';
  gradeHrCorrelation: Scalars['Float']['output'];
  hrPowerCorrelation: Scalars['Float']['output'];
  powerSpeedCorrelation: Scalars['Float']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type CriticalPower = {
  __typename?: 'CriticalPower';
  cp: Scalars['Float']['output'];
  wPrime: Scalars['Float']['output'];
};

export type DetailedAthlete = {
  __typename?: 'DetailedAthlete';
  athlete_type: Scalars['Int']['output'];
  badge_type_id: Scalars['Int']['output'];
  bikes: Array<SummaryGearDto>;
  city: Scalars['String']['output'];
  clubs: Maybe<Array<Scalars['String']['output']>>;
  country: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  date_preference: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  follower_count: Scalars['Int']['output'];
  friend_count: Scalars['Int']['output'];
  ftp: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  measurement_preference: Scalars['String']['output'];
  mutual_friend_count: Scalars['Int']['output'];
  premium: Scalars['Boolean']['output'];
  profile: Scalars['String']['output'];
  profile_medium: Scalars['String']['output'];
  resource_state: Scalars['Int']['output'];
  sex: Scalars['String']['output'];
  shoes: Array<SummaryGearDto>;
  state: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
  username: Maybe<Scalars['String']['output']>;
  weight: Scalars['Int']['output'];
};

export type DetailedInsightsResponse = {
  __typename?: 'DetailedInsightsResponse';
  correlations: CorrelationAnalysis;
  heartRateZones: Array<HeartRateZoneDetail>;
  insights: Array<Scalars['String']['output']>;
  performanceMetrics: PerformanceMetrics;
  trainingLoad: TrainingLoadAnalysis;
};

export type DetailedSegmentEffortDto = {
  __typename?: 'DetailedSegmentEffortDto';
  athlete: MetaAthleteDto;
  average_cadence: Maybe<Scalars['Float']['output']>;
  average_watts: Maybe<Scalars['Float']['output']>;
  device_watts: Maybe<Scalars['Boolean']['output']>;
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  end_index: Scalars['Int']['output'];
  hidden: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  kom_rank: Maybe<Scalars['Int']['output']>;
  moving_time: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  pr_rank: Maybe<Scalars['Int']['output']>;
  resource_state: Scalars['Int']['output'];
  start_date: Scalars['String']['output'];
  start_date_local: Scalars['String']['output'];
  start_index: Scalars['Int']['output'];
};

export type DistanceStreamDto = {
  __typename?: 'DistanceStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type GarminAccount = {
  __typename?: 'GarminAccount';
  accessToken: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  dataRetentionExpiresAt: Scalars['DateTime']['output'];
  expiresAt: Scalars['DateTime']['output'];
  garminUserId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isMarkedForDeletion: Scalars['Boolean']['output'];
  lastSyncAt: Scalars['DateTime']['output'];
  markedForDeletionAt: Scalars['DateTime']['output'];
  refreshToken: Scalars['String']['output'];
  refreshTokenExpiresAt: Scalars['DateTime']['output'];
  scope: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type GarminActivity = {
  __typename?: 'GarminActivity';
  activityId: Scalars['String']['output'];
  activityName: Scalars['String']['output'];
  activityType: Scalars['String']['output'];
  averageHeartRate: Scalars['Float']['output'];
  averagePace: Scalars['Float']['output'];
  averageSpeed: Scalars['Float']['output'];
  calories: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  distance: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  endLatitude: Scalars['Float']['output'];
  endLongitude: Scalars['Float']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  maxHeartRate: Scalars['Float']['output'];
  maxPace: Scalars['Float']['output'];
  maxSpeed: Scalars['Float']['output'];
  startLatitude: Scalars['Float']['output'];
  startLongitude: Scalars['Float']['output'];
  startTime: Scalars['DateTime']['output'];
  timeZone: Scalars['String']['output'];
  totalAscent: Scalars['Float']['output'];
  totalDescent: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type HrZone = {
  __typename?: 'HRZone';
  timeInZone: Scalars['Float']['output'];
  zone: Scalars['String']['output'];
};

export type HeartRateZone = {
  __typename?: 'HeartRateZone';
  custom_zones: Maybe<Scalars['Boolean']['output']>;
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
  zones: Maybe<Array<ZoneBucket>>;
};

export type HeartRateZoneDetail = {
  __typename?: 'HeartRateZoneDetail';
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
  maxHeartRate: Scalars['Int']['output'];
  minHeartRate: Scalars['Int']['output'];
  percentage: Scalars['Float']['output'];
  timeInZone: Scalars['Int']['output'];
  zone: Scalars['Int']['output'];
};

export type HeartrateStreamDto = {
  __typename?: 'HeartrateStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type KudoerDto = {
  __typename?: 'KudoerDto';
  firstname: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
};

export type LapDto = {
  __typename?: 'LapDto';
  athlete: MetaAthleteDto;
  average_cadence: Maybe<Scalars['Float']['output']>;
  average_speed: Scalars['Float']['output'];
  average_watts: Maybe<Scalars['Float']['output']>;
  device_watts: Maybe<Scalars['Boolean']['output']>;
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  end_index: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lap_index: Scalars['Int']['output'];
  max_speed: Scalars['Float']['output'];
  moving_time: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  resource_state: Scalars['Int']['output'];
  split: Scalars['Int']['output'];
  start_date: Scalars['String']['output'];
  start_date_local: Scalars['String']['output'];
  start_index: Scalars['Int']['output'];
  total_elevation_gain: Scalars['Float']['output'];
};

export type LatLngDto = {
  __typename?: 'LatLngDto';
  lat: Maybe<Scalars['Float']['output']>;
  lng: Maybe<Scalars['Float']['output']>;
};

export type LatLngStreamDto = {
  __typename?: 'LatLngStreamDto';
  data: Array<LatLngDto>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MetaAthleteDto = {
  __typename?: 'MetaAthleteDto';
  id: Scalars['Int']['output'];
  resource_state: Scalars['Int']['output'];
};

export type MovingStreamDto = {
  __typename?: 'MovingStreamDto';
  data: Array<Scalars['Boolean']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteGarminUserRegistration: Scalars['Boolean']['output'];
  disconnectGarminAccount: Scalars['Boolean']['output'];
  exchangeGarminCode: GarminAccount;
  login: AuthResponse;
  performDataRetentionCleanup: Scalars['String']['output'];
  refreshGarminToken: GarminAccount;
  register: AuthResponse;
  removeUser: User;
  restoreStravaAccountFromDeletion: Scalars['String']['output'];
  restoreUserFromDeletion: Scalars['String']['output'];
  signUp: User;
  updateOwnProfile: User;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationExchangeGarminCodeArgs = {
  code: Scalars['String']['input'];
  state: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreStravaAccountFromDeletionArgs = {
  accountId: Scalars['String']['input'];
};


export type MutationRestoreUserFromDeletionArgs = {
  userId: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateOwnProfileArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
};

export type PerformanceMetrics = {
  __typename?: 'PerformanceMetrics';
  aerobicDecoupling: Scalars['Float']['output'];
  averageHeartRate: Scalars['Float']['output'];
  averagePace: Scalars['Float']['output'];
  averageSpeed: Scalars['Float']['output'];
  efficiencyFactor: Scalars['Float']['output'];
  maxHeartRate: Scalars['Float']['output'];
  powerAnalysis: Maybe<PowerAnalysis>;
  speedVariability: Scalars['Float']['output'];
  trimpScore: Scalars['Float']['output'];
};

export type PhysicalStatus = {
  __typename?: 'PhysicalStatus';
  acwr: Scalars['Float']['output'];
  criticalPower: CriticalPower;
  ftp: Scalars['Float']['output'];
  hrRecovery: Scalars['Float']['output'];
  recommendations: Array<Scalars['String']['output']>;
  runningEconomy: Scalars['Float']['output'];
  sufferScore: Scalars['Float']['output'];
  visualizations: VisualizationData;
  vo2Max: Scalars['Float']['output'];
};

export type PolylineMapDto = {
  __typename?: 'PolylineMapDto';
  id: Scalars['String']['output'];
  polyline: Maybe<Scalars['String']['output']>;
  resource_state: Scalars['Int']['output'];
  summary_polyline: Maybe<Scalars['String']['output']>;
};

export type PowerAnalysis = {
  __typename?: 'PowerAnalysis';
  averagePower: Maybe<Scalars['Float']['output']>;
  intensityFactor: Maybe<Scalars['Float']['output']>;
  maxPower: Maybe<Scalars['Float']['output']>;
  normalizedPower: Maybe<Scalars['Float']['output']>;
  trainingStressScore: Maybe<Scalars['Float']['output']>;
  variabilityIndex: Maybe<Scalars['Float']['output']>;
};

export type PowerStreamDto = {
  __typename?: 'PowerStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type PowerZone = {
  __typename?: 'PowerZone';
  distribution_buckets: Array<ZoneBucket>;
  resource_state: Scalars['Int']['output'];
  sensor_based: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  zone: HeartRateZone;
  zones: Maybe<Array<ZoneBucket>>;
};

export type Query = {
  __typename?: 'Query';
  getActivityById: StravaActivityDto;
  getActivityComments: Array<CommentDto>;
  getActivityInsights: Array<Scalars['String']['output']>;
  getActivityInsightsDetailed: DetailedInsightsResponse;
  getActivityKudoers: Array<KudoerDto>;
  getActivityStreams: StreamSetDto;
  getActivityZones: Array<ActivityZoneDto>;
  getAthlete: DetailedAthlete;
  getAthleteStats: ActivityStats;
  getAthleteZones: Zones;
  getGarminAccount: Maybe<GarminAccount>;
  getGarminActivities: Array<GarminActivity>;
  getGarminAuthUrl: Maybe<Scalars['String']['output']>;
  getGarminUserPermissions: Array<Scalars['String']['output']>;
  getPhysicalStatus: PhysicalStatus;
  getRetentionStats: Scalars['String']['output'];
  getStravaActivities: Array<StravaActivityDto>;
  isGarminConnected: Scalars['Boolean']['output'];
  me: User;
  user: User;
  users: Array<User>;
};


export type QueryGetActivityByIdArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityCommentsArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityInsightsArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityInsightsDetailedArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityKudoersArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityStreamsArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetActivityZonesArgs = {
  activityId: Scalars['String']['input'];
};


export type QueryGetGarminActivitiesArgs = {
  endTime?: InputMaybe<Scalars['Float']['input']>;
  limit: Scalars['Float']['input'];
  startTime?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetPhysicalStatusArgs = {
  userGoals?: InputMaybe<UserGoalsInput>;
};


export type QueryGetStravaActivitiesArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

/** User roles */
export type Role =
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'USER';

export type SegmentProgress = {
  __typename?: 'SegmentProgress';
  name: Scalars['String']['output'];
  pr: Scalars['Boolean']['output'];
  segmentId: Scalars['Float']['output'];
  time: Scalars['Float']['output'];
};

export type SmoothGradeStreamDto = {
  __typename?: 'SmoothGradeStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type SmoothVelocityStreamDto = {
  __typename?: 'SmoothVelocityStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type SplitDto = {
  __typename?: 'SplitDto';
  average_speed: Scalars['Float']['output'];
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  elevation_difference: Scalars['Float']['output'];
  moving_time: Scalars['Int']['output'];
  pace_zone: Scalars['Int']['output'];
  split: Scalars['Int']['output'];
};

/** Strava sport types */
export type SportType =
  | 'AlpineSki'
  | 'BackcountrySki'
  | 'Badminton'
  | 'Canoeing'
  | 'Crossfit'
  | 'EBikeRide'
  | 'EMountainBikeRide'
  | 'Elliptical'
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
  | 'Yoga';

export type StravaActivityDto = {
  __typename?: 'StravaActivityDto';
  achievement_count: Scalars['Int']['output'];
  athlete: MetaAthleteDto;
  athlete_count: Scalars['Int']['output'];
  average_cadence: Maybe<Scalars['Float']['output']>;
  average_heartrate: Maybe<Scalars['Float']['output']>;
  average_speed: Scalars['Float']['output'];
  average_temp: Maybe<Scalars['Float']['output']>;
  average_watts: Maybe<Scalars['Float']['output']>;
  best_efforts: Maybe<Array<DetailedSegmentEffortDto>>;
  calories: Maybe<Scalars['Float']['output']>;
  comment_count: Scalars['Int']['output'];
  commute: Scalars['Boolean']['output'];
  description: Maybe<Scalars['String']['output']>;
  device_name: Maybe<Scalars['String']['output']>;
  device_watts: Maybe<Scalars['Boolean']['output']>;
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  elev_high: Maybe<Scalars['Float']['output']>;
  elev_low: Maybe<Scalars['Float']['output']>;
  embed_token: Maybe<Scalars['String']['output']>;
  end_latlng: Maybe<LatLngDto>;
  external_id: Maybe<Scalars['String']['output']>;
  flagged: Scalars['Boolean']['output'];
  from_accepted_tag: Maybe<Scalars['Boolean']['output']>;
  gear: Maybe<SummaryGearDto>;
  gear_id: Maybe<Scalars['String']['output']>;
  has_heartrate: Scalars['Boolean']['output'];
  has_kudoed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  kilojoules: Maybe<Scalars['Float']['output']>;
  kudos_count: Scalars['Int']['output'];
  laps: Maybe<Array<LapDto>>;
  location_city: Maybe<Scalars['String']['output']>;
  location_country: Maybe<Scalars['String']['output']>;
  location_state: Maybe<Scalars['String']['output']>;
  manual: Scalars['Boolean']['output'];
  map: PolylineMapDto;
  max_heartrate: Maybe<Scalars['Float']['output']>;
  max_speed: Scalars['Float']['output'];
  max_watts: Maybe<Scalars['Float']['output']>;
  moving_time: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  photo_count: Scalars['Int']['output'];
  photos: Maybe<Scalars['JSON']['output']>;
  polyline: Maybe<Scalars['String']['output']>;
  pr_count: Scalars['Int']['output'];
  private: Scalars['Boolean']['output'];
  resource_state: Scalars['Int']['output'];
  segment_efforts: Maybe<Array<DetailedSegmentEffortDto>>;
  splits_metric: Maybe<Array<SplitDto>>;
  splits_standard: Maybe<Array<SplitDto>>;
  sport_type: SportType;
  start_date: Scalars['String']['output'];
  start_date_local: Scalars['String']['output'];
  start_latlng: Maybe<LatLngDto>;
  suffer_score: Maybe<Scalars['Int']['output']>;
  timezone: Scalars['String']['output'];
  total_elevation_gain: Scalars['Float']['output'];
  total_photo_count: Scalars['Int']['output'];
  trainer: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  upload_id: Maybe<Scalars['String']['output']>;
  utc_offset: Maybe<Scalars['Int']['output']>;
  weighted_average_watts: Maybe<Scalars['Float']['output']>;
  workout_type: Maybe<Scalars['Int']['output']>;
};

export type StreamSetDto = {
  __typename?: 'StreamSetDto';
  altitude: Maybe<AltitudeStreamDto>;
  cadence: Maybe<CadenceStreamDto>;
  distance: Maybe<DistanceStreamDto>;
  heartrate: Maybe<HeartrateStreamDto>;
  latlng: Maybe<LatLngStreamDto>;
  moving: Maybe<MovingStreamDto>;
  power: Maybe<PowerStreamDto>;
  smooth_grade: Maybe<SmoothGradeStreamDto>;
  smooth_velocity: Maybe<SmoothVelocityStreamDto>;
  temperature: Maybe<TemperatureStreamDto>;
  time: Maybe<TimeStreamDto>;
};

export type SummaryGearDto = {
  __typename?: 'SummaryGearDto';
  distance: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  primary: Scalars['Boolean']['output'];
  resource_state: Scalars['Int']['output'];
};

export type TemperatureStreamDto = {
  __typename?: 'TemperatureStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type TimeStreamDto = {
  __typename?: 'TimeStreamDto';
  data: Array<Scalars['Float']['output']>;
  original_size: Scalars['Int']['output'];
  resolution: Scalars['String']['output'];
  series_type: Scalars['String']['output'];
  type: Maybe<Scalars['String']['output']>;
};

export type TrainingLoadAnalysis = {
  __typename?: 'TrainingLoadAnalysis';
  acuteLoad: Scalars['Float']['output'];
  acwr: Scalars['Float']['output'];
  chronicLoad: Scalars['Float']['output'];
  fatigueScore: Scalars['Float']['output'];
  fitnessScore: Scalars['Float']['output'];
  performanceReadiness: Scalars['Float']['output'];
  riskLevel: Scalars['String']['output'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  dataRetentionExpiresAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  isMarkedForDeletion: Scalars['Boolean']['output'];
  lastLoginAt: Scalars['DateTime']['output'];
  lastName: Scalars['String']['output'];
  markedForDeletionAt: Scalars['DateTime']['output'];
  role: Role;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserGoalsInput = {
  targetDate?: InputMaybe<Scalars['String']['input']>;
  targetDistance?: InputMaybe<Scalars['Float']['input']>;
  targetFTP?: InputMaybe<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type VisualizationData = {
  __typename?: 'VisualizationData';
  hrZones: Array<HrZone>;
  segmentProgress: Array<SegmentProgress>;
  weeklyDistance: Array<WeeklyDistance>;
};

export type WeeklyDistance = {
  __typename?: 'WeeklyDistance';
  distance: Scalars['Float']['output'];
  week: Scalars['String']['output'];
};

export type ZoneBucket = {
  __typename?: 'ZoneBucket';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
  time: Scalars['Int']['output'];
};

export type Zones = {
  __typename?: 'Zones';
  heart_rate: Maybe<HeartRateZone>;
  power: Maybe<PowerZone>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', access_token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type GetGarminActivitiesQueryVariables = Exact<{
  limit: Scalars['Float']['input'];
  startTime?: InputMaybe<Scalars['Float']['input']>;
  endTime?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetGarminActivitiesQuery = { __typename?: 'Query', getGarminActivities: Array<{ __typename?: 'GarminActivity', id: string, activityId: string, activityName: string, activityType: string, startTime: string, endTime: string, duration: number, distance: number, calories: number, averageHeartRate: number, maxHeartRate: number, averageSpeed: number, maxSpeed: number, averagePace: number, maxPace: number, totalAscent: number, totalDescent: number, startLatitude: number, startLongitude: number, endLatitude: number, endLongitude: number, timeZone: string, createdAt: string, updatedAt: string }> };

export type GetGarminAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGarminAuthUrlQuery = { __typename?: 'Query', getGarminAuthUrl: string | null };

export type IsGarminConnectedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsGarminConnectedQuery = { __typename?: 'Query', isGarminConnected: boolean };

export type GetActivityInsightsQueryVariables = Exact<{
  activityId: Scalars['String']['input'];
}>;


export type GetActivityInsightsQuery = { __typename?: 'Query', getActivityInsights: Array<string> };

export type GetActivityInsightsDetailedQueryVariables = Exact<{
  activityId: Scalars['String']['input'];
}>;


export type GetActivityInsightsDetailedQuery = { __typename?: 'Query', getActivityInsightsDetailed: { __typename?: 'DetailedInsightsResponse', insights: Array<string>, heartRateZones: Array<{ __typename?: 'HeartRateZoneDetail', zone: number, minHeartRate: number, maxHeartRate: number, timeInZone: number, percentage: number, description: string, color: string }>, performanceMetrics: { __typename?: 'PerformanceMetrics', averageSpeed: number, averagePace: number, speedVariability: number, averageHeartRate: number, maxHeartRate: number, trimpScore: number, efficiencyFactor: number, aerobicDecoupling: number, powerAnalysis: { __typename?: 'PowerAnalysis', averagePower: number | null, maxPower: number | null, normalizedPower: number | null, intensityFactor: number | null, trainingStressScore: number | null, variabilityIndex: number | null } | null }, correlations: { __typename?: 'CorrelationAnalysis', powerSpeedCorrelation: number, hrPowerCorrelation: number, gradeHrCorrelation: number }, trainingLoad: { __typename?: 'TrainingLoadAnalysis', acuteLoad: number, chronicLoad: number, acwr: number, riskLevel: string, fitnessScore: number, fatigueScore: number, performanceReadiness: number } } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type UpdateOwnProfileMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateOwnProfileMutation = { __typename?: 'Mutation', updateOwnProfile: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: Role, isEmailVerified: boolean, createdAt: string, updatedAt: string } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    access_token
    user {
      id
      email
      firstName
      lastName
      role
      isEmailVerified
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  register(
    registerInput: {email: $email, password: $password, firstName: $firstName, lastName: $lastName}
  ) {
    access_token
    user {
      id
      email
      firstName
      lastName
      role
      isEmailVerified
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetGarminActivitiesDocument = gql`
    query GetGarminActivities($limit: Float!, $startTime: Float, $endTime: Float) {
  getGarminActivities(limit: $limit, startTime: $startTime, endTime: $endTime) {
    id
    activityId
    activityName
    activityType
    startTime
    endTime
    duration
    distance
    calories
    averageHeartRate
    maxHeartRate
    averageSpeed
    maxSpeed
    averagePace
    maxPace
    totalAscent
    totalDescent
    startLatitude
    startLongitude
    endLatitude
    endLongitude
    timeZone
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetGarminActivitiesQuery__
 *
 * To run a query within a React component, call `useGetGarminActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGarminActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGarminActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useGetGarminActivitiesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables> & ({ variables: GetGarminActivitiesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>(GetGarminActivitiesDocument, options);
      }
export function useGetGarminActivitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>(GetGarminActivitiesDocument, options);
        }
export function useGetGarminActivitiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>(GetGarminActivitiesDocument, options);
        }
export type GetGarminActivitiesQueryHookResult = ReturnType<typeof useGetGarminActivitiesQuery>;
export type GetGarminActivitiesLazyQueryHookResult = ReturnType<typeof useGetGarminActivitiesLazyQuery>;
export type GetGarminActivitiesSuspenseQueryHookResult = ReturnType<typeof useGetGarminActivitiesSuspenseQuery>;
export type GetGarminActivitiesQueryResult = ApolloReactCommon.QueryResult<GetGarminActivitiesQuery, GetGarminActivitiesQueryVariables>;
export const GetGarminAuthUrlDocument = gql`
    query GetGarminAuthUrl {
  getGarminAuthUrl
}
    `;

/**
 * __useGetGarminAuthUrlQuery__
 *
 * To run a query within a React component, call `useGetGarminAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGarminAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGarminAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGarminAuthUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>(GetGarminAuthUrlDocument, options);
      }
export function useGetGarminAuthUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>(GetGarminAuthUrlDocument, options);
        }
export function useGetGarminAuthUrlSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>(GetGarminAuthUrlDocument, options);
        }
export type GetGarminAuthUrlQueryHookResult = ReturnType<typeof useGetGarminAuthUrlQuery>;
export type GetGarminAuthUrlLazyQueryHookResult = ReturnType<typeof useGetGarminAuthUrlLazyQuery>;
export type GetGarminAuthUrlSuspenseQueryHookResult = ReturnType<typeof useGetGarminAuthUrlSuspenseQuery>;
export type GetGarminAuthUrlQueryResult = ApolloReactCommon.QueryResult<GetGarminAuthUrlQuery, GetGarminAuthUrlQueryVariables>;
export const IsGarminConnectedDocument = gql`
    query IsGarminConnected {
  isGarminConnected
}
    `;

/**
 * __useIsGarminConnectedQuery__
 *
 * To run a query within a React component, call `useIsGarminConnectedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsGarminConnectedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsGarminConnectedQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsGarminConnectedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>(IsGarminConnectedDocument, options);
      }
export function useIsGarminConnectedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>(IsGarminConnectedDocument, options);
        }
export function useIsGarminConnectedSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>(IsGarminConnectedDocument, options);
        }
export type IsGarminConnectedQueryHookResult = ReturnType<typeof useIsGarminConnectedQuery>;
export type IsGarminConnectedLazyQueryHookResult = ReturnType<typeof useIsGarminConnectedLazyQuery>;
export type IsGarminConnectedSuspenseQueryHookResult = ReturnType<typeof useIsGarminConnectedSuspenseQuery>;
export type IsGarminConnectedQueryResult = ApolloReactCommon.QueryResult<IsGarminConnectedQuery, IsGarminConnectedQueryVariables>;
export const GetActivityInsightsDocument = gql`
    query getActivityInsights($activityId: String!) {
  getActivityInsights(activityId: $activityId)
}
    `;

/**
 * __useGetActivityInsightsQuery__
 *
 * To run a query within a React component, call `useGetActivityInsightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityInsightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityInsightsQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useGetActivityInsightsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetActivityInsightsQuery, GetActivityInsightsQueryVariables> & ({ variables: GetActivityInsightsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>(GetActivityInsightsDocument, options);
      }
export function useGetActivityInsightsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>(GetActivityInsightsDocument, options);
        }
export function useGetActivityInsightsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>(GetActivityInsightsDocument, options);
        }
export type GetActivityInsightsQueryHookResult = ReturnType<typeof useGetActivityInsightsQuery>;
export type GetActivityInsightsLazyQueryHookResult = ReturnType<typeof useGetActivityInsightsLazyQuery>;
export type GetActivityInsightsSuspenseQueryHookResult = ReturnType<typeof useGetActivityInsightsSuspenseQuery>;
export type GetActivityInsightsQueryResult = ApolloReactCommon.QueryResult<GetActivityInsightsQuery, GetActivityInsightsQueryVariables>;
export const GetActivityInsightsDetailedDocument = gql`
    query getActivityInsightsDetailed($activityId: String!) {
  getActivityInsightsDetailed(activityId: $activityId) {
    insights
    heartRateZones {
      zone
      minHeartRate
      maxHeartRate
      timeInZone
      percentage
      description
      color
    }
    performanceMetrics {
      averageSpeed
      averagePace
      speedVariability
      averageHeartRate
      maxHeartRate
      trimpScore
      efficiencyFactor
      aerobicDecoupling
      powerAnalysis {
        averagePower
        maxPower
        normalizedPower
        intensityFactor
        trainingStressScore
        variabilityIndex
      }
    }
    correlations {
      powerSpeedCorrelation
      hrPowerCorrelation
      gradeHrCorrelation
    }
    trainingLoad {
      acuteLoad
      chronicLoad
      acwr
      riskLevel
      fitnessScore
      fatigueScore
      performanceReadiness
    }
  }
}
    `;

/**
 * __useGetActivityInsightsDetailedQuery__
 *
 * To run a query within a React component, call `useGetActivityInsightsDetailedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityInsightsDetailedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityInsightsDetailedQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useGetActivityInsightsDetailedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables> & ({ variables: GetActivityInsightsDetailedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>(GetActivityInsightsDetailedDocument, options);
      }
export function useGetActivityInsightsDetailedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>(GetActivityInsightsDetailedDocument, options);
        }
export function useGetActivityInsightsDetailedSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>(GetActivityInsightsDetailedDocument, options);
        }
export type GetActivityInsightsDetailedQueryHookResult = ReturnType<typeof useGetActivityInsightsDetailedQuery>;
export type GetActivityInsightsDetailedLazyQueryHookResult = ReturnType<typeof useGetActivityInsightsDetailedLazyQuery>;
export type GetActivityInsightsDetailedSuspenseQueryHookResult = ReturnType<typeof useGetActivityInsightsDetailedSuspenseQuery>;
export type GetActivityInsightsDetailedQueryResult = ApolloReactCommon.QueryResult<GetActivityInsightsDetailedQuery, GetActivityInsightsDetailedQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = ApolloReactCommon.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateOwnProfileDocument = gql`
    mutation UpdateOwnProfile($updateUserInput: UpdateUserInput!) {
  updateOwnProfile(updateUserInput: $updateUserInput) {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;
export type UpdateOwnProfileMutationFn = ApolloReactCommon.MutationFunction<UpdateOwnProfileMutation, UpdateOwnProfileMutationVariables>;

/**
 * __useUpdateOwnProfileMutation__
 *
 * To run a mutation, you first call `useUpdateOwnProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOwnProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOwnProfileMutation, { data, loading, error }] = useUpdateOwnProfileMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateOwnProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOwnProfileMutation, UpdateOwnProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateOwnProfileMutation, UpdateOwnProfileMutationVariables>(UpdateOwnProfileDocument, options);
      }
export type UpdateOwnProfileMutationHookResult = ReturnType<typeof useUpdateOwnProfileMutation>;
export type UpdateOwnProfileMutationResult = ApolloReactCommon.MutationResult<UpdateOwnProfileMutation>;
export type UpdateOwnProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOwnProfileMutation, UpdateOwnProfileMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($id: ID!) {
  removeUser(id: $id) {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;
export type RemoveUserMutationFn = ApolloReactCommon.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = ApolloReactCommon.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
    role
    isEmailVerified
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;