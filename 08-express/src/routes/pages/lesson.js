const express = require('express')
const LessonService = require('../../services/lesson.service')
const router = express.Router()

router.get('/lesson/:id', async (req, res, next) => {
    const lesson = await LessonService.findOne(req.params.id)
    res.render('pages/lesson', { lesson })
})

module.exports = router