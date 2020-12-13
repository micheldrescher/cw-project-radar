//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')

//
// SCHEMAS
//
// MTRL schema
const mtrlScoreSchema = new mongoose.Schema(
    {
        // which project was classified?
        project: {
            type: mongoose.Schema.ObjectId,
            ref: 'Project',
            required: ['A classification must belong to a proejct', true],
        },
        // when was the score added?
        scoringDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        // what's the MRL?
        mrl: {
            type: Number,
            required: true,
            min: [0, 'MRL must be between 0 and 9.'],
            max: [9, 'MRL must be between 0 and 9.'],
        },
        // what's the TRL?
        trl: {
            type: Number,
            required: true,
            min: [0, 'MRL must be between 0 and 9.'],
            max: [9, 'MRL must be between 0 and 9.'],
        },
        description: String,
        // score - virtual, calculated using virtual get function
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

//
// VIRTUALS
//
mtrlScoreSchema.virtual('score').get(function () {
    return this.trl * 2 + this.mrl * 7
})

//
// MIDDLEWARE
//

//
// MODELS
//
const MTRLScore = mongoose.model('MTRLScore', mtrlScoreSchema)

//
// EXPORTS
//
module.exports = { MTRLScore, mtrlScoreSchema }
