export function makeTabData(i) {
    return {
        index: i + 1,
        id: `tab${i + 1}`,
        title: `Tab ${i + 1}`,
        content: `Tab ${i + 1} Content`,
    }
}

export function makeData(n) {
    let data = []
    for (let i = 0; i < n; i++) {
        data.push(makeTabData(i))
    }

    return data
}
