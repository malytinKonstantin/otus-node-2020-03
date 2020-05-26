const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    email_is_verified: {
        type: Boolean,
        default: false,
    },
    courses: [{
        type: ObjectId,
        ref: 'Course',
    }],
    date: {
        type: Date,
        default: Date.now,
    }
}, {
    strict: false,
})

const User = mongoose.model('User', UserSchema)

module.exports = User