// import global modules
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
const morgan = require('morgan')
const path = require('path')
const xss = require('xss-clean')

// import app modules
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./handlers/errorHandler')
const logger = require('./utils/logger')
const projectRouter = require('./routers/projectRouter')
const radarRouter = require('./routers/radarRouter')
const viewRouter = require('./routers/viewRouter')

// set up the app as an express object
const app = express()

// use Pug for rendering client HTML files
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//
// SECURITY CONFIG
//

// enable trusting proxies (especially for production)
app.enable('trust proxy')

// Enable/configure CORS
app.use(cors()) // allow any simple request from anywhere, i.e. "Access-Control-Allow-Origin *
app.options('*', cors()) // CORS 'pre-flight: allow any options (incl. PATCH, PUT, DELETE, etc.)

// use body parser as requirement for hpp
app.use(bodyParser.urlencoded({ extended: true }))

// Prevent HTTP Parameter Pollution (HPP)
app.use(hpp())
// app.use(
//     hpp({
//         whitelist: [
//             'duration',
//             'ratingsQuantity',
//             'ratingsAverage',
//             'maxGroupSize',
//             'difficulty',
//             'price'
//         ]
//     })
// )

// Set security HTTP headers
app.use(helmet())

// Limit requests from same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// compress responses
app.use(compression())

//
// Add'l DEVELOPMENT LOGGING
//
// Development logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

//
// SERVE STATIC FILES FOR CLIENT
//
// Serving static files
app.use(express.static(path.join(__dirname, '../client')))

//
// ROUTES
//

// client views
app.use('/', viewRouter)
// API
app.use('/api/v1/project', projectRouter)
app.use('/api/v1/radar', radarRouter)

// handle undefined routes - LAST ROUTE!
app.all('*', (req, res, next) => {
    logger.error(`No such route defined: ${req.originalUrl}`)
    next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404))
})

//
// GLOBAL ERROR HANDLER
//
app.use(globalErrorHandler)

//
// EXPORT
//
module.exports = app
