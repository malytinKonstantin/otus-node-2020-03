const printTree = require('./print-tree/index')

const obj = { 
    "name": 1, 
    "items": [
        { 
            "name": 2, 
            "items": [
                { "name": 3 }, 
                { 
                    "name": 4,
                    "items": [
                        { name: '4.0' }
                    ]
                }
            ] 
        }, 
         { 
            "name": 2, 
            "items": [
                { "name": 3 }, 
                { 
                    "name": 4,
                    "items": [
                        { name: '4.0' }
                    ]
                }
            ] 
        },
        { 
            "name": 5, 
            "items": [
                {
                    "name": 6,
                    "items": [
                        { "name": 7 },
                        { "name": 8 },
                    ]
                }
            ]
        }
    ]
}

printTree(obj)
