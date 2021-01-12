/*
 * WEB COMPONENT
 */
class SimpleMetric extends HTMLElement {
    style = `
<style>
    :host {
        display: flex;
        flex-direction: column;
    }
    .key {
        text-align: center;
        font-size: 0.8em;
        color: darkgray;
    }
    .value {
        font-weight: bold;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
`
    tpl = `
<div class="key"><slot name="key" part="key-slot"></slot></div>
<div class="value"><slot name="value" part="value-slot"></slot></div>
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
