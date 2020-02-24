//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const slugify = require('slugify')
// app modules
const { blipSchema } = require('./radarDataModel')

const radarSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, "A radar's year is required."],
        min: 2018
    },
    release: {
        type: String,
        required: [true, "A radar's edition is required."],
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
    summary: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['created', 'populated', 'rendered', 'published', 'archived'],
            message: 'Status must be either created, populated, published, or archived.'
        },
        default: 'created'
    },
    referenceDate: Date, // the radar's reference/cutoff date
    publicationDate: Date, // the date this radar was published
    data: {
        type: Map, // segment --> Map
        of: {
            type: Map, // ring --> Array[blips]
            of: [blipSchema]
        }
    },
    rendering: {
        type: Map, // map of SVG and tabular segment tables
        of: String
    }
})

//
// INDEXES
//
radarSchema.index({ slug: 1 })
radarSchema.index({ slug: 1, status: 1 })

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
