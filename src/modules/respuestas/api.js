import Router from 'koa-router'
import sendfile from 'koa-send'
import { recordRespuesta, crearPlanillaExportable } from './service'
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
  .get('/', async function exportAction (ctx, next) {
    ctx.body = await crearPlanillaExportable('respuestas.xlsx')
    ctx.set('Content-disposition', 'attachment; filename=Respuestas FIT 2018.xlsx');
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  })

export default router
