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
// EXPORTS
//
module.exports = { validUsername, validLogLevel }
