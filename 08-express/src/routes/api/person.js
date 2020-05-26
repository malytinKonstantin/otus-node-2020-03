const PersonService = require('../../services/person.service')
const createRouter = require('./base.router')

const router = createRouter({
  collection: PersonService,
  resource: '/api/v1/person'
})

module.exports = router