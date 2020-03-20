//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const authC = require('../controllers/authController')
const viewsH = require('../handlers/viewsHandler')

//
// CONFIGURE
//
const router = express.Router()

//
// ROUTER MIDDLEWARE
//
// all editions for the header
router.use(viewsH.getEditions)
// user menu in the header
router.use(authC.isLoggedIn)

//
// ROUTES
//
// main
router.get('/', viewsH.showMain)
// radars
router.get('/radar/:slug', viewsH.showRadar)
// users
router.get('/user/login', authC.isLoggedIn, viewsH.loginForm)
router.get('/user/account', authC.protect, viewsH.accountPage)

// router.post('/submit-user-data', authController.protect, viewsController.updateUserData)

//
// EXPORTS
//
module.exports = router
