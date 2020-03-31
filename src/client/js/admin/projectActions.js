//
// IMPORTS
//
// libraries
import axios from 'axios'
// app modules
import showAlert from '../util/alert'

//
// create a new project
//
const createProject = async prjData => {
    try {
        const {
            name,
            title,
            startDate,
            endDate,
            call,
            type,
            budget,
            projectURL,
            fundingBodyLink,
            cwurl,
            teaser
        } = prjData
        const res = await axios({
            method: 'POST',
            url: '/api/v1/project/',
            data: {
                name,
                title,
                startDate,
                endDate,
                call,
                type,
                budget,
                projectURL,
                fundingBodyLink,
                cwurl,
                teaser
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Project created.')
            window.setTimeout(() => {
                location.assign('/admin/project')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// Delete a project
//

//
// EXPORTS
//

module.exports = {
    createProject
}
