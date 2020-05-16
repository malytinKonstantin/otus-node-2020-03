const LessonService = require('../../services/lesson.service')
const createRouter = require('./base.router')

const router = createRouter({
  collection: LessonService,
  resource: '/api/v1/lesson'
})

module.exports = router