//
// IMPORTS
//
// libraries
// app modules
const catchAsync = require('./catchAsync')

//
// scrubEmpty
//
// EXPRESS middleware for scrubbing empty JSON terms
//
exports.scrubEmpty = catchAsync(async (req, res, next) => {
    // 1) fetch data
    const data = req.body

    // 2) sanitise data into new object
    let result = {}
    Object.keys(data).forEach(function(key) {
        if (data[key] !== '') {
            result[key] = data[key] // remove empty entries
        }
    })

    // 3) store back into request
    req.body = result

    // 4) call next middleware
    next()
})
