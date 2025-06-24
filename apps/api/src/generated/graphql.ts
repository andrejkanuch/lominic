import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { GraphQLContext } from "../app.module";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  access_token: Scalars["String"]["output"];
  user: User;
};

export type CreateUserInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  role?: InputMaybe<Role>;
};

export type LoginInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  id: Scalars["ID"]["input"];
};

export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};

export type MutationUpdateOwnProfileArgs = {
  updateUserInput: UpdateUserInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"]["input"];
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  me: User;
  user: User;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type RegisterInput = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

/** User roles */
export type Role = "ADMIN" | "SUPER_ADMIN" | "USER";

export type UpdateUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isEmailVerified: Scalars["Boolean"]["output"];
  lastName: Scalars["String"]["output"];
  role: Role;
  updatedAt: Scalars["DateTime"]["output"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthResponse: ResolverTypeWrapper<
    Omit<AuthResponse, "user"> & { user: ResolversTypes["User"] }
  >;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]["output"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterInput: RegisterInput;
  Role: Role;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthResponse: Omit<AuthResponse, "user"> & {
    user: ResolversParentTypes["User"];
  };
  Boolean: Scalars["Boolean"]["output"];
  CreateUserInput: CreateUserInput;
  DateTime: Scalars["DateTime"]["output"];
  ID: Scalars["ID"]["output"];
  LoginInput: LoginInput;
  Mutation: {};
  Query: {};
  RegisterInput: RegisterInput;
  String: Scalars["String"]["output"];
  UpdateUserInput: UpdateUserInput;
  User: User;
}>;

export type AuthResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["AuthResponse"] = ResolversParentTypes["AuthResponse"],
> = ResolversObject<{
  access_token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
}

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = ResolversObject<{
  createUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "createUserInput">
  >;
  login?: Resolver<
    ResolversTypes["AuthResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "loginInput">
  >;
  register?: Resolver<
    ResolversTypes["AuthResponse"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "registerInput">
  >;
  removeUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveUserArgs, "id">
  >;
  signUp?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "createUserInput">
  >;
  updateOwnProfile?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOwnProfileArgs, "updateUserInput">
  >;
  updateUser?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "id" | "updateUserInput">
  >;
}>;

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = ResolversObject<{
  me?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isEmailVerified?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  lastName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<ResolversTypes["Role"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = GraphQLContext> = ResolversObject<{
  AuthResponse?: AuthResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
