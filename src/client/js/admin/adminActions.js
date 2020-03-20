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
const createUser = async (name, email, password, passwordConfirm, role) => {
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

        console.log(res)

        if (res.data.status === 'success') {
            showAlert('success', 'User created.')
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

        console.log(res)

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

module.exports = { createUser, deleteUser }
