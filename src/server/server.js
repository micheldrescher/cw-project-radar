//
// IMPORTS
//
// libraries
require('dotenv').config()
const mongoose = require('mongoose')
// app modules
const logger = require('./utils/logger')

//
// HANDLING UNCAUGHT EXCEPTIONS
//
// This needs to be one of the first things to register
// before any exceptions might occur!
process.on('uncaughtException', (err) => {
    logger.error('💥 Uncaught exception --> Shutting down.')
    // eslint-disable-next-line no-console
    console.log(err)
    process.exit(1) // rather hardcore but all we can do for now
})

//
// CONNECT TO DB
//
// let DB_URL = process.env.DB_URL.replace('<USER>', process.env.DB_USER).replace(
//     '<PASSWORD>',
//     process.env.DB_PASSWD
// )
let { DB_URL } = process.env
console.log(DB_URL);
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
        process.exit(1)
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
    logger.info(`App listening to ${PORT}....`)
    logger.info('Press Ctrl+C to quit.')
})

//
// HANDLE UNHANDLED REJECTIONS
//
process.on('unhandledRejection', (err) => {
    logger.error('💥 Unhandled rejection --> Shutting down.')
    // eslint-disable-next-line no-console
    console.log(err)
    process.exit(1)
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
