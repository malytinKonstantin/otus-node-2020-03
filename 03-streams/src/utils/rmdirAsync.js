const fs = require('fs')

function rmdirAsync(path, callback) {
	fs.readdir(path, (err, files) => {
		if (err) {
			callback(err, [])
			return
		}

		const wait = files.length
	    let count = 0

	    const folderDone = (err) => {
			count++
			if (count >= wait || err) {
				fs.rmdir(path, callback)
			}
		}

		if (!wait) {
			folderDone()
			return
		}
		
		path = path.replace(/\/+$/,"")

		files.forEach((file) => {
			const curPath = path + "/" + file

			fs.lstat(curPath, (err, stats) => {
				if( err ) {
					callback(err, [])
					return
				}
				if( stats.isDirectory()) {
					rmdirAsync(curPath, folderDone)
				} else {
					fs.unlink(curPath, folderDone)
				}
			})
		})
	})
}

module.exports = rmdirAsync