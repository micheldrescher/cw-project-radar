//
// IMPORTS
//
// app modules
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const Project = require('../models/projectModel')

exports.getProject = handlerFactory.getOne(Project)
exports.getAllProjects = handlerFactory.getAll(Project)
exports.createProject = handlerFactory.createOne(Project)
exports.updateProject = handlerFactory.updateOne(Project)
exports.deleteProject = handlerFactory.deleteOne(Project)
