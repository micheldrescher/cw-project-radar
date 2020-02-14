//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
// const AppError = require('./../utils/AppError')
const radarHandler = require('./../handlers/radarHandler')
// const authController = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    // .get(authController.isLoggedIn, radarController.getAllRadars)
    .get(radarHandler.getAllRadars)
    .post(radarHandler.createRadar)
router
    .route('/:slug')
    .get(radarHandler.getRadarBySlug)
    .patch(radarHandler.updateRadar)
    .delete(radarHandler.deleteRadar)

router.get('/:slug/populate/:date', radarHandler.populateRadar)

router.get('/editions', radarHandler.getEditions)

// router
//     .route('/:id')
//     .get(getRadar)
//     .patch(protect, restrictTo('admin'), updateRadar)

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
