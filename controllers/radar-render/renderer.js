//
// IMPORTS
//
// libraries
const d3 = require('d3')
// app modules
const { calcAngles, calcRadii } = require('../../utils/myMaths')
const { placeBlips } = require('./blipPlacer')

// plots the entire radar
exports.plotRadar = (svg, data, size) => {
    // 1) calculate some base values

    // 56 = width of segment name, 2 = thickness of ring stroke
    const radius = size / 2 - 56
    const numSegs = data.size
    const numRings = data.values().next().value.size

    const angles = calcAngles(numSegs)
    const radii = calcRadii(numSegs, numRings, radius)

    plotSegments(data, svg, angles, radii)
}

const plotSegments = (data, svg, angles, radii) => {
    // calc the blip diameter as half the difference between inner and outer
    // radii of the last ring (minus 2 for a blip stroke of 1)
    const blipDia = Math.abs(radii.slice(-2).reduce((p, c) => p - c)) - 2
    let segIdx = 0
    for (const [seg, rings] of data.entries()) {
        // add the segment group
        const segGroup = svg
            .append('g')
            .attr('label', seg)
            .attr('class', `segment segment-${segIdx}`)
        let ringIdx = 0
        let lastPath
        // plot all the rings
        for (const [ring, blips] of rings.entries()) {
            lastPath = plotRing(segGroup, blips, segIdx, ringIdx++, angles, radii, blipDia)
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
    lastPath.attr('id', '#segment-label-' + idx)
    // now add the text path to the segment group
    group
        .append('text')
        .attr('dy', -20) // a y offset to not set directly on the arc
        .append('textPath') //append a textPath to the text element
        .attr('href', '##segment-label-' + idx) //place the ID of the path here
        .style('text-anchor', 'middle') //place the text halfway on the arc
        .attr('startOffset', '25%') // centered along the path
        .text(name)
        .style('font-size', '36px')
        .style('font-weight', 'bold')
}

const plotRing = (segGroup, blips, segIdx, ringIdx, angles, radii, blipDia) => {
    // 1) Draw the arc
    const arc = d3
        .arc()
        .innerRadius(radii[ringIdx])
        .outerRadius(radii[ringIdx + 1])
        .startAngle(angles[segIdx])
        .endAngle(angles[segIdx + 1])

    // 2) Append the arc to the segment group
    const lastPath = segGroup.append('path')
    lastPath.attr('d', arc).attr('class', 'ring ring-' + ringIdx)

    // // 3) Add the blips
    // placeBlips(blips, segGroup, {
    //     startA: angles[segIdx],
    //     endA: angles[segIdx + 1],
    //     innerR: radii[ringIdx],
    //     outerR: radii[ringIdx],
    //     blipDia
    // })

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
