//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'

//
// add classification to a project
//
const addClassification = async (cw_id, classification, classifiedBy, changeSummary) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/project/${cw_id}/categorise`,
            data: {
                classification,
                classifiedBy,
                changeSummary
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Classification added')
            window.setTimeout(() => {
                location.assign(location.href)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// add classification to a project
//
const addScore = async (cw_id, mrl, trl) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/project/${cw_id}/score`,
            data: {
                mrl,
                trl
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Score added')
            window.setTimeout(() => {
                location.assign(location.href)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// EXPORTS
//
module.exports = {
    addClassification,
    addScore
}
