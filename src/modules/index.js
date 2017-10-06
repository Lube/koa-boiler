import Router from 'koa-router'
import respuestas from './respuestas/api'
import respuestasPublicas from './respuestas/apipublica'
import authentication from './authentication/api'

import authFilter from '../middleware/authFilter'

const router = new Router()
const API_ROOT_PATH = '/api'

router.use(`${API_ROOT_PATH}`, authentication.routes(), authentication.allowedMethods())
router.use(`${API_ROOT_PATH}/respuesta`, respuestasPublicas.routes(), respuestasPublicas.allowedMethods())

router.use(authFilter)

router.use(`${API_ROOT_PATH}/respuesta`, respuestas.routes(), respuestas.allowedMethods())

export default router
