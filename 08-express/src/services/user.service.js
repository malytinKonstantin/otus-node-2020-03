const User = require('../models/user.model')
const BaseService = require('./base.service')

class UserService extends BaseService {
    constructor() {
        super(User)
    }
}

const userService = new UserService()

module.exports = userService