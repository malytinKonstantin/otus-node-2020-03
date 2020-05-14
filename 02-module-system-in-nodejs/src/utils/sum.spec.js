const sum = require('./sum')

describe('sum test', () => {
    it('sum(2, 2) to be 4', () => {
        expect(sum(2, 2)).toBe(4)
    })
})