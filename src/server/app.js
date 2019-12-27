import express from 'express'

const AppError = require('./util/AppError')
const globalErrorHandler = require('./controllers/errorController')

// set up the app as an express object
const app = express()
app.use(express.json()) // automatic JSON <--> object processing

//
// MOUNT ROUTERS
//

// FINAL CATCHALL to handle undefined routes
// catch-all to handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404)) // --> automatically passes that to the error handler defined below
})

//
// GLOBAL ERROR HANDLING
//
app.use(globalErrorHandler)

export { app as default }
