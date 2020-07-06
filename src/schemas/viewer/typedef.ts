import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  type Viewer {
    profile: User
  }
`