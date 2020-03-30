//
// IMPORTS
//
// libraries
const mongoose = require('mongoose')
const { Schema } = mongoose

//
// SCHEMAS
//
// Counters collection schema
const sequenceSchema = new Schema({
    _id: { type: String, required: true }, // the _id is a String denoting a unique counter (see below)
    seq: { type: Number, default: 0 } // the actual field that gets incremented by 1 in an atomic operation
})

//
// INDEXES
//
// ensure that all combinations of _id and seq are unique
sequenceSchema.index({ _id: 1, seq: 1 }, { unique: true })

//
// Mongoose MODEL
//
const Sequence = mongoose.model('Sequence', sequenceSchema)

//
// REQUEST NEXT SEQUENCE ID
//
const next = async sequenceName => {
    const sequence = await Sequence.findByIdAndUpdate(
        // ** Method call begins **
        sequenceName, // The ID to find for in counters model
        { $inc: { seq: 1 } }, // The update
        { new: true, upsert: true } // The options
    )

    return sequence.seq
}

module.exports = next
