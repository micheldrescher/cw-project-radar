//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const slugify = require('slugify')

const radarSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, 'A year is required'],
        min: 2018
    },
    release: {
        type: String,
        required: [true, 'You must specify an edition value'],
        enum: {
            values: ['Spring', 'Autumn'],
            message: 'edition may be either "Spring" or "Autumn".'
        }
    },
    slug: {
        type: String,
        unique: [
            true,
            'A radar with the same identifier already exists. Please choose a different year or edition.'
        ]
    },
    name: {
        type: String
    },
    model: {
        type: mongoose.Schema.ObjectId,
        ref: 'Model',
        required: ['A radar MUST have an existing data model reference', true]
    },
    summary: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['prepared', 'published', 'archived'],
            message: 'Status must be either prepared, published, or archived.'
        },
        default: 'prepared',
        select: false
    }
})

//
// DOCUMENT MIDDLEWARE
//

// pre-save and pre-create operations
radarSchema.pre('save', function(next) {
    if (this.isModified('year') || this.isModified('release')) {
        // update slug
        this.slug = slugify(`${this.release} ${this.year}`, { lower: true })
        // update name
        this.name = this.release + ' ' + this.year
    }
    // run next middleware
    next()
})

const Radar = mongoose.model('Radar', radarSchema)

//
// EXPORTS
//
module.exports = Radar
