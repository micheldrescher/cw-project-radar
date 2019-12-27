//
// HANDLING UNCAUGHT EXCEPTIONS
// This needs to be one of the first things to register
// before any exceptions might occur!
//
process.on('uncaughtException', err => {
    logger.error('Uncaught exception --> Shutting down.')
    logger.error(err)
})

//
// IMPORTS
//
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })
import app from './app'
import logger from './util/logger'

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
    logger.error('Unhandled rejection --> Shutting down.')
    logger.error(err)
    server.close(() => {
        process.exit(1)
    })
})
