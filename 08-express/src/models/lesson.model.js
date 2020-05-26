const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const LessonSchema = new mongoose.Schema({
    _id: ObjectId,
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['in process', 'reviewing', 'done'],
        default: 'in process',
    },
    course: {
        type: ObjectId,
        ref: 'Course',
    }
})

const Lesson = mongoose.model('Lesson', LessonSchema)

module.exports = Lesson