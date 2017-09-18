import logger from './../lib/logger'
import formatError from './../lib/exception/formatError'

export default async function error (ctx, next) {
  try {
    await next()
  } catch (e) {
    logger.error(e)

    const { status, message, stack } = formatError(e)
    const error = {
      error: {
        message,
        stack: stack
      }
    }

    console.log(message)

    ctx.status = status
    ctx.body = error
  }
}

process.on('uncaughtException', function (e) {
  logger.error('uncaught', e)
})