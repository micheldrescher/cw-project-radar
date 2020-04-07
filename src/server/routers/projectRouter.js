//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const handler = require('../handlers/projectHandler')
const authC = require('./../controllers/authController')
const sanitiser = require('../utils/sanitiseJSON')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.getAllProjects)
    .post(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        sanitiser.scrubBody,
        handler.createProject
    )
    .patch(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        handler.importFile, // moves the multi-part file data into the request object
        handler.importProjects // reads from request object as usual
    )

router
    .route('/:id')
    .get(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.getProject)
    .patch(
        authC.protect,
        authC.restrictTo('admin', 'cw-hub'),
        sanitiser.scrubBody,
        handler.updateProject
    )
    .delete(authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.deleteProject)

// This is BY CW ID!!
router.post(
    '/:cwid/categorise',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    sanitiser.scrubBody,
    handler.addCategory
)
// This is BY CW ID!!
router.post(
    '/:cwid/score',
    authC.protect,
    authC.restrictTo('admin', 'cw-hub'),
    sanitiser.scrubBody,
    handler.addMTRLScore
)
// This is BY CW ID!!
router.get('/prj_id/:cwid', authC.protect, authC.restrictTo('admin', 'cw-hub'), handler.getByCWId)

//
// EXPORTS
//
module.exports = router
