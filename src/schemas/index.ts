import _ from 'lodash'

const modules = {
  basic: require('./basic'),
  user: require('./user'),
  viewer: require('./viewer'),
}

export const schemas = _.map(modules, v => v.typeDefs)

export const resolvers = _.map(modules, v => v.resolvers)
