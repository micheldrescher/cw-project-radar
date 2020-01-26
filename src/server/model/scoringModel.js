import mongoose from 'mongoose'
import validator from 'validator'

export { Scoring as default }

const scoringSchema = new mongoose.Schema({
    radar: {
        type: mongoose.Schema.ObjectId,
        ref: 'Radar',
        required: [true, 'A scoring needs to point to a radar.']
    },
    mrl: {
        type: Number,
        required: [true, 'An MRL value is required.'],
        min: [0, 'MRL cannot be lower than 0.'],
        max: [9, 'MRL value cannot exceed 9.']
    },
    trl: {
        type: Number,
        required: [true, 'A TRL value is required.'],
        min: [0, 'TRL cannot be lower than 0.'],
        max: [9, 'TRL value cannot exceed 9.']
    }
    // score is a virtual property
})

// projectSchema.virtual('name').get(function() {
//     return this.edition + ' ' + this.year
// })

//
// DOCUMENT MIDDLEWARE
//

// pre-save and pre-create operations
// radarSchema.pre('save', function(next) {
//     if (this.isModified('year') || this.isModified('edition')) {
//         this.slug = slugify(`${this.edition} ${this.year}`, { lower: true })
//     }
//     // run next middleware
//     next()
// })

const Scoring = mongoose.model('Scoring', scoringSchema)
