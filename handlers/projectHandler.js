//
// IMPORTS
//
// app modules
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const { Project } = require('../models/projectModel')
const projectController = require('../controllers/projectController')

exports.createProject = handlerFactory.createOne(Project)
exports.getProject = handlerFactory.getOne(Project)
exports.getAllProjects = handlerFactory.getAll(Project)
exports.updateProject = handlerFactory.updateOne(Project)
exports.deleteProject = handlerFactory.deleteOne(Project)

exports.getByCWId = catchAsync(async (req, res, next) => {
    const project = await projectController.getByCWId(req.params.id)

    res.status(200).json({
        status: 'success',
        data: project
    })
})

//
// Add an classification to a project
//
exports.addCategory = catchAsync(async (req, res, next) => {
    // 1) fetch data
    const { id } = req.params
    const category = req.body

    // 2) add score and save the proejct
    const project = await projectController.addCategory(id, category)

    // 3) Assemble successful response
    res.status(201).json({
        status: 'success',
        data: project
    })
})

//
// Add an MTRL score to a project
//
exports.addMTRLScore = catchAsync(async (req, res, next) => {
    // 1) fetch data
    const { id } = req.params
    const score = req.body

    // 2) add score and save the proejct
    const project = await projectController.addMTRLScore(id, score)

    // 3) Assemble successful response
    res.status(201).json({
        status: 'success',
        data: project
    })
})
