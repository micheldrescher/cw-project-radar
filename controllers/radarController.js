//
// IMPORTS
//
// app modules
const APIFeatures = require('./../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const handlerFactory = require('./handlerFactory')
// const logger = require('./../utils/logger')
const Radar = require('./../models/radarModel')

exports.getRadar = handlerFactory.getOne(Radar)
exports.getAllRadars = handlerFactory.getAll(Radar)
exports.createRadar = handlerFactory.createOne(Radar)
// const updateRadar = handlerFactory.updateOne(Radar)
// const deleteRadar = handlerFactory.deleteOne(Radar)

exports.getEditions = catchAsync(async (req, res, next) => {
    // we want only published radars
    let filter = { status: { $in: ['prepared', 'published'] } }
    // sort by year, then editiion (desc.)
    // include only the slug and the name
    let queryStr = { sort: '-year,release', fields: 'name,slug,status,year,release' }
    const features = new APIFeatures(Radar.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const results = await features.query

    res.status(200).json({
        status: 'success',
        results: results.length,
        data: results
    })
})
