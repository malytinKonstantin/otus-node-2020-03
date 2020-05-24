const express = require('express')
const router = express.Router()

router.get('/auth', function(req, res, next) {
  res.render('pages/authorization')
})

module.exports = router