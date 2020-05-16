const Person = require('../models/person.model')
const BaseService = require('./base.service')

class PersonService extends BaseService {
    constructor() {
        super(Person)
    }
}

const personService = new PersonService()

module.exports = personService