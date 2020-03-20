//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'

//
// update the user's password
//
const createUser = async (name, email, password, passwordConfirm, role) => {
    console.log(name, email, password, confirm, role)
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
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

module.exports = createUser
