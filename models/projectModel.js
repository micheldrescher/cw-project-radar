//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const validator = require('validator')

const projectSchema = new mongoose.Schema({
    cw_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    cwurl: {
        type: String,
        validate: [validator.isURL, 'nvalid URL.']
    }
})

const Project = mongoose.model('Project', projectSchema)

//
// EXPORTS
//
module.exports = Project
