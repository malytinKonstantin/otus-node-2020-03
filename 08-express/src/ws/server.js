const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: process.env.WS_PORT })
const handleMapRouteEvents = require('./map-route-events')

wss.on('connection', (ws, request, client) => {
  ws.on('message', async (msg) => {
    const message = JSON.parse(msg)
    try {
      await handleMapRouteEvents(ws, message)
    } catch (err) {
      console.log(err)
    }
  })  
})

wss.on('close', () => {
  console.log('- - - close')
})

module.exports = wss