import { GraphQLScalarType, Kind } from 'graphql'
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import { Resolvers } from '../../types'

export const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return value
    },
    serialize(value) {
      return value
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value
      }
      return null
    },
  }),
  JSONObject: GraphQLJSONObject,
  JSON: GraphQLJSON,
  Query: {
    version() {
      return '0.1'
    },
  },
  Mutation: {
    version() {
      return '0.1'
    },
  },
}
