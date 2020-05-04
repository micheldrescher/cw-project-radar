//
// IMPORTS
//
// libraries
// app modules

//
// EXPORTS
//
export { filterProjects as default }

//
// FUNCTIONS
//
const filterProjects = filterSet => {
    // 1) Get all blips
    const allBlips = document.querySelectorAll('g.blip')

    // 2) Get blips of the first filterset
    const visibleBlips = filterByOneSet(filterSet)

    // // 3) Hide all blips, then show all visible blips again
    allBlips.forEach(b => b.setAttribute('display', 'none'))
    visibleBlips.forEach(b => b.setAttribute('display', 'inherit'))
}

const filterByOneSet = filterSet => {
    // undefined or empty filterset return *all* blips!!!
    if (!filterSet || filterSet.length === 0) {
        return document.querySelectorAll('g.blip')
    }
    // build the query particles
    const queryParts = []
    filterSet.forEach(term => {
        queryParts.push(`g.blip[tags~='${term}']`)
    })
    return document.querySelectorAll(queryParts.join(','))
}
