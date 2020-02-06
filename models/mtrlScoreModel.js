//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')

const mtrlScoreSchema = new mongoose.Schema({
    scoringDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    mrl: {
        type: Number,
        required: true,
        min: [0, 'MRL must be between 0 and 9.'],
        max: [9, 'MRL must be between 0 and 9.']
    },
    trl: {
        type: Number,
        required: true,
        min: [0, 'MRL must be between 0 and 9.'],
        max: [9, 'MRL must be between 0 and 9.']
    }
})

const MTRLScore = mongoose.model('MTRLScore', mtrlScoreSchema)

//
// EXPORTS
//
module.exports = { MTRLScore, mtrlScoreSchema }
