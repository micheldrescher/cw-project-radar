import catchAsync from '../util/catchAsync'

const ping = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: 'pong'
    })
})

const foo = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: 'bar'
    })
}

export { ping, foo }
