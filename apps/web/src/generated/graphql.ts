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
  activityId: Scalars['Int']['input'];
};


export type QueryGetActivityCommentsArgs = {
  activityId: Scalars['Int']['input'];
};


export type QueryGetActivityKudoersArgs = {
  activityId: Scalars['Int']['input'];
};


export type QueryGetActivityZonesArgs = {
  activityId: Scalars['Int']['input'];
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

export type GetAthleteQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAthleteQuery = { __typename?: 'Query', getAthlete: { __typename?: 'DetailedAthlete', id: number, username: string | null, resource_state: number, firstname: string, lastname: string, city: string, state: string, country: string, sex: string, premium: boolean, created_at: string, updated_at: string, badge_type_id: number, profile_medium: string, profile: string, follower_count: number, friend_count: number, mutual_friend_count: number, athlete_type: number, date_preference: string, measurement_preference: string, clubs: Array<string> | null, ftp: number | null, weight: number, bikes: Array<{ __typename?: 'SummaryGearDto', id: string, primary: boolean, name: string, resource_state: number, distance: number }>, shoes: Array<{ __typename?: 'SummaryGearDto', id: string, primary: boolean, name: string, resource_state: number, distance: number }> } };

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

export type GetStravaActivitiesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStravaActivitiesQuery = { __typename?: 'Query', getStravaActivities: Array<{ __typename?: 'StravaActivityDto', id: string, name: string, sport_type: string, distance: number, moving_time: number, total_elevation_gain: number, start_date: string, average_speed: number, kudos_count: number }> };

export type GetAthleteZonesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAthleteZonesQuery = { __typename?: 'Query', getAthleteZones: { __typename?: 'Zones', heart_rate: { __typename?: 'HeartRateZone', min: number, max: number } | null, power: { __typename?: 'PowerZone', type: string, resource_state: number, sensor_based: boolean, zone: { __typename?: 'HeartRateZone', min: number, max: number }, distribution_buckets: Array<{ __typename?: 'ZoneBucket', max: number, min: number, time: number }> } | null } };

export type GetAthleteStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAthleteStatsQuery = { __typename?: 'Query', getAthleteStats: { __typename?: 'ActivityStats', biggest_ride_distance: number, biggest_climb_elevation_gain: number, recent_run_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, all_run_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, recent_swim_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, ytd_swim_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, all_swim_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, recent_ride_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, ytd_ride_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, all_ride_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null }, ytd_run_totals: { __typename?: 'ActivityTotal', count: number, distance: number, moving_time: number, elapsed_time: number, elevation_gain: number, achievement_count: number | null } } };

export type GetActivityByIdQueryVariables = Exact<{
  activityId: Scalars['Int']['input'];
}>;


export type GetActivityByIdQuery = { __typename?: 'Query', getActivityById: { __typename?: 'ActivityDto', id: string, name: string, type: string, sport_type: string, distance: number, moving_time: number, elapsed_time: number, total_elevation_gain: number, start_date: string, start_date_local: string, description: string | null, timezone: string, utc_offset: number, start_latlng: Array<number> | null, end_latlng: Array<number> | null, achievement_count: number, kudos_count: number, comment_count: number, athlete_count: number, photo_count: number, trainer: boolean, commute: boolean, manual: boolean, private: boolean, flagged: boolean, gear_id: string | null, from_accepted_tag: boolean, average_speed: number, max_speed: number, average_cadence: number | null, average_temp: number | null, average_watts: number | null, weighted_average_watts: number | null, kilojoules: number | null, device_watts: boolean | null, has_heartrate: boolean, max_watts: number | null, elev_high: number | null, elev_low: number | null, pr_count: number, total_photo_count: number, has_kudoed: boolean, workout_type: number | null, suffer_score: number | null, calories: number | null, polyline: string | null } };

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


export const GetAthleteDocument = gql`
    query GetAthlete {
  getAthlete {
    id
    username
    resource_state
    firstname
    lastname
    city
    state
    country
    sex
    premium
    created_at
    updated_at
    badge_type_id
    profile_medium
    profile
    follower_count
    friend_count
    mutual_friend_count
    athlete_type
    date_preference
    measurement_preference
    clubs
    ftp
    weight
    bikes {
      id
      primary
      name
      resource_state
      distance
    }
    shoes {
      id
      primary
      name
      resource_state
      distance
    }
  }
}
    `;

