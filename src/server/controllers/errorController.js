import AppError from './../util/AppError'

export { errorHandler as default }

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]
    const message = `Duplicate field value: ${value}. Please use another value.`
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const message = `Invalid input data: ${errors.join('. ')}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

const sendErrorProd = (err, res) => {
    // Operational error from within our app code
    if (err.isOperational()) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    // Errors originated from libraries we cannot 'trust' - send generic error
    else {
        // 1) log the error to the console
        console.error('-=* ERROR *=-', err)

        // 2) Send the generic error
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong.'
        })
    }
}

const errorHandler = (err, req, res, next) => {
    // ensure some defaults
    err.statusCode = err.statusCode || 500 // internal server error
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }

        // capture other specific errors that are NOT operational
        // and turn them into operational errors
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error)

        sendErrorProd(error, res)
    }
}
