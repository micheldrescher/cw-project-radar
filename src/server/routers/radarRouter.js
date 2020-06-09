//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
// const AppError = require('./../utils/AppError')
const handler = require('./../handlers/radarHandler')
const authC = require('./../controllers/authController')
const sanitiser = require('../utils/sanitiseJSON')

const router = express.Router()

/*********************/
/*                   */
/*   PUBLIC ROUTES   */
/*                   */
/*********************/
router.get('/editions', handler.getEditions)

/*****************************/
/*                           */
/*   LOGGED IN USER ROUTES   */
/*                           */
/*****************************/

/*******************************/
/*                             */
/*   ADMIN RESTRICTED ROUTES   */
/*                             */
/*******************************/

router
    .route('/')
    // .get(authController.isLoggedIn, radarController.getAllRadars)
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.getAllRadars)
    .post(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        sanitiser.scrubEmpty,
        handler.createRadar
    )
router
    .route('/:slug')
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.getRadarBySlug)
router
    .route('/:id')
    .patch(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        sanitiser.scrubEmpty,
        handler.updateRadar
    )
    .delete(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.deleteRadar)

router.patch(
    '/:slug/populate/:date?',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    handler.populateRadar
)
router.patch(
    '/:slug/render',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    handler.renderRadar
)
router.patch(
    '/:slug/publish',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    handler.publishRadar
)
router.patch(
    '/:slug/archive',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    handler.archiveRadar
)
router.patch('/:slug/reset', authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.resetRadar)

//
// EXPORTS
//
module.exports = router
