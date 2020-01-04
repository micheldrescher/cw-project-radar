// import dev mode plugins
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

// import global modules
import path from 'path'
import express from 'express'

// import app modules
import AppError from './util/AppError'
import globalErrorHandler from './controllers/errorController'
import pingRouter from './routes/pingRoutes'

const DIST_DIR = path.join(__dirname, '../client/')
const HTML_FILE = path.join(DIST_DIR, 'index.html')

// set up the app as an express object
const app = express()
app.use(express.json()) // automatic JSON <--> object processing

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
// MOUNT ROUTERS
//
app.use('/ping', pingRouter)
// LAST ROUTE to catch requests to undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404)) // --> automatically passes that to the error handler defined below
})

//
// GLOBAL ERROR HANDLING
//
app.use(globalErrorHandler)

export { app as default }
