/*
 * WEB COMPONENT
 */
class Flickerbox extends HTMLElement {
    style = `
<style>
    :host {
        width: 38px;
        height: 20px;
        border: 1px solid darkgray;
        background: lightgray;
        border-radius: 10px;
    }
    :host(.active) {
        background: #1c75bc;
    }
    :host > div {
        box-sizing: border-box;
        width: 50%;
        height: 100%;
        background-color: white;
        border:  1px solid black;
        transform: translate(18px, 0px);
        transition: 0.3s;
        border-radius: 10px;
    }
    :host(.active) > div {
        transition: 0.3s;
        transform: translate(0px, 0px);
    }
    </style>
    `
    //      :host { transform: scale(0.5); }
    //      :host > div:disabled {  }

    tpl = `
<div></div>
`

    constructor() {
        super()

        const template = document.createElement('template')
        template.innerHTML = this.style + this.tpl

        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.addEventListener('click', (e) => {
            this.classList.toggle('active')
        })
    }

    /*
     * TEMPLATE
     */
}

module.exports = { Flickerbox }
