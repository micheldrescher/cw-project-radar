//
// IMPORTS
//
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const controllerFactory = require('../controllers/controllerFactory')

exports.createOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.createOne(Model, req.body)

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    })

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.getOne(Model, req.params.id, popOptions)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    })

exports.getAll = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.getAll(Model, req.query)
        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        })
    })

exports.updateOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.updateOne(Model, req.params.id, req.body)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    })

exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.deleteOne(Model, req.params.id)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null
        })
    })
