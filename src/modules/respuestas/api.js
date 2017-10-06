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
  .get('/', async function exportAction (ctx, next) {
    ctx.body = Buffer.from(await crearPlanillaExportable('respuestas.xlsx')).toString('base64')
    ctx.set('Content-disposition', 'attachment; filename=Respuestas FIT 2018.xlsx');
    ctx.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  })

export default router
