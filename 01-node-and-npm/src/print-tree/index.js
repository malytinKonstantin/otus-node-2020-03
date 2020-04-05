const obj = { 
    "name": 1, 
    "items": [
        { 
            "name": 2, 
            "items": [
                { "name": 3 }, 
                { "name": 4 }
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

function printTree(tree) {
    function printNode(node, index, items, level, prevIndex) {
        let indent = ''
        let prefix = ''
        let postfix = ''

        if (level > 1) {
            indent = ' '
        }
        if (level === 2) {
            const isLastNode = level === 2 && index === items.length -1
            prefix = isLastNode ? '└── ' : '├── '
        }
        if (level > 2) {
            const lastIndex = tree.items.length - 1 
            const isLastNode = lastIndex == [...prevIndex][1]
            indent = ' '.repeat(level * 4 - 8)
            prefix = isLastNode ? ' ' : '|'
            postfix = '└── '
        }
        
        console.log('\n', prefix + indent + postfix + node.name)

        if ('items' in node) {
            node.items.forEach((item, index, array) => {
                printNode(item, index, array, level + 1, prevIndex + String(index))
            })
        }
    }

    printNode(tree, 1, null, 1, String(0))
}


printTree(obj)

module.exports = printTree