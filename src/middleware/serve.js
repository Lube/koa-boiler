import send from 'koa-send'

import {join} from 'path'
import {stat} from 'fs'
import {promisify} from 'util'

let pStat = promisify(stat)

export default async function (ctx, next) {
  console.log('path', ctx.path)
  if (ctx.path === '/') {
    await send(ctx, 'index.html', { root: join(__dirname, '../client') })
  } else if (ctx.path === '/admin'){
    console.log('sirviendo admin')
    await send(ctx, 'index.html', { root: join(__dirname, '../dashboard') })
  } else {
    if (!ctx.path.match(/\/api\/.+/g)) {
      try {
        await pStat(join(__dirname, '../client', ctx.path))
        await send(ctx, ctx.path, { root: join(__dirname, '../client') })
      } catch (e) {
        await pStat(join(__dirname, '../dashboard', ctx.path))
        await send(ctx, ctx.path, { root: join(__dirname, '../dashboard') })
      }  
    }
  }


  await next()
}