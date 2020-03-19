/* eslint-disable */
import axios from 'axios'
import showAlert from './util/alert'

export const login = async (name, password, referrer) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/user/login',
            data: {
                name,
                password
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully!')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        console.log(err)
        showAlert('error', err.response.data.message)
    }
}

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/user/logout'
        })
        if ((res.data.status = 'success')) location.reload(true)
    } catch (err) {
        console.log(err.response)
        showAlert('error', 'Error logging out! Try again.')
    }
}
