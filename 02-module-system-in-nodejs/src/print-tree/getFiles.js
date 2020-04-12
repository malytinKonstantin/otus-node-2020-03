const path = require('path');
const util = require('util');
const fs = require('fs');

const readdir = util.promisify(fs.readdir)

async function getFiles(dir) {
    const basename = path.posix.basename(dir)

    const response = []

    const dirents = await readdir(dir, { withFileTypes: true })
    
    for (const dirent of dirents) {
        const childrenDir = path.resolve(dir, dirent.name)
        const children = {
            path: childrenDir,
            name: dirent.name,
        }
        if (dirent.isDirectory()) {
            children.children = null
        }
        response.push(children)
    }

    return response
}

module.exports = getFiles