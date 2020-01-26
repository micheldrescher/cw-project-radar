import mongoose from 'mongoose'
import validator from 'validator'

export { Project as default }

const projectSchema = new mongoose.Schema({
    prjojectId: {
        type: Number,
        unique: true,
        required: [true, 'A project ID is required.'],
        min: 1,
        max: 1000
    },
    name: {
        type: String,
        unique: true,
        required: [true, 'A project name is required.']
    },
    scorings: {
        type: Array,
        of: {
            project: mongoose.Schema.ObjectId
        }
    }
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

const Project = mongoose.model('Project', projectSchema)
