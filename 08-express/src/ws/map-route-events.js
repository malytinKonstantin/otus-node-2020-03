const { MapRoute, RouteMapPoint } = require('../models/map-route.model')

const handleStartEvent = async (ws, data) => {
    const mapRoute = new MapRoute(data)
    await mapRoute.save()
    ws.send(JSON.stringify({
        event: 'create route',
        data: {
            id: mapRoute._id
        }
    }))
}

const handleChangePathEvent = async (ws, data) => {
    const item = await MapRoute.findById(data.id)
    if (item.points.length === 0) {
        item.status = 'start'
    }
    item.points.push(new RouteMapPoint(data.point))
    await item.save()
}

const handleEndEvent = async (ws, data) => {
    const item = await MapRoute.findById(data.id)
    item.status = 'end'
    await item.save()
    ws.send(JSON.stringify({
        event: 'end route report',
        data: item,
    }))
}

const eventMap = new Map()
    .set('start route', handleStartEvent)
    .set('change route path', handleChangePathEvent)
    .set('end route', handleEndEvent)

const handleMapRouteEvents = async (ws, message) => {
    const { event, data } = message
    const handler = eventMap.get(event)
    if (handler) await handler(ws, data)
}

module.exports = handleMapRouteEvents
