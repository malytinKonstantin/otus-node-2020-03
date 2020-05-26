const express = require('express')
const CourseService = require('../../services/course.service')
const LessonService = require('../../services/lesson.service')
const router = express.Router()

router.get('/courses', async (req, res, next) => {
    const courses = await CourseService.getAll()
    res.render('pages/courses', { courses })
})

router.get('/course/:id', async (req, res, next) => {
    const course = await CourseService.findOne(req.params.id)
    res.render('pages/course', { course })
})

module.exports = router