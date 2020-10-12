/*
 * WEB COMPONENT
 */
class RadarCoordinates extends HTMLElement {
    style = `
<style>
    :host {
        display: grid;
        grid-template-columns: auto auto;
        width: fit-content;
        margin: 1em;
    }
    :host > * {
        margin: auto 0;
        vertical-align: middle;
    }
    :host > .name {
        text-align: right;
        padding-right: 0.5em;
        font-size: 0.8em;
        color: darkgray;
    }
</style>
`
    tpl = `
<div class="name">Segment:</div><div class="value"><slot name="segment"></slot></div>
<div class="name">Ring:</div><div class="value"><slot name="ring"></slot></div>
`
    //
    // <div id="radar-position">
    //     <div class="name">Segment:</div><div class="value">Secure Systems</div>
    //     <div class="name">Ring:</div><div class="value">Hold</div>
    // </div>
    //

    /*
     * TEMPLATE
     */

    constructor() {
        super()
        const template = document.createElement('template')
        template.innerHTML = this.style + this.tpl

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

module.exports = { RadarCoordinates }
