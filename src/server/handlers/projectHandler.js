//
// IMPORTS
//
// libraries
const multer = require('multer')
// app modules
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const AppError = require('../utils/AppError')
const { Project } = require('../models/projectModel')
const projectController = require('../controllers/projectController')

//
// CONFIGURE MULTER FOR FILE UPLOADS
//
// store all uploads in memory
const multerStorage = multer.memoryStorage()
// filter out anything that is not text/csv or text/tsv
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('text')) {
        cb(null, true)
    } else {
        cb(new AppError('Not a text file!', 400), false)
    }
}
// multer middleware to store multipart import-file data in the request object
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.importFile = upload.single('importfile')
// actually imports the projects
exports.importProjects = catchAsync(async (req, res, next) => {
    // 1) Check if there is a file in the req object
    if (!req.file) return next()

    // 2) Pull the file's buffer and pass it onto the project controller
    const result = await projectController.importProjects(req.file.buffer)

    // 3 If all ok return a success / 200 OK response
    res.status(201).json({
        status: 'success',
        messages: result.messages
    })
})

exports.createProject = handlerFactory.createOne(
    Project,
    'cw_id',
    'hasClassifications',
    'hasScores'
)
exports.getProject = handlerFactory.getOne(Project)
exports.getAllProjects = handlerFactory.getAll(Project)
exports.updateProject = handlerFactory.updateOne(
    Project,
    'cw_id',
    'hasClassifications',
    'hasScores'
)
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

//
// Search for projects that match the given filter tags
//
exports.getMatchingProjects = catchAsync(async (req, res, next) => {
    const result = await projectController.getMatchingProjects(req.body.filter)
    res.status(200).json({
        status: 'success',
        data: result
    })
})

//
// Search for projects using the given search criteria
//
exports.findProjects = catchAsync(async (req, res, next) => {
    const result = await projectController.findProjects(req.body)
    res.status(200).json({
        status: 'success',
        results: result.length,
        data: result
    })
})
