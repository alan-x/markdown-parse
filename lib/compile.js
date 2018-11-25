function compile(tokenList) {
    tokenList = tokenList.reverse()
    let resultList = []
    while (tokenList.length) {
        let token = tokenList.pop()
        switch (token.type) {
            case 'title': {
                let content = token.children.map((type, value) => {
                    if (type === 'text') {
                        return value
                    }
                }).join('')
                resultList.push({
                    ...token,
                    html: `<h${token.level}>${content}</h${token.level}>`
                })
                break
            }
            case 'multiple_code': {
                let content = token.children.map(text => `<p>${text}</p>`)
                resultList.push({
                    ...token,
                    html: `<div>${content}</div>`
                })
                break
            }

        }
    }
    return resultList
}

module.exports = compile