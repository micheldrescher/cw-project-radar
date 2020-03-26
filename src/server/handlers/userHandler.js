//
// IMPORTS
//
// libraries
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
const httpResponses = require('../utils/httpResponses')
const User = require('../models/userModel')
// const userController = require('../controllers/userController')

//
// EXPORTED FUNCTIONS
//

// Create a user
exports.createUser = handlerFactory.createOne(User, 'active')
// Get all users
exports.getAllUsers = handlerFactory.getAll(User)
// Get one user
exports.getUser = handlerFactory.getOne(User)
// Update a user (except Password!!!)
exports.updateUser = handlerFactory.updateOne(User, 'password', 'passwordConfirm', 'active')
// delete a user
exports.deleteUser = handlerFactory.deleteOne(User)
