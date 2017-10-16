import initSentry from './sentry'

if (process.env.NODE_ENV === 'production') {
  initSentry()
}
