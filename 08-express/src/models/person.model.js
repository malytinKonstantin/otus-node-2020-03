const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    password: String,
    email: String,
    courses: [{
        type: ObjectId,
        ref: 'Course',
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User