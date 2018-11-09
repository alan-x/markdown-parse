const tokenize = require('./../lib/tokenize')

describe('tokenize', () => {
    test('title 1', () => {
        expect(tokenize(`# title 1`)).toBe({})
    })

    test('title 2', () => {
        expect(tokenize(`## title 2`)).toBe({})
    })
    test('title 3', () => {
        expect(tokenize(`### title 3`)).toBe({})
    })
    test('title 4', () => {
        expect(tokenize(`#### title 4`)).toBe({})
    })
    test('title 5', () => {
        expect(tokenize(`##### title 5`)).toBe({})
    })
    test('title 6', () => {
        expect(tokenize(`###### title 6`)).toBe({})
    })
})