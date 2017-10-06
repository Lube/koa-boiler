import Router from 'koa-router'
import sendfile from 'koa-send'
import { recordRespuesta } from './service'
import { validarSchema } from './../../lib/schemas'
import schemas from './schemas'

function validarAccion (accion, request) {
  return validarSchema(schemas, accion, request)
}

const router = new Router()

router
  .post('/', async function recordAction (ctx, next) {
    validarAccion('record', ctx.request.body)

    ctx.body = await recordRespuesta(ctx.request.body)
  })

export default router
