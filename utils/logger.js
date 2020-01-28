const logger = require('winston')
// simply export Winston's default logger here.
// to expand on this, read Winston's manual for creating a better logger.

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new logger.transports.Console({
            format: logger.format.combine(logger.format.colorize(), logger.format.simple())
        })
    )
}

module.exports = logger
