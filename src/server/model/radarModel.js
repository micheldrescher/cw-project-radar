import mongoose from 'mongoose'
import validator from 'validator'
import slugify from 'slugify'

export { Radar as default }

const radarSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: [true, 'A year is required'],
        min: 2018
    },
    edition: {
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
    // name is a virtual property, see below
    active: {
        type: Boolean,
        required: true,
        default: true,
        select: false
    }
})

radarSchema.virtual('name').get(function() {
    return this.edition + ' ' + this.year
})

//
// DOCUMENT MIDDLEWARE
//

// pre-save and pre-create operations
radarSchema.pre('save', function(next) {
    if (this.isModified('year') || this.isModified('edition')) {
        this.slug = slugify(`${this.edition} ${this.year}`, { lower: true })
    }
    // run next middleware
    next()
})

const Radar = mongoose.model('Radar', radarSchema)
