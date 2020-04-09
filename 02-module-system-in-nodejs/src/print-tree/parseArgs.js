function parseArgs() {
    const getDepth = () => {
        const aliases = ['--depth', '-d']
        let value = null

        aliases.forEach((alias) => {
            const keyIndex = process.argv.indexOf(alias, 2)
            if (keyIndex !== -1) {
                value = Number(process.argv[keyIndex + 1])
            }
        })

        return value
    }

    const dirname = process.argv[2]
    const depth = getDepth()

    return { dirname, depth }
}

module.exports = parseArgs