/*
 * WEB COMPONENT
 */
class SimpleMetric extends HTMLElement {
    style = `
<style>
    simple-metric {
        width: fit-content;
        height: fit-content;
        padding: 0.2em 0;
    }
    .key {
        text-align: center;
        font-size: 0.8em;
        color: darkgray;
    }
    .value {
        text-align: center;
        font-weight: bold;
        color: black;
    }
</style>
`
    tpl = `
<div class="key"><slot name="key"></slot></div>
<div class="value"><slot name="value"></slot></div>
`
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

module.exports = { SimpleMetric }
