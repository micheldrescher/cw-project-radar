//
// IMPORTS
//
// libraries
const APIFeatures = require('../utils/apiFeatures')
// modules
const Radar = require('../models/radarModel')

//
// Fetch a radar by its slug
//
exports.getRadarBySlug = async slug => {
    // 1) Get the radar
    return await Radar.findOne({ slug: slug }).populate({ path: 'model' })
}

//
// Get all radar editions
//
exports.getEditions = async () => {
    // we want only published radars
    // TODO vary the filter based on logged in user
    let filter = {
        status: {
            $in: ['published']
        }
    }
    // sort by year, then editiion (desc.)
    // include only the slug and the name
    let queryStr = {
        sort: '-year,release',
        fields: 'name,slug,status,year,release'
    }
    const features = new APIFeatures(Radar.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    return await features.query
}
