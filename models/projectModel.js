//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const validator = require('validator')

//
// MODULE VARS
//
// use env config for validation
// TODO find a better way for domain-specific verification etc.
const segments = process.env.MODEL_SEGMENTS.split(',').map(e => e.trim())

const projectSchema = new mongoose.Schema(
    {
        // cloudwatch gives it a unique id
        cw_id: {
            type: Number,
            required: true,
            unique: true
        },
        // a short name (usually an abbreviation)
        name: {
            type: String,
            required: true
        },
        // the full title of the project
        title: {
            type: String,
            required: true
        },
        // a short teaser text describing the project
        teaser: {
            type: String,
            required: true
        },
        // the project's start date
        startDate: {
            type: Date,
            required: true
        },
        // the project's end date
        endDate: {
            type: Date,
            required: true
        },
        classification: {
            type: String,
            validate: v => segments.includes(v)
        },
        // the EC funding call
        call: String,
        // project type (mostly IA, RIA, RA, or CSA)
        type: String,
        // the project's total budget (EC contrib plus partner's own contribs)
        budget: Number,
        // project home page
        projectURL: {
            type: String,
            validate: validator.isURL
        },
        // the link to more info from the funding body
        fundingBodyLink: {
            type: String,
            validate: validator.isURL
        },
        // URL to the CW ProjectHub
        cwurl: {
            type: String,
            validate: [validator.isURL, 'Invalid URL.']
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

//
// INDEXES
//
projectSchema.index({ cw_id: 1 }) // index on the project's CW id

//
// MODEL
//
const Project = mongoose.model('Project', projectSchema)

//
// EXPORTS
//
module.exports = { Project, projectSchema }
