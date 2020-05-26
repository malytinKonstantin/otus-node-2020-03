const express = require('express')

function checkAuth(app) {
  return app.use((req, res, next) => {
    if (req.user) next()
    else res.redirect('/auth')
  })
}

module.exports = (app) => {
  const router = express.Router()

  router.get('/', checkAuth(app), (req, res, next) => {
    res.render('index', { title: 'Express' })
  })

  return router
}
