//
// IMPORTS
//
// libraries
const d3 = require('d3')
// app modules
const { calcAngles, calcRadii } = require('../../utils/myMaths')
const placeBlips = require('./blipPlacer')

//
// GLOBALS
//
const size = 2000

// plots the entire radar
exports.plotRadar = (root, data) => {
    // 1) calculate some base values
    // 56 = width of segment name, 2 = thickness of ring stroke
    const radius = (size - 2) / 2 - 56
    const numSegs = data.size
    const numRings = data.values().next().value.size

    const angles = calcAngles(numSegs)
    const radii = calcRadii(numSegs, numRings, radius)

    plotSegments(root, data, angles, radii)
}

const plotSegments = (root, data, angles, radii) => {
    const viewBox = `-${size / 2} -${size / 2} ${size} ${size}`
    const svg = root
        .select('.svg')
        .append('svg')
        .attr('viewBox', viewBox)

    // calc the blip diameter as half the difference between inner and outer
    // radii of the last ring (minus 2 for a blip stroke of 1)
    const blipDia = (radii.slice(-2).reduce((p, c) => c - p) - 2) / 2
    // loop through the segments
    let segIdx = 0
    for (const [seg, rings] of data.entries()) {
        // add a segment table to the tables
        root.select('.tables')
            .append('div')
            .attr('class', `segment-table segment-${segIdx}`)
            .append('h2')
            .text(seg)

        // add the segment group to the SVG
        // d3.select('.svg svg') // TODO refactor out svg with d3.selects
        const segGroup = svg
            .append('g')
            .attr('label', seg)
            .attr('class', `segment segment-${segIdx}`)
        let ringIdx = 0
        let lastPath
        // plot all the rings
        for (const [ring, blips] of rings.entries()) {
            lastPath = plotRing(root, ring, blips, segIdx, ringIdx++, angles, radii, blipDia)
        }
        // plot the segment name
        plotSegmentName(segGroup, seg, lastPath, segIdx)
        // plot the lines
        plotLines(segGroup, angles[segIdx], angles[segIdx + 1], radii[radii.length - 1])
        segIdx++
    }
}

const plotSegmentName = (group, name, lastPath, idx) => {
    // inject an ID into thering with the given ring index
    lastPath.attr('id', 'segment-label-' + idx)
    // now add the text path to the segment group
    group
        .append('text')
        .attr('dy', -20) // a y offset to not set directly on the arc
        .append('textPath') //append a textPath to the text element
        .attr('href', '#segment-label-' + idx) //place the ID of the path here
        .style('text-anchor', 'middle') //place the text halfway on the arc
        .attr('startOffset', '25%') // centered along the path
        .text(name)
        .style('font-size', '24px')
        .style('font-weight', 'bold')
}

const plotRing = (root, ringName, blips, segIdx, ringIdx, angles, radii, blipDia) => {
    // 1) Draw the arc
    const arc = d3
        .arc()
        .innerRadius(radii[ringIdx])
        .outerRadius(radii[ringIdx + 1])
        .startAngle(angles[segIdx])
        .endAngle(angles[segIdx + 1])

    // 2) select the graph's segment group, and
    //    the corresponding table element
    const segTableDiv = root.select(`.segment-table.segment-${segIdx}`)
    const segGroup = root.select(`g.segment.segment-${segIdx}`)

    // 3) Append the arc to the segment group
    const lastPath = segGroup.append('path')
    lastPath.attr('d', arc).attr('class', 'ring ring-' + ringIdx)

    // 4) Add the ring name to the table entry
    const ringDiv = segTableDiv.append('div').attr('class', `ring-table ring-${ringIdx}`)
    ringDiv.append('h3').text(ringName)
    ringDiv.append('ul')

    // 3) Add the blips
    placeBlips(blips, root, segIdx, ringIdx, {
        startA: angles[segIdx],
        endA: angles[segIdx + 1],
        innerR: radii[ringIdx],
        outerR: radii[ringIdx + 1],
        blipDia
    })

    // 4) Add a separator line to the third ring
    // HACK
    // TODO find a way to parametrise this
    if (ringIdx === 2) {
        segGroup
            .append('path')
            .attr(
                'd',
                d3
                    .arc()
                    .innerRadius(radii[ringIdx + 1])
                    .outerRadius(radii[ringIdx + 1])
                    .startAngle(angles[segIdx])
                    .endAngle(angles[segIdx + 1])
            )
            .attr('class', 'ring divider')
    }
    return lastPath
}

const plotLines = (group, startA, endA, radius) => {
    // lines always start at (0, 0)
    // SVG coordinate system is mirrored on x axis
    // hence we need to rotate by 90 degree, i.e.PI/2
    //to get the correct coordinates

    // line 1 endpoints
    const endX1 = radius * Math.cos(startA - Math.PI / 2)
    const endY1 = radius * Math.sin(startA - Math.PI / 2)

    // line 2 endpoints
    const endX2 = radius * Math.cos(endA - Math.PI / 2)
    const endY2 = radius * Math.sin(endA - Math.PI / 2)

    // drawing "left" line
    group
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', endX1)
        .attr('y2', endY1)
    // draw "right" line
    group
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', endX2)
        .attr('y2', endY2)
}
