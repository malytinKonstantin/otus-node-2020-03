const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // поиск пользователя
        User.findOne({ email })
            .then(user => {
                if (!user) {
                    // создание нового пользователя
                    const newUser = new User({ email, password })
                    // вычесление hash-пароля перед сохранением в бд
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err

                            newUser.password = hash
                            newUser
                                .save()
                                .then(user => {
                                    return done(null, user)
                                })
                                .catch(err => {
                                    return done(null, false, { message: err })
                                })
                        })
                    })
                } else {
                    // проверка пароля
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Wrong password' })
                        }
                    })
                }
            })
            .catch(err => {
                return done(null, false, { message: err })
            })
    })
)

module.exports = passport