//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const projectHandler = require('./../handlers/projectHandler')
// const authController = require('./../controllers/authController')

const router = express.Router()

//
// ROUTES
//
router
    .route('/')
    .get(projectHandler.getAllProjects)
    .post(projectHandler.createProject)
router
    .route('/:id')
    .get(projectHandler.getProject)
    .patch(projectHandler.updateProject)
    .delete(projectHandler.deleteProject)
router.route('/:cwid/categorise').post(projectHandler.addCategory) // This is BY CW ID!!
router.route('/:cwid/score').post(projectHandler.addMTRLScore) // This is BY CW ID!!
router.route('/prj_id/:cwid').get(projectHandler.getByCWId) // This is BY CW ID!!

//
// EXPORTS
//
module.exports = router
