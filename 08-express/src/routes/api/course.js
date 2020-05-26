const CourseService = require('../../services/course.service')
const createRouter = require('./base.router')

const router = createRouter({
  collection: CourseService,
  resource: '/api/v1/course'
})

module.exports = router
