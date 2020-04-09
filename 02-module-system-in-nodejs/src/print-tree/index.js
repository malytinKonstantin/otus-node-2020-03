const parseArgs = require('./parseArgs')
const getDirTree = require('./getDirTree')

function printNode(tree, node, index, items, level, prevIndex) {
    let indent = ''
    let prefix = '|'
    let postfix = '├── '

    const isFirstLevel = level === 1
    const isLastTreeNode = tree.length - 1 == prevIndex.split('-')[0]
    const isLastNode = items && index === items.length -1

    if (!isFirstLevel) {
        indent = ' '.repeat((level -1) * 4)
        indent = [...indent]
        if (indent.length > 4 && !isLastTreeNode) {
            prefix = ''
            indent = indent.map((_, i) => (i % 4) === 0 ? '|' : _)
        } else {
            indent.shift()
        }
        indent = indent.join('')
    }
    if (isFirstLevel) prefix = ''
    if (isLastTreeNode && !isFirstLevel) prefix = ' '
    if (isLastNode) postfix = '└── ' 

    console.log('\n', prefix + indent + postfix + node.name)

    if ('childrens' in node && node.childrens !== null) {
        node.childrens.forEach((item, index, array) => {
            printNode(tree, item, index, array, level + 1, prevIndex + '-' + index, )
        })
    }
}


async function printTree() {
    const { dirname, depth } = parseArgs()

    const tree = await getDirTree(dirname, depth)
    
    console.log('\n', '\n')
    console.log('print dir:', dirname)

    tree.forEach((node, index) => printNode(tree, node, index, tree, 1, String(index)))

    console.log('\n', '\n')
}

module.exports = printTree