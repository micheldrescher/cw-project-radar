//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const modelController = require('./../controllers/modelController')
// const authController = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(modelController.getAllModels)
    .post(modelController.createModel)
router
    .route('/:id')
    .get(modelController.getModel)
    .patch(modelController.updateModel)
    .delete(modelController.deleteModel)

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
