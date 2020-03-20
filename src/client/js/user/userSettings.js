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
const changePassword = async (current, password, confirm) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: '/api/v1/user/updatePassword',
            data: {
                current,
                password,
                confirm
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Password update successful')
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// EXPORTS
//
module.exports = changePassword
