//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const authController = require('../controllers/authController')
const userHandler = require('./../handlers/userHandler')

//
// CONFIGURE
//
const router = express.Router()

//
// PUBLIC ROUTES
//
// login
router.post('/login', authController.login)
// logout
router.get('/logout', authController.logout)
// router.post('/forgotPassword', authController.forgotPassword)
// router.patch('/resetPassword/:token', authController.resetPassword)

//
// ROUTES FOR LOGGED IN USERS
//
// protect for logged in users
// router.use(authController.protect)
// router.patch('/updateMyPassword', authController.updatePassword)
// router.get('/me', userController.getMe, userController.getUser)
// router.patch('/updateMe', userController.updateMe)

//
// ROUTES FOR ADMINS ONLY
//
// router.use(authController.restrictTo('admin'))
//get all users, create user
router
    .route('/')
    .get(userHandler.getAllUsers)
    .post(userHandler.createUser)
// get, update, delete
router
    .route('/:id')
    .get(userHandler.getUser)
    .patch(userHandler.updateUser)
    .delete(userHandler.deleteUser)

//
// EXPORTS
//
module.exports = router
