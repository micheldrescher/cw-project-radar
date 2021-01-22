const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/AppError')
const { logger } = require('../utils/logger')
const { validUsername } = require('../utils/validator')

/***************************
 *                         *
 *  Crypto initialisation  *
 *                         *
 ***************************/
const algo = 'aes-192-cbc'
const key = crypto.scryptSync(process.env.JWT_SECRET, 'salt', 24)
const iv = Buffer.alloc(16, 0)
const one_hour = 60 * 60 // 1 hour in seconds

const encryptPayload = (clearText) => {
    const cipher = crypto.createCipheriv(algo, key, iv)
    let encrypted = cipher.update(clearText, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return encrypted
}

const decryptPayload = (cipherText) => {
    const decipher = crypto.createDecipheriv(algo, key, iv)
    let clearText = decipher.update(cipherText, 'hex', 'utf8')
    clearText += decipher.final('utf8')
    return clearText
}

/***************************/
/*                         */
/*  JWT GEHERIC FUNCTIONS  */
/*                         */
/***************************/
//
// Sign a JWT token to ensure its authenticity
//
const signToken = (id) => {
    logger.verbose(
        `AuthN/AuthZ - token will expire in: ${
            Math.min(24 * one_hour, process.env.JWT_EXPIRES_IN * one_hour) / 1000 / 60
        } minutes`
    )
    return jwt.sign({ id: encryptPayload(id.toString()) }, process.env.JWT_SECRET, {
        expiresIn: Math.min(24 * one_hour, process.env.JWT_EXPIRES_IN * one_hour),
    })
}

//
// Create and send back the JWT in the response
//
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id)
    res.cookie('jwt', token, {
        // no expiration --> session cookie only
        httpOnly: true, // no JS access to cookies
        // secure: true, // only ever send over https /* This doesn't work with reverse proxy configs! */
        sameSite: 'Strict', // only ever sent and accepted from the site the cookie came from
    })

    // Remove password from output
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
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
    const { name, password } = req.body
    // 1) Check if email and password are supplied in the request
    if (!name || !password) {
        logger.warn(`Login failed for ${name} - one or both undefined.`)
        return next(new AppError('Please provide name and password!', 400))
    }
    // 2) Validate username and password (NoSQL injection protection)
    if (!validUsername(name)) {
        logger.warn(`Login failed for ${name} - invalid username.`)
        return next(new AppError('Invalid characters in username or password', 400))
    }

    // 3) Check if user exists && password is correct
    const user = await User.findOne({ name }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
        if (!user) logger.warn(`Login failed for ${name} - user does not exist.`)
        else logger.warn(`Login failed for ${name} - incorrect password..`)

        return next(new AppError('Incorrect name or password', 401))
    }

    // 3) If everything ok, send token to client (JWT is the sign that the user is logged in)
    logger.debug(`Login successful for ${name} combo - creating JWT.`)
    createSendToken(user, 200, req, res)
})

//
// Logout the current user
//
exports.logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({ status: 'success' })
}

//
// Update the password (while being logged in)
//
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password')

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.current, user.password))) {
        return next(new AppError('Your current password is wrong.', 401))
    }
    // 3) If so, update password
    user.password = req.body.password
    user.passwordConfirm = req.body.confirm
    await user.save()
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res)
})

//
// Update the given user's password (as an admin only)
//
exports.updateUserPassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.params.id).select('+password')

    // 2) If so, update password
    user.password = req.body.password
    user.passwordConfirm = req.body.confirm
    await user.save()
    // User.findByIdAndUpdate will NOT work as intended!

    // send back success response
    res.status(200).json({
        status: 'success',
    })
})

/******************************/
/*                            */
/*  Authorisation Middleware  */
/*                            */
/******************************/

// Decorate the current request with the user with the id contained in the
// supplied VALID token.
//
// This function operates SILENTLY, i.e. no (app) errors thrown - but errors
// and issues are logged accordingly:
// 1) Any token that does not properly validate is logged as a warning.
// 2) Epired tokens are logged on level "info".
// 3) Tokens with invalid user ids (meaning user has been removed while token is
//    still valid) are logged on "info" level
exports.addUserToRequest = async (req, res, next) => {
    // 1) Fetch the token from cookie or Authorisation bearer
    let token
    // Authorization: Bearer <jwt>
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        logger.verbose(`AuthN/AuthZ - API Bearer JWT found for path ${req.url}`)
        token = req.headers.authorization.split(' ')[1]
    }
    // Cookie: jwt <jwt>
    else if (req.cookies.jwt) {
        logger.verbose(`AuthN/AuthZ - Browser cookie JWT found for path ${req.url}`)
        token = req.cookies.jwt
    }

    // 2) if no token, return/call next()
    if (!token) {
        logger.verbose(
            `AuthN/AuthZ - No JWT found for request ${req.url} --> no user added to request.`
        )
        return next()
    }

    // 3) Verify the token
    let verifiedJWT
    try {
        logger.debug('AuthN/AuthZ - Full verification of the JWT')
        verifiedJWT = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        if (err.constructor.name === 'TokenExpiredError') {
            logger.info('AuthN/AuthZ - JWT expired --> no user added to request.')
        } else {
            logger.warn(`AuthN/AuthZ - Invalid JWT! --> no user added to request.`)
            logger.warn('              Error message: ' + err)
        }
        return next()
    }

    // 4) Decrypt user id
    let decryptedUserId
    try {
        logger.debug('AuthN/AuthZ - decrypting user id')
        decryptedUserId = decryptPayload(verifiedJWT.id)
    } catch (err) {
        logger.warn(`AuthN/AuthZ - failed to decrypt user id in JWT --> no user added to request`)
        logger.warn('              Error message: ' + err)
        return next()
    }

    // 5) Check user id if the user still exists
    const currentUser = await User.findById(decryptedUserId)
    if (!currentUser) {
        logger.warn(
            `AuthN/AuthZ - Unknwon user id ${decryptedUserId} in JWT --> no user added to request`
        )
        return next()
    }

    // 6) User exists - add to request!
    req.user = currentUser
    res.locals.user = currentUser // also add to locals object for views
    next()
}

//
// Protect a route accessible for CURRENTLY LOGGED IN USERS ONLY
//
exports.protect = catchAsync(async (req, res, next) => {
    // PREREQUISITE: req is decorated previously (or not, if it failed)

    // 1) Check if request is decorated with the user
    if (!req.user) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401))
    }

    // 2) All ok, pass on to the next middleware
    next()
})

//
// Restrict a route to logged in users with (a) certain role(s)
//
exports.restrictTo = (...roles) => {
    // PREREQUISITE - req object is already decorated with the user instance!

    return (req, res, next) => {
        // 1) Protect the route (i.e. user log in is required)
        if (!req.user) {
            return next(new AppError('You are not logged in! Please log in to get access.', 401))
        }
        // 2) Check against roles
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403))
        }
        // all good, pass on!
        next()
    }
}
