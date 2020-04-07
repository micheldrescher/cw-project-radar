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
import {
    createUser,
    deleteUser,
    updateUsersDetails,
    updateUsersPassword
} from './js/admin/userActions'
import { createRadar, updateRadar, deleteRadar, advanceRadar } from './js/admin/radarActions'
import {
    createProject,
    deleteProject,
    updateProject,
    importProjects
} from './js/admin/projectActions'

//
// RADAR MENU BUTTONS EVENT
//
const radarButtons = document.querySelectorAll('.radar')
if (radarButtons) {
    radarButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault()
            const slug = event.target.getAttribute('radar')
            location.assign(`/radar/${slug}`)
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
            location.assign(route)
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
// DELETE USER LINKS
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
// EDIT USER LINKS
//
const editUserLinks = document.querySelectorAll('.edit-user')
if (editUserLinks) {
    editUserLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            location.assign(event.path[1].getAttribute('route'))
        })
    })
}

//
// UPDATE USER'S DETAILS BUTTON
//
const updateUserDetailsForm = document.getElementById('edit-user-form')
if (updateUserDetailsForm) {
    updateUserDetailsForm.addEventListener('submit', async event => {
        event.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const role = document.getElementById('role').value
        const id = document.getElementById('userid').value
        await updateUsersDetails(name, email, role, id)
    })
}

//
// UPDATE USER'S PASSWORD BUTTON
//
const setUserPasswordForm = document.getElementById('set-password-form')
if (setUserPasswordForm) {
    setUserPasswordForm.addEventListener('submit', async event => {
        event.preventDefault()
        const userid = document.getElementById('userid').value
        const password = document.getElementById('newPass').value
        const confirm = document.getElementById('newConfirm').value
        await updateUsersPassword(userid, password, confirm)
    })
}

//
// CREATE RADAR FORM
//
const createRadarForm = document.getElementById('new-radar-form')
if (createRadarForm) {
    createRadarForm.addEventListener('submit', async event => {
        event.preventDefault()
        const edition = document.getElementById('edition').value
        const year = document.getElementById('year').value
        const summary = document.getElementById('summary').value

        await createRadar(edition, year, summary)
    })
}

//
// EDIT RADAR BUTTONS
//
const editRadarLinks = document.querySelectorAll('.edit-radar')
if (editRadarLinks) {
    editRadarLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            location.assign(event.path[1].getAttribute('route'))
        })
    })
}

//
// DELETE RADAR BUTTONS
//
const deleteRadarLinks = document.querySelectorAll('.delete-radar')
if (deleteRadarLinks) {
    deleteRadarLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            console.log(event.path[1].getAttribute('route'))
            await deleteRadar(event.path[1].getAttribute('route'), location.href)
        })
    })
}

//
// EDIT INDIVIDUAL RADAR
//
const updateRadarForm = document.getElementById('edit-radar-form')
if (updateRadarForm) {
    updateRadarForm.addEventListener('submit', async event => {
        event.preventDefault()
        const id = document.getElementById('radarid').value
        const summary = document.getElementById('summary').value
        await updateRadar(id, summary)
    })
}

//
// ADVANCE RADAR BUTTONS
//
const administerRadarButtons = document.querySelectorAll('.administer-radar')
if (administerRadarButtons) {
    administerRadarButtons.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            await advanceRadar(event.path[1].getAttribute('route'), location.href)
        })
    })
}

//
// CREATE NEW PROJECT FORM
//
const newProjectForm = document.getElementById('new-project-form')
if (newProjectForm) {
    newProjectForm.addEventListener('submit', async event => {
        event.preventDefault()
        const values = {
            name: document.getElementById('name').value,
            rcn: document.getElementById('rcn').value,
            title: document.getElementById('title').value,
            startDate: document.getElementById('startdate').value,
            endDate: document.getElementById('enddate').value,
            call: document.getElementById('fundingcall').value,
            type: document.getElementById('projecttype').value,
            budget: document.getElementById('budget').value,
            projectURL: document.getElementById('projecturl').value,
            fundingBodyLink: document.getElementById('fundingbodylink').value,
            cwurl: document.getElementById('cwprojecthublink').value,
            teaser: document.getElementById('teaser').value
        }
        await createProject(values)
    })
}

//
// DELETE PROJECT LINKS
//
const deleteProjectLinks = document.querySelectorAll('.delete-project')
if (deleteProjectLinks) {
    deleteProjectLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            await deleteProject(event.path[1].getAttribute('route'), location.href)
        })
    })
}

//
// EDIT PROJECT BUTTONS
//
const editProjectLinks = document.querySelectorAll('.edit-project')
if (editProjectLinks) {
    editProjectLinks.forEach(link => {
        link.addEventListener('click', async event => {
            event.preventDefault()
            location.assign(event.path[1].getAttribute('route'))
        })
    })
}

//
// EDIT PROJECT FORM
//
const editProjectForm = document.getElementById('edit-project-form')
if (editProjectForm) {
    editProjectForm.addEventListener('submit', async event => {
        event.preventDefault()
        const values = {
            id: document.getElementById('projectid').value,
            name: document.getElementById('name').value,
            rcn: document.getElementById('rcn').value,
            title: document.getElementById('title').value,
            startDate: document.getElementById('startdate').value,
            endDate: document.getElementById('enddate').value,
            call: document.getElementById('fundingcall').value,
            type: document.getElementById('projecttype').value,
            budget: document.getElementById('budget').value,
            projectURL: document.getElementById('projecturl').value,
            fundingBodyLink: document.getElementById('fundingbodylink').value,
            cwurl: document.getElementById('cwprojecthublink').value,
            teaser: document.getElementById('teaser').value
        }
        console.log(values)
        await updateProject(values)
    })
}

//
// Upload a file and import the projects
//
// const uploadImportForm = document.getElementById('import-projects-form')
// if (uploadImportForm) {
//     uploadImportForm.addEventListener('submit', async event => {
//         event.preventDefault()
//         const form = new FormData()
//         form.append('importfile', document.getElementById('importfile').files[0])
//         importProjects(form)
//     })
// }

// show alerts sent by the server
const alertMsg = document.querySelector('body').dataset.alertmsg
const alertType = document.querySelector('body').dataset.alerttype
if (alertMsg && alertType) showAlert(alertType, alertMsg, 500)
