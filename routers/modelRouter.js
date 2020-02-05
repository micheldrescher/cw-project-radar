//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const modelHandler = require('./../handlers/modelHandler')
// const authController = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(modelHandler.getAllModels)
    .post(modelHandler.createModel)
router
    .route('/:id')
    .get(modelHandler.getModel)
    .patch(modelHandler.updateModel)
    .delete(modelHandler.deleteModel)

// router
//     .route('/')
//     .get(getAllRadars)

// router.route('/list').get(getRadarList)

// router
//     .route('/:id')
//     .get(getRadar)
//     .patch(protect, restrictTo('admin'), updateRadar)
//     .delete(protect, restrictTo('admin'), deleteRadar)

//
// EXPORTS
//
module.exports = router
