var { initMap, startSendMessage, stopSendMessage } = (function() {
    var map = null
    var ws = new WebSocket('ws://localhost:3030')

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.event === 'create route') {
            var latlngs = [
                [45.51, -122.68],
                [42.77, -122.13],
                [37.77, -122.43],
                [34.04, -118.2],
                [35.04, -108.2],
            ]
            printPath(message.data.id, latlngs)
        }

        if (message.event === 'end route report') {
            alert('report: ' + JSON.stringify(message.data))
        }
    }

    function wsSend(data) {
        if (!ws.readyState) {
            setTimeout(() => wsSend(data), 100);
        } else {
            ws.send(data)
        }
    }
    
    function initMap() {
        map = L.map('map').setView([45.51, -122.68], 13)
        
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
        }).addTo(map)
    }
    
    function startSendMessage() {
        wsSend(JSON.stringify({
            event: 'start route',
        }))
    }
    
    function printPath(routeId, latlngs) {
        latlngs.forEach((point, index) => {
            setTimeout(() => {
                var polyline = L.polyline(
                    latlngs.slice(0, index),
                    { color: 'red' }
                ).addTo(map)
                
                map.fitBounds(polyline.getBounds())

                wsSend(JSON.stringify({
                    event: 'change route path',
                    data: {
                        id: routeId,
                        point: {
                            x: point[0],
                            y: point[1],
                        },
                    },
                }))
                
                if (index === latlngs.length - 1) {
                    wsSend(JSON.stringify({
                        event: 'end route',
                        data: {
                            id: routeId,
                        }
                    }))
                }
            }, 2000 * index)
        })
    }

    function stopSendMessage() {
        ws.close()
        initMap()
    }

    return { initMap, startSendMessage, stopSendMessage }
})()

setTimeout(initMap, 200)