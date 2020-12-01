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
class MTRLPerformance extends HTMLElement {
    /*
     * STYLE
     */
    style = `
<style>
    :host line {
        stroke: black;
        stroke-width: 2;
        stroke-linecap: square;
    }
    :host line#perf {
        stroke: red;
    }
    :host text {
        text-anchor: middle;
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
        const score = this.hasAttribute('score') ? Number(this.getAttribute('score')) : 0
        const performance = this.hasAttribute('performance')
            ? Number(this.getAttribute('performance'))
            : 0
        const min = this.hasAttribute('min') ? Number(this.getAttribute('min')) : -10
        const max = this.hasAttribute('max') ? Number(this.getAttribute('max')) : 10

        // build and attach the DOM
        this.shadowRoot.appendChild(this.buildDOM(score, performance, min, max))
    }

    buildDOM = (score, performance, min, max) => {
        const result = document.createElement('div')

        // no score scale if no score in project
        if (!score) return result

        // create the SVG and the base group
        const svg = SVG().attr({
            viewBox: '-25 -40 500 80',
        })

        // if only one score, or all scores with the same value
        if (min === max && min === 0) {
            svg.text('Not enough data available.').y(0).x(225)
            result.innerHTML = svg.svg()
            return result
        }

        // prepare scale & labels
        const scaler = scale(0, 450).range(min, max)
        const values = [min, max] // note that the median is always 0!
        const labels = ['' + min, '' + max]

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
        // add the median
        svg.line(scaler(0), 0, scaler(0), -10)
        svg.text('median').attr({ x: scaler(0), y: -20 })

        // add the project performance line
        const x = scaler(performance)
        svg.line(x, 0, x, -15).attr('id', 'perf')

        // return result
        result.innerHTML = svg.svg()
        return result
    }
}

module.exports = { MTRLPerformance }
