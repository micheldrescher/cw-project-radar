//
// IMPORTS
//
// libraries
const moment = require('moment')
// modules
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/AppError')
const { compileRadarPopulation } = require('./radar-populate/radarPopulation')
const Radar = require('../models/radarModel')
const { RadarData, RadarRendering } = require('../models/radarDataModel')
const renderer = require('./radar-render/renderer')

/****************************
 *                          *
 *     LOOKUP FUNCTIONS     *
 *                          *
 ****************************/
//
// Fetch a radar by its slug
//
exports.getRadarBySlug = async (slug, field) => {
    if (field) return await Radar.findOne({ slug: slug }).populate(field)

    return await Radar.findOne({ slug: slug })
}

//
// Get all radar editions
//
exports.getEditions = async () => {
    // we want only published radars
    // TODO vary the filter based on logged in user
    let filter = {
        status: 'published',
    }
    // sort by year, then editiion (desc.)
    // include only the slug and the acronym
    let queryStr = {
        sort: '-year,release',
        fields: 'name,slug',
    }
    const features = new APIFeatures(Radar.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const ed = await features.query
    return ed
}

//
// fetches a radar by its slug or, if not provided, the latest one
//
// NOTE: THis is used for the widget!!
//
exports.getBySlugOrLatest = async (slug, field) => {
    // 1) Get slug of latest edition if no specific slug was provided
    let mySlug = slug
    if (!mySlug) {
        // 1.1 find all editions and pick the latest
        let editions = await this.getEditions()
        if (!editions || editions.length == 0) {
            // no public editions available
            throw new AppError('No published radars available', 204)
        }
        mySlug = editions[0].slug
    }

    // 2) Get the radar for the slug
    const radar = await this.getRadarBySlug(mySlug, field)
    if (!radar) {
        // no radar found...
        throw new AppError('No radar with that slug', 404)
    }

    // 3) return the found radar
    return radar
}

/*******************************
 *                             *
 *     LIFECYCLE FUNCTIONS     *
 *                             *
 *******************************/
//
// publish the radar
//
// Fetches the (transient) radar data and renders it into an SVG and a set of tables.
exports.publishRadar = async (radar, cutOffDate) => {
    // 1) Render the radar based on the data received
    const data = await compileRadarPopulation(cutOffDate)
    const rendering = renderer.renderRadar(data)
    rendering.radar = radar._id
    await rendering.save()

    // 2) save radar state
    radar.status = 'published'
    radar.publicationDate = Date.now()
    radar.referenceDate = cutOffDate
    radar.rendering = rendering._id
    await radar.save()

    // return radar
    return radar
}

//
// archive a radar
//
// At some point, a radar becomes uninteresting, at which point it should be archived (not deleted).
exports.archiveRadar = async (slug) => {
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // radar state change check
    if (!['published'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state published.`, 500)
    }

    // 2) Set state to archived
    radar.status = 'archived'
    await radar.save()

    return radar
}

//
// Reset a radar
//
exports.resetRadar = async (slug) => {
    // 1) Get the radar for the slug
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // 2) Delete all associated data
    await RadarData.deleteOne({ radar: radar._id })
    await RadarRendering.deleteOne({ radar: radar._id })

    // 3) set status to 'created'
    radar.status = 'created'

    // 4) Reset, publication date, reference date, data, and rendering to 'undefined'
    radar.publicationDate = undefined
    radar.referenceDate = undefined
    radar.data = undefined
    radar.rendering = undefined

    // 5) save radar, and return it
    await radar.save()

    return radar
}

//
// get a live radar
//
exports.getLiveRadar = async () => {
    const cutOffDate = moment() // creates a Date.now() if date param is missing

    // 1) Create a fake radar instance
    const radar = new Radar()
    radar.year = 2999
    radar.release = 'Live'
    radar.slug = 'live-2999'
    radar.name = 'Live radar'
    radar.summary =
        'This is a radar compiled on-demand based on the latest information found in the database. Unlike stable editions, live radars are fluid in their content and display. Use with caution; this is not a citable resource.'
    radar.referenceDate = cutOffDate.toDate()
    radar.publicationDate = cutOffDate.toDate()

    // 4) Now "publish" the radar
    radar.status = 'published'
    // 5) Success! return the live radar
    return radar
}

exports.getRendering = async (slug) => {
    // Fetch data for an edition
    if (slug) {
        // 1) Get the radar for the slug
        const radar = await this.getRadarBySlug(slug)
        if (!radar) throw new AppError(`No edition found for ${slug}`, 404)
        if (!radar.status == 'published')
            throw new AppError(`Edition ${slug} is not published yet.`, 400)
        // 2) get the rendering
        const rendering = RadarRendering.findOne({ radar: radar._id })
        if (!rendering) throw new AppError(`No rendering found for edition ${slug}`, 500)
        return rendering
    }

    // Get the live radar rendering
    // 1) Get the data
    const data = await compileRadarPopulation(moment())
    // 2) Render
    const rendering = renderer.renderRadar(data)

    return rendering
}
