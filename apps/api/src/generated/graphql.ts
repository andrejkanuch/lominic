import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../app.module';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date; }
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
  login: AuthResponse;
  performDataRetentionCleanup: Scalars['String']['output'];
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
  getRetentionStats: Scalars['String']['output'];
  getStravaActivities: Array<StravaActivityDto>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ActivityStats: ResolverTypeWrapper<ActivityStats>;
  ActivityTotal: ResolverTypeWrapper<ActivityTotal>;
  ActivityZoneDto: ResolverTypeWrapper<ActivityZoneDto>;
  AltitudeStreamDto: ResolverTypeWrapper<AltitudeStreamDto>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CadenceStreamDto: ResolverTypeWrapper<CadenceStreamDto>;
  CommentDto: ResolverTypeWrapper<CommentDto>;
  CorrelationAnalysis: ResolverTypeWrapper<CorrelationAnalysis>;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DetailedAthlete: ResolverTypeWrapper<DetailedAthlete>;
  DetailedInsightsResponse: ResolverTypeWrapper<DetailedInsightsResponse>;
  DetailedSegmentEffortDto: ResolverTypeWrapper<DetailedSegmentEffortDto>;
  DistanceStreamDto: ResolverTypeWrapper<DistanceStreamDto>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  HeartRateZone: ResolverTypeWrapper<HeartRateZone>;
  HeartRateZoneDetail: ResolverTypeWrapper<HeartRateZoneDetail>;
  HeartrateStreamDto: ResolverTypeWrapper<HeartrateStreamDto>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  KudoerDto: ResolverTypeWrapper<KudoerDto>;
  LapDto: ResolverTypeWrapper<LapDto>;
  LatLngDto: ResolverTypeWrapper<LatLngDto>;
  LatLngStreamDto: ResolverTypeWrapper<LatLngStreamDto>;
  LoginInput: LoginInput;
  MetaAthleteDto: ResolverTypeWrapper<MetaAthleteDto>;
  MovingStreamDto: ResolverTypeWrapper<MovingStreamDto>;
  Mutation: ResolverTypeWrapper<{}>;
  PerformanceMetrics: ResolverTypeWrapper<PerformanceMetrics>;
  PolylineMapDto: ResolverTypeWrapper<PolylineMapDto>;
  PowerAnalysis: ResolverTypeWrapper<PowerAnalysis>;
  PowerStreamDto: ResolverTypeWrapper<PowerStreamDto>;
  PowerZone: ResolverTypeWrapper<PowerZone>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Role: Role;
  SmoothGradeStreamDto: ResolverTypeWrapper<SmoothGradeStreamDto>;
  SmoothVelocityStreamDto: ResolverTypeWrapper<SmoothVelocityStreamDto>;
  SplitDto: ResolverTypeWrapper<SplitDto>;
  SportType: SportType;
  StravaActivityDto: ResolverTypeWrapper<StravaActivityDto>;
  StreamSetDto: ResolverTypeWrapper<StreamSetDto>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SummaryGearDto: ResolverTypeWrapper<SummaryGearDto>;
  TemperatureStreamDto: ResolverTypeWrapper<TemperatureStreamDto>;
  TimeStreamDto: ResolverTypeWrapper<TimeStreamDto>;
  TrainingLoadAnalysis: ResolverTypeWrapper<TrainingLoadAnalysis>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  ZoneBucket: ResolverTypeWrapper<ZoneBucket>;
  Zones: ResolverTypeWrapper<Zones>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ActivityStats: ActivityStats;
  ActivityTotal: ActivityTotal;
  ActivityZoneDto: ActivityZoneDto;
  AltitudeStreamDto: AltitudeStreamDto;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  CadenceStreamDto: CadenceStreamDto;
  CommentDto: CommentDto;
  CorrelationAnalysis: CorrelationAnalysis;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  DetailedAthlete: DetailedAthlete;
  DetailedInsightsResponse: DetailedInsightsResponse;
  DetailedSegmentEffortDto: DetailedSegmentEffortDto;
  DistanceStreamDto: DistanceStreamDto;
  Float: Scalars['Float']['output'];
  HeartRateZone: HeartRateZone;
  HeartRateZoneDetail: HeartRateZoneDetail;
  HeartrateStreamDto: HeartrateStreamDto;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  KudoerDto: KudoerDto;
  LapDto: LapDto;
  LatLngDto: LatLngDto;
  LatLngStreamDto: LatLngStreamDto;
  LoginInput: LoginInput;
  MetaAthleteDto: MetaAthleteDto;
  MovingStreamDto: MovingStreamDto;
  Mutation: {};
  PerformanceMetrics: PerformanceMetrics;
  PolylineMapDto: PolylineMapDto;
  PowerAnalysis: PowerAnalysis;
  PowerStreamDto: PowerStreamDto;
  PowerZone: PowerZone;
  Query: {};
  RegisterInput: RegisterInput;
  SmoothGradeStreamDto: SmoothGradeStreamDto;
  SmoothVelocityStreamDto: SmoothVelocityStreamDto;
  SplitDto: SplitDto;
  StravaActivityDto: StravaActivityDto;
  StreamSetDto: StreamSetDto;
  String: Scalars['String']['output'];
  SummaryGearDto: SummaryGearDto;
  TemperatureStreamDto: TemperatureStreamDto;
  TimeStreamDto: TimeStreamDto;
  TrainingLoadAnalysis: TrainingLoadAnalysis;
  UpdateUserInput: UpdateUserInput;
  User: User;
  ZoneBucket: ZoneBucket;
  Zones: Zones;
}>;

