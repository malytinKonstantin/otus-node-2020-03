const mock = require('mock-fs')
const path = require('path')
const getDirTree = require('./getDirTree')

const folder1 = 'fake-folder1'
const folder2 = 'fake-folder2'
const items = {
  'file1.js': '',
  'file2.js': '',
}

beforeEach(() => {
  mock({
    [`${folder1}/${folder2}`]: mock.directory({
      items
    })
  })
})

afterEach(mock.restore)

describe('test print-tree', () => {
    it('shoud print tree', async () => {
        const rootDir = process.cwd()
        const depth = 3
        const tree = await getDirTree(rootDir, depth)
        const files = Object.keys(items)
        
        expect(tree.length).toBe(1)
        expect(tree[0].name).toBe(folder1)
        expect(tree[0].path).toBe(path.resolve(rootDir, folder1))
        expect(tree[0].children.length).toBe(1)
        
        expect(tree[0].children[0].children.length).toBe(2)
        expect(tree[0].children[0].children[0].name).toBe(files[0])
        expect(tree[0].children[0].children[0].path).toBe(path.resolve(rootDir, folder1, folder2, files[0]))
        expect(tree[0].children[0].children[1].name).toBe(files[1])
        expect(tree[0].children[0].children[1].path).toBe(path.resolve(rootDir, folder1, folder2, files[1]))
    })
})