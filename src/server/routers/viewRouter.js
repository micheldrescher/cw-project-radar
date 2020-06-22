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

/*********************/
/*                   */
/*   PUBLIC ROUTES   */
/*                   */
/*********************/
router.get('/', viewsH.showMain) // main page
router.get('/radar/:slug', viewsH.showRadar) // display the indicated radar
router.get('/user/login', viewsH.loginForm) // user login form

/*****************************/
/*                           */
/*   LOGGED IN USER ROUTES   */
/*                           */
/*****************************/
router.get('/user/account', authC.protect, viewsH.accountPage) // user account page

/*******************************/
/*                             */
/*   ADMIN RESTRICTED ROUTES   */
/*                             */
/*******************************/
//
// User administration
//
router.use('/admin/user', authC.protect, authC.restrictTo('admin'))
router.get('/admin/user', viewsH.manageUsers) // user admin panel
router.get('/admin/user/edit/:id', viewsH.editUser) // edit user details
//
// Radar administration
//
router.use('/admin/radar', authC.protect, authC.restrictTo('admin', 'manager'))
router.get('/admin/radar', viewsH.manageRadars) // radar admin panel
router.get('/admin/radar/edit/:id', viewsH.editRadar) // edit a radar
//
// Project administration
//
router.use('/admin/project', authC.protect, authC.restrictTo('admin', 'manager'))
router.get('/admin/project', viewsH.manageProjects) // project admin panel
router.get('/admin/project/edit/:id', viewsH.editProject) // edit project form

//
// EXPORTS
//
module.exports = router
