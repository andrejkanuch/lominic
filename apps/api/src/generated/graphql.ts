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

export type ActivityDto = {
  __typename?: 'ActivityDto';
  achievement_count: Scalars['Float']['output'];
  athlete_count: Scalars['Float']['output'];
  average_cadence: Maybe<Scalars['Float']['output']>;
  average_speed: Scalars['Float']['output'];
  average_temp: Maybe<Scalars['Float']['output']>;
  average_watts: Maybe<Scalars['Float']['output']>;
  calories: Maybe<Scalars['Float']['output']>;
  comment_count: Scalars['Float']['output'];
  commute: Scalars['Boolean']['output'];
  description: Maybe<Scalars['String']['output']>;
  device_watts: Maybe<Scalars['Boolean']['output']>;
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Float']['output'];
  elev_high: Maybe<Scalars['Float']['output']>;
  elev_low: Maybe<Scalars['Float']['output']>;
  end_latlng: Maybe<Array<Scalars['Float']['output']>>;
  flagged: Scalars['Boolean']['output'];
  from_accepted_tag: Scalars['Boolean']['output'];
  gear_id: Maybe<Scalars['String']['output']>;
  has_heartrate: Scalars['Boolean']['output'];
  has_kudoed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  kilojoules: Maybe<Scalars['Float']['output']>;
  kudos_count: Scalars['Float']['output'];
  manual: Scalars['Boolean']['output'];
  max_speed: Scalars['Float']['output'];
  max_watts: Maybe<Scalars['Float']['output']>;
  moving_time: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  photo_count: Scalars['Float']['output'];
  polyline: Maybe<Scalars['String']['output']>;
  pr_count: Scalars['Float']['output'];
  private: Scalars['Boolean']['output'];
  sport_type: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  start_date_local: Scalars['String']['output'];
  start_latlng: Maybe<Array<Scalars['Float']['output']>>;
  suffer_score: Maybe<Scalars['Float']['output']>;
  timezone: Scalars['String']['output'];
  total_elevation_gain: Scalars['Float']['output'];
  total_photo_count: Scalars['Float']['output'];
  trainer: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  utc_offset: Scalars['Float']['output'];
  weighted_average_watts: Maybe<Scalars['Float']['output']>;
  workout_type: Maybe<Scalars['Float']['output']>;
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
  max: Scalars['Float']['output'];
  points: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  sensor_based: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  user: User;
};

