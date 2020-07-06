import config from 'config'
import * as Sentry from '@sentry/node'
import * as Integrations from '@sentry/integrations'

Sentry.init({
  dsn: config.get('sentry.dsn'),
  environment: process.env.NODE_ENV,
  integrations: [new Integrations.Dedupe(), new Integrations.ExtraErrorData({ depth: 20 })],
})

// eslint-disable-next-line import/no-default-export
export default Sentry
