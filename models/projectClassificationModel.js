//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')

const projectClassificationSchema = new mongoose.Schema({
    classifiedOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    classification: {
        type: String,
        required: true
    },
    classifiedBy: {
        type: String,
        required: true,
        default: 'Cyberwatching',
        enum: {
            values: ['Cyberwatching', 'Project']
        }
    },
    changeSummary: {
        type: String,
        required: true
    }
})

const ProjectClassification = mongoose.model('ProjectClassification', projectClassificationSchema)

//
// EXPORTS
//
module.exports = { ProjectClassification, projectClassificationSchema }
