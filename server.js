//
// IMPORTS
//
require('dotenv').config()
const logger = require('./utils/logger')
// const mongoose = require('mongoose')

//
// HANDLING UNCAUGHT EXCEPTIONS
//
// This needs to be one of the first things to register
// before any exceptions might occur!
//
process.on('uncaughtException', err => {
    logger.error('💥 Uncaught exception --> Shutting down.')
    logger.error(err)
    process.exit(1) // rather hardcore but all we can do for now
})

//
// CONNECT TO DB
//
// let DB = process.env.DB_URL.replace('<USER>', process.env.DB_USER).replace(
//     '<PASSWORD>',
//     process.env.DB_PASSWD
// )
// mongoose
//     .connect(DB, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     })
//     .then(
//         () => logger.info('DB connection successful!'),
//         err => {
//             logger.error('💥 DB connection failed, aborting.')
//             logger.error(err)
//             server.close(() => {
//                 logger.error('Process terminated!')
//             })
//         }
//     )

//
// IMPORTS
//

// include the radar app
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
process.on('unhandledRejection', err => {
    logger.error('💥 Unhandled rejection --> Shutting down.')
    logger.error(err)
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
