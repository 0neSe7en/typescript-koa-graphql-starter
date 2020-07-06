import Koa from 'koa'
import { apolloServer, managementApollo } from './apollo-server'

const app = new Koa()
  .use(apolloServer.getMiddleware({ path: '/api/graphql' }))
  .use(managementApollo.getMiddleware({ path: '/management/graphql' }))

app.listen('3000', () => {
  console.log('start listen 3000')
})
