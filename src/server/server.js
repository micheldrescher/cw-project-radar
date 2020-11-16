//
// IMPORTS
//
// libraries
require('dotenv').config()
const mongoose = require('mongoose')
const Process = require('process')
// app modules
const { logger } = require('./utils/logger')

//
// CONNECT TO DB
//
// let DB_URL = process.env.DB_URL.replace('<USER>', process.env.DB_USER).replace(
//     '<PASSWORD>',
//     process.env.DB_PASSWD
// )
let { DB_URL } = process.env
mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        // initial connect error handling
        logger.error('💥 DB connection failed, terminating immediately.')
        logger.error(err)
        Process.exit(1)
    })
// log intermittent connection errors
mongoose.connection.on('error', (err) => {
    logger.error('💥 DB connection interrupted, trying to reconnect.')
    logger.error(err)
})
logger.info('Connected to database.')
//
// IMPORTS
//
// app modules (deferred until after DB connection)
const app = require('./app')

//
// START SERVER
//
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    logger.info(`App listening on port ${PORT}....`)
    logger.info('Press Ctrl+C to quit.')
})

//
// SIGTERM handling
//
process.on('SIGTERM', () => {
    logger.warn('👋 SIGTERM RECEIVED. Shutting down gracefully')
    server.close(() => {
        logger.warn('Process terminated!')
    })
})
