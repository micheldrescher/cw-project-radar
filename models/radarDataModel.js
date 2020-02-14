//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
// app modules

//
// MODULE VARS
//
const rings = process.env.MODEL_RINGS.split(',').map(e => e.trim())

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
    segment: String, // temporary(?)
    ring: {
        type: String,
        required: true,
        validate: v => rings.includes(v)
    },
    trl: Number,
    mrl: Number,
    score: Number,
    median: Number,
    performance: Number,
    min: Number,
    max: Number
})

const ringSchema = new mongoose.Schema({
    name: String,
    blips: [blipSchema]
})

const segmentSchema = new mongoose.Schema({
    name: String,
    rings: [ringSchema]
})

//
// MODELS
//
const Segment = mongoose.model('Segment', segmentSchema)
const Ring = mongoose.model('Ring', ringSchema)
const Blip = mongoose.model('Blip', blipSchema)
//
// EXPORTS
//
module.exports = { Segment, segmentSchema, Ring, ringSchema, Blip, blipSchema }
