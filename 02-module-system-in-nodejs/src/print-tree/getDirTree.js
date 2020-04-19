const getFiles = require('./getFiles')

async function buildTreeNode({ level, dirname, parentNode, depth }) {
    const children = await getFiles(dirname)
    const nextLevel = level + 1
    parentNode.children = children

    if (nextLevel <= depth) {
        for (const childrenNode of children) {
            // массив children может быть только директории типа папка
            if ('children' in childrenNode) {
                await buildTreeNode({ 
                    level: nextLevel,
                    dirname: childrenNode.path,
                    parentNode: childrenNode,
                    depth,
                })
            }
        }
    }
}

async function getDirTree(dirname, depth) {
    const firsLevelNode = await getFiles(dirname)
    const level = 1

    for (const childrenNode of firsLevelNode) {
        if ('children' in childrenNode) {
            await buildTreeNode({ 
                level, 
                dirname: childrenNode.path, 
                parentNode: childrenNode, 
                depth,
            })
        }
    }

    return firsLevelNode
}

module.exports = getDirTree