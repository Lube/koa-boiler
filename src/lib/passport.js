import passport from 'koa-passport'
import LocalPassport from 'passport-local'

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  done(null, {id})
})

passport.use(new LocalPassport.Strategy(function(username, password, done) {
  if (username === 'sebastianlube@gmail.com' && password === '12341234') {
    done(null, {id: 1, username})
  } else {
    done(null, false)
  }
}))

export default passport