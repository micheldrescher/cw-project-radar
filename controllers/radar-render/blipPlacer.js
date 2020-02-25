//
// IMPORTS
//
// libraries
const Chance = require('chance')
// modules
const { toDegree, toRadian } = require('../../utils/myMaths')
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

    // var mouseOver = function() {
    //     d3.selectAll('g.blip-link').attr('opacity', 0.3)
    //     group.attr('opacity', 1.0)
    //     blipListItem.selectAll('.blip-list-item').classed('highlight', true)
    //     tip.show(blip.name(), group.node())
    // }

    // var mouseOut = function() {
    //     d3.selectAll('g.blip-link').attr('opacity', 1.0)
    //     blipListItem.selectAll('.blip-list-item').classed('highlight', false)
    //     tip.hide()
    //         .style('left', 0)
    //         .style('top', 0)
    // }

    // blipListItem.on('mouseover', mouseOver).on('mouseout', mouseOut)
    // group.on('mouseover', mouseOver).on('mouseout', mouseOut)

    // var clickBlip = function() {
    //     d3.select('.blip-item-description.expanded').node() !== blipItemDescription.node() &&
    //         d3.select('.blip-item-description.expanded').classed('expanded', false)
    //     blipItemDescription.classed('expanded', !blipItemDescription.classed('expanded'))

    //     blipItemDescription.on('click', function() {
    //         d3.event.stopPropagation()
    //     })
    // }

    // blipListItem.on('click', clickBlip)
}

const findBlipCoords = (blip, geom, allCoords, chance) => {
    return pickCoords(blip, chance, geom)
    // const maxIterations = 200
    // var coordinates = pickCoords(blip, chance, geom)
    // var iterationCounter = 0
    // var foundAPlace = false

    // while (iterationCounter < maxIterations) {
    //     if (thereIsCollision(blip, coordinates, allCoords)) {
    //         coordinates = pickCoords(blip, chance, minRadius, maxRadius, startAngle)
    //     } else {
    //         foundAPlace = true
    //         break
    //     }
    //     iterationCounter++
    // }

    // if (!foundAPlace && blip.width > MIN_BLIP_WIDTH) {
    //     blip.width = blip.width - 1
    //     return findBlipCoordinates(blip, minRadius, maxRadius, startAngle, allBlipCoordinatesInRing)
    // } else {
    //     return coordinates
    // }
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

function drawBlip(blip, root, segIdx, coords, geom) {
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
    blipGroup
        .append('circle')
        .attr('r', geom.blipDia * 0.4)
        .attr('fill', 'white')
        .attr('stroke-width', '2')
        .attr('stroke', 'black')

    // 3) Add the text - the blip's cw-id - to the group
    blipGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'central')
        .attr('dominant-baseline', 'central')
        .style('font-weight', '700')
        .text(blip.cw_id)
}

//
// EXPORTS
//
module.exports = placeBlips
