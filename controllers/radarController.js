//
// IMPORTS
//
// libraries
const moment = require('moment')
// modules
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/AppError')
const Radar = require('../models/radarModel')
const { Segment, Ring, Blip } = require('../models/radarDataModel')
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
    // 1) Get the radar
    return await Radar.findOne({ slug: slug }).populate({ path: 'data' })
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

//
// populate the radar with project and scoring data statistics
//
exports.populateRadar = async (slug, radarDate) => {
    // 1) Obtain the radar, and with that the max age of projects
    const radar = await this.getRadarBySlug(slug)
    if (!radar) {
        throw new AppError(`No radar found for id ${slug}.`, 404)()
    }
    if (radar.status !== 'created') {
        throw new AppError(`Radar ${radar.name} is not in state created.`, 500)
    }
    const prjMaxAge = moment(radarDate).subtract(process.env.MODEL_MAX_AGE, 'months')

    // 2) Fetch all projects that:
    //      - are younger than the project max age (from the model), and
    //      - have at least one classification
    const projects = await Project.find({
        endDate: { $gte: prjMaxAge },
        'classification.0': { $exists: true }
    })

    // 3) Create the radarData map of maps
    const radarData = new Map()
    segments.forEach(segment => {
        const segMap = new Map()
        rings.forEach(ring => {
            segMap.set(ring, new Map())
        })
        radarData.set(segment, segMap)
    })

    // 4) Map all projects into the map of maps
    projects.map(prj => {
        const seg = prj.classification.slice(-1).pop().classification
        const ring = calculateRing(prj, radarDate)
        radarData
            .get(seg)
            .get(ring)
            .set(
                prj.cw_id,
                new RadarData({
                    project: prj,
                    cw_id: prj.cw_id,
                    prj_name: prj.name,
                    segment: seg,
                    ring: ring
                })
            )
    })

    // 5) For each ring in each segment, calculate the statistical values
    //      and store in the respective projects
    radarData.forEach(segMap => {
        segMap.forEach(ringMap => {
            // work only with the projects that have MTRL scores
            const eligibleProjects = ringMap.values().filter(el => el.project.mtrlScores.length > 0)
            // temporarily calculate the scores
            const scores = eligibleProjects
                .filter(el => el.project.mtrlScores.length > 0)
                .map(el => {
                    // get last MTRL score of the project
                    const { trl, mrl } = el.project.mtrlScores.slice(-1).pop()
                    return 2 * trl + 7 * mrl
                })
            const mean = median(scores)
            const perfs = scores.map(s => s - median) // temporary
            const min = perfs.reduce((m, c) => (m < c ? m : c))
            const max = perfs.reduce((m, c) => (m > c ? m : c))
            // now add statistical values, recalculating for each project the score and performance
            ringMap.values().forEach(el => {})
        })
    })

    // segments.forEach(segment => {
    //     const radarSegment = new Segment({ name: segment })
    //     rings.forEach(ring => {
    //         const radarRing = new Ring({ name: ring })
    //         radarSegment.rings.push(radarRing)
    //     })
    //     radar.data.push(radarSegment)
    //     console.log(radarSegment)
    // })

    // {
    //     segMap.forEach(ringMap => {
    //         ringMap.map(e => console.log(e))
    //     })
    // })

    // console.log(radarData)

    if (1 === 1) return radar

    // 3) Calculate statistical values and add them to the radar
    segments.forEach(segment => {
        rings.forEach(ring => {
            // (TRL, MRL) --> Score
            // [ Scores ] --> Median
            // Score - Median --> Performance
            // MIN [ Performances ] --> min
            // MAX [ Performances ] --> max
        })
    })
    return radar
}

//
// DOMAIN-SPECIFIC ring calculator.
// TODO - find a way to get this configurable
//
const calculateRing = (project, radarDate) => {
    const dropDate = moment(radarDate).subtract(2, 'years')
    const holdDate = moment(radarDate).subtract(1, 'years')
    const adoptDate = moment(radarDate)
    const trialDate = moment(radarDate).add(6, 'months')

    if (project.endDate < dropDate) return rings[4] // Drop
    if (project.endDate < holdDate) return rings[3] // Hold
    if (project.endDate < adoptDate) return rings[0] // Adopt
    if (project.endDate < trialDate) return rings[1] // Trial
    return rings[2] // Assess
}

function median(numbers) {
    const sorted = numbers.slice().sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2
    }

    return sorted[middle]
}
