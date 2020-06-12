//
// IMPORTS
//
// libraries
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true, // this is JUST an index shorthand, it does NOT prevent duplicates!
        required: [true, 'A username is required, and must be unique.']
    },
    email: {
        type: String,
        required: [true, 'Please provide a contact email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email address.']
    },
    role: {
        type: String,
        enum: [
            'project', // a user is allowed to maintain a specific project (not implemented yet)
            'cw-hub', // The ProjectHub user (with this role) is allowed to submit MTRL scores, classifications, and JRC taxonomy changes
            'admin' // Admin users are allowed to to everything and anything.
        ],
        default: 'project'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function(el) {
                return el === this.password
            },
            message: 'Passwords are not the same'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
})

userSchema.pre('save', async function(next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next()

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Empty the passwordConfirm field
    this.passwordConfirm = undefined
    next()
})

userSchema.pre(/^find/, function(next) {
    // "this" points to the current query
    this.find({ active: { $ne: false } })
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

//
// MODELS
//
const User = mongoose.model('User', userSchema)

//
// EXPORTS
//
module.exports = User
