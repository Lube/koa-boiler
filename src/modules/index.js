import Router from 'koa-router'
import respuestas from './respuestas/api'

const router = new Router()
const API_ROOT_PATH = '/api'

router.use(`${API_ROOT_PATH}/respuesta`, respuestas.routes(), respuestas.allowedMethods())

export default router
