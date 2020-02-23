//
// IMPORTS
//
// libraries
const d3 = require('d3')
// app modules
const { toRadian } = require('../../utils/myMaths')

// plots the entire radar
exports.plotRadar = (svg, data, size) => {
    // 1) calculate some base values

    const radius = size / 2 - 56
    const theta = toRadian(360 / data.size)
    const numRings = data.values().next().value.size
    const segArea = 0.5 * theta * Math.pow(radius, 2)
    const ringArea = segArea / numRings

    const opts = {
        radius,
        theta,
        ringArea
    }
    plotSegments(data, svg, opts)
}

const plotSegments = (data, svg, opts) => {
    let startA = 0
    let segIdx = 0
    for (const [seg, rings] of data.entries()) {
        // add the segment group
        const segGroup = svg.append('g').attr('class', `segment segment-${segIdx++}`)
        // calc angles and radii
        let endA = startA + opts.theta
        let innerR = 0
        let ringIdx = 0
        let lastPath
        // plot all the rings
        for (const [ring, blips] of rings.entries()) {
            const outerR = Math.round(
                Math.sqrt((2 / opts.theta) * opts.ringArea + Math.pow(innerR, 2))
            )
            lastPath = plotRing(segGroup, ringIdx++, innerR, outerR, startA, endA)
            innerR = outerR
        }
        // plot the segment name
        plotSegmentName(segGroup, seg, lastPath, segIdx)
        // plot the lines
        plotLines(segGroup, startA, endA, opts.radius)
        // shift angles
        startA = endA
    }
    //
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

const plotRing = (group, idx, innerR, outerR, startA, endA) => {
    const arc = d3
        .arc()
        .innerRadius(innerR)
        .outerRadius(outerR)
        .startAngle(startA)
        .endAngle(endA)
    const lastPath = group.append('path')
    lastPath.attr('d', arc).attr('class', 'ring ring-' + idx)
    // HACK
    // TODO find a way to parametrise this
    if (idx === 2) {
        group
            .append('path')
            .attr(
                'd',
                d3
                    .arc()
                    .innerRadius(outerR)
                    .outerRadius(outerR)
                    .startAngle(startA)
                    .endAngle(endA)
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

//     // for the last ring, add a text that follows the path
//     // if (i === 4) {
//     //   quadrantGroup.append('text')
//     //     .attr('dy', -10)      // a y offset to not set directly on the arc
//     //     .append('textPath') //append a textPath to the text element
//     //     .attr('xlink:href', '#text-path-'+quadrant.order) //place the ID of the path here
//     //     .style("text-anchor","middle") //place the text halfway on the arc
//     //     .attr("startOffset", "25%")   // centered along the path
//     //     .text(quadrant.label);
//     // }
// })
