//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'

//
// create a new radar
//
const createRadar = async (release, year, summary) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/radar/',
            data: {
                year,
                release,
                summary,
            },
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Radar created successfully.')
            window.setTimeout(() => {
                location.assign('/admin/radar')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// Update an existing radar
//
const updateRadar = async (id, summary) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/radar/${id}`,
            data: {
                summary,
            },
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Radar successfully updated.')
            window.setTimeout(() => {
                location.assign('/admin/radar')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// delete a radar
//
const deleteRadar = async (route, referrer) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: route,
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Radar successfully deleted.')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// delete a radar
//
const advanceRadar = async (route, cutoff, referrer) => {
    const path = route.includes('publish') ? route + '/' + cutoff : route
    try {
        const res = await axios({
            method: 'PATCH',
            url: path,
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Success!')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

module.exports = {
    createRadar,
    updateRadar,
    deleteRadar,
    advanceRadar,
}
