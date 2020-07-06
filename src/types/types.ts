import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import { ApolloContext } from './context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  JSON: any
  JSONObject: any
}

export type Mutation = {
  __typename?: 'Mutation'
  refreshToken?: Maybe<RefreshTokenResponse>
  userLogin?: Maybe<User>
  userSignup?: Maybe<User>
  version: Scalars['String']
}

export type MutationUserLoginArgs = {
  input: UserLoginInput
}

export type MutationUserSignupArgs = {
  input: UserSignupInput
}

export type Query = {
  __typename?: 'Query'
  version: Scalars['String']
  viewer?: Maybe<Viewer>
}

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse'
  refreshToken: Scalars['String']
  accessToken: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  username: Scalars['String']
  avatarImage?: Maybe<Scalars['String']>
}

export type UserLoginInput = {
  email: Scalars['String']
  username: Scalars['String']
}

export type UserSignupInput = {
  email: Scalars['String']
  username: Scalars['String']
}

export type Viewer = {
  __typename?: 'Viewer'
  profile?: Maybe<User>
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes>

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Viewer: ResolverTypeWrapper<Viewer>
  User: ResolverTypeWrapper<User>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Mutation: ResolverTypeWrapper<{}>
  RefreshTokenResponse: ResolverTypeWrapper<RefreshTokenResponse>
  UserLoginInput: UserLoginInput
  UserSignupInput: UserSignupInput
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Date: ResolverTypeWrapper<Scalars['Date']>
  JSON: ResolverTypeWrapper<Scalars['JSON']>
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  Viewer: Viewer
  User: User
  ID: Scalars['ID']
  Mutation: {}
  RefreshTokenResponse: RefreshTokenResponse
  UserLoginInput: UserLoginInput
  UserSignupInput: UserSignupInput
  Boolean: Scalars['Boolean']
  Date: Scalars['Date']
  JSON: Scalars['JSON']
  JSONObject: Scalars['JSONObject']
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export interface JsonObjectScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject'
}

export type MutationResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  refreshToken?: Resolver<Maybe<ResolversTypes['RefreshTokenResponse']>, ParentType, ContextType>
  userLogin?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUserLoginArgs, 'input'>
  >
  userSignup?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<MutationUserSignupArgs, 'input'>
  >
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>
}

export type RefreshTokenResponseResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['RefreshTokenResponse'] = ResolversParentTypes['RefreshTokenResponse']
> = {
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type UserResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  avatarImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type ViewerResolvers<
  ContextType = ApolloContext,
  ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']
> = {
  profile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = ApolloContext> = {
  Date?: GraphQLScalarType
  JSON?: GraphQLScalarType
  JSONObject?: GraphQLScalarType
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  RefreshTokenResponse?: RefreshTokenResponseResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Viewer?: ViewerResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = ApolloContext> = Resolvers<ContextType>
