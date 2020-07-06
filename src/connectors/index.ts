import Debug from 'debug'
import _ from 'lodash'
import { DataSource, DataSourceConfig } from 'apollo-datasource'

const debug = Debug('connector:datasource')

class MemoryDataSource extends DataSource {
  database = new Map<string, any>()

  // eslint-disable-next-line class-methods-use-this
  initialize(config: DataSourceConfig<any>): void | Promise<void> {
    debug('init memory datasource %o', config)
  }

  get(key: string): any {
    return this.database.get(key)
  }

  set(key: string, value: any) {
    return this.database.set(key, value)
  }
}

export const dataSources = {
  memory: MemoryDataSource,
}

export type DataSources = {
  [Key in keyof typeof dataSources]: InstanceType<typeof dataSources[Key]>
}

export function initDataSources() {
  return _.reduce(
    dataSources,
    (res: Record<string, any>, Cls, key) => {
      res[key] = new Cls()
      return res
    },
    {},
  ) as DataSources
}
