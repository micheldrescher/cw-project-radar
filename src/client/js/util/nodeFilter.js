// Test whether the element contains any of the given tags
const any = (node, filterTags) => {
    const tags = node.dataset.jrcTags.split(' ')
    if (filterTags.length == 0) return true
    return filterTags.map((t) => tags.includes(t)).reduce((p, c) => p || c)
}

const all = (node, filterTags) => {
    const tags = node.dataset.jrcTags.split(' ')
    if (filterTags.length == 0) return true
    return filterTags.map((t) => tags.includes(t)).reduce((p, c) => p && c)
}

const partition = (nodes, tags, func) => {
    let pass = [],
        fail = []
    nodes.forEach((n) => (func(n, tags) ? pass.push(n) : fail.push(n)))
    return [pass, fail]
}

//
// EXPORTS
//
module.exports = { any, all, partition }
