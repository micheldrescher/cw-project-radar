/*
 * WEB COMPONENT
 */
class SDLCPosition extends HTMLElement {
    /*
     * STYLE
     */
    style = `
:host {
    margin: 1em;
    display: flex;
    justify-content: center;
}
:host > .current {
    color: black;
    font-weight: bold;
}
:host > * {
    flex: 0 1 0px;
    border: none;
    margin-right: 0.5em;
    font-size: 0.8em;
    color: darkgray;
}
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
        this.attachShadow({ mode: 'open' })
        // create and attach style
        const s = document.createElement('style')
        s.textContent = this.style
        this.shadowRoot.appendChild(s)

        // get the attributes sorted
        const phases = this.hasAttribute('phases') ? JSON.parse(this.getAttribute('phases')) : []
        const phase = this.hasAttribute('phase') ? this.getAttribute('phase') : ''

        // build and attach the DOM
        this.buildDOM(this.shadowRoot, phases, phase)
    }

    buildDOM = (host, phases, phase) => {
        const dom = []
        for (let i=0; i < phases.length; i++) {
            // little triangle between phases
            if (i != 0) {
                const tri = document.createElement('div')
                tri.textContent = '▸'
                host.appendChild(tri)
            }
            // The phase
            const ph = document.createElement('div')
            ph.textContent = phases[i]
            host.appendChild(ph)
            // mark the phase as current
            if (phases[i] === phase) {
                ph.classList.add('current')
            }
        }
        return dom
    }
}

module.exports = { SDLCPosition }
