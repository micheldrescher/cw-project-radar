//
// IMPORTS
//
// libraries
// app modules
const catchAsync = require('../utils/catchAsync')
// const logger = require('./../utils/logger')
const AppError = require('../utils/AppError')
const modelController = require('../controllers/modelController')

exports.getDimensions = catchAsync(async (req, res, next) => {
    // get the dimensions from process.env
    const model = modelController.getModel()
    if (!model.segments || !model.rings || !model.lcycle) {
        throw new AppError('No model data found!', 404)
    }

    // return project if found
    res.status(200).json({
        status: 'success',
        data: model,
    })
})
