//
// IMPORTS
//
// libraries
const Chance = require('chance')
// modules
const AppError = require('../../utils/AppError')
const { toDegree, toRadian } = require('../../utils/myMaths')

//
// GLOBALS
//
const gradients = process.env.GRADIENTS.split(',') || [
    '#FF0000',
    '#FF8F00',
    '#FFFF00',
    '#BFFF00',
    '#00FF00'
]

//
// Place the blips in the given radar and tables
//
const placeBlips = (blips, root, segIdx, ringIdx, geom) => {
    // 1) Create a random number generator
    const chance = new Chance(Math.PI)

    // 2) Iterate through all blips (projects) and add to ring
    blips.sort((a, b) => a.cw_id - b.cw_id)
    const blipCoords = []
    blips.forEach(blip => {
        // 2.1 - add the blip to the table
        addTableEntry(blip, root, segIdx, ringIdx)
        // 2.2 - find coordinates and draw blip in radar
        const coords = findBlipCoords(blip, geom, blipCoords, chance)
        blipCoords.push(coords)
        drawBlip(blip, root, segIdx, coords, geom)
    })
}

const addTableEntry = (blip, root, segIdx, ringIdx) => {
    const ringList = root
        .select(`.segment-table.segment-${segIdx}`)
        .select(`.ring-table.ring-${ringIdx} > ul`)
    ringList
        .append('li')
        .append('div')
        .text(`${blip.cw_id}. ${blip.prj_name}`)

    //
    // TODO this is stuff to add items to the table
    // TODO stuff to make the radar interactive --> move clientside!
    // var blipListItem = ringList.append('li')
    // // var blipText = blip.number() + '. ' + blip.name() + (blip.quadrant() ? ('. - ' + blip.quadrant()) : '')
    // var blipText = blip.number() + '. ' + blip.name()
    // blipListItem
    //     .append('div')
    //     .attr('class', 'blip-list-item')
    //     .attr('id', 'blip-list-item-' + blip.number())
    //     .text(blipText)

    // var blipItemDescription = blipListItem
    //     .append('div')
    //     .attr('id', 'blip-description-' + blip.number())
    //     .attr('class', 'blip-item-description')

    // // add prose info to the blip
    // if (blip.title()) {
    //     blipItemDescription.append('p').html(blip.title())
    // }

    // var technoDiv = blipItemDescription.append('div').attr('class', 'techno')
    // if (blip.TRL() && blip.MRL()) {
    //     technoDiv.append('p').html(mtrl(blip.TRL(), blip.MRL()))
    // }
    // if (blip.type()) {
    //     technoDiv.append('p').html('Project type: <b>' + blip.type() + '</b>')
    // }
    // if (blip.teaser()) {
    //     blipItemDescription.append('p').html(blip.teaser())
    // }
    // // link to cyberwatching.eu webpage
    // if (blip.cwurl()) {
    //     blipItemDescription
    //         .append('p')
    //         .html('<a href="' + blip.cwurl() + '" target="_blank">More</a>')
    // }
}

const findBlipCoords = (blip, geom, allCoords, chance) => {
    // return pickCoords(blip, chance, geom)

    const maxIterations = 200
    let coordinates = pickCoords(blip, chance, geom)
    let iterationCounter = 0
    let foundAPlace = false

    while (iterationCounter < maxIterations) {
        if (thereIsCollision(geom.blipDia, coordinates, allCoords)) {
            coordinates = pickCoords(blip, chance, geom)
        } else {
            foundAPlace = true
            break
        }
        iterationCounter++
    }

    // if (!foundAPlace && blip.width > MIN_BLIP_WIDTH) {
    if (!foundAPlace) {
        // recurse with a smaller blip width
        geom.blipDia = geom.blipDia - 1
        return findBlipCoords(blip, geom, allCoords, chance)
    } else {
        return coordinates
    }
}

const pickCoords = (blip, chance, geom) => {
    const startA = toDegree(geom.startA)
    const endA = toDegree(geom.endA)
    // 1) Randomly select a radius for a blip that would render it
    //    within the ring's bounds
    //    Minimum radius must be greater than the diameter of the blip.
    //    (that works well for max 6 segments)
    var radius = chance.floating({
        min: Math.max(geom.blipDia, geom.innerR + geom.blipDia / 2),
        max: geom.outerR - geom.blipDia / 2
    })

    // 2) Randomly select a relative angle (from the start angle for
    // the blip that would render it within the ring's bounds
    // 2.1) Calculate the angle offsets to limit placement too close to the angle borders
    let delta = toDegree(Math.asin((geom.blipDia - 2) / radius))
    // edge case: if half the segment angle is larger than the blip diameter,
    // the set the angular offset to half the segment angle - effectively forcing
    // the blip to be placed in the middle
    delta = delta > (endA - startA) / 2 ? (endA - startA) / 2 : delta
    // 2.2) Pic a random angle between the allowed maximums
    var angle = chance.floating({
        min: startA + delta,
        max: endA - delta
    })

    // STEP 3 - Translate polar coordinates into cartesian coordinates (while respecting
    // the inverted y axis of computer graphics)
    var x = radius * Math.cos(toRadian(angle - 90))
    var y = radius * Math.sin(toRadian(angle - 90))

    return [x, y]
}

const thereIsCollision = (blipWidth, coords, allCoords) => {
    return allCoords.some(
        currCoords =>
            Math.abs(currCoords[0] - coords[0]) < blipWidth &&
            Math.abs(currCoords[1] - coords[1]) < blipWidth
    )
}

const drawBlip = (blip, root, segIdx, coords, geom) => {
    var x = coords[0]
    var y = coords[1]

    // 1) A blip is a group of a circle and a number (as text)
    const blipGroup = root
        .select(`g.segment.segment-${segIdx}`)
        .append('g')
        .attr('class', 'blip')
        .attr('id', `blip-${blip.cw_id}`)
        .attr('transform', `translate(${x}, ${y})`)
        .attr('label', `${blip.cw_id}. ${blip.prj_name}`)

    // 2) Add the circle to the blup group
    const colour = arcColour(blip)
    blipGroup
        .append('circle')
        .attr('r', geom.blipDia * 0.4)
        .attr('fill', 'white')
        .attr('stroke-width', colour === '#000000' ? 2 : 4)
        .attr('stroke', colour)

    // 4) Add the text - the blip's cw-id - to the group
    blipGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .attr('dominant-baseline', 'central')
        .style('font-weight', '700')
        .style('pointer-events', 'none')
        .text(blip.cw_id)
}

const arcColour = blip => {
    // 0) If there is no score, return black
    if (!blip.score) return '#000000'

    // 1) Gradients array must have odd number of elements
    if (gradients.length % 2 != 1) {
        throw new AppError('gradients configuration must have an odd number of gradients!', 500)
    }

    // 2) Return the performance gradient colour relative to min, max, and number of gradients defined
    // chunk size is the number range for each gradient entry
    var chunkSize = (blip.max - blip.min) / gradients.length
    // now calculate the index
    var idx =
        chunkSize === 0 // no discernible differentiation possible!!!
            ? Math.floor(gradients.length / 2) // --> Use middle gradient
            : Math.floor((blip.performance - blip.min) / chunkSize) // otherwise calculate the gradient
    // need to ensure we are not above gradient length
    idx = idx === gradients.length ? gradients.length - 1 : idx

    return gradients[idx]
}

//
// EXPORTS
//
module.exports = placeBlips
