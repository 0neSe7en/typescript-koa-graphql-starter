import { ApolloServer, Config, makeExecutableSchema } from 'apollo-server-koa'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import config from 'config'
import { Context } from 'koa'
import { schemas, resolvers } from './schemas'
import { apolloServerSentryPlugin } from './utils/apollo-sentry-plugin'
import { initDataSources } from './connectors'

const jwtSecret = config.get<string>('jwt.secret')

const schema = makeExecutableSchema({
  typeDefs: schemas,
  resolvers: resolvers as any,
  inheritResolversFromInterfaces: true,
})

const context = ({ ctx }: { ctx: Context }) => {
  const refreshToken = ctx.cookies.get('x-refresh-token')
  const accessToken = ctx.cookies.get('x-access-token')
  if (accessToken && refreshToken) {
    try {
      ctx.state.user = jwt.verify(accessToken, jwtSecret)
    } catch (e) {
      ctx.state.user = null
    }
  }
  return ctx
}

const serverConfig: Config = {
  schema,
  introspection: process.env.NODE_ENV === 'dev',
  context,
  dataSources: initDataSources,
  tracing: process.env.NODE_ENV !== 'production',
  engine: {
    apiKey: config.get<string>('apollo.apiKey'),
  },
  plugins: [apolloServerSentryPlugin as any], // todo: fix any
}

function formatError(err: GraphQLError) {
  console.error('Error:', err)
  return err
}

export const apolloServer = new ApolloServer({
  ...serverConfig,
  playground: process.env.NODE_ENV === 'dev',
  tracing: false,
  debug: false,
  formatError,
})

export const managementApollo = new ApolloServer({
  ...serverConfig,
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  mocks: true,
  mockEntireSchema: false,
  formatError,
})
