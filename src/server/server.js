//
// IMPORTS
//
// libraries
require('dotenv').config()
const fs = require('fs')
const http = require('http')
const https = require('https')
const mongoose = require('mongoose')
const Process = require('process')

// check deployment config
process.env.NODE_ENV =
    process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? 'production' : 'development'

// configure logging
const { logger } = require('./utils/logger')

//
// CONNECT TO DB
//
const { DB_URL } = process.env
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
// PROJECT RADAR APP
//
const app = require('./app')

//
// CONFIGURE HTTPS - fall back to HTTP if no cert & key are fund
//
let server
let isHTTPS
if (!process.env.HTTPS_KEY || !process.env.HTTPS_CERT) {
    logger.warn('No cert or private key configured, falling back to HTTP!')
    logger.info('Configuring HTTP')
    server = http.createServer(app)
    isHTTPS = false
} else {
    logger.info('Configuring HTTPS')
    logger.verbose('--> Requiring TLS1.3 connections')
    const https_opts = {
        key: fs.readFileSync(process.env.HTTPS_KEY || 'key.pem'),
        cert: fs.readFileSync(process.env.HTTPS_CERT || 'cert.pem'),
        minVersion: 'TLSv1.3',
    }
    server = https.createServer(https_opts, app)
    isHTTPS = true
}

//
// START SERVER
//
const PORT = isHTTPS ? process.env.PORT || 8443 : process.env.PORT || 8080
server.listen(PORT, () => {
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
