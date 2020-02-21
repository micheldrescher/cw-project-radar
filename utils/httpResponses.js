exports.notImplemented = res => {
    res.status(501).json({
        status: 'error',
        message: 'Route not implemented'
    })
}
