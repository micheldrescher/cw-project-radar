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
router.get('/graph/:slug?', handler.getRendering)

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
    .get(authC.protect, authC.restrictTo('admin', 'manager'), handler.getAllRadars)
    .post(
        authC.protect,
        authC.restrictTo('admin', 'manager'),
        sanitiser.scrubEmpty,
        handler.createRadar
    )
router
    .route('/:slug?')
    .get(authC.protect, authC.restrictTo('admin', 'manager'), handler.getRadarBySlug)
router
    .route('/:id')
    .patch(
        authC.protect,
        authC.restrictTo('admin', 'manager'),
        sanitiser.scrubEmpty,
        handler.updateRadar
    )
    .delete(authC.protect, authC.restrictTo('admin', 'manager'), handler.deleteRadar)

router.patch(
    '/:slug/populate/:date?',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.populateRadar
)
router.patch(
    '/:slug/render',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.renderRadar
)
router.patch(
    '/:slug/publish/:date?',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.publishRadar
)
router.patch(
    '/:slug/re-publish',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.republishRadar
)
router.patch(
    '/:slug/archive',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.archiveRadar
)
router.patch(
    '/:slug/reset',
    authC.protect,
    authC.restrictTo('admin', 'manager'),
    handler.resetRadar
)

//
// EXPORTS
//
module.exports = router
