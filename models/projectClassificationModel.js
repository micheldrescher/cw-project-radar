//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')

//
// MODULE VARS
//
const segments = process.env.MODEL_SEGMENTS.split(',').map(e => e.trim())

//
// SCHEMA
//
const projectClassificationSchema = new mongoose.Schema({
    classifiedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    classification: {
        type: String,
        required: true,
        validate: v => segments.includes(v)
    },
    classifiedBy: {
        type: String,
        required: true,
        default: 'Cyberwatching',
        enum: {
            values: ['Cyberwatching', 'Project']
        }
    },
    changeSummary: {
        type: String,
        required: true
    }
})

const ProjectClassification = mongoose.model('ProjectClassification', projectClassificationSchema)

//
// EXPORTS
//
module.exports = { ProjectClassification, projectClassificationSchema }
