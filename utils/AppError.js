class AppError extends Error {
    constructor(message, statusCode) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOerational = true

        // capture the stacktrace
        Error.captureStackTrace(this, this.constructor)

        console.log('Done constructing apperror')
    }
}

module.exports = AppError
