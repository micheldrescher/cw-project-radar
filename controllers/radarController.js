//
// IMPORTS
//
// libraries
const d3 = require('d3')
const { JSDOM } = require('jsdom')
const moment = require('moment')
const simpleStats = require('simple-statistics')
// modules
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/AppError')
const classificationController = require('./classificationController')
const mtrlScoresController = require('./mtrlScoresController')
const Radar = require('../models/radarModel')
const renderer = require('./radar-render/renderer')
const { Blip } = require('../models/radarDataModel')
const { Project } = require('../models/projectModel')

//
// MODULE VARS
//
const rings = process.env.MODEL_RINGS.split(',').map(e => e.trim())
const segments = process.env.MODEL_SEGMENTS.split(',').map(e => e.trim())

//
// Fetch a radar by its slug
//
exports.getRadarBySlug = async slug => {
    return await Radar.findOne({ slug: slug })
}

//
// Get all radar editions
//
exports.getEditions = async () => {
    // we want only published radars
    // TODO vary the filter based on logged in user
    let filter = {
        status: 'published'
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

//
// populate the radar with project and scoring data statistics
//
exports.populateRadar = async (slug, date) => {
    const ageInMonths = process.env.MODEL_MAX_AGE || 36 // default of 3 year cutoff time
    const radarDate = moment(date) // creates a Date.now() if date param is missing
    const prjMaxAge = radarDate.clone().subtract(ageInMonths, 'months')
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)

    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    if (!['created', 'populated', 'rendered'].includes(radar.status)) {
        throw new AppError(`Radar ${radar.name} is not in state created.`, 500)
    }

    // 2) Fetch all projects that:
    //      - are younger than the project max age (from the model), and
    //      - have at least one classification
    const projects = await Project.find({
        endDate: { $gte: prjMaxAge.toDate() },
        hasClassifications: true
    })

    // 3) Create a temporary map of maps
    const data = new Map()
    segments.forEach(segment => {
        const segMap = new Map()
        data.set(segment, segMap)
        rings.forEach(ring => {
            segMap.set(ring, new Array())
        })
    })

    // 4) Map all projects into data.
    await Promise.all(
        projects.map(async prj => {
            let segment = await classificationController.getClassification(
                prj._id,
                radarDate.toDate()
            )
            segment = segment.classification
            const ring = calculateRing(prj, radarDate)
            // If the project has a score, fetch and add the score too as we need that later anyway.
            let score = undefined
            if (prj.hasScores) {
                score = await mtrlScoresController.getScore(prj._id, radarDate.toDate())
            }
            data.get(segment)
                .get(ring)
                .push({
                    prj,
                    score
                })
        })
    )

    // 5) Map all projects into blips stored in the radar including statistics
    radar.data = new Map()
    for (const [segKey, segMap] of data.entries()) {
        const segDataMap = new Map()
        for (const [ringKey, entries] of segMap.entries()) {
            const stats = calculateStatistics(entries)
            const ringData = []
            entries.forEach(e => {
                const blip = new Blip({
                    project: e.prj._id,
                    cw_id: e.prj.cw_id, // temporary
                    prj_name: e.prj.name, // temporary
                    segment: segKey, // temporary
                    ring: ringKey // temporary
                })
                if (e.score) {
                    blip.trl = e.score.trl
                    blip.mrl = e.score.mrl
                    blip.score = e.score.score
                    blip.median = stats.median
                    blip.performance = blip.score - blip.median
                    blip.min = stats.min
                    blip.max = stats.max
                }
                ringData.push(blip)
            })
            segDataMap.set(ringKey, ringData)
        }
        radar.data.set(segKey, segDataMap)
    }

    // 6) Set radar status to 'populated' and population date
    radar.status = 'populated'
    radar.referenceDate = radarDate
    await radar.save()

    return radar
}

//
// Render the radar into a scalable SVG image
//
exports.renderRadar = async slug => {
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
    // if (!['populated', 'rendered'].includes(radar.status)) {
    //     throw new AppError(`Radar ${radar.name} is not in state populated.`, 500)
    // }

    // create the DOM hook for d3 to work properly
    const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
    let body = d3.select(fakeDom.window.document).select('body')

    // build the SVG container
    const size = 2000
    const viewBox = `-${size / 2} -${size / 2} ${size} ${size}`
    const svgContainer = body.append('div')
    const svg = svgContainer.append('svg').attr('viewBox', viewBox)

    // plot the radar
    renderer.plotRadar(svg, radar.data, size - 2)

    // add to the radar, update state, and save
    radar.rendering = svgContainer.html()
    // radar.status = 'rendered'
    await radar.save()

    return radar
}

//
// publish the radar
//
// Once checked for any mistakes after rendering, an admin (or other
// authorised user) can publish the radar for the public to analyse
exports.publishRadar = async slug => {
    // 1) Obtain the radar
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)
    }
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
// Calculate statistics for each ring
//
const calculateStatistics = entries => {
    const scores = entries
        .filter(entry => entry.score)
        .map(entry => {
            return entry.score.score
        })
    if (!scores || scores.length === 0) {
        return undefined
    }

    const median = simpleStats.median(scores)
    const perfs = scores.map(score => score - median)
    const min = perfs.reduce((aMin, perf) => (perf < aMin ? perf : aMin))
    const max = perfs.reduce((aMin, perf) => (perf > aMin ? perf : aMin))

    return {
        median,
        min,
        max
    }
}

//
// DOMAIN-SPECIFIC ring calculator.
// TODO - find a way to get this configurable
//
const calculateRing = (project, radarDate) => {
    let testDate = radarDate.clone()

    testDate.subtract(2, 'years')
    if (project.endDate < testDate.toDate()) return rings[4] // Drop

    testDate.add(1, 'years')
    if (project.endDate < testDate.toDate()) return rings[3] // Hold

    testDate.add(1, 'years')
    if (project.endDate < testDate.toDate()) return rings[0] // Adopt

    testDate.add(6, 'months').toDate()
    if (project.endDate < testDate.toDate()) return rings[1] // Trial

    return rings[2] // Assess
}
