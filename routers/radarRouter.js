//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
// const AppError = require('./../utils/AppError')
const radarController = require('./../controllers/radarController')
const authController = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(radarController.getAllRadars)
    .post(radarController.createRadar)
router.get('/editions', authController.isLoggedIn, radarController.getEditions)

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
