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
// users
router.get('/user/login', viewsH.loginForm)
//
// PROTECTED ROUTES
//
// users
router.get('/user/account', authC.protect, viewsH.accountPage)
//
// RESTRICTED ROUTES
//
router.use('/admin/user', authC.protect, authC.restrictTo('admin'))
//admin actions
router.get('/admin/user/edit/:id', viewsH.editUser)
router.get('/admin/user', viewsH.manageUsers)

//
// EXPORTS
//
module.exports = router
