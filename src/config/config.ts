import convict from 'convict'
import * as dotenv from 'dotenv'
import { version } from '../../package.json'

dotenv.config({ path: '../../.env' })

const config = convict({
  APP_NAME: {
    doc: 'Name of this service',
    format: String,
    default: 'Mood',
    env: 'APP_NAME',
  },
  APP_VERSION: {
    doc: 'Version of this service',
    format: String,
    default: '',
  },
  NODE_ENV: {
    doc: 'The application environment.',
    format: ['development', 'test', 'production', null],
    default: 'production',
    env: 'NODE_ENV',
  },
  HOST: {
    doc: 'Hostname of this application',
    format: String,
    default: '0.0.0.0',
    env: 'HOST',
  },
  PORT: {
    doc: 'Exposed port of this application',
    format: Number,
    default: 3007,
    env: 'PORT',
  },
  LOG_LEVEL: {
    doc: 'Activate logs in console',
    format: ['critical', 'error', 'warning', 'info', 'debug'],
    default: 'info',
    env: 'LOG_LEVEL',
  },
  MONGODB_URI: {
    doc: 'Username for the database connection',
    format: String,
    default: 'mongo',
    env: 'MONGODB_URI',
  },
  DATABASE_NAME: {
    doc: 'name for the database connection',
    format: String,
    default: 'database',
    env: 'DATABASE_NAME',
  },
  DATABASE_USERNAME: {
    doc: 'Username for the database connection',
    format: String,
    default: '',
    env: 'DATABASE_USERNAME',
  },
  DATABASE_PASSWORD: {
    doc: 'Password for the database connection',
    format: String,
    default: '',
    env: 'DATABASE_PASSWORD',
  },
  SERVER_WORKER_NUMBER: {
    doc: 'number of worker',
    format: Number,
    default: 4,
    env: 'SERVER_WORKER_NUMBER',
  },
})

config.set('APP_VERSION', version)

export { config }
