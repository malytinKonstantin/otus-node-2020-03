const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', isAuth: req.isAuthenticated() })
})

module.exports = router
