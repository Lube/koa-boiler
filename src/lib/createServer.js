import Koa from 'koa'
import cors from 'kcors'
import respond from 'koa-respond'
import bodyParser from 'koa-bodyparser'

import logger from './logger'
import router from '../modules'
import notFoundHandler from '../middleware/notFound'
import errorHandler from '../middleware/error'

export default async function createServer () {
  logger.debug('Creating server...', { scope: 'startup' })
  const app = new Koa()
  
  app.use(respond())
  app.use(cors())
  app.use(bodyParser())
  app.use(errorHandler)

  app.use(router.allowedMethods())
  app.use(router.routes())

  app.use(notFoundHandler)

  logger.debug('Server created, ready to listen', { scope: 'startup' })
  return app
}
