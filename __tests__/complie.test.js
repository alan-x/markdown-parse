const compile = require('./../lib/compile')
const tokenize = require('./../lib/tokenize')

describe('title', () => {
    test('title 1', () => {
        let tokenList = tokenize(`# title 1`)
        console.log(tokenList)
        expect(compile(tokenList)).toBe({})
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

describe('multiple code', () => {
    test('multiple code', () => {
        let tokenList = tokenize('```\nlet i=0\n```')
        console.log(tokenList)
        expect(compile(tokenList)).toBe({})
    })
})

describe('ul', () => {
    test('ul 1', () => {
        expect(tokenize(`- ul`)).toBe({})
    })
})

describe('ol', () => {
    test('ol', () => {
        expect(tokenize(`1. ol`)).toBe({})
    })
})


describe('content tokenize', () => {
    test('text', () => {
        expect(tokenize('这是文字')).toBe({})
    })
    test('``', () => {
        expect(tokenize('abc`def`ghi')).toBe({})
    })
    test('`', () => {
        expect(tokenize('abc`defghi')).toBe({})
    })

    test('**', () => {
        expect(tokenize('*1*')).toBe({})
    })
    test('`', () => {
        expect(tokenize('abc`defghi')).toBe({})
    })
})
