//
// IMPORTS
//
// libraries
import axios from 'axios'
// modules
import showAlert from './alert'

//
// EXPORTS
//
export { getModel, getStatsActive, setStatsActive, getTags, updateTags }

//
// MODULE VARS
//
const strgId_model = 'eu.cyberwatching.radar.model'
const strgId_stats = 'eu.cyberwatching.radar.stats'
const strgId_jrcTags = 'eu.cyberwatching.radar.user.jrcTags'

/***************
 *             *
 *  FUNCTIONS  *
 *             *
 ***************/

//
// CYBERWATCHING.EU DATA MODEL
//

//
// return the CW data model from loca store
//
const getModel = async (doFetch = true) => {
    let model = localStorage.getItem(strgId_model)
    // return early if model is found
    if (model) {
        model = JSON.parse(model)
        return model
    }

    // lazy loading of the model and return
    if (doFetch) return await _fetchModel()
}

//
// LIVE RADAR STATISTICS
//
const getStatsActive = async () => {
    let result = localStorage.getItem(strgId_stats)
    if (result) {
        return JSON.parse(result)
    }

    result = false
    localStorage.setItem(strgId_stats, JSON.stringify(result))
    return result
}

const setStatsActive = async (value) => {
    localStorage.setItem(strgId_stats, JSON.stringify(value))
}

//
// JRC FILTER TAGS
//

//
// get the user selected list of tags (incl. a boolean operator)
// example: { ops: 'or', tags: [1, 2, 3]}
//
const getTags = async () => {
    let result = JSON.parse(localStorage.getItem(strgId_jrcTags))
    if (!result) {
        result = {
            union: false,
            tags: [],
        }
    }
    // construct a new return object (prevents parameter pollution etc.)
    return result
}

// update the list of tags and projects
const updateTags = async (filter) => {
    // first store the tags
    localStorage.setItem(strgId_jrcTags, JSON.stringify(filter))
}

/******************************
 *                            *
 *  PRIVATE MODULE FUNCTIONS  *
 *                            *
 *******************************/

const _fetchModel = async () => {
    // check if model is already set
    let model = await getModel(false)
    if (
        model &&
        model.segments &&
        model.rings &&
        model.lcycle &&
        model.timestamp & (Date.now() - model.timestamp < 1000 * 60 * 60 * 24) // 1 day
    ) {
        // nothing to do
        return model
    }
    // fetch from server
    try {
        // 1. fetch the model data from the server
        const res = await axios({
            method: 'GET',
            url: '/api/v1/model/dimensions',
        })
        if (res.data.status != 'success') {
            // throw new error
            showAlert('error', 'Failed to load model data:'.err.response.data.message)
            return
        }

        // 2. get model data from response
        model = res.data.data
        model.timestamp = Date.now()

        // 3. add to local storage
        localStorage.setItem(strgId_model, JSON.stringify(model))
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
    return model
}
