//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const slugify = require('slugify')
const beautifyUnique = require('mongoose-beautiful-unique-validation')

// app modules
const { RadarData, RadarRendering } = require('./radarDataModel')

const radarSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, "A radar's year is required."],
        min: 2018,
    },
    release: {
        type: String,
        required: [true, "A radar's edition is required."],
        enum: {
            values: ['Spring', 'Autumn'],
            message: 'edition may be either "Spring" or "Autumn".',
        },
    },
    slug: {
        type: String,
        unique: 'A radar with the identifier {{VALUE}} already exists.',
    },
    name: {
        type: String,
    },
    summary: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['created', 'published', 'archived'],
            message: 'Status must be either created, published, or archived.',
        },
        default: 'created',
    },
    referenceDate: Date, // the radar's reference/cutoff date
    publicationDate: Date, // the date this radar was published
    data: {
        // DEPRECATED - NO LONGER IN USE
        type: mongoose.Schema.ObjectId,
        ref: 'RadarData',
    },
    rendering: {
        type: mongoose.Schema.ObjectId,
        ref: 'RadarRendering',
    },
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
radarSchema.pre('save', function (next) {
    if (this.isModified('year') || this.isModified('release')) {
        // update slug
        this.slug = slugify(`${this.release} ${this.year}`, { lower: true })
        // update name
        this.name = this.release + ' ' + this.year
    }
    // run next middleware
    next()
})

// delete radardata and radarrendering when deleting a radar
radarSchema.post('findOneAndDelete', async function (doc) {
    // delete all associated radar datas
    await RadarData.findByIdAndDelete(doc.data)
    await RadarRendering.findByIdAndDelete(doc.rendering)
})

radarSchema.plugin(beautifyUnique)
const Radar = mongoose.model('Radar', radarSchema)

//
// EXPORTS
//
module.exports = Radar
