const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const CourseSchema = new mongoose.Schema({
    _id: ObjectId,
    title: String,
    description: String,
    lessons: [{
        type: ObjectId,
        ref: 'Lesson',
    }],
    students: [{
        type: ObjectId,
        ref: 'Person',
    }]
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course