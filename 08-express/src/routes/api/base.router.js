const express = require('express')

const createRouter = ({
        collection,
        resource,
    }) => {

    const router = express.Router()

    router.get(resource, async (req, res, next) => {
        const list = await collection.getAll()
        res.send(list)
    })

    router.get(resource + '/:id', async (req, res, next) => {
        const item = await collection.findOne(req.params.id)
        res.send(item)
    })

    router.post(resource + '/', async (req, res, next) => {
        const created = await collection.create(req.body)
        res.send(created)
    })

    router.put(resource + '/:id', async (req, res, next) => {
        const updated = await collection.update(req.body)
        res.send(updated)
    })

    router.delete(resource + '/:id', async (req, res, next) => {
        const isRemoved = await collection.remove(req.params.id)
        if (isRemoved) {
            res.status(200).send('Запись успешно удалена.')
        } else {
            res.status(400).send('Ошибка удаления. Запись не найдена.')
        }
    })

    return router
}

module.exports = createRouter