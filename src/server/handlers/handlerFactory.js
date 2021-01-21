//
// IMPORTS
//
// app modules
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const controllerFactory = require('../controllers/controllerFactory')

exports.createOne = (Model, ...fieldNames) =>
    catchAsync(async (req, res, next) => {
        let doc = req.body
        if (fieldNames) {
            doc = this.filterFields(doc, fieldNames)
        }
        doc = await controllerFactory.createOne(Model, doc)

        res.status(201).json({
            status: 'success',
            data: {
                doc,
            },
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
                data: doc,
            },
        })
    })

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.getAll(Model, req.query)
        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc,
            },
        })
    })

exports.updateOne = (Model, ...disallowedFields) =>
    catchAsync(async (req, res, next) => {
        let doc = req.body
        if (disallowedFields) {
            doc = this.filterFields(doc, disallowedFields)
        }
        doc = await controllerFactory.updateOne(Model, req.params.id, doc)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        })
    })

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await controllerFactory.deleteOne(Model, req.params.id)

        if (!doc) {
            return next(new AppError('No document found with that ID', 404))
        }

        res.status(200).json({
            status: 'success',
        })
    })

exports.filterFields = (obj, disallowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach((el) => {
        if (!disallowedFields.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}