/**
 * __useGetAthleteQuery__
 *
 * To run a query within a React component, call `useGetAthleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAthleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAthleteQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAthleteQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAthleteQuery, GetAthleteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAthleteQuery, GetAthleteQueryVariables>(GetAthleteDocument, options);
      }
export function useGetAthleteLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAthleteQuery, GetAthleteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAthleteQuery, GetAthleteQueryVariables>(GetAthleteDocument, options);
        }
export function useGetAthleteSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAthleteQuery, GetAthleteQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAthleteQuery, GetAthleteQueryVariables>(GetAthleteDocument, options);
        }
export type GetAthleteQueryHookResult = ReturnType<typeof useGetAthleteQuery>;
export type GetAthleteLazyQueryHookResult = ReturnType<typeof useGetAthleteLazyQuery>;
export type GetAthleteSuspenseQueryHookResult = ReturnType<typeof useGetAthleteSuspenseQuery>;
export type GetAthleteQueryResult = ApolloReactCommon.QueryResult<GetAthleteQuery, GetAthleteQueryVariables>;
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
export const GetStravaActivitiesDocument = gql`
    query getStravaActivities($limit: Int) {
  getStravaActivities(limit: $limit) {
    id
    name
    sport_type
    distance
    moving_time
    total_elevation_gain
    start_date
    average_speed
    kudos_count
  }
}
    `;

/**
 * __useGetStravaActivitiesQuery__
 *
 * To run a query within a React component, call `useGetStravaActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStravaActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStravaActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetStravaActivitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>(GetStravaActivitiesDocument, options);
      }
export function useGetStravaActivitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>(GetStravaActivitiesDocument, options);
        }
export function useGetStravaActivitiesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>(GetStravaActivitiesDocument, options);
        }
export type GetStravaActivitiesQueryHookResult = ReturnType<typeof useGetStravaActivitiesQuery>;
export type GetStravaActivitiesLazyQueryHookResult = ReturnType<typeof useGetStravaActivitiesLazyQuery>;
export type GetStravaActivitiesSuspenseQueryHookResult = ReturnType<typeof useGetStravaActivitiesSuspenseQuery>;
export type GetStravaActivitiesQueryResult = ApolloReactCommon.QueryResult<GetStravaActivitiesQuery, GetStravaActivitiesQueryVariables>;
export const GetAthleteZonesDocument = gql`
    query GetAthleteZones {
  getAthleteZones {
    heart_rate {
      min
      max
    }
    power {
      zone {
        min
        max
      }
      distribution_buckets {
        max
        min
        time
      }
      type
      resource_state
      sensor_based
    }
  }
}
    `;

/**
 * __useGetAthleteZonesQuery__
 *
 * To run a query within a React component, call `useGetAthleteZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAthleteZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAthleteZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAthleteZonesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>(GetAthleteZonesDocument, options);
      }
export function useGetAthleteZonesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>(GetAthleteZonesDocument, options);
        }
export function useGetAthleteZonesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>(GetAthleteZonesDocument, options);
        }
export type GetAthleteZonesQueryHookResult = ReturnType<typeof useGetAthleteZonesQuery>;
export type GetAthleteZonesLazyQueryHookResult = ReturnType<typeof useGetAthleteZonesLazyQuery>;
export type GetAthleteZonesSuspenseQueryHookResult = ReturnType<typeof useGetAthleteZonesSuspenseQuery>;
export type GetAthleteZonesQueryResult = ApolloReactCommon.QueryResult<GetAthleteZonesQuery, GetAthleteZonesQueryVariables>;
export const GetAthleteStatsDocument = gql`
    query GetAthleteStats {
  getAthleteStats {
    recent_run_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    all_run_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    recent_swim_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    biggest_ride_distance
    ytd_swim_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    all_swim_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    recent_ride_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    biggest_climb_elevation_gain
    ytd_ride_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    all_ride_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
    ytd_run_totals {
      count
      distance
      moving_time
      elapsed_time
      elevation_gain
      achievement_count
    }
  }
}
    `;

/**
 * __useGetAthleteStatsQuery__
 *
 * To run a query within a React component, call `useGetAthleteStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAthleteStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAthleteStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAthleteStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>(GetAthleteStatsDocument, options);
      }
export function useGetAthleteStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>(GetAthleteStatsDocument, options);
        }
export function useGetAthleteStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>(GetAthleteStatsDocument, options);
        }
export type GetAthleteStatsQueryHookResult = ReturnType<typeof useGetAthleteStatsQuery>;
export type GetAthleteStatsLazyQueryHookResult = ReturnType<typeof useGetAthleteStatsLazyQuery>;
export type GetAthleteStatsSuspenseQueryHookResult = ReturnType<typeof useGetAthleteStatsSuspenseQuery>;
export type GetAthleteStatsQueryResult = ApolloReactCommon.QueryResult<GetAthleteStatsQuery, GetAthleteStatsQueryVariables>;
export const GetActivityByIdDocument = gql`
    query GetActivityById($activityId: Int!) {
  getActivityById(activityId: $activityId) {
    id
    name
    type
    sport_type
    distance
    moving_time
    elapsed_time
    total_elevation_gain
    start_date
    start_date_local
    description
    timezone
    utc_offset
    start_latlng
    end_latlng
    achievement_count
    kudos_count
    comment_count
    athlete_count
    photo_count
    trainer
    commute
    manual
    private
    flagged
    gear_id
    from_accepted_tag
    average_speed
    max_speed
    average_cadence
    average_temp
    average_watts
    weighted_average_watts
    kilojoules
    device_watts
    has_heartrate
    max_watts
    elev_high
    elev_low
    pr_count
    total_photo_count
    has_kudoed
    workout_type
    suffer_score
    description
    calories
    polyline
  }
}
    `;

/**
 * __useGetActivityByIdQuery__
 *
 * To run a query within a React component, call `useGetActivityByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityByIdQuery({
 *   variables: {
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useGetActivityByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetActivityByIdQuery, GetActivityByIdQueryVariables> & ({ variables: GetActivityByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetActivityByIdQuery, GetActivityByIdQueryVariables>(GetActivityByIdDocument, options);
      }
export function useGetActivityByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetActivityByIdQuery, GetActivityByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetActivityByIdQuery, GetActivityByIdQueryVariables>(GetActivityByIdDocument, options);
        }
export function useGetActivityByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetActivityByIdQuery, GetActivityByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetActivityByIdQuery, GetActivityByIdQueryVariables>(GetActivityByIdDocument, options);
        }
export type GetActivityByIdQueryHookResult = ReturnType<typeof useGetActivityByIdQuery>;
export type GetActivityByIdLazyQueryHookResult = ReturnType<typeof useGetActivityByIdLazyQuery>;
export type GetActivityByIdSuspenseQueryHookResult = ReturnType<typeof useGetActivityByIdSuspenseQuery>;
export type GetActivityByIdQueryResult = ApolloReactCommon.QueryResult<GetActivityByIdQuery, GetActivityByIdQueryVariables>;
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