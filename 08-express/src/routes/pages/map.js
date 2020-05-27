const express = require('express')
const router = express.Router()

router.get('/map', (req, res) => {
    res.render('pages/map', { isAuth: req.isAuthenticated() })
})

module.exports = router