const fs = require('fs')
const path = require('path')
const stream = require('stream')
const util = require('util')
const rmdirAsync = require('../utils/rmdirAsync')
const randomInt = require('../utils/randomInt')


function createFileNumbers100mb(folderPath) {
    return new Promise((res, rej) => {
        rmdirAsync(folderPath, (err) => {
            if (err) {
                rej(err)
            }

            const fileName = 'numbers_100_mb.txt'
            const filePath100mb = path.join(folderPath, fileName)
            const fileSize100mbInBytes = 1e+8

            fs.mkdirSync(folderPath)

            const writeable = fs.createWriteStream(filePath100mb)

            writeable.on('finish', () => {
                res(filePath100mb)
            })

            const write = () => {
                writeable.write(`${randomInt(0, 100)},`, () => {
                    const stats = fs.statSync(filePath100mb)

                    if (stats.size < fileSize100mbInBytes) {
                        write()
                    } else {
                        writeable.end()
                    }         
                })
            }

            write()
        })
    })
}

module.exports = createFileNumbers100mb
