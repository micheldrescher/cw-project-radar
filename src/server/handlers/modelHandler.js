//
// IMPORTS
//
// libraries
// app modules
const catchAsync = require('../utils/catchAsync')
// const logger = require('./../utils/logger')
const AppError = require('../utils/AppError')

exports.getDimensions = catchAsync(async (req, res, next) => {
    // get the dimensions from process.env
    const model = {
        segments: process.env.MODEL_SEGMENTS.split(',').map((e) => e.trim()),
        rings: process.env.MODEL_RINGS.split(',').map((e) => e.trim()),
        lcycle: process.env.MODEL_LCYCLE.split(',').map((e) => e.trim()),
    }
    if (!model.segments || !model.rings || !model.lcycle) {
        throw new AppError('No model data found!', 404)
    }

    console.log(model)
    // return project if found
    res.status(200).json({
        status: 'success',
        data: model,
    })
})
