//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
// const AppError = require('./../utils/AppError')
const radarHandler = require('./../handlers/radarHandler')
const authC = require('./../controllers/authController')

const router = express.Router()

//
// PUBLIC ROUTES
//
router.get('/editions', radarHandler.getEditions)

//
// PROTECTED ROUTES (LOGGED IN USERS ONLY)
//

//
// RESTRICTED ROUTES (CERTAIN ROLES ONLY)
//

router
    .route('/')
    // .get(authController.isLoggedIn, radarController.getAllRadars)
    .get(authC.protect, authC.restrictTo('admn', 'cw-hub'), radarHandler.getAllRadars)
    .post(authC.protect, authC.restrictTo('admn', 'cw-hub'), radarHandler.createRadar)
router
    .route('/:slug')
    .get(authC.protect, authC.restrictTo('admn', 'cw-hub'), radarHandler.getRadarBySlug)
    .patch(authC.protect, authC.restrictTo('admn', 'cw-hub'), radarHandler.updateRadar)
    .delete(authC.protect, authC.restrictTo('admn', 'cw-hub'), radarHandler.deleteRadar)

router.patch(
    '/:slug/populate/:date?',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.populateRadar
)
router.patch(
    '/:slug/render',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.renderRadar
)
router.patch(
    '/:slug/publish',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.publishRadar
)
router.patch(
    '/:slug/archive',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.archiveRadar
)
router.patch(
    '/:slug/reset',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.resetRadar
)
router.patch(
    '/:slug/republish',
    authC.protect,
    authC.restrictTo('admn', 'cw-hub'),
    radarHandler.republishRadar
)

//
// EXPORTS
//
module.exports = router
