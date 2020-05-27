const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/register_login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(400).json({ errors: err })
        }
        if (!user) {
            return res.status(400).json({ errors: 'No user found' })
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(400).json({ errors: err })
            }
            return res.status(200).redirect('/')
        })
    })(req, res, next)
})

router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router