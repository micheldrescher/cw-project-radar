// IMPORTS
//
//Libraries
import { SVG } from '@svgdotjs/svg.js'
// App modules
import { equiDistantRadii, equiSpatialRadii } from './../../util/maths'
import { ringSegment } from '../../util/svg'

/*
 * WEB COMPONENT
 */
class RadarLocation extends HTMLElement {
    /*
     * STYLE
     */
    style = `
<style>
    :host {
        margin: 1em;
    }
    svg {
        height: 4em;
        width: 4em;
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
        const attrs = this.getAttributes()

        // build and attach the DOM
        this.buildDOM(this.shadowRoot, attrs)
    }

    getAttributes = () => {
        return {
            numSegs: Number.parseInt(this.getAttribute('numSegments')) || 6,
            numRings: Number.parseInt(this.getAttribute('numRings')) || 5,
            segIdx: Number.parseInt(this.getAttribute('segIdx')) || 0,
            ringIdx: Number.parseInt(this.getAttribute('ringIdx')) || 0,
            radiiFunc: this.checkMode(this.getAttribute('mode')),
        }
    }

    checkMode = (m) => {
        if (m !== 'distance' || m !== 'area') m = 'distance'

        if (m === 'distance') return equiDistantRadii
        return equiSpatialRadii
    }

    buildDOM = (host, attrs) => {
        // create the SVG
        const svg = SVG().addTo(host).attr({
            viewBox: '0 0 102 102',
        })
        // add the rings
        const radii = attrs.radiiFunc(attrs.numSegs, attrs.numRings, 50)
        radii.forEach((r) => {
            svg.circle().center(51, 51).radius(r).stroke('black').fill('none').attr({
                'stroke-width': '1px',
            })
        })
        // add the lines
        const angle = 360 / attrs.numSegs
        for (let i = 0; i < attrs.numSegs; i++) {
            svg.line(51, 51, 51, 1)
                .stroke({ color: 'black', width: 1, linecap: 'square' })
                .rotate(angle * i, 51, 51)
        }
        // finally, th black ring segment where the project is licated
        const width = radii[attrs.ringIdx + 1] - radii[attrs.ringIdx]
        const radius = radii[attrs.ringIdx] + width / 2
        svg.add(
            ringSegment({
                x: 51,
                y: 51,
                radius,
                startAngle: angle * attrs.segIdx,
                angle,
                width,
            })
        )
    }
}

module.exports = { RadarLocation }
