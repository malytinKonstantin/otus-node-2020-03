const express = require('express')
const router = express.Router()

/* GET lesson. */
router.get('/', function(req, res, next) {
  res.render('pages/lesson')
})

module.exports = router
