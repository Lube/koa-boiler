import Router from 'koa-router'
import { validarSchema } from './../../lib/schemas'
import schemas from './schemas'
import passport from './../../lib/passport'

function validarAccion (accion, request) {
  return validarSchema(schemas, accion, request)
}

const router = new Router()

router
  .post('/login', async function loginAction (ctx, next) {
    validarAccion('login', ctx.request.body)

    ctx.query = ctx.request.body;

    return passport.authenticate('local', async function(err, user, info, status) {
      if (user === false) {
        ctx.body = { success: false }
        ctx.throw(401)
      } else {
        ctx.body = { success: true }
        await ctx.login(user)

        console.log(ctx.session)
        return user
      }
    })(ctx, next)
  })
 
export default router
