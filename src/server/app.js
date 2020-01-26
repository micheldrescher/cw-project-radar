// import dev mode plugins
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

// import global modules
import path from 'path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'
import compression from 'compression'
import bodyParser from 'body-parser'

// import app modules
import AppError from './util/AppError'
import globalErrorHandler from './controllers/errorController'
import userRouter from './routes/userRoutes'
import radarRouter from './routes/radarRoutes'

export { app as default }

const DIST_DIR = path.join(__dirname, '../client/')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// set up the app as an express object
const app = express()
app.enable('trust proxy')

//
// 1) SERVE STATIC FILES
//
// configure express for development mode
if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config)

    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: config.output.publicPath
        })
    )
    app.use(webpackHotMiddleware(compiler))
    app.get('/', (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
            if (err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    })
}
// configure express for production mode
else if (process.env.NODE_ENV === 'production') {
    app.use(express.static(DIST_DIR))
    // serve the client from the root "route"
    app.get('/', (req, res) => {
        res.sendFile(HTML_FILE)
    })
}
// wrong env var value --> exit server
else {
    throw new AppError('Wrong NODE_ENV value set: Only "development" or "production" allowed!')
}

//
// 2) GLOBAL MIDDLEWARES
//
// Implement CORS
app.use(cors())
// Access-Control-Allow-Origin *
// api.natours.com, front-end natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))
app.options('*', cors())
// app.options('/api/v1/tours/:id', cors());

// use body parser as requirement for hpp
app.use(bodyParser.urlencoded())

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

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
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
// MOUNT ROUTERS
//
app.use('/api/v1/user', userRouter)
app.use('/api/v1/radar', radarRouter)
// LAST ROUTE to catch requests to undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404)) // --> automatically passes that to the error handler defined below
})

//
// GLOBAL ERROR HANDLING
//
app.use(globalErrorHandler)
