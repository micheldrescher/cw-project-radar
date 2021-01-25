//
// IMPORTS
//
const winston = require('winston')

//
// FUNCTIONS
//

//
// validate username against rules
//
const validUsername = (username) => {
    if (!username) return false // name mustn't be undefined
    if (username.length < 5) return false // at least 5 characters

    if (username.match(/\W+/)) return false // must only contain [0-9a-zA-Z_]
    if (username.match(/^[0-9]+$/)) return false // only number is not allowed

    return true
}

//
// validate log level from configs
//
const validLogLevel = (level) => {
    if (Object.keys(winston.config.npm.levels).includes(level)) return true

    return false
}

//
// validate scores config param for getProjectByCWID
//
const validScoresParam = (scores) => {
    // empty, null, or undefined
    if (!scores || scores === '') return false

    // 'all' or 'newest' are valid parameters
    if (['all', 'newest'].includes(scores)) return true

    // all else fails
    return false
}

//
// validate classification config param for getProejctByCWID
//
const validClassificationParam = (classification) => {
    // empty, null, or undefined
    if (!classification || classification === '') return false

    // 'all' or 'newest' are valid parameters
    if (['all', 'newest'].includes(classification)) return true

    // all else fails
    return false
}

//
// validates slugs
//
const validSlug = (s) => {
    return !s ? false : s.match(/(^(autumn|spring)-\d{4}$)/) != null
}

//
// validates CW Ids
//
const validCwId = (id) => {
    return !id ? false : id.match(/(^\d+$)/) != null
}

const validProjectIDs = (prjs) => {
    if (!prjs) return false

    prjs.split(',').forEach((p) => {
        if (!validCwId(p)) return false
    })

    return true
}

//
// EXPORTS
//
module.exports = {
    validSlug,
    validCwId,
    validUsername,
    validLogLevel,
    validScoresParam,
    validClassificationParam,
    validProjectIDs,
}
