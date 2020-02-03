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
    segments: {
        type: [String],
        required: ['A radar must have at least one segment', true],
        validate: [modelLimits, 'Must have at least one segment']
    },
    rings: {
        type: [String],
        required: ['A radar must have at least one ring', true],
        validate: [modelLimits, 'Must have at least one ring']
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
