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
exports.getByCWId = async (cwid, addScores, addClassifications) => {
    // 1) Build the aggregation by matchng the project
    const query = Project.aggregate().match({ cw_id: { $eq: Number(cwid) } })

    // 2) add score(s) if requested
    if (addScores) {
        // build the generic lookup for either case ('all' or 'newest')
        const lookup = {
            from: 'mtrlscores',
            let: { prjID: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$project', '$$prjID'] } } },
                { $sort: { scoringDate: -1, _id: -1 } },
            ],
            as: 'scores',
        }
        // if newest only, limit the sub-pipeline to the first element
        if (addScores === 'newest') {
            lookup.pipeline.push({
                $limit: 1,
            })
        }
        // add the lookup to the aggregation
        query.lookup(lookup)
    }

    // 3) add classification(s) if requested
    if (addClassifications) {
        // build the generic lookup for either case ('all' or 'newest')
        const lookup = {
            from: 'classifications',
            let: { prjID: '$_id' },
            pipeline: [
                { $match: { $expr: { $eq: ['$project', '$$prjID'] } } },
                { $sort: { classifiedOn: -1, _id: -1 } },
            ],
            as: 'classifications',
        }
        // if newest only, limit the sub-pipeline to the first element
        if (addClassifications === 'newest') {
            lookup.pipeline.push({
                $limit: 1,
            })
        }
        // add the lookup to the aggregation
        query.lookup(lookup)
    }

    // 4) FInally, wait for the result
    const result = await query.exec()

    // 5) Return the first result, if any
    if (result && result.length > 0) return result[0]

    // 6) Otherwise, return undefined to trigger AppError
    return undefined
}

//
// get by RCN
//
exports.getByRCN = async (rcn) => {
    return await Project.findOne({ rcn })
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
        changeSummary: data.changeSummary,
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
        trl: data.trl,
        description: data.description,
    })

    // 3) Flag that this project has at least one score
    project.hasScores = true
    await project.save()

    return project
}

exports.importProjects = async (buffer) => {
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

exports.getMatchingProjects = async (filter) => {
    let queryResult

    // base query
    let query = Project.find().select({ cw_id: 1, _id: 0 })

    // if empty filter, all projecs match
    if (!filter.tags || filter.tags.length === 0) {
        queryResult = await query
    } else {
        // check operator
        if (filter.union === 'all') {
            query = query.where('tags').all(filter.tags)
        } else {
            query = query.where('tags').in(filter.tags)
        }
        queryResult = await query
    }

    // reduce the returned objects to a number array
    return queryResult.map((prj) => prj.cw_id)
}

exports.findProjects = async (criteria) => {
    const terms = criteria.terms || ''
    const caseSensitive = criteria.case || false

    let query = Project.find({
        $text: {
            $search: terms,
            $language: 'en',
            $caseSensitive: caseSensitive,
        },
    }).select('cw_id rcn acronym title -_id')

    let queryResult = await query

    return queryResult
}