export type CommentDto = {
  __typename?: 'CommentDto';
  created_at: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
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

export type HeartRateZone = {
  __typename?: 'HeartRateZone';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type KudoerDto = {
  __typename?: 'KudoerDto';
  firstname: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTestStravaAccount: Scalars['Boolean']['output'];
  createUser: User;
  login: AuthResponse;
  register: AuthResponse;
  removeUser: User;
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

export type PowerZone = {
  __typename?: 'PowerZone';
  distribution_buckets: Array<ZoneBucket>;
  resource_state: Scalars['Int']['output'];
  sensor_based: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  zone: HeartRateZone;
};

export type Query = {
  __typename?: 'Query';
  getActivityById: ActivityDto;
  getActivityComments: Array<CommentDto>;
  getActivityKudoers: Array<KudoerDto>;
  getActivityZones: Array<ActivityZoneDto>;
  getAthlete: DetailedAthlete;
  getAthleteStats: ActivityStats;
  getAthleteZones: Zones;
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


export type QueryGetActivityKudoersArgs = {
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

export type StravaActivityDto = {
  __typename?: 'StravaActivityDto';
  achievement_count: Scalars['Int']['output'];
  athlete_count: Scalars['Int']['output'];
  average_cadence: Maybe<Scalars['Float']['output']>;
  average_heartrate: Maybe<Scalars['Float']['output']>;
  average_speed: Scalars['Float']['output'];
  average_temp: Maybe<Scalars['Float']['output']>;
  average_watts: Maybe<Scalars['Float']['output']>;
  calories: Maybe<Scalars['Float']['output']>;
  comment_count: Scalars['Int']['output'];
  commute: Scalars['Boolean']['output'];
  description: Maybe<Scalars['String']['output']>;
  device_watts: Maybe<Scalars['Boolean']['output']>;
  display_hide_heartrate_option: Maybe<Scalars['Boolean']['output']>;
  distance: Scalars['Float']['output'];
  elapsed_time: Scalars['Int']['output'];
  elev_high: Maybe<Scalars['Float']['output']>;
  elev_low: Maybe<Scalars['Float']['output']>;
  end_latlng: Maybe<Scalars['JSON']['output']>;
  external_id: Maybe<Scalars['String']['output']>;
  flagged: Scalars['Boolean']['output'];
  from_accepted_tag: Scalars['Boolean']['output'];
  gear_id: Maybe<Scalars['String']['output']>;
  has_heartrate: Scalars['Boolean']['output'];
  has_kudoed: Scalars['Boolean']['output'];
  heartrate_opt_out: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  kilojoules: Maybe<Scalars['Float']['output']>;
  kudos_count: Scalars['Int']['output'];
  location_city: Maybe<Scalars['String']['output']>;
  location_country: Maybe<Scalars['String']['output']>;
  location_state: Maybe<Scalars['String']['output']>;
  manual: Scalars['Boolean']['output'];
  max_heartrate: Maybe<Scalars['Float']['output']>;
  max_speed: Scalars['Float']['output'];
  max_watts: Maybe<Scalars['Float']['output']>;
  moving_time: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  photo_count: Scalars['Int']['output'];
  polyline: Maybe<Scalars['JSON']['output']>;
  pr_count: Scalars['Int']['output'];
  private: Scalars['Boolean']['output'];
  resource_state: Maybe<Scalars['Int']['output']>;
  sport_type: Scalars['String']['output'];
  start_date: Scalars['String']['output'];
  start_date_local: Scalars['String']['output'];
  start_latlng: Maybe<Scalars['JSON']['output']>;
  suffer_score: Maybe<Scalars['Int']['output']>;
  timezone: Scalars['String']['output'];
  total_elevation_gain: Scalars['Float']['output'];
  total_photo_count: Scalars['Int']['output'];
  trainer: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  upload_id: Maybe<Scalars['Int']['output']>;
  upload_id_str: Maybe<Scalars['String']['output']>;
  utc_offset: Scalars['Int']['output'];
  visibility: Maybe<Scalars['String']['output']>;
  weighted_average_watts: Maybe<Scalars['Float']['output']>;
  workout_type: Maybe<Scalars['Int']['output']>;
};

export type SummaryGearDto = {
  __typename?: 'SummaryGearDto';
  distance: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  primary: Scalars['Boolean']['output'];
  resource_state: Scalars['Int']['output'];
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
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
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
  ActivityDto: ResolverTypeWrapper<ActivityDto>;
  ActivityStats: ResolverTypeWrapper<ActivityStats>;
  ActivityTotal: ResolverTypeWrapper<ActivityTotal>;
  ActivityZoneDto: ResolverTypeWrapper<ActivityZoneDto>;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CommentDto: ResolverTypeWrapper<CommentDto>;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DetailedAthlete: ResolverTypeWrapper<DetailedAthlete>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  HeartRateZone: ResolverTypeWrapper<HeartRateZone>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  KudoerDto: ResolverTypeWrapper<KudoerDto>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  PowerZone: ResolverTypeWrapper<PowerZone>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Role: Role;
  StravaActivityDto: ResolverTypeWrapper<StravaActivityDto>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SummaryGearDto: ResolverTypeWrapper<SummaryGearDto>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  ZoneBucket: ResolverTypeWrapper<ZoneBucket>;
  Zones: ResolverTypeWrapper<Zones>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ActivityDto: ActivityDto;
  ActivityStats: ActivityStats;
  ActivityTotal: ActivityTotal;
  ActivityZoneDto: ActivityZoneDto;
  AuthResponse: AuthResponse;
  Boolean: Scalars['Boolean']['output'];
  CommentDto: CommentDto;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  DetailedAthlete: DetailedAthlete;
  Float: Scalars['Float']['output'];
  HeartRateZone: HeartRateZone;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  KudoerDto: KudoerDto;
  LoginInput: LoginInput;
  Mutation: {};
  PowerZone: PowerZone;
  Query: {};
  RegisterInput: RegisterInput;
  StravaActivityDto: StravaActivityDto;
  String: Scalars['String']['output'];
  SummaryGearDto: SummaryGearDto;
  UpdateUserInput: UpdateUserInput;
  User: User;
  ZoneBucket: ZoneBucket;
  Zones: Zones;
}>;

export type ActivityDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['ActivityDto'] = ResolversParentTypes['ActivityDto']> = ResolversObject<{
  achievement_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  athlete_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  average_temp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  calories?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  comment_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  commute?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_watts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elev_high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  elev_low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  end_latlng?: Resolver<Maybe<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  from_accepted_tag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  gear_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  has_heartrate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_kudoed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kilojoules?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  kudos_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  manual?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  max_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  max_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photo_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  polyline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pr_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  sport_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date_local?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_latlng?: Resolver<Maybe<Array<ResolversTypes['Float']>>, ParentType, ContextType>;
  suffer_score?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total_photo_count?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  trainer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  utc_offset?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weighted_average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workout_type?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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
  max?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sensor_based?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CommentDto'] = ResolversParentTypes['CommentDto']> = ResolversObject<{
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type HeartRateZoneResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['HeartRateZone'] = ResolversParentTypes['HeartRateZone']> = ResolversObject<{
  max?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  min?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createTestStravaAccount?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'createUserInput'>>;
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'loginInput'>>;
  register?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'registerInput'>>;
  removeUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveUserArgs, 'id'>>;
  signUp?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'createUserInput'>>;
  updateOwnProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateOwnProfileArgs, 'updateUserInput'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'updateUserInput'>>;
}>;

export type PowerZoneResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PowerZone'] = ResolversParentTypes['PowerZone']> = ResolversObject<{
  distribution_buckets?: Resolver<Array<ResolversTypes['ZoneBucket']>, ParentType, ContextType>;
  resource_state?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  sensor_based?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  zone?: Resolver<ResolversTypes['HeartRateZone'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getActivityById?: Resolver<ResolversTypes['ActivityDto'], ParentType, ContextType, RequireFields<QueryGetActivityByIdArgs, 'activityId'>>;
  getActivityComments?: Resolver<Array<ResolversTypes['CommentDto']>, ParentType, ContextType, RequireFields<QueryGetActivityCommentsArgs, 'activityId'>>;
  getActivityKudoers?: Resolver<Array<ResolversTypes['KudoerDto']>, ParentType, ContextType, RequireFields<QueryGetActivityKudoersArgs, 'activityId'>>;
  getActivityZones?: Resolver<Array<ResolversTypes['ActivityZoneDto']>, ParentType, ContextType, RequireFields<QueryGetActivityZonesArgs, 'activityId'>>;
  getAthlete?: Resolver<ResolversTypes['DetailedAthlete'], ParentType, ContextType>;
  getAthleteStats?: Resolver<ResolversTypes['ActivityStats'], ParentType, ContextType>;
  getAthleteZones?: Resolver<ResolversTypes['Zones'], ParentType, ContextType>;
  getStravaActivities?: Resolver<Array<ResolversTypes['StravaActivityDto']>, ParentType, ContextType, RequireFields<QueryGetStravaActivitiesArgs, 'limit'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type StravaActivityDtoResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StravaActivityDto'] = ResolversParentTypes['StravaActivityDto']> = ResolversObject<{
  achievement_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  athlete_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  average_cadence?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_heartrate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  average_temp?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  calories?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  comment_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  commute?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device_watts?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  display_hide_heartrate_option?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  elapsed_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  elev_high?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  elev_low?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  end_latlng?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  external_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  flagged?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  from_accepted_tag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  gear_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  has_heartrate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  has_kudoed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  heartrate_opt_out?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kilojoules?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  kudos_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  location_city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location_state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  manual?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  max_heartrate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  max_speed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  max_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  moving_time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photo_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  polyline?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  pr_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  resource_state?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sport_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date_local?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_latlng?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  suffer_score?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timezone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_elevation_gain?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total_photo_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trainer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  upload_id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  upload_id_str?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  utc_offset?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  weighted_average_watts?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  workout_type?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isEmailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  ActivityDto?: ActivityDtoResolvers<ContextType>;
  ActivityStats?: ActivityStatsResolvers<ContextType>;
  ActivityTotal?: ActivityTotalResolvers<ContextType>;
  ActivityZoneDto?: ActivityZoneDtoResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  CommentDto?: CommentDtoResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DetailedAthlete?: DetailedAthleteResolvers<ContextType>;
  HeartRateZone?: HeartRateZoneResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  KudoerDto?: KudoerDtoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PowerZone?: PowerZoneResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  StravaActivityDto?: StravaActivityDtoResolvers<ContextType>;
  SummaryGearDto?: SummaryGearDtoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ZoneBucket?: ZoneBucketResolvers<ContextType>;
  Zones?: ZonesResolvers<ContextType>;
}>;

