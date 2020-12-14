//
// IMPORTS
//
//Libraries
import { SVG } from '@svgdotjs/svg.js'
// App modules
import { scale } from '../../util/maths'

/*
 * WEB COMPONENT
 */
class MTRLGraph extends HTMLElement {
    /*
     * STYLE
     */
    style = `
<style>
    :host div {
        margin: auto;
        width: 60%;
    }

    :host svg > g#mtrl-coords {
        stroke-width: 3;
        stroke: black;
    }

    :host svg > g#mtrl-coords text {
        font-size: 1.5em;
        stroke-width: 1;
        text-anchor: middle;
    }

    :host svg > g#mtrl-coords text#x-label {
        font-size: 2em;
        stroke-width: 2;
        text-anchor: end;
    }

    :host svg > g#scores > circle {
        fill: blue;
    }

    :host svg > g#scores > polyline {
        fill: none;
        stroke: blue;
        stroke-width: 2;
    }
</style>
`
    /*
     * TEMPLATE
     */
    tpl = ``

    /*
     * CONSTRUCTOR
     */
    constructor() {
        super()
        const template = document.createElement('template')
        template.innerHTML = this.style + this.tpl

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        // get the attributes sorted
        const scores = this.hasAttribute('data-scores')
            ? JSON.parse(this.getAttribute('data-scores'))
            : undefined

        // build and attach the DOM
        this.shadowRoot.appendChild(this.buildDOM(scores))
    }

    buildDOM = (scores) => {
        const result = document.createElement('div')
        // no score scale if no score in project
        if (!scores) return result

        // define the aspect ratio
        const unitX = 120
        const unitY = 40
        // create the SVG and the base group
        const svg = SVG().attr({
            viewBox: `-${unitX} -${10 * unitY} ${11 * unitX} ${11 * unitY}`,
        })

        // 1) build the coordinate system
        this.buildCoordinates(svg, unitX, unitY)

        // 2) add the scores
        this.addScores(svg, scores, unitX, unitY)

        // ?) return result
        result.innerHTML = svg.svg()
        return result
    }

    buildCoordinates = (svg, unitX, unitY) => {
        // 0) Make a group for the coordinates
        const group = svg.group().attr({ id: 'mtrl-coords' })
        // 1) Add the x-axis
        // horizontal line
        group.line(0, 0, 9 * unitX, 0)
        // add the score lines
        for (let i = 0; i < 9; i++) {
            group.line(i * unitX, 0, i * unitX, 15)
        }
        // and arrowhead
        group.polygon(
            `${9 * unitX}, 0, ${9 * unitX - 30}, -10, ${9 * unitX - 20}, 0, ${9 * unitX - 30}, 10`
        )
        // add the numbers
        for (let i = 0; i < 9; i++) {
            group.text(`${i + 1}`).attr({ x: i * unitX, y: 40 })
        }
        // add the axis title
        group.text('MRL').attr({ x: 9 * unitX, y: 40, id: 'x-label' })

        // 2) Add the y-axis
        // vertical line
        group.line(0, 0, 0, -9 * unitY)
        // add the score lines
        for (let i = 0; i < 9; i++) {
            group.line(0, -i * unitY, -15, -i * unitY)
        }
        // and arrowhead
        group.polygon(
            `0, ${-9 * unitY}, -10, ${-9 * unitY + 30}, 0, ${-9 * unitY + 20}, 10, ${
                -9 * unitY + 30
            }`
        )
        // add the numbers
        for (let i = 0; i < 9; i++) {
            group.text(`${i + 1}`).attr({ x: -30, y: -i * unitY + 10 })
        }
        // add the axis title
        group.text('TRL').attr({ x: -25, y: -9 * unitY + 25, id: 'x-label' })
    }

    addScores = (svg, scores, unitX, unitY) => {
        const radius = 10
        const group = svg.group().attr({ id: 'scores' })
        let polygonStr = ''
        for (let i = 0; i < scores.length; i++) {
            const score = scores[i]
            // add the dots
            group
                .circle(2 * radius)
                .x((score.mrl - 1) * unitX - radius)
                .y(-unitY * (score.trl - 1) - radius)
            // add coordinates to polygon string
            if (i > 0) polygonStr += ' '
            polygonStr += `${(score.mrl - 1) * unitX}, ${-unitY * (score.trl - 1)}`
            // add dashed lines to the axes
            group
                .line((score.mrl - 1) * unitX, -unitY * (score.trl - 1), (score.mrl - 1) * unitX, 0)
                .attr({ stroke: 'darkGray', 'stroke-width': 2, 'stroke-dasharray': '3' })
            group
                .line(
                    (score.mrl - 1) * unitX,
                    -unitY * (score.trl - 1),
                    0,
                    -unitY * (score.trl - 1)
                )
                .attr({ stroke: 'darkGray', 'stroke-width': 2, 'stroke-dasharray': '3' })
        }
        group.polyline(polygonStr)
    }
}

module.exports = { MTRLGraph }
