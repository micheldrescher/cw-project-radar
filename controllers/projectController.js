//
// IMPORTS
//
// libraries
// modules
const AppError = require('../utils/AppError')
const { Classification } = require('../models/classificationModel')
const { MTRLScore } = require('../models/mtrlScoreModel')
const { Project } = require('../models/projectModel')

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
