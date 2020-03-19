//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const authController = require('../controllers/authController')
const viewsHandler = require('../handlers/viewsHandler')

//
// CONFIGURE
//
const router = express.Router()

//
// ROUTER MIDDLEWARE
//
// all editions for the header
router.use(viewsHandler.getEditions)
// user menu in the header
router.use(authController.isLoggedIn)

//
// ROUTES
//
// main
router.get('/', viewsHandler.showMain)
// radars
router.get('/radar/:slug', viewsHandler.showRadar)
// users
router.get('/user/login', authController.isLoggedIn, viewsHandler.loginForm)

// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm)
// router.get('/me', authController.protect, viewsController.getAccount)

// router.get('/my-tours', authController.protect, viewsController.getMyTours)

// router.post('/submit-user-data', authController.protect, viewsController.updateUserData)

//
// EXPORTS
//
module.exports = router
