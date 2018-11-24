function tokenize(input) {
    let lineList = input.split('\n').reverse()
    let resultList = []
    while (lineList.length) {
        let line = lineList.pop()
        let tokenList = line.split('').reverse()
        let token = tokenList.pop()
        switch (token) {
            case '#': {
                let type = 'title'
                let level = 1
                let children = []

                while (tokenList.length) {
                    token = tokenList.pop()
                    if (token === '#') {
                        level++
                        continue
                    }
                    break
                }
                tokenList.push(token)
                children = contentTokenize(tokenList)
                resultList.push({
                    type, level, children
                })
                break
            }
            case '-': {
                token = tokenList.pop()
                if (token === ' ') {
                    let type = 'ul'
                    let children = contentTokenize(tokenList)
                    resultList.push({
                        type, children
                    })
                    break
                }
                tokenList.push(token)

                let type = 'text'
                let children = contentTokenize(tokenList)
                resultList.push({
                    type, children
                })
                break

            }
            case '>': {
                let token1 = tokenList.pop()
                if (token1 === ' ') {
                    let type = 'quote'
                    let children = contentTokenize(tokenList)
                    break
                }
                tokenList.push(token1)
                tokenList.push(token)
                resultList.push(textTokenize(tokenList))
                break

            }
            case '1': {
            }
            case '2': {
            }
            case '3': {
            }
            case '4': {
            }
            case '5': {
            }
            case '6': {
            }
            case '7': {
            }
            case '8': {
            }
            case '9': {
            }
            case '0': {
                let token1 = tokenList.pop()
                if (token1 === '.') {
                    let token2 = tokenList.pop()
                    if (token2 === ' ') {
                        let type = 'ol'
                        let children = contentTokenize(tokenList)
                        resultList.push({
                            type, children
                        })
                        break
                    } else {
                        tokenList.push(token2)
                    }
                } else {
                    tokenList.push(token1)
                }
                tokenList.push(token)
                resultList.push(textTokenize(tokenList))
                break
            }
            default: {
                tokenList.push(token)
                resultList.push(textTokenize(tokenList))
                break
            }
        }
    }
    return resultList
}

function textTokenize(tokenList) {
    let type = 'text'
    let children = contentTokenize(tokenList)
    return {
        type, children
    }
}

function contentTokenize(tokenList) {
    let resultList = []
    let value = ''
    while (tokenList.length) {
        let token = tokenList.pop()
        switch (token) {
            case '`': {
                if (value !== '') {
                    resultList.push({
                        type: 'text', value
                    })
                    value = ''
                }
                let isEnd = false
                while (tokenList.length) {
                    token = tokenList.pop()
                    if (token === '`') {
                        resultList.push({
                            type: 'strong',
                            value
                        })
                        value = ''
                        isEnd = true
                        break
                    }
                    value += token
                }
                if (isEnd) {
                    break
                }
                resultList.push({
                    type: 'text',
                    value: '`'
                })
                if (value !== '') {
                    resultList = [...resultList, ...contentTokenize(value.split('').reverse())]
                }
                value = ''
                break
            }
            case '*': {
                if (value !== '') {
                    resultList.push({
                        type: 'text', value
                    })
                    value = ''
                }

                type = 'italic'
                token = tokenList.pop()
                if (token === '*') {
                    type = 'bold'
                } else {
                    value += token
                }
                while (tokenList.length) {
                    token = tokenList.pop()
                    if (token !== '*') {
                        value += token
                        continue
                    }

                    if (type === 'italic') {
                        resultList.push({
                            type, value
                        })
                        value = ''
                        break
                    }

                    if (type === 'bold') {
                        token = tokenList.pop()
                        if (token !== '*') {
                            tokenList.push(token)
                            break
                        }
                        resultList.push({
                            type, value
                        })
                        value = ''
                        break
                    }
                }
                break
            }
            default: {
                value += token
            }
        }
    }

    if (value !== '') {
        resultList.push({
            type: 'text',
            value
        })
    }
    return resultList
}

module.exports = tokenize