//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const authC = require('../controllers/authController')
const userH = require('./../handlers/userHandler')
const sanitiser = require('../utils/sanitiseJSON')

//
// CONFIGURE
//
const router = express.Router()

/*********************/
/*                   */
/*   PUBLIC ROUTES   */
/*                   */
/*********************/
// login
router.post('/login', authC.login)

/*****************************/
/*                           */
/*   LOGGED IN USER ROUTES   */
/*                           */
/*****************************/
// logout
router.get('/logout', authC.protect, authC.logout)
// update password
router.patch('/updatePassword', authC.protect, sanitiser.scrubEmpty, authC.updatePassword)

/*******************************/
/*                             */
/*   ADMIN RESTRICTED ROUTES   */
/*                             */
/*******************************/
//get all users, create user
router
    .route('/')
    .get(authC.protect, authC.restrictTo('admin'), userH.getAllUsers)
    .post(authC.protect, authC.restrictTo('admin'), sanitiser.scrubEmpty, userH.createUser)
// get, update, delete
router
    .route('/:id')
    .get(authC.protect, authC.restrictTo('admin'), userH.getUser)
    .patch(authC.protect, authC.restrictTo('admin'), sanitiser.scrubEmpty, userH.updateUser)
    .delete(authC.protect, authC.restrictTo('admin'), userH.deleteUser)
// admin updating user's password
router.patch(
    '/:id/password',
    authC.protect,
    authC.restrictTo('admin'),
    sanitiser.scrubEmpty,
    authC.updateUserPassword
)

//
// EXPORTS
//
module.exports = router
