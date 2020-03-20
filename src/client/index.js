/* eslint-disable */
//
// IMPORTS
//
// libraries

// app modules
import linkupRadar from './js/radar/linkupRadar'
import showAlert from './js/util/alert'
import { login, logout } from './js/user/login'
import changePassword from './js/user/userSettings'
import { createUser, deleteUser } from './js/admin/adminActions'

//
// RADAR MENU BUTTONS EVENT
//
const radarButtons = document.querySelectorAll('.radar')
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
// ADMIN MENU BUTTONS EVENT
//
const adminButtons = document.querySelectorAll('.admin')
if (adminButtons) {
    adminButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const route = event.target.getAttribute('route')
            window.location.assign(route)
        })
    })
}

//
// SHOW RADAR - CLIENT SIDE
//
const radarSection = document.getElementById('radar')
if (radarSection) {
    // 1) Select the root element of the radar section
    const radarRootDOM = d3.select('section#radar')

    // 2) Link up DOM elements with interactive JavaScript
    linkupRadar(radarRootDOM)
}

//
// Login form
//
const loginForm = document.getElementById('login-form')
if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault()
        const name = document.getElementById('name').value
        const password = document.getElementById('password').value
        login(name, password, document.referrer)
    })
}

//
// Logout
//
const logOutBtn = document.querySelector('.nav__el--logout')
if (logOutBtn) logOutBtn.addEventListener('click', logout)

//
// Change password
//
const passwordForm = document.getElementById('password-form')
if (passwordForm) {
    passwordForm.addEventListener('submit', async e => {
        e.preventDefault()
        document.querySelector('.btn--update-password').textContent = 'Updating...'

        const current = document.getElementById('current').value
        const newPass = document.getElementById('newPass').value
        const newConfirm = document.getElementById('newConfirm').value
        await changePassword(current, newPass, newConfirm)

        document.querySelector('.btn--update-password').textContent = 'Change password'
        document.getElementById('current').textContent = ''
        document.getElementById('newPass').textContent = ''
        document.getElementById('newConfirm').textContent = ''
    })
}

//
// Create user
//
const newUserForm = document.getElementById('new-user-form')
if (newUserForm) {
    newUserForm.addEventListener('submit', async e => {
        e.preventDefault()
        document.getElementById('btn--create-user').textContent = 'Updating...'

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirm = document.getElementById('confirm').value
        const role = document.getElementById('role').value
        await createUser(name, email, password, confirm, role, location.href)

        document.getElementById('btn--create-user').textContent = 'Create user'
        document.getElementById('name').textContent = ''
        document.getElementById('email').textContent = ''
        document.getElementById('password').textContent = ''
        document.getElementById('confirm').textContent = ''
    })
}

//
// DELETE USER BUTTON LIST
//
const deleteUserLinks = document.querySelectorAll('.delete-user')
if (deleteUserLinks) {
    deleteUserLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            await deleteUser(event.path[1].getAttribute('route'), location.href)
        })
    })
}

//
// DELETE USER BUTTON LIST
//
const editUserLinks = document.querySelectorAll('.edit-user')
if (editUserLinks) {
    editUserLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            await editUser(event.path[1].getAttribute('route'), location.href)
        })
    })
}

// show alerts sent by the server
const alertMsg = document.querySelector('body').dataset.alertmsg
const alertType = document.querySelector('body').dataset.alerttype
if (alertMsg && alertType) showAlert(alertType, alertMsg, 500)
