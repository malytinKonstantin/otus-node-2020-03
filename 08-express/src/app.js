const createError = require('http-errors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const helmet = require('helmet')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy

const courseApiRouter = require('./routes/api/course')
const lessonApiRouter = require('./routes/api/lesson')
const userApiRouter = require('./routes/api/user')

const courseViewRouter = require('./routes/pages/course')
const lessonViewRouter = require('./routes/pages/lesson')
const homeViewRouter = require('./routes/pages/home')
const authViewRouter = require('./routes/pages/auth')
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

const uri = 'mongodb://localhost/my-courses-db'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.log(err)
})

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

passport.use(new LocalStrategy(function(username, password, done) {
  done(null, { username, password })
  return 
    // User.findOne({ username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user)
    // })
}))

app.use(courseApiRouter)
app.use(lessonApiRouter)
app.use(userApiRouter)

app.use(homeViewRouter(app))
app.use(courseViewRouter)
app.use(lessonViewRouter)
app.use(authViewRouter)

app.post('/auth',
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/auth',
      failureFlash: true,
    }
  )
)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3000, () => {
  console.log(`Server started on 3000`)
})


module.exports = app
