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
export { getTags, getProjectIDs, updateTags }

//
// MODULE VARS
//
const strgId_jrcTags = 'eu.cyberwatching.radar.user.jrcTags'
const strgId_prjIds = 'eu.cyberwatching.radar.user.taggedPrjs'

//
// FUNCTIONS
//

// get the user selected list of tags (ncl. a boolean operator)
// example: { ops: 'or', tags: [1, 2, 3]}
const getTags = () => {
    const result = JSON.parse(localStorage.getItem(strgId_jrcTags)) || {
        union: false,
        tags: []
    }
    // construct a new return object (prevents parameter pollution etc.)
    return {
        union: result.union || false,
        tags: result.tags || []
    }
}

// get the list of projects that match the tag list
const getProjectIDs = () => {
    let result = JSON.parse(localStorage.getItem(strgId_prjIds)) || []
    if (!(result instanceof Array)) result = []

    return result
}

// update the list of tags and projects
const updateTags = async tags => {
    // first store the tags
    localStorage.setItem(strgId_jrcTags, JSON.stringify(tags))
    // then fetch the matching project ids
    const projectIds = await fetchMatchingPrjIds(tags)
    // finally store the proejct IDs
    localStorage.setItem(strgId_prjIds, JSON.stringify(projectIds))
}

// PRIVATE
// Fetch the list of matching IDs from the server
const fetchMatchingPrjIds = async filter => {
    // fetch matching projects
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/project/match',
            data: {
                filter
            }
        })

        if (res.data.status === 'success') {
            showAlert('success', 'Filter updated')
            return res.data.data
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
}
