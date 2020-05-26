const Lesson = require('../models/lesson.model')
const BaseService = require('./base.service')

class LessonService extends BaseService {
    constructor() {
        super(Lesson)
    }
}

const lessonService = new LessonService()

module.exports = lessonService