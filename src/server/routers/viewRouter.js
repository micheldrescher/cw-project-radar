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
// PUBLIC ROUTES
//
// main
router.get('/', viewsH.showMain)
// radars
router.get('/radar/:slug', viewsH.showRadar)
//
// PROTECTED ROUTES
//
router.use(authC.protect)
// users
router.get('/user/login', viewsH.loginForm)
router.get('/user/account', viewsH.accountPage)
//
// RESTRICTED ROUTES
//
router.use(authC.restrictTo('admin'))
//admin actions
router.get('/admin/users/edit/:id', viewsH.editUser)
router.get('/admin/users', viewsH.manageUsers)
// router.post('/submit-user-data', authController.protect, viewsController.updateUserData)

//
// EXPORTS
//
module.exports = router
