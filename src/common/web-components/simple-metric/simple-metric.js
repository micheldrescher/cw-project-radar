module.exports = { SimpleMetric }

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
customElements.define('simple-metric', SimpleMetric)

/*
 * DEFINE ELEMENT
 */

// <style>
//     :host {
//         display: inline-block;
//         position: relative;
//         cursor: default;
//     }

//     :host(:focus) {
//         outline: 0;
//     }

//     :host(:focus)::before {
//         box-shadow: 0 0 1px 2px #5b9dd9;
//     }

//     :host::before {
//         content: '';
//         display: block;
//         width: 10px;
//         height: 10px;
//         border: 1px solid black;
//         position: absolute;
//         left: -18px;
//         top: 3px;
//         border-radius: 50%;
//     }

//     :host([aria-checked='true'])::before {
//         background: red;
//     }
// </style>
// ` // do something with foo here foo // ;<template id="simple=metric">
//     // <style></style> //
//     <div class="metric">
//         //
//         <div class="key"></div>
//         //
//         <div class="value"></div>
//         //
//     </div>
//     //
// </template>
// }
