//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'

//
// create a new user account
//
const createUser = async (name, email, password, passwordConfirm, role, referrer) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/user/',
            data: {
                name,
                email,
                password,
                passwordConfirm,
                role
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'User created.')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// delete a user account
//
const deleteUser = async (route, referrer) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: route
        })

        if (res.data.status === 'success') {
            showAlert('success', 'User successfully deleted.')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// Admin updating user's account
//
const updateUsersDetails = async (name, email, role, id) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/user/${id}`,
            data: {
                name,
                email,
                role
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'User successfully updated.')
            window.setTimeout(() => {
                location.assign('/admin/user')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// Admin updating user's password
//
const updateUsersPassword = async (userid, password, confirm) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/user/${userid}/password`,
            data: {
                password,
                confirm
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'User password set.')
            window.setTimeout(() => {
                location.assign('/admin/user')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

module.exports = { createUser, deleteUser, updateUsersDetails, updateUsersPassword }
