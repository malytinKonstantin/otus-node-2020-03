const { argv } = require('yargs')

function parseArgs() {
    const depth = argv.d || argv.depth
    const [dirname] = argv._

    return { dirname, depth }
}

module.exports = parseArgs