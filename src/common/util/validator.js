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
const validUsername = (usernamename) => {
    if (!usernamename) return false // name mustn't be undefined
    if (usernamename.length < 5) return false // at least 5 characters

    usernamename = usernamename.split('')
    usernamename.forEach((char) => {
        if (char.match(/\W/)) return false // must only contain [0-9a-zA-Z_]
    })

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
