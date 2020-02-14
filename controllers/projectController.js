//
// IMPORTS
//
// libraries
// modules
const AppError = require('../utils/AppError')
const { Project } = require('../models/projectModel')

//
// get by CW ID
//
exports.getByCWId = async id => {
    return await Project.findOne({ cw_id: id })
}

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
