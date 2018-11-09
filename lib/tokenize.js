function tokenize(input) {
    let tokenList = input.split('').reverse()
    let resultList = []
    while (tokenList.length) {
        let token = tokenList.pop()

        let value = ''
        let type = ''
        let level = 0

        if (token.match('#')) {
            type = 'title'
            level = 1
            let isEnd = false
            while (tokenList.length) {
                token = tokenList.pop()

                if (token.match('#') && !isEnd) {
                    level++
                    continue
                }
                isEnd = true
                value += token

                if (token.match('\n') || tokenList.length === 0) {
                    resultList.push({
                        type, level, value
                    })
                }

            }
        }
    }
    return resultList
}

module.exports = tokenize