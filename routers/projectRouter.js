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
router.route('/:id/categorise').post(projectHandler.addCategory)
router.route('/:id/score').post(projectHandler.addMTRLScore)
router.route('/prj_id/:id').get(projectHandler.getByCWId)

//
// EXPORTS
//
module.exports = router
