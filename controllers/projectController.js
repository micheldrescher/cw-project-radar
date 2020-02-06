//
// IMPORTS
//
// libraries
// modules
const APIFeatures = require('../utils/apiFeatures')
const AppError = require('../utils/AppError')
const Project = require('../models/projectModel')
const Radar = require('../models/radarModel')

//
// Add a MTRL score to a project
//
exports.addCategory = async (id, category) => {
    // 1) Get the corresponding project
    const project = await Project.findById(id)
    if (!project) {
        throw new AppError(`No project found with id ${id}`, 404)
    }

    // 2) no check of classification - if it is a wrong classification, then the
    // project will not be included in any radar.

    // 3) add the classification to the project's classifications
    project.classification.push(category)
    await project.save()

    // 4) return the project as a sign of success
    return project
}

//
// Add a MTRL score to a project
//
exports.addMTRLScore = async (id, score) => {
    // 1) Get the corresponding project
    const project = await Project.findById(id)
    if (!project) {
        throw new AppError(`No project found with id ${id}`, 404)
    }
    // 2) add the score to the project's score array
    project.mtrlScores.push(score)
    await project.save()

    // 3) return the project as a sign of success
    return project
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
