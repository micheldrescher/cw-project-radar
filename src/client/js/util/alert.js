const hideAlert = () => {
    const el = document.querySelector('.alert')
    if (el) el.parentElement.removeChild(el)
}

// type is 'success', 'warning' or 'error'
const showAlert = (type, msg, time = 7) => {
    hideAlert()
    const markup = `<div class="alert alert--${type}">${msg}</div>`
    document.querySelector('#alerts').insertAdjacentHTML('afterbegin', markup)
    window.setTimeout(hideAlert, time * 1000)
}

module.exports = showAlert
