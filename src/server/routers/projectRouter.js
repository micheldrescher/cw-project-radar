//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const projectHandler = require('../handlers/projectHandler')
const authC = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), projectHandler.getAllProjects)
    .post(authC.protect, authC.restrictTo('admin', 'cw-hub'), projectHandler.createProject)
    .patch(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        projectHandler.importFile, // moves the multi-part file data into the request object
        projectHandler.importProjects // reads from request object as usual
    )
router
    .route('/:id')
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), projectHandler.getProject)
    .patch(authC.protect, authC.restrictTo('admin', 'cw-hub'), projectHandler.updateProject)
    .delete(authC.protect, authC.restrictTo('admin', 'cw-hub'), projectHandler.deleteProject)

// This is BY CW ID!!
router.post(
    '/:cwid/categorise',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    projectHandler.addCategory
)
// This is BY CW ID!!
router.post(
    '/:cwid/score',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    projectHandler.addMTRLScore
)
// This is BY CW ID!!
router.get(
    '/prj_id/:cwid',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    projectHandler.getByCWId
)

//
// EXPORTS
//
module.exports = router
