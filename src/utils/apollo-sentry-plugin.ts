import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import Sentry from '../sentry'

export const apolloServerSentryPlugin = {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  requestDidStart() {
    return {
      didEncounterErrors(rc) {
        Sentry.withScope(scope => {
          scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, rc.context.request))

          // public user email
          scope.setUser({
            ip_address: rc.context.ip,
          })

          scope.setTags({
            graphql: rc.operation?.operation || 'parse_err',
            graphqlName: (rc.operationName as any) || (rc.request.operationName as any),
          })

          rc.errors.forEach(error => {
            if (error.path || error.name !== 'GraphQLError') {
              scope.setExtras({
                path: error.path,
              })
              Sentry.captureException(error)
            } else {
              scope.setExtras({})
              Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`)
            }
          })
        })
      },
    }
  },
} as ApolloServerPlugin
