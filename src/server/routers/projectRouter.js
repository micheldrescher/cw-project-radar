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

/*********************/
/*                   */
/*   PUBLIC ROUTES   */
/*                   */
/*********************/
// get project by Cyberwatching ID
router.get('/prj_id/:cwid', handler.getByCWId)
router.post('/match', handler.getMatchingProjects)

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
router.use('/', authC.protect, authC.restrictTo('admin', 'cw-hub'))
router.use('/:id', authC.protect, authC.restrictTo('admin', 'cw-hub'))

router
    .route('/')
    .get(handler.getAllProjects)
    .post(sanitiser.scrubBody, handler.createProject)
    .patch(handler.importFile, handler.importProjects)
router
    .route('/:id')
    .get(handler.getProject)
    .patch(sanitiser.scrubBody, handler.updateProject)
    .delete(handler.deleteProject)
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

//
// EXPORTS
//
module.exports = router
