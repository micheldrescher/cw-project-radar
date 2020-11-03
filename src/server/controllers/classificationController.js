//
// IMPORTS
//
// libraries
// modules
const APIFeatures = require('../utils/apiFeatures')
const { Classification } = require('../models/classificationModel')

//
// get the MTRL score for a project that is the closest in the past
// relative to the given date
//
exports.getClassification = async (prjID, date) => {
    // filtering for scores relating to the given project
    // with a scoring date less than the cutoff date
    let filter = {
        project: prjID,
        classifiedOn: { $lte: date },
    }
    // sort decending by scoringDate, and return the first element only
    let queryStr = {
        sort: '-classifiedOn, -_id',
        limit: '1',
    }
    // build the query and execute it
    const features = new APIFeatures(Classification.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const result = await features.query
    return result[0]
}
