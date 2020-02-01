/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const hideAlert = () => {
    const el = document.querySelector('.alerts')
    if (el) el.parentElement.removeChild(el)
}

// type is 'success', 'warning' or 'error'
const showAlert = (type, msg, time = 7) => {
    hideAlert()
    const markup = `<div class="alerts"><div class="alert alert--${type}">${msg}</div></div>`
    document.querySelector('main').insertAdjacentHTML('afterbegin', markup)
    window.setTimeout(hideAlert, time * 1000)
}

module.exports = showAlert
