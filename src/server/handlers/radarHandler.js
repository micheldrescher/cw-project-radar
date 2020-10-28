//
// IMPORTS
//
// libraries
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
const httpResponses = require('../utils/httpResponses')
// const logger = require('./../utils/logger')
const Radar = require('../models/radarModel')
const radarController = require('./../controllers/radarController')

exports.createRadar = handlerFactory.createOne(
    Radar,
    'status',
    'data',
    'populationDate',
    'rendering'
)
exports.getRadar = handlerFactory.getOne(Radar)
exports.getAllRadars = handlerFactory.getAll(Radar)
exports.updateRadar = handlerFactory.updateOne(
    Radar,
    'status',
    'data',
    'populationDate',
    'rendering'
)
exports.deleteRadar = handlerFactory.deleteOne(Radar)

// returns ONE radar (or undefined) if slug is invalid.
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
        radar: radar,
    })
})

exports.getEditions = catchAsync(async (req, res, next) => {
    // 1) Get editions
    const editions = await radarController.getEditions()

    // 2) Error handling
    if (!editions) {
        return next(
            new AppError('Could not fetch radar editions. Contact system administrator.', 500)
        )
    }

    // 3) Assemble successful response
    res.status(200).json({
        status: 'success',
        results: editions.length,
        data: editions,
    })
})

//
// state change operations
//
// populate the radar with all necessary data to render the visualisation
exports.populateRadar = catchAsync(async (req, res, next) => {
    const { slug, date } = req.params

    const radar = await radarController.populateRadar(slug, date)
    if (!radar) {
        return next(new AppError(`Error while populating the radar.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar,
    })
})

// render the populated radar data into a SVG image
exports.renderRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params

    const radar = await radarController.renderRadar(slug)
    if (!radar) {
        return next(new AppError(`Error while rendering radar ${slug}.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar,
    })
})

// publish the radar
exports.publishRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params

    const radar = await radarController.publishRadar(slug)
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while publishing the radar.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar,
    })
})

// reset the radar
exports.archiveRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params

    const radar = await radarController.archiveRadar(slug)
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while archiving the radar.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar,
    })
})

// reset the radar
exports.resetRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params

    const radar = await radarController.resetRadar(slug)
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while populating the radar.`, 500))
    }

    res.status(200).json({
        status: 'success',
        radar,
    })
})
