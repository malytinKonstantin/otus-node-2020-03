const Course = require('../models/course.model')
const BaseService = require('./base.service')

class CourseService extends BaseService {
    constructor() {
        super(Course)
    }
}

const courseService = new CourseService()

module.exports = courseService