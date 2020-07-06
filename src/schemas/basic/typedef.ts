import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  scalar Date
  scalar JSON
  scalar JSONObject

  type Query {
    version: String!
    viewer: Viewer
  }

  type Mutation {
    version: String!
  }
`
