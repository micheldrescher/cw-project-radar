//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const validator = require('validator')
// app modules
const { classificationSchema } = require('./classificationModel')
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
    call: {
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
    budget: {
        type: Number,
        required: true
    },
    projectURL: {
        type: String,
        validate: validator.isURL
    },
    fundingBodyLink: {
        type: String,
        validate: validator.isURL
    },
    cwurl: {
        type: String,
        validate: [validator.isURL, 'Invalid URL.']
    },
    // TODO add JRC taxonomy
    classification: [classificationSchema],
    mtrlScores: [mtrlScoreSchema]
})

//
// Indexes
//
projectSchema.index({ cw_id: 1 }) // index on the project's CW id
// to be defined

const Project = mongoose.model('Project', projectSchema)

//
// EXPORTS
//
module.exports = { Project, projectSchema }
