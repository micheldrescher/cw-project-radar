//
// IMPORTS
//
// libraries
// modules
const AppError = require('../utils/AppError')
const { Classification } = require('../models/classificationModel')
const { MTRLScore } = require('../models/mtrlScoreModel')
const { Project } = require('../models/projectModel')
const importHelper = require('./projects/projectsImportHelper')

//
// get by CW ID
//
exports.getByCWId = async cwid => {
    return await Project.findOne({ cw_id: cwid })
}

//
// Add a MTRL score to a project
//
exports.addCategory = async (cwid, data) => {
    // 1) Get the corresponding project
    const project = await this.getByCWId(cwid)
    if (!project) throw new AppError(`No project found with id ${cwid}`, 404)

    // 2) Create new classification object
    await Classification.create({
        classification: data.classification,
        project: project._id,
        classifiedOn: data.classifiedOn,
        classifiedBy: data.classifiedBy,
        changeSummary: data.changeSummary
    })

    // 3) Flag that this project is classified
    project.hasClassifications = true
    await project.save()

    return project
}

//
// Add a MTRL score to a project
//
exports.addMTRLScore = async (cwid, data) => {
    // 1) Get the corresponding project
    const project = await this.getByCWId(cwid)
    if (!project) throw new AppError(`No project found with id ${cwid}`, 404)

    // 2) Create new score object
    await MTRLScore.create({
        project: project._id,
        scoringDate: data.scoringDate,
        mrl: data.mrl,
        trl: data.trl
    })

    // 3) Flag that this project has at least one score
    project.hasScores = true
    await project.save()

    return project
}

exports.importProjects = async buffer => {
    // 1) Read the buffer into an array of objects
    let result = await importHelper.parseTSV(buffer)
    if (result.status !== 'success') {
        throw new AppError(`Error parsing import file: ${result.messages[0]}`, 400)
    }

    // 2) Instantiate the data into Project documents (and store them right away)
    result = await importHelper.createProjects(result)

    // 3) Reverse the order of messages in result
    result.messages.reverse()

    // 4) return the result
    return result
}

exports.getMatchingProjects = async filter => {
    let queryResult

    // base query
    let query = Project.find().select({ cw_id: 1, _id: 0 })

    // if empty filter, all projecs match
    if (!filter.tags || filter.tags.length === 0) {
        queryResult = await query
    } else {
        // check operator
        if (filter.union) query = query.where('tags').all(filter.tags)
        else query = query.where('tags').in(filter.tags)
        queryResult = await query
    }

    // reduce the returned objects to a number array
    return queryResult.map(prj => prj.cw_id)
}
