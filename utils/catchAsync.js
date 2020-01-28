// wrapper function for catching and processing errors in async functions
const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err))
    }
}

module.exports = catchAsync
