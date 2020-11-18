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
const { logger } = require('./utils/logger')
const modelRouter = require('./routers/modelRouter')
const projectRouter = require('./routers/projectRouter')
const radarRouter = require('./routers/radarRouter')
const userRouter = require('./routers/userRouter')
const viewRouter = require('./routers/viewRouter')

// set up the app as an express object
logger.verbose('Setting up Express application')
const app = express()

// use Pug for rendering client HTML files
logger.verbose('Setting up Pug')
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
logger.debug('Pug template path =', path.join(__dirname, 'views'))
//
// SECURITY CONFIG
//

logger.info('Setting up app security')
// enable trusting proxies (especially for production)
logger.verbose('AppSec: trust proxies')
app.enable('trust proxy')

// Enable/configure CORS
logger.verbose('AppSec: CORS')
app.use(cors()) // allow any simple request from anywhere, i.e. "Access-Control-Allow-Origin *
app.options('*', cors()) // CORS 'pre-flight: allow any options (incl. PATCH, PUT, DELETE, etc.)

// use body parser as requirement for hpp
logger.verbose('AppSec: URLEncoding/decoding')
app.use(bodyParser.urlencoded({ extended: true }))

// Prevent HTTP Parameter Pollution (HPP)
logger.verbose('AppSec: HTTP Parameter polution')
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
logger.verbose('AppSec: Content security policy (CSP)')
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'", 'ws://localhost:*/'],
                baseUri: ["'self'"],
                fontSrc: ["'self'", 'https:', 'data:'],
                frameAncestors: ["'self'"],
                imgSrc: ["'self'", 'data:'],
                objectSrc: ["'none'"],
                scriptSrcAttr: ["'none'"],
                styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            },
            blockAllMixedContent: true,
            upgradeInsecureRequests: true,
        },
    })
)

// Limit requests from same API
logger.verbose('AppSec: Request rate limiting (1000 requests per hour)')
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
logger.verbose('AppSec: limit message body size to 20 kB')
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '20kb' }))
logger.verbose('AppSec: safe cookie parsing')
app.use(cookieParser())

// Data sanitization against NoSQL query injection
logger.verbose('AppSec: Harden against NoSQL injection attacks')
app.use(mongoSanitize())

// Data sanitization against XSS
logger.verbose('AppSec: Cross site scripting')
app.use(xss())

// compress responses
logger.verbose('AppPerf: Compress responses')
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
logger.info('Setting up serving static files')
app.use(express.static(path.join(__dirname, '../client')))
logger.debug(`Static path for server = ${path.join(__dirname, '../client')}`)

//
// ROUTES
//
logger.info('Setting up REST routes')
// client views
app.use('/', viewRouter)
// API
app.use('/api/v1/model', modelRouter)
app.use('/api/v1/project', projectRouter)
app.use('/api/v1/radar', radarRouter)
app.use('/api/v1/user', userRouter)

// handle undefined routes - LAST ROUTE!
logger.info('Setting up catch-all route')
app.all('*', (req, res, next) => {
    logger.error(`No such route defined: ${req.originalUrl}`)
    next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404))
})

//
// GLOBAL ERROR HANDLER
//
logger.info('Setting up global error handler')
app.use(globalErrorHandler)

//
// EXPORT
//
module.exports = app
