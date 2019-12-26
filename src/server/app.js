import express from 'express'

// set up the app as an express object
const app = express()
app.use(express.json()) // automatic JSON <--> object processing

//
// MOUNT ROUTERS
//

// FINAL CATCHALL to handle undefined routes
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Cannot find ${req.originalUrl} on this server.`
    })
})

export { app as default }
