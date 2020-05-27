const mongoose = require('mongoose')

const PointSchema = new mongoose.Schema({
    x: Number,
    y: Number,
})

const MapRouteSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['init', 'start', 'end'],
        default: 'init',
    },
    points: {
        type: [PointSchema],
        default: [],
    }
})

const MapRoute = mongoose.model('MapRoute', MapRouteSchema)
const RouteMapPoint = mongoose.model('RouteMapPoint', PointSchema)

module.exports = {
    MapRoute,
    RouteMapPoint,
}