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
