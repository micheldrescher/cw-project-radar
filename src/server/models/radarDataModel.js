//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
// app modules

//
// SCHEMAS
//
// individual project blips for a radar
const blipSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.ObjectId,
        ref: 'Project',
        required: [true, 'Radar blip entry must have a project reference'],
    },
    tags: [String],
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
    max: Number,
})
// the complete collection of radar data, ready to be rendered into an SVG
// and corresponding overview tables
const radarDataSchema = new mongoose.Schema(
    {
        radar: {
            type: mongoose.Schema.ObjectId,
            ref: 'Radar',
            required: [true, 'A RadarData document must be linked to exactly one Radar instance'],
        },
        data: {
            type: Map, // segment --> Map
            of: {
                type: Map, // ring --> Array[blips]
                of: [blipSchema],
            },
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)
// the scema for the radar renderings
const radarRenderingSchema = new mongoose.Schema(
    {
        radar: {
            type: mongoose.Schema.ObjectId,
            ref: 'Radar',
            required: [true, 'A RadarData document must be lined to exactly one Radar instance'],
        },
        rendering: {
            type: Map, // map of SVG and tabular segment tables
            of: String,
            required: [true, 'Rendering data must be present when publishing a radar'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

//
// MODELS
//
// individual blips
const Blip = mongoose.model('Blip', blipSchema)
// the collection of blips in a radar's data population
const RadarData = mongoose.model('RadarData', radarDataSchema)
// the finished rendering of a radar
const RadarRendering = mongoose.model('RadarRendering', radarRenderingSchema)

//
// EXPORTS
//
module.exports = { Blip, RadarData, RadarRendering }
