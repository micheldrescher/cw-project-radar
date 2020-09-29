//
// IMPORTS
//
//Libraries
import { SVG } from '@svgdotjs/svg.js'
// App modules
import { scale } from './maths'

//
// FUNCTIONS
//

//
// Create an SVG detailing a project's position on its ring's performance scale
//
const createMTRLPerfScale = (score, performance, min, max) => {
    // no score scale if no score in project
    if (!score) return undefined

    // create the SVG and the base group
    const svg = SVG().attr({
        viewBox: '-25 -20 500 50',
    })

    // if only one score, or all scores with the same value
    if (min === max && min === 0) {
        svg.text('Not enough data available.').y(0).x(225)
        return svg.svg()
    }

    // prepare scale & labels
    const scaler = scale(0, 450).range(min, max)
    const values = [min, 0, max] // note that the median is always 0!
    const labels = ['' + min, 'median', '' + max]

    // add the base line
    svg.line(0, 0, 450, 0)
    // append the vertical scale lines and its labels
    values.forEach((v, i) => {
        // line
        svg.line(scaler(v), 0, scaler(v), 10)
        // label
        svg.text(labels[i]).attr({
            x: scaler(v),
            y: 25,
        })
    })
    // add the project performance line
    const x = scaler(performance)
    svg.line(x, 0, x, -15).attr('id', 'perf')
    // add the labels
    return svg.svg()
}

//
// EXPORTS
//
module.exports = { createMTRLPerfScale }
