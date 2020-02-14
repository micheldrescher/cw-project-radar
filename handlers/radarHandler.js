//
// IMPORTS
//
// libraries
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const Radar = require('../models/radarModel')
const radarController = require('./../controllers/radarController')

exports.createRadar = handlerFactory.createOne(Radar, 'status', 'data', 'rendering')
exports.getRadar = handlerFactory.getOne(Radar)
exports.getAllRadars = handlerFactory.getAll(Radar)
exports.updateRadar = handlerFactory.updateOne(Radar, 'status', 'data', 'rendering')
exports.deleteRadar = handlerFactory.deleteOne(Radar)

exports.getRadarBySlug = catchAsync(async (req, res, next) => {
    // 1) Get radar
    const radar = await radarController.getRadarBySlug(req.params.slug)

    // 2) Error handling if no radar found
    if (!radar || radar.length === 0) {
        return next(new AppError('No such radar found.', 404))
    }

    // 3) Assemble successful response
    res.status(200).json({
        status: 'success',
        results: 1,
        radar: radar
    })
})

exports.getEditions = catchAsync(async (req, res, next) => {
    // 1) Get editions
    const editions = radarController.getEditions()

    // 2) Error handling
    if (!editions || editions.length === 0) {
        return next(
            new AppError('Could not fetch radar editions. Contact system administrator.', 500)
        )
    }

    // 3) Assemble successful response
    res.status(200).json({
        status: 'success',
        results: editions.length,
        data: editions
    })
})

//
// state change operations
//
exports.populateRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params
    const { date } = req.params

    const radar = await radarController.populateRadar(slug, Date.parse(date))
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while populating the radar.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar
    })
})
