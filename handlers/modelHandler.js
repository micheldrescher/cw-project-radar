//
// IMPORTS
//
// app modules
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const Model = require('../models/modelModel')

exports.getModel = handlerFactory.getOne(Model)
exports.getAllModels = handlerFactory.getAll(Model)
exports.createModel = handlerFactory.createOne(Model)
exports.updateModel = handlerFactory.updateOne(Model)
exports.deleteModel = handlerFactory.deleteOne(Model)
