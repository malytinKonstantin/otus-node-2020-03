const path = require('path')
const createFileNumbers100mb = require('./steps/createFileNumbers100mb')
const splitFile = require('./steps/splitFile')
const joinFile = require('./steps/joinFiles')

const run = async () => {
    const srcDir = path.resolve(process.cwd(), 'src/tmp')
    
    const filePathNumber100mb = await createFileNumbers100mb(srcDir)
    
    const dirSplitedFiles = path.resolve(srcDir, 'files')

    const files = await splitFile(filePathNumber100mb, dirSplitedFiles)

    const resultFile = await joinFile(srcDir, files)

    console.log("result file:", resultFile)
}

run()