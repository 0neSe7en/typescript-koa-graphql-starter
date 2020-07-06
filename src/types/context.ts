import { Context as KoaContext } from 'koa'
import { DataSources } from '../connectors'

export type ApolloContext = {
  dataSources: DataSources
} & KoaContext
