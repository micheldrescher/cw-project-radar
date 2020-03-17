/* eslint-disable */
//
// IMPORTS
//
// libraries

// app modules
import linkupRadar from './js/radar/linkupRadar'
import showAlert from './js/util/alert'

// import { displayMap } from './mapbox'
// import { login, logout } from './login'
// import { updateSettings } from './updateSettings'
// import { bookTour } from './stripe'

// DOM ELEMENTS
const radarButtons = document.querySelectorAll('.radar')
const radarSection = document.getElementById('radar')

//
// RADAR MENU BUTTONS EVENT
//
if (radarButtons) {
    radarButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const slug = event.target.getAttribute('radar')
            window.location.assign(`/radar/${slug}`)
        })
    })
}

//
// SHOW RADAR - CLIENT SIDE
//
if (radarSection) {
    // 1) Select the root element of the radar section
    const radarRootDOM = d3.select('section#radar')

    // 2) Link up DOM elements with interactive JavaScript
    linkupRadar(radarRootDOM)
}

// if (mapBox) {
//     const locations = JSON.parse(mapBox.dataset.locations)
//     displayMap(locations)
// }

// if (loginForm)
//     loginForm.addEventListener('submit', e => {
//         e.preventDefault()
//         const email = document.getElementById('email').value
//         const password = document.getElementById('password').value
//         login(email, password)
//     })

// if (logOutBtn) logOutBtn.addEventListener('click', logout)

// if (userDataForm)
//     userDataForm.addEventListener('submit', e => {
//         e.preventDefault()
//         const form = new FormData()
//         form.append('name', document.getElementById('name').value)
//         form.append('email', document.getElementById('email').value)
//         form.append('photo', document.getElementById('photo').files[0])

//         updateSettings(form, 'data')
//     })

// if (userPasswordForm)
//     userPasswordForm.addEventListener('submit', async e => {
//         e.preventDefault()
//         document.querySelector('.btn--save-password').textContent = 'Updating...'

//         const passwordCurrent = document.getElementById('password-current').value
//         const password = document.getElementById('password').value
//         const passwordConfirm = document.getElementById('password-confirm').value
//         await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password')

//         document.querySelector('.btn--save-password').textContent = 'Save password'
//         document.getElementById('password-current').value = ''
//         document.getElementById('password').value = ''
//         document.getElementById('password-confirm').value = ''
//     })

// if (bookBtn)
//     bookBtn.addEventListener('click', e => {
//         e.target.textContent = 'Processing...'
//         const { tourId } = e.target.dataset
//         bookTour(tourId)
//     })

// show alerts sent by the server
const alertMsg = document.querySelector('body').dataset.alertmsg
const alertType = document.querySelector('body').dataset.alerttype
if (alertMsg && alertType) showAlert(alertType, alertMsg, 500)
