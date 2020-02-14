//
// IMPORTS
//
// app modules
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const AppError = require('../utils/AppError')
const { Project } = require('../models/projectModel')
const projectController = require('../controllers/projectController')

exports.createProject = handlerFactory.createOne(Project)
exports.getProject = handlerFactory.getOne(Project)
exports.getAllProjects = handlerFactory.getAll(Project)
exports.updateProject = handlerFactory.updateOne(Project)
exports.deleteProject = handlerFactory.deleteOne(Project)

exports.getByCWId = catchAsync(async (req, res, next) => {
    const project = await projectController.getByCWId(req.params.cwid)
    if (!project) {
        throw new AppError(`No project found with id ${req.params.cwid}`, 404)
    }

    res.status(200).json({
        status: 'success',
        data: project
    })
})

//
// Add a classification to a project
//
exports.addCategory = catchAsync(async (req, res, next) => {
    // 1) fetch data
    const { cwid } = req.params
    const categoryData = req.body

    // 2) add score and save the proejct
    const classification = await projectController.addCategory(cwid, categoryData)

    // 3) Assemble successful response
    res.status(201).json({
        status: 'success',
        data: classification
    })
})

//
// Add an MTRL score to a project
//
exports.addMTRLScore = catchAsync(async (req, res, next) => {
    // 1) fetch data
    const { cwid } = req.params
    const scoreData = req.body

    // 2) add score and save the proejct
    const score = await projectController.addMTRLScore(cwid, scoreData)

    // 3) Assemble successful response
    res.status(201).json({
        status: 'success',
        data: score
    })
})
