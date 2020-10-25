//
// IMPORTS
//
// libraries
// const moment = require('moment')
const simpleStats = require('simple-statistics')
// modules
// const APIFeatures = require('../utils/apiFeatures')
// const AppError = require('../utils/AppError')
const classificationController = require('../classificationController')
const mtrlScoresController = require('../mtrlScoresController')
// const Radar = require('../models/radarModel')
// const renderer = require('./radar-render/renderer')
const { Blip, RadarData } = require('../../models/radarDataModel')
const { Project } = require('../../models/projectModel')

//
// MODULE VARS
//
const rings = process.env.MODEL_RINGS.split(',').map((e) => e.trim())
const segments = process.env.MODEL_SEGMENTS.split(',').map((e) => e.trim())

//
// Compile the blips for all projects that are in scope for the radar
//
exports.compileRadarPopulation = async (cutOffDate) => {
    // some generally used vars
    const ageInMonths = process.env.MODEL_MAX_AGE || 36 // default of 3 year cutoff time
    const prjMaxAge = cutOffDate.clone().subtract(ageInMonths, 'months')

    // 1) Fetch all projects that:
    //      - are younger than the project max age (from the model), and
    //      - have at least one classification
    const projects = await Project.find({
        endDate: { $gte: prjMaxAge.toDate() },
        startDate: { $lt: cutOffDate.toDate() },
        hasClassifications: true,
    })

    // 2) Create a temporary map of maps
    const data = new Map()
    segments.forEach((segment) => {
        const segMap = new Map()
        data.set(segment, segMap)
        rings.forEach((ring) => {
            segMap.set(ring, new Array())
        })
    })

    // 3) Map all projects into the "data" structure.
    await mapProjectsToData(projects, data, cutOffDate)

    // 4) Create a RadarData object from this data structure of the 90's called "data"
    const radarData = createRadarData(data)

    // 5) Finally return the radar data
    return radarData
}

//
// Maps all projects into the given comlicated data structure "data".label
// TODO this is so ugly, it causes immediate eye cancer!
//
const mapProjectsToData = async (projects, data, cutOffDate) => {
    await Promise.all(
        projects.map(async (prj) => {
            let segment = await classificationController.getClassification(
                prj._id,
                cutOffDate.toDate()
            )
            segment = segment.classification
            const ring = calculateRing(prj, cutOffDate)
            // If the project has a score, fetch and add the score too as we need that later anyway.
            let score = undefined
            if (prj.hasScores) {
                score = await mtrlScoresController.getScore(prj._id, cutOffDate.toDate())
            }
            data.get(segment).get(ring).push({
                prj,
                score,
            })
        })
    )
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

//
// transform the ugly data "structure" into a RadarData entity (just as ugly)
const createRadarData = (data) => {
    const radarData = new RadarData({})
    radarData.data = new Map()
    for (const [segKey, segMap] of data.entries()) {
        const segDataMap = new Map()
        for (const [ringKey, entries] of segMap.entries()) {
            const stats = calculateStatistics(entries)
            const ringData = []
            entries.forEach((e) => {
                const blip = new Blip({
                    project: e.prj._id,
                    tags: e.prj.tags,
                    cw_id: e.prj.cw_id, // temporary
                    prj_name: e.prj.name, // temporary
                    segment: segKey, // temporary
                    ring: ringKey, // temporary
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
        radarData.data.set(segKey, segDataMap)
    }

    return radarData
}

//
// Calculate statistics for each ring
//
const calculateStatistics = (entries) => {
    const scores = entries
        .filter((entry) => entry.score)
        .map((entry) => {
            return entry.score.score
        })
    if (!scores || scores.length === 0) {
        return undefined
    }

    const median = simpleStats.median(scores)
    const perfs = scores.map((score) => score - median)
    const min = perfs.reduce((aMin, perf) => (perf < aMin ? perf : aMin))
    const max = perfs.reduce((aMin, perf) => (perf > aMin ? perf : aMin))

    return {
        median,
        min,
        max,
    }
}
