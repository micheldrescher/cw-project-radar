//
// IMPORTS
//
// libraries
import axios from 'axios'
// modules
import showAlert from '../util/alert'

//
// EXPORTS
//
export { getTags, getProjectIDs, updateTags, getModel }

//
// MODULE VARS
//
const strgId_jrcTags = 'eu.cyberwatching.radar.user.jrcTags'
const strgId_prjIds = 'eu.cyberwatching.radar.user.taggedPrjs'
const strgId_model = 'eu.cyberwatching.radar.model'

//
// FUNCTIONS
//

// get the user selected list of tags (ncl. a boolean operator)
// example: { ops: 'or', tags: [1, 2, 3]}
const getTags = () => {
    const result = JSON.parse(localStorage.getItem(strgId_jrcTags)) || {
        union: false,
        tags: [],
    }
    // construct a new return object (prevents parameter pollution etc.)
    return {
        union: result.union || false,
        tags: result.tags || [],
    }
}

// get the list of projects that match the tag list
const getProjectIDs = () => {
    let result = JSON.parse(localStorage.getItem(strgId_prjIds)) || []
    if (!(result instanceof Array)) result = []

    return result
}

// update the list of tags and projects
const updateTags = async (tags) => {
    // first store the tags
    localStorage.setItem(strgId_jrcTags, JSON.stringify(tags))
    // then fetch the matching project ids
    const projectIds = await fetchMatchingPrjIds(tags)
    // finally store the proejct IDs
    localStorage.setItem(strgId_prjIds, JSON.stringify(projectIds))
}

const getModel = async () => {
    return JSON.parse(localStorage.getItem(strgId_model))
}

// PRIVATE
// Fetch the list of matching IDs from the server
const fetchMatchingPrjIds = async (filter) => {
    // fetch matching projects
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/project/match',
            data: {
                filter,
            },
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Filter updated')
            return res.data.data
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

const fetchModel = async () => {
    // check if model is already set
    const model = await getModel()
    if (
        model &&
        model.segments &&
        model.rings &&
        model.lcycle &&
        model.timestamp & (Date.now() - model.timestamp < 1000 * 60 * 60 * 24) // 1 day
    ) {
        // nothing to do
        return
    }

    // fetch from server
    try {
        // 1. fetch the model data from the server
        const res = await axios({
            method: 'GET',
            url: '/api/v1/model/dimensions',
        })
        console.log(res)
        if (res.data.status != 'success') {
            // throw new error
            showAlert('error', 'Failed to load model data:'.err.response.data.message)
            return
        }

        // 2. get model data from response
        const model = res.data.data
        console.log(model)
        model.timestamp = Date.now()
        console.log(model)

        // 3. add to local storage
        localStorage.setItem(strgId_model, JSON.stringify(model))
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}

// called one time when local store is loaded in the browser
fetchModel()
