//
// IMPORTS
//
// libraries
// modules
const APIFeatures = require('../utils/apiFeatures')
const { MTRLScore } = require('../models/mtrlScoreModel')

//
// get the MTRL score for a project that is the closest in the past
// relative to the given date
//
exports.getScore = async (prjID, date) => {
    // filtering for scores relating to the given project
    // with a scoring date less than the cutoff date
    let filter = {
        project: prjID,
        scoringDate: { $lte: date },
    }
    // sort decending by scoringDate, then descending by insertion date,
    //  and return the first element only
    let queryStr = {
        sort: '-scoringDate, -_id',
        limit: '1',
    }
    // build the query and execute it
    const features = new APIFeatures(MTRLScore.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const result = await features.query
    return result[0]
}
