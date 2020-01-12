import express from 'express'
import {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    updatePassword,
    deleteUser
} from './../controllers/userController'
import { login, logout, restrictTo, protect } from './../controllers/authController'

export { router as default }

const router = express.Router()

// router.post('/signup', authController.signup)
router.post('/login', login)
router.get('/logout', logout)

// router.post('/forgotPassword', authController.forgotPassword)
// router.patch('/resetPassword/:token', authController.resetPassword)

// Protect all routes after this middleware
// router.use(authController.protect)

// router.patch('/updateMyPassword', authController.updatePassword)
// router.get('/me', userController.getMe, userController.getUser)
// router.patch(
//     '/updateMe',
//     userController.uploadUserPhoto,
//     userController.resizeUserPhoto,
//     userController.updateMe
// )
// router.delete('/deleteMe', userController.deleteMe)

// Protect all routes after this middleware
router.use(protect)
// restrict them to an admin user
router.use(restrictTo('admin'))

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

router.route('/:id/password').patch(updatePassword)
