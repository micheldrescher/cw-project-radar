//
// IMPORTS
//
// libraries
const moment = require('moment')
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
const httpResponses = require('../utils/httpResponses')
const { validProjectIDs } = require('../utils/validator')
const logger = require('./../utils/logger')
const { Project } = require('../models/projectModel')
const Radar = require('../models/radarModel')
const { RadarData, RadarRendering } = require('../models/radarDataModel')
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
    let radar

    // 1) Live or edition?
    if (req.params.slug) {
        radar = await radarController.getRadarBySlug(req.params.slug)
    } else {
        radar = await radarController.getLiveRadar()
    }

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
    res.status(400).json({
        status: 'error',
        message:
            'Radars no longer support populating and rendering; created radars are published straight away (folding the populate and rander steps into the third, publishing, action).',
    })
})

// render the populated radar data into a SVG image
exports.renderRadar = catchAsync(async (req, res, next) => {
    res.status(400).json({
        status: 'error',
        message:
            'Radars no longer support populating and rendering; created radars are published straight away (folding the populate and rander steps into the third, publishing, action).',
    })
})

// publish the radar
exports.publishRadar = catchAsync(async (req, res, next) => {
    const { slug, date } = req.params
    const cutOffDate = moment(date) // creates a Date.now() if date param is missing

    // 1) Obtain the radar
    let radar = await radarController.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // radar state change check
    if (!['created'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state created.`, 400)
    }

    // 2) Let the radar controller publish the radar
    radar = await radarController.publishRadar(radar, cutOffDate)
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while publishing the radar.`, 500))
    }

    // 3) Return successful result
    res.status(200).json({
        status: 'success',
        message: 'Radar published.',
    })
})

// publish the radar
exports.republishRadar = catchAsync(async (req, res, next) => {
    const { slug } = req.params

    // 1) Obtain the radar
    let radar = await radarController.getRadarBySlug(slug)
    if (!radar) {
        return next(new AppError(`No radar found for id ${slug}.`, 404))
    }
    // radar state change check
    if (!['published'].includes(radar.status)) {
        return next(new AppError(`Radar ${radar.name} is not in state created.`, 400))
    }

    // 2) Remove any data or rendering from the radar
    await RadarData.findByIdAndDelete(radar.data)
    await RadarRendering.findByIdAndDelete(radar.rendering)
    radar.data = undefined
    radar.rendering = undefined

    // 3) render the radar with the cutoff date already set in the radar
    radar = await radarController.publishRadar(radar, moment(radar.referenceDate))
    if (!radar || radar.length === 0) {
        return next(new AppError(`Error while publishing the radar.`, 500))
    }

    // 4) Return success
    res.status(200).json({
        status: 'success',
        message: 'Radar published.',
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
        message: 'Radar archived.',
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
        message: 'Radar successfully archived.',
    })
})

exports.getRendering = catchAsync(async (req, res, next) => {
    const { slug } = req.params
    const rendering = await radarController.getRendering(slug)

    if (!rendering) {
        return next(new AppError(`No rendering found for radar ${slug}.`, 404))
    }

    res.status(200).json({
        status: 'success',
        rendering,
    })
})

exports.getStats = catchAsync(async (req, res, next) => {
    // prjs param checking
    if (!req.query.prjs || !validProjectIDs(req.query.prjs)) {
        throw new AppError("Invalid 'prjs' query parameter. Check documentation.")
    }
    const ids = req.query.prjs.split(',').map(Number)
    const aMonth = 30 * 24 * 60 * 60 * 1000
    const agg = [
        { $match: { cw_id: { $in: ids } } },
        {
            $set: {
                duration: { $divide: [{ $subtract: ['$endDate', '$startDate'] }, aMonth] },
            },
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                avg_dur: { $avg: '$duration' },
                tot_dur: { $sum: '$duration' },
                avg_bud: { $avg: '$totalCost' },
                tot_bud: { $sum: '$totalCost' },
                types: { $addToSet: '$type' },
            },
        },
    ]

    const r = await Project.aggregate(agg)

    res.status(200).json({
        status: 'success',
        data: r[0],
    })
})
