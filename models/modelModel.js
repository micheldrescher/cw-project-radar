//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: ['A radar model (and its name) must be unique.', true],
        required: ['A radar model requires a name', true]
    },
    id: {
        type: String,
        unique: ['A rdar model must be unique (represented by its identifier).', true],
        required: ['A rdar mode MUST have an identifier.', true]
    },
    segments: {
        type: [String],
        required: ['A radar must have at least one segment', true],
        validate: [modelLimits, 'Must have at least one segment']
    },
    rings: {
        type: [String],
        required: ['A radar must have at least one ring', true],
        validate: [modelLimits, 'Must have at least one ring']
    },
    projectMaxAge: {
        type: Number,
        required: ['The model required a cut-off age for projects to be included.', true]
    }
})

//
// CUSTOM VALIDATORS
//
// Radar segments and rings must have at least one element
function modelLimits(val) {
    return val.length > 0
}

const Model = mongoose.model('Model', modelSchema)

//
// EXPORTS
//
module.exports = Model
