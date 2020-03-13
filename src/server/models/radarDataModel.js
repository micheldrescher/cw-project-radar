//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
// app modules

//
// SCHEMA
//
const blipSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: [true, 'Radar blip entry must have a project reference']
    },
    cw_id: Number, // temporary
    prj_name: String, // temporary
    segment: String, // temporary
    ring: String, // temporary
    trl: Number,
    mrl: Number,
    score: Number,
    median: Number,
    performance: Number,
    min: Number,
    max: Number
})

//
// MODELS
//
const Blip = mongoose.model('Blip', blipSchema)
//
// EXPORTS
//
module.exports = { Blip, blipSchema }
