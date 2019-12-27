const errorController = (err, req, res, next) => {
    // ensure some defaults
    err.statusCode = err.statusCode || 500 // internal server error
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

export { errorController as default }
