//
// IMPORTS
//
// libraries
// app modules
const AppError = require('./../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const logger = require('./../utils/logger')
const radarController = require('../controllers/radarController')
const User = require('../models/userModel')

//
// MIDDLEWARE
//
// Add the editions to each request for the header menu
exports.getEditions = catchAsync(async (req, res, next) => {
    // 1) Get editions
    const editions = await radarController.getEditions()
    // 2) Error handling
    if (!editions || editions.length === 0) {
        res.locals.alert = {
            status: 'warning',
            message: 'Unable to fetch radar editions.'
        }
    } else {
        // 4) process result
        res.locals.editions = editions
    }

    next()
})

/********************************/
/*                              */
/*   PUBLIC HANDLER FUNCTIONS   */
/*                              */
/********************************/
//
// show main/entry page
//
exports.showMain = catchAsync(async (req, res, next) => {
    // TODO expand on default content.
    res.status(200).render('main', {
        title: 'Welcome'
    })
})

//
// Fetch the requested radar, and render the 'radar template page
//
exports.showRadar = catchAsync(async (req, res, next) => {
    // 1) Get the requested radar slug
    const { slug } = req.params

    // 2) Fetch the corresponding radar
    const radar = await radarController.getRadarBySlug(slug, 'rendering')
    if (!radar) {
        return next(new AppError(`No radar found for id ${slug}.`, 404))
    }

    // 4) Show success page
    res.status(200).render(`${__dirname}/../views/radar`, {
        title: radar.name,
        radar
    })
})

/******************************/
/*                            */
/*   USER ACCOUNT FUNCTIONS   */
/*                            */
/******************************/

//
// show the login form
//
exports.loginForm = (req, res) => {
    res.status(200).render('user/login', {
        title: 'Login'
    })
}

//
// User account page
//
exports.accountPage = (req, res) => {
    res.status(200).render('user/account', {
        title: 'Your account'
    })
}

//
// User account page
//
exports.manageUsers = catchAsync(async (req, res, next) => {
    // 1) Fetch all users - except "myself"
    const users = await User.find({
        _id: { $ne: res.locals.user._id }
    })
    if (!users) {
        return next(new AppError(`No users found in this application. Schrodinger's users?`, 404))
    }

    // 2) Render user management page
    res.status(200).render('admin/manageUsers', {
        title: 'Manage users',
        users
    })
})

exports.editUser = catchAsync(async (req, res, next) => {
    // 1) Fetch the user
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new AppError(`No user found with the given id!`, 404))
    }

    // 2) Render user edit page
    res.status(200).render('admin/editUser', {
        title: 'Edit use details',
        targetUser: user
    })
})
