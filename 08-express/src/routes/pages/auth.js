const express = require('express')
const router = express.Router()

router.get('/auth', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.render('pages/authorization')
  } else {
    res.redirect('/')
  }
})

module.exports = router
