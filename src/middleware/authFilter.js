export default function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.status = 403
  }
}