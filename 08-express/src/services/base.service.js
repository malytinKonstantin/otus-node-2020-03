const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

class BaseService {
    constructor(collection) {
        this.collection = collection
    }

    async getAll() {
        const list = await this.collection.find()
        return list
    }

    async find(params) {
        const list = await this.collection.find(params)
        return list
    }

    async findOne(id) {
        const item = await this.collection.findOne({ _id: id })
        return item
    }

    async create(item) {
        const created = new this.collection({ 
            ...item,
            _id: new ObjectId()
        })
        await created.save()
        return created
    }

    async update(nextItem) {
        const current = await this.findOne(nextItem.id)
        Object.keys(nextItem).forEach(key => {
            current[key] = nextItem[key]
        })
        await current.save()
        return current
    }

    async remove(id) {
        try {
            const res = await this.collection.find({ _id: id }).remove()
            return res.ok === 1
        } catch (e) {
            return false
        }
    }
}

module.exports = BaseService