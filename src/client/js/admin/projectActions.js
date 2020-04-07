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
            rcn,
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
                rcn,
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
// delete a radar
//
const deleteProject = async (route, referrer) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: route
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Project successfully deleted.')
            window.setTimeout(() => {
                location.assign(referrer)
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// UPDATE PROJECT
//
const updateProject = async prjData => {
    try {
        const {
            name,
            title,
            rcn,
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
            method: 'PATCH',
            url: `/api/v1/project/${prjData.id}`,
            data: {
                name,
                title,
                rcn,
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
            showAlert('success', 'Project updated.')
            window.setTimeout(() => {
                location.assign('/admin/project')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

//
// IMPORT PROJECTS FILE
//
// const importProjects = async data => {
//     try {
//         const res = await axios({
//             method: 'PATCH',
//             url: '/api/v1/project',
//             data
//         })

//         if (res.data.status === 'success') {
//             showAlert('success', 'Projects (not yet) imported.')
//             window.setTimeout(() => {
//                 location.assign('/admin/project')
//             }, 1500)
//         }
//     } catch (err) {
//         showAlert('error', err.response.data.message)
//     }
// }

//
// EXPORTS
//
module.exports = {
    createProject,
    deleteProject,
    updateProject
    // importProjects
}
