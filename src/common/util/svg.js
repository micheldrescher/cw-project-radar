//
// IMPORTS
//
//Libraries
import { SVG } from '@svgdotjs/svg.js'
// App modules
import { scale } from './maths'

//
// module vars
//
const offserPerDegree = -0.002777778

//
// FUNCTIONS
//
const ringSegment = ({
    x = 0,
    y = 0,
    radius = 10,
    startAngle = 90,
    angle = 360,
    width = 1,
    colour = 'black',
}) => {
    // calc some trig varlues
    const circumference = 2 * Math.PI * radius
    const dashLen = (angle / 360) * circumference
    const dashPause = circumference - dashLen
    const offset = circumference * offserPerDegree * (startAngle - 90)
    // create the circle
    const circle = SVG()
        .circle()
        .center(x, y)
        .radius(radius)
        .attr('stroke-dasharray', `${dashLen}, ${dashPause}`)
        .attr('stroke-dashoffset', `${offset}`)
        .attr('stroke-width', width)
        .attr('stroke', `${colour}`)
        .fill('none')

    return circle
}

//
// EXPORTS
//
module.exports = { ringSegment }
