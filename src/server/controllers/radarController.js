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
    // include only the slug and the name
    let queryStr = {
        sort: '-year,release',
        fields: 'name,slug',
    }
    const features = new APIFeatures(Radar.find(filter), queryStr)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    return await features.query
}

//
// fetches a radar by its slug or, if not provided, the latest one
//
exports.getBySlugOrLatest = async (slug, field) => {
    let radar

    if (slug) {
        radar = await this.getRadarBySlug(slug, field)
    } else {
        // 1.1 find all editions and pick the latest
        let editions = await this.getEditions()
        if (!editions || editions.length == 0) {
            // no public editions available
            throw new AppError('No published radars available', 204)
        }
        // 1.2 Now get the latest published radar
        radar = await this.getRadarBySlug(editions[0].slug, field)
    }
    if (!radar) {
        // no radar found...
        throw new AppError('No radar with that slug', 404)
    }

    return radar
}

/*******************************
 *                             *
 *     LIFECYCLE FUNCTIONS     *
 *                             *
 *******************************/
//
// populate the radar with project and scoring data statistics
//
exports.populateRadar = async (slug, date) => {
    const radarDate = moment(date) // creates a Date.now() if date param is missing

    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)

    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // radar state change check
    if (!['created'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state created.`, 500)
    }

    // 2) Calculate the radar population
    const radarData = await compileRadarPopulation(radarDate)

    // 3) Persist the changes
    radarData.radar = radar._id
    await radarData.save()
    radar.status = 'populated'
    radar.data = radarData._id
    radar.referenceDate = radarDate
    await radar.save()

    // 4) redutn the radar
    return radar
}

//
// Render the radar into a scalable SVG image
//
exports.renderRadar = async (slug) => {
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug, 'data')

    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // radar state change check
    if (!['populated'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state populated.`, 500)
    }

    // 2) Create the rendering
    const rendering = renderer.renderRadar(radar.data)
    rendering.radar = radar._id
    await rendering.save()

    radar.status = 'rendered'
    radar.rendering = rendering._id
    await radar.save()

    return radar
}

//
// publish the radar
//
// Once checked for any mistakes after rendering, an admin (or other
// authorised user) can publish the radar for the public to analyse
exports.publishRadar = async (slug) => {
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // radar state change check
    if (!['rendered'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state populated.`, 500)
    }

    // 2) Set state to published
    radar.status = 'published'
    radar.publicationDate = Date.now()
    await radar.save()

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
    radar.status = 'created'
    radar.referenceDate = cutOffDate.toDate()
    radar.publicationDate = cutOffDate.toDate()

    // 2) Add the radar data
    radar.data = await compileRadarPopulation(cutOffDate)
    radar.status = 'populated'

    // 3) Add the rendering
    // TODO actually do some rendering...
    radar.rendering = renderer.renderRadar(radar.data)
    radar.status = 'rendered'

    // 4) Now "publish" the radar
    radar.status = 'published'

    // exports.getLiveRadar = catchAsync(async (req, res, next) => {
    //     // this is going to be resource costly...label
    //     // basically: collect all the radar data, render it, display it
    //     handler.populateRadar
    //     handler.renderRadar
    //     handler.publishRadar
    //     handler.getRadarBySlug

    // radar.name = 'Live radar'

    // console.log(radar)

    // 5) Success! return the live radar
    return radar
}