export type ActivityStatsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ActivityStats'] = ResolversParentTypes['ActivityStats']> = ResolversObject<{
  all_ride_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  all_run_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  all_swim_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  biggest_climb_elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  biggest_ride_distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  recent_ride_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  recent_run_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  recent_swim_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  ytd_ride_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  ytd_run_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  ytd_swim_totals?: Resolver<ResolversTypes['ActivityTotal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivityTotalResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ActivityTotal'] = ResolversParentTypes['ActivityTotal']> = ResolversObject<{
  achievement_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ActivityZoneDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ActivityZoneDto'] = ResolversParentTypes['ActivityZoneDto']> = ResolversObject<{
  custom_zones?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  distribution_buckets?: Resolver<Maybe<Array<ResolversTypes['ZoneBucket']>>, ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sensor_based?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AltitudeStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AltitudeStreamDto'] = ResolversParentTypes['AltitudeStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CadenceStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CadenceStreamDto'] = ResolversParentTypes['CadenceStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CommentDto'] = ResolversParentTypes['CommentDto']> = ResolversObject<{
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CorrelationAnalysisResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CorrelationAnalysis'] = ResolversParentTypes['CorrelationAnalysis']> = ResolversObject<{
  gradeHrCorrelation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  hrPowerCorrelation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  powerSpeedCorrelation?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DetailedAthleteResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DetailedAthlete'] = ResolversParentTypes['DetailedAthlete']> = ResolversObject<{
  athlete_type?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  badge_type_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  bikes?: Resolver<Array<ResolversTypes['SummaryGearDto']>, ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  clubs?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  date_preference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  follower_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  friend_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ftp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  measurement_preference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mutual_friend_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  premium?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  profile?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profile_medium?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shoes?: Resolver<Array<ResolversTypes['SummaryGearDto']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weight?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DetailedInsightsResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DetailedInsightsResponse'] = ResolversParentTypes['DetailedInsightsResponse']> = ResolversObject<{
  correlations?: Resolver<ResolversTypes['CorrelationAnalysis'], ParentType, ContextType>;
  heartRateZones?: Resolver<Array<ResolversTypes['HeartRateZoneDetail']>, ParentType, ContextType>;
  insights?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  performanceMetrics?: Resolver<ResolversTypes['PerformanceMetrics'], ParentType, ContextType>;
  trainingLoad?: Resolver<ResolversTypes['TrainingLoadAnalysis'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DetailedSegmentEffortDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DetailedSegmentEffortDto'] = ResolversParentTypes['DetailedSegmentEffortDto']> = ResolversObject<{
  athlete?: Resolver<ResolversTypes['MetaAthleteDto'], ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  device_watts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  end_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hidden?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kom_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pr_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date_local?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DistanceStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['DistanceStreamDto'] = ResolversParentTypes['DistanceStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HeartRateZoneResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HeartRateZone'] = ResolversParentTypes['HeartRateZone']> = ResolversObject<{
  custom_zones?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  zones?: Resolver<Maybe<Array<ResolversTypes['ZoneBucket']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HeartRateZoneDetailResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HeartRateZoneDetail'] = ResolversParentTypes['HeartRateZoneDetail']> = ResolversObject<{
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxHeartRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  minHeartRate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  percentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  timeInZone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  zone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HeartrateStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HeartrateStreamDto'] = ResolversParentTypes['HeartrateStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type KudoerDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['KudoerDto'] = ResolversParentTypes['KudoerDto']> = ResolversObject<{
  firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LapDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LapDto'] = ResolversParentTypes['LapDto']> = ResolversObject<{
  athlete?: Resolver<ResolversTypes['MetaAthleteDto'], ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  device_watts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  end_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lap_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  max_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  split?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date_local?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LatLngDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LatLngDto'] = ResolversParentTypes['LatLngDto']> = ResolversObject<{
  lat?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LatLngStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['LatLngStreamDto'] = ResolversParentTypes['LatLngStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['LatLngDto']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MetaAthleteDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MetaAthleteDto'] = ResolversParentTypes['MetaAthleteDto']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MovingStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['MovingStreamDto'] = ResolversParentTypes['MovingStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Boolean']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginInput'>>;
  performDataRetentionCleanup?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerInput'>>;
  removeUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'id'>>;
  restoreStravaAccountFromDeletion?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRestoreStravaAccountFromDeletionArgs, 'accountId'>>;
  restoreUserFromDeletion?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRestoreUserFromDeletionArgs, 'userId'>>;
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'createUserInput'>>;
  updateOwnProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateOwnProfileArgs, 'updateUserInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'updateUserInput'>>;
}>;

export type PerformanceMetricsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PerformanceMetrics'] = ResolversParentTypes['PerformanceMetrics']> = ResolversObject<{
  aerobicDecoupling?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averageHeartRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averagePace?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  averageSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  efficiencyFactor?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  maxHeartRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  powerAnalysis?: Resolver<Maybe<ResolversTypes['PowerAnalysis']>, ParentType, ContextType>;
  speedVariability?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trimpScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PolylineMapDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PolylineMapDto'] = ResolversParentTypes['PolylineMapDto']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  polyline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  summary_polyline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PowerAnalysisResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PowerAnalysis'] = ResolversParentTypes['PowerAnalysis']> = ResolversObject<{
  averagePower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  intensityFactor?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  maxPower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  normalizedPower?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  trainingStressScore?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  variabilityIndex?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PowerStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PowerStreamDto'] = ResolversParentTypes['PowerStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PowerZoneResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PowerZone'] = ResolversParentTypes['PowerZone']> = ResolversObject<{
  distribution_buckets?: Resolver<Array<ResolversTypes['ZoneBucket']>, ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sensor_based?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zone?: Resolver<ResolversTypes['HeartRateZone'], ParentType, ContextType>;
  zones?: Resolver<Maybe<Array<ResolversTypes['ZoneBucket']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getActivityById?: Resolver<ResolversTypes['StravaActivityDto'], ParentType, ContextType, RequireFields<QueryGetActivityByIdArgs, 'activityId'>>;
  getActivityComments?: Resolver<Array<ResolversTypes['CommentDto']>, ParentType, ContextType, RequireFields<QueryGetActivityCommentsArgs, 'activityId'>>;
  getActivityInsights?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetActivityInsightsArgs, 'activityId'>>;
  getActivityInsightsDetailed?: Resolver<ResolversTypes['DetailedInsightsResponse'], ParentType, ContextType, RequireFields<QueryGetActivityInsightsDetailedArgs, 'activityId'>>;
  getActivityKudoers?: Resolver<Array<ResolversTypes['KudoerDto']>, ParentType, ContextType, RequireFields<QueryGetActivityKudoersArgs, 'activityId'>>;
  getActivityStreams?: Resolver<ResolversTypes['StreamSetDto'], ParentType, ContextType, RequireFields<QueryGetActivityStreamsArgs, 'activityId'>>;
  getActivityZones?: Resolver<Array<ResolversTypes['ActivityZoneDto']>, ParentType, ContextType, RequireFields<QueryGetActivityZonesArgs, 'activityId'>>;
  getAthlete?: Resolver<ResolversTypes['DetailedAthlete'], ParentType, ContextType>;
  getAthleteStats?: Resolver<ResolversTypes['ActivityStats'], ParentType, ContextType>;
  getAthleteZones?: Resolver<ResolversTypes['Zones'], ParentType, ContextType>;
  getRetentionStats?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getStravaActivities?: Resolver<Array<ResolversTypes['StravaActivityDto']>, ParentType, ContextType, RequireFields<QueryGetStravaActivitiesArgs, 'limit'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type SmoothGradeStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SmoothGradeStreamDto'] = ResolversParentTypes['SmoothGradeStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SmoothVelocityStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SmoothVelocityStreamDto'] = ResolversParentTypes['SmoothVelocityStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SplitDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SplitDto'] = ResolversParentTypes['SplitDto']> = ResolversObject<{
  average_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  elevation_difference?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pace_zone?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  split?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StravaActivityDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StravaActivityDto'] = ResolversParentTypes['StravaActivityDto']> = ResolversObject<{
  achievement_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  athlete?: Resolver<ResolversTypes['MetaAthleteDto'], ParentType, ContextType>;
  athlete_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_heartrate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  average_temp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  best_efforts?: Resolver<Maybe<Array<ResolversTypes['DetailedSegmentEffortDto']>>, ParentType, ContextType>;
  calories?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  comment_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  commute?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_watts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  elev_high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  elev_low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  embed_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_latlng?: Resolver<Maybe<ResolversTypes['LatLngDto']>, ParentType, ContextType>;
  external_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  from_accepted_tag?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  gear?: Resolver<Maybe<ResolversTypes['SummaryGearDto']>, ParentType, ContextType>;
  gear_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  has_heartrate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_kudoed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kilojoules?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  kudos_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  laps?: Resolver<Maybe<Array<ResolversTypes['LapDto']>>, ParentType, ContextType>;
  location_city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manual?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  map?: Resolver<ResolversTypes['PolylineMapDto'], ParentType, ContextType>;
  max_heartrate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  max_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photo_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  photos?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  polyline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pr_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  segment_efforts?: Resolver<Maybe<Array<ResolversTypes['DetailedSegmentEffortDto']>>, ParentType, ContextType>;
  splits_metric?: Resolver<Maybe<Array<ResolversTypes['SplitDto']>>, ParentType, ContextType>;
  splits_standard?: Resolver<Maybe<Array<ResolversTypes['SplitDto']>>, ParentType, ContextType>;
  sport_type?: Resolver<ResolversTypes['SportType'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date_local?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_latlng?: Resolver<Maybe<ResolversTypes['LatLngDto']>, ParentType, ContextType>;
  suffer_score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total_photo_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trainer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  upload_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  utc_offset?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  weighted_average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workout_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreamSetDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StreamSetDto'] = ResolversParentTypes['StreamSetDto']> = ResolversObject<{
  altitude?: Resolver<Maybe<ResolversTypes['AltitudeStreamDto']>, ParentType, ContextType>;
  cadence?: Resolver<Maybe<ResolversTypes['CadenceStreamDto']>, ParentType, ContextType>;
  distance?: Resolver<Maybe<ResolversTypes['DistanceStreamDto']>, ParentType, ContextType>;
  heartrate?: Resolver<Maybe<ResolversTypes['HeartrateStreamDto']>, ParentType, ContextType>;
  latlng?: Resolver<Maybe<ResolversTypes['LatLngStreamDto']>, ParentType, ContextType>;
  moving?: Resolver<Maybe<ResolversTypes['MovingStreamDto']>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes['PowerStreamDto']>, ParentType, ContextType>;
  smooth_grade?: Resolver<Maybe<ResolversTypes['SmoothGradeStreamDto']>, ParentType, ContextType>;
  smooth_velocity?: Resolver<Maybe<ResolversTypes['SmoothVelocityStreamDto']>, ParentType, ContextType>;
  temperature?: Resolver<Maybe<ResolversTypes['TemperatureStreamDto']>, ParentType, ContextType>;
  time?: Resolver<Maybe<ResolversTypes['TimeStreamDto']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SummaryGearDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['SummaryGearDto'] = ResolversParentTypes['SummaryGearDto']> = ResolversObject<{
  distance?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primary?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TemperatureStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TemperatureStreamDto'] = ResolversParentTypes['TemperatureStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TimeStreamDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TimeStreamDto'] = ResolversParentTypes['TimeStreamDto']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Float']>, ParentType, ContextType>;
  original_size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  resolution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  series_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TrainingLoadAnalysisResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TrainingLoadAnalysis'] = ResolversParentTypes['TrainingLoadAnalysis']> = ResolversObject<{
  acuteLoad?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  acwr?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  chronicLoad?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fatigueScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  fitnessScore?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  performanceReadiness?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  riskLevel?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dataRetentionExpiresAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isMarkedForDeletion?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastLoginAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  markedForDeletionAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ZoneBucketResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ZoneBucket'] = ResolversParentTypes['ZoneBucket']> = ResolversObject<{
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ZonesResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Zones'] = ResolversParentTypes['Zones']> = ResolversObject<{
  heart_rate?: Resolver<Maybe<ResolversTypes['HeartRateZone']>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes['PowerZone']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  ActivityStats?: ActivityStatsResolvers<ContextType>;
  ActivityTotal?: ActivityTotalResolvers<ContextType>;
  ActivityZoneDto?: ActivityZoneDtoResolvers<ContextType>;
  AltitudeStreamDto?: AltitudeStreamDtoResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CadenceStreamDto?: CadenceStreamDtoResolvers<ContextType>;
  CommentDto?: CommentDtoResolvers<ContextType>;
  CorrelationAnalysis?: CorrelationAnalysisResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DetailedAthlete?: DetailedAthleteResolvers<ContextType>;
  DetailedInsightsResponse?: DetailedInsightsResponseResolvers<ContextType>;
  DetailedSegmentEffortDto?: DetailedSegmentEffortDtoResolvers<ContextType>;
  DistanceStreamDto?: DistanceStreamDtoResolvers<ContextType>;
  HeartRateZone?: HeartRateZoneResolvers<ContextType>;
  HeartRateZoneDetail?: HeartRateZoneDetailResolvers<ContextType>;
  HeartrateStreamDto?: HeartrateStreamDtoResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  KudoerDto?: KudoerDtoResolvers<ContextType>;
  LapDto?: LapDtoResolvers<ContextType>;
  LatLngDto?: LatLngDtoResolvers<ContextType>;
  LatLngStreamDto?: LatLngStreamDtoResolvers<ContextType>;
  MetaAthleteDto?: MetaAthleteDtoResolvers<ContextType>;
  MovingStreamDto?: MovingStreamDtoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PerformanceMetrics?: PerformanceMetricsResolvers<ContextType>;
  PolylineMapDto?: PolylineMapDtoResolvers<ContextType>;
  PowerAnalysis?: PowerAnalysisResolvers<ContextType>;
  PowerStreamDto?: PowerStreamDtoResolvers<ContextType>;
  PowerZone?: PowerZoneResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SmoothGradeStreamDto?: SmoothGradeStreamDtoResolvers<ContextType>;
  SmoothVelocityStreamDto?: SmoothVelocityStreamDtoResolvers<ContextType>;
  SplitDto?: SplitDtoResolvers<ContextType>;
  StravaActivityDto?: StravaActivityDtoResolvers<ContextType>;
  StreamSetDto?: StreamSetDtoResolvers<ContextType>;
  SummaryGearDto?: SummaryGearDtoResolvers<ContextType>;
  TemperatureStreamDto?: TemperatureStreamDtoResolvers<ContextType>;
  TimeStreamDto?: TimeStreamDtoResolvers<ContextType>;
  TrainingLoadAnalysis?: TrainingLoadAnalysisResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ZoneBucket?: ZoneBucketResolvers<ContextType>;
  Zones?: ZonesResolvers<ContextType>;
}>;

