//
// IMPORTS
//
// libraries
const express = require('express')
// app modules
const authC = require('../controllers/authController')
const userH = require('./../handlers/userHandler')

//
// CONFIGURE
//
const router = express.Router()

//
// PUBLIC ROUTES
//
// login
router.post('/login', authC.login)

//
// ROUTES FOR LOGGED IN USERS
//
// logout
router.get('/logout', authC.protect, authC.logout)
// update password
router.patch('/updatePassword', authC.protect, authC.updatePassword)

//
// ROUTES FOR ADMINS ONLY
//
//get all users, create user
router
    .route('/')
    .get(authC.protect, authC.restrictTo('admin'), userH.getAllUsers)
    .post(authC.protect, authC.restrictTo('admin'), userH.createUser)
// get, update, delete
router
    .route('/:id')
    .get(authC.protect, authC.restrictTo('admin'), userH.getUser)
    .patch(authC.protect, authC.restrictTo('admin'), userH.updateUser)
    .delete(authC.protect, authC.restrictTo('admin'), userH.deleteUser)

//
// EXPORTS
//
module.exports = router
