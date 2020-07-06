import { gql } from 'apollo-server-koa'

export const typeDefs = gql`
  
  input UserSignupInput {
    email: String!
    username: String!
  }
  
  input UserLoginInput {
    email: String!
    username: String!
  }
  
  extend type Mutation {
    userSignup(input: UserSignupInput!): User
    userLogin(input: UserLoginInput!): User
    refreshToken: RefreshTokenResponse
  }
  
  type RefreshTokenResponse {
    refreshToken: String!
    accessToken: String!
  }
  
  type User {
    id: ID!
    email: String!
    username: String!
    avatarImage: String
  }
`
