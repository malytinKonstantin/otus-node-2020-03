const UserService = require('../../services/user.service')
const createRouter = require('./base.router')

const router = createRouter({
  collection: UserService,
  resource: '/api/v1/user',
})

module.exports = router