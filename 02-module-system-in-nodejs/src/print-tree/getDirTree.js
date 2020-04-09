const getFiles = require('./getFiles')

async function buildTreeNode({ level, dirname, parentNode, depth }) {
    const childrens = await getFiles(dirname)
    const nextLevel = level + 1
    parentNode.childrens = childrens

    if (nextLevel <= depth) {
        for (const childrenNode of childrens) {
            // массив childrens может быть только директории типа папка
            if ('childrens' in childrenNode) {
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
        if ('childrens' in childrenNode) {
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