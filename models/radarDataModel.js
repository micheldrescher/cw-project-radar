//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
// app modules
const { projectSchema } = require('./projectModel')

//
// SCHEMA
//
const radarDataSchema = new mongoose.Schema({
    project: {
        type: projectSchema,
        required: true
    },
    ring: String,
    trl: Number,
    mrl: Number,
    score: Number,
    median: Number,
    performance: Number,
    min: Number,
    max: Number
})

//
// MODEL
//
const RadarData = mongoose.model('RadarRada', radarDataSchema)

//
// EXPORTS
//
module.exports = { RadarData, radarDataSchema }
