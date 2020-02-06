//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const validator = require('validator')
// app modules
const { projectClassificationSchema } = require('./projectClassificationModel')
const { mtrlScoreSchema } = require('./mtrlScoreModel')

const projectSchema = new mongoose.Schema({
    cw_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    teaser: {
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
    classification: [projectClassificationSchema],
    mtrlScores: [mtrlScoreSchema],
    cwurl: {
        type: String,
        validate: [validator.isURL, 'Invalid URL.']
    }
})

const Project = mongoose.model('Project', projectSchema)

//
// EXPORTS
//
module.exports = Project
