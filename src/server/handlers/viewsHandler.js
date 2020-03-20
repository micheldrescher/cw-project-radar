//
// IMPORTS
//
// libraries
// app modules
const AppError = require('./../utils/AppError')
const catchAsync = require('../utils/catchAsync')
const logger = require('./../utils/logger')
const radarController = require('../controllers/radarController')

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
