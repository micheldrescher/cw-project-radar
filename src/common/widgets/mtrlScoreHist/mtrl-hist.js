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
class MTRLHist extends HTMLElement {
    /*
     * STYLE
     */
    style = `
<style>
    :host > div {
        display: grid;
        grid-template-columns: max-content 1fr;
        margin: 3em;
        min-width: 40vw;
    }

    :host > div > div:nth-child(1),
    :host > div > div:nth-child(2) {
        padding-top: 0.5em;
    }
    :host > div > div:last-child {
        padding-bottom: 0.5em;
    }

    :host > div > div.scoreDate {
        text-align: right;
        border-right: .2em solid lightgray;
        padding-right: 1em;
    }

    :host > div > .scoreData {
        padding-left: 1em;
        padding-bottom: 2em;
    }

    :host > div > .scoreData > div:nth-child(1),
    :host > div > .scoreData > div:nth-child(2),
    :host > div > .scoreData > div:nth-child(3) {
        display: inline-block;
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

        scores.forEach((score) => this.addScore(result, score))

        // ?) return result
        return result
    }

    addScore = (result, score) => {
        this.addDate(result, score.scoringDate)
        this.addMTRL(result, score.mrl, score.trl, score.description)
    }

    addDate = (result, date) => {
        const cell = document.createElement('div')
        cell.classList.add('scoreDate')
        cell.innerHTML = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        result.appendChild(cell)
    }

    addMTRL = (result, mrl, trl, descr) => {
        const cell = document.createElement('div')
        cell.classList.add('scoreData')
        const mrlDiv = document.createElement('div')
        mrlDiv.innerHTML = `<span>MRL: </span><span>${mrl}</span>`
        cell.appendChild(mrlDiv)
        const dashDiv = document.createElement('div')
        dashDiv.innerHTML = '&ndash;'
        cell.appendChild(dashDiv)
        const trlDiv = document.createElement('div')
        trlDiv.innerHTML = `<span>TRL: </span><span>${trl}</span>`
        cell.appendChild(trlDiv)
        if (descr) {
            const descrDiv = document.createElement('div')
            descrDiv.innerHTML = descr
            cell.appendChild(descrDiv)
        }
        result.appendChild(cell)
    }
}

module.exports = { MTRLHist }
