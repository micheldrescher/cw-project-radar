//
// IMPORTS
//
// libraries
// app modules
const APIFeatures = require('./../utils/apiFeatures')
// const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const Radar = require('./../models/radarModel')

// exports.alerts = (req, res, next) => {
//     const { alert } = req.query
//     if (alert === 'booking')
//         res.locals.alert =
//             "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later."
//     next()
// }

exports.getPage = catchAsync(async (req, res, next) => {
    // 1) Get the radar editions and add them to the response
    let filter = { status: { $in: ['prepared', 'published'] } }
    // sort by year, then editiion (desc.)
    // include only the slug and the name
    let queryStr = { sort: '-year,-edition', fields: 'name,slug,status' }
    const features = new APIFeatures(Radar.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const editions = await features.query
    res.status(200).render('main', {
        title: 'Cyberwatching Project Radar',
        editions: editions
    })
})

// exports.getTour = catchAsync(async (req, res, next) => {
//     // 1) Get the data, for the requested tour (including reviews and guides)
//     const tour = await Tour.findOne({ slug: req.params.slug }).populate({
//         path: 'reviews',
//         fields: 'review rating user'
//     })

//     if (!tour) {
//         return next(new AppError('There is no tour with that name.', 404))
//     }

//     // 2) Build template
//     // 3) Render template using data from 1)
//     res.status(200).render('tour', {
//         title: `${tour.name} Tour`,
//         tour
//     })
// })

// exports.getLoginForm = (req, res) => {
//     res.status(200).render('login', {
//         title: 'Log into your account'
//     })
// }

// exports.getAccount = (req, res) => {
//     res.status(200).render('account', {
//         title: 'Your account'
//     })
// }

// exports.getMyTours = catchAsync(async (req, res, next) => {
//     // 1) Find all bookings
//     const bookings = await Booking.find({ user: req.user.id })

//     // 2) Find tours with the returned IDs
//     const tourIDs = bookings.map(el => el.tour)
//     const tours = await Tour.find({ _id: { $in: tourIDs } })

//     res.status(200).render('overview', {
//         title: 'My Tours',
//         tours
//     })
// })

// exports.updateUserData = catchAsync(async (req, res, next) => {
//     const updatedUser = await User.findByIdAndUpdate(
//         req.user.id,
//         {
//             name: req.body.name,
//             email: req.body.email
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     )

//     res.status(200).render('account', {
//         title: 'Your account',
//         user: updatedUser
//     })
// })
