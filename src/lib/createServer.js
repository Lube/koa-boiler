import Koa from 'koa'
import cors from 'kcors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'

import logger from './logger'
import router from '../modules'
import passport from './passport'

import serve from '../middleware/serve'
import errorHandler from '../middleware/error'

export default async function createServer () {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()

  app.keys = ['secret']
  app.use(session({}, app))

  app.use(respond())
  app.use(cors())
  app.use(bodyParser())

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(errorHandler)
  
  app.use(serve)

  app.use(router.allowedMethods())
  app.use(router.routes())

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
