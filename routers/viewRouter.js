//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const viewsHandler = require('../handlers/viewsHandler')
// const authController = require('../controllers/authController')

//
// CONFIGURE
//
const router = express.Router()

//
// ROUTER MIDDLEWARE
//
router.use(viewsHandler.getEditions)

//
// ROUTES
//
router.get('/', viewsHandler.showMain)
router.get('/radar/:slug', viewsHandler.showRadar)

// router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour)
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm)
// router.get('/me', authController.protect, viewsController.getAccount)

// router.get('/my-tours', authController.protect, viewsController.getMyTours)

// router.post('/submit-user-data', authController.protect, viewsController.updateUserData)

//
// EXPORTS
//
module.exports = router
