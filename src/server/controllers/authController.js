const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')

/***************************/
/*                         */
/*  JWT GEHERIC FUNCTIONS  */
/*                         */
/***************************/
//
// Sign a JWT token to ensure its authenticity
//
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    })
}

//
// Create and send back the JWT in the response
//
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id)

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    })

    // Remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

/********************/
/*                  */
/*  Authentication  */
/*                  */
/********************/
//
// LOGIN
//
exports.login = catchAsync(async (req, res, next) => {
    console.log('ping 1')
    const { name, password } = req.body
    console.log('ping 2,', name, password)

    // 1) Check if email and password are supplied in the request
    if (!name || !password) {
        console.log('ping 3.a HTTP 400')
        return next(new AppError('Please provide name and password!', 400))
    }
    console.log('ping 3.b ')
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ name }).select('+password')
    console.log('ping 4 ')
    console.log(user)

    if (!user || !(await user.correctPassword(password, user.password))) {
        console.log('ping 5.a Wrong name or password HTTP 401')
        return next(new AppError('Incorrect name or password', 401))
    }
    console.log('ping 5.b user OK ')

    // 3) If everything ok, send token to client (JWT is the sign that the user is logged in)
    createSendToken(user, 200, req, res)
})

//
// Logout the current user
//
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 2 * 1000), // the dud token expires in 2 seconds
        httpOnly: true // we are logging in and out over HTTP(S) only
    })
    res.status(200).json({ status: 'success' })
}

//
// Update the password (while being logged in)
//
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password')

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401))
    }

    // 3) If so, update password
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res)
})

/*******************/
/*                 */
/*  Authorisation  */
/*                 */
/*******************/
//
// Decorate the current request with the user corresponding to the supplied token.
// Any error or a missing token denote a user not being logged in and therefore not
// present in the request object.
exports.isLoggedIn = async (req, res, next) => {
    console.log('1) IS LOGGED IN - JWT =', req.cookies.jwt)
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET)

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id)
            if (!currentUser) {
                console.log('2) IS LOGGED IN - NO USER FOUND')
                return next()
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser
            console.log('2) IS LOGGED IN - USER SUCCESSFULLY ADDED TO LOCALS')
            return next()
        } catch (err) {
            console.log('2) IS LOGGED IN - ERROR =', err)
            return next()
        }
    }
    next()
}

//
// Protect a route accessible for LOGGED IN USERS ONLY
//
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401))
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401))
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser
    res.locals.user = currentUser
    next()
})

//
// Restrict a route - ONLY FOR CERTAIN ROLES
//
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }

        next()
    }
}
