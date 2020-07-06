import jwt from 'jsonwebtoken'
import config from 'config'
import { ApolloError, AuthenticationError } from 'apollo-server-koa'
import _ from 'lodash'
import { ApolloContext, Resolvers } from '../../types'

const secret = config.get<string>('jwt.secret')

const accessTokenExpire = 10 * 60 * 1000
const refreshTokenExpire = 30 * 24 * 60 * 60 * 1000

function signAccessToken(data: any) {
  return {
    accessToken: jwt.sign(data, secret, { expiresIn: accessTokenExpire }),
    refreshToken: jwt.sign(data, secret, { expiresIn: refreshTokenExpire }),
  }
}

function setTokenToCookie(ctx: ApolloContext, u: any) {
  const token = signAccessToken(u)
  ctx.cookies.set('x-access-token', token.accessToken, { maxAge: accessTokenExpire })
  ctx.cookies.set('x-refresh-token', token.refreshToken, { maxAge: refreshTokenExpire })
  return token
}

export const resolvers: Resolvers = {
  Mutation: {
    userLogin(__, { input }, ctx) {
      const db = ctx.dataSources.memory
      const u = db.get(input.email)
      if (u && u.username === input.username) {
        setTokenToCookie(ctx, u)
        return u
      }
      throw new AuthenticationError('')
    },
    userSignup(__, { input }, ctx) {
      const db = ctx.dataSources.memory
      if (db.get(input.email)) {
        throw new ApolloError('UserAlreadyRegistered')
      }
      const u = { ...input, id: input.email }
      db.set(input.email, u)
      const token = signAccessToken(u)
      ctx.cookies.set('x-access-token', token.accessToken, { maxAge: accessTokenExpire })
      ctx.cookies.set('x-refresh-token', token.refreshToken, { maxAge: refreshTokenExpire })

      return u
    },
    refreshToken(__, ___, ctx) {
      const refreshToken = ctx.cookies.get('x-refresh-token') || ''
      try {
        const u = jwt.verify(refreshToken, secret) as object
        return setTokenToCookie(ctx, _.omit(u, ['iat', 'exp']))
      } catch (e) {
        throw new AuthenticationError('TokenInvalid')
      }
    }
  },

  Viewer: {
    profile(__, ___, ctx) {
      if (ctx.state.user) {
        return ctx.state.user
      }
      throw new AuthenticationError('')
    }
  }
}