//
// IMPORTS
//
// libraries
const csv = require('@fast-csv/parse')
const moment = require('moment')
const parseCurrency = require('parsecurrency')
const streamifier = require('streamifier')
// app modules
const { Project } = require('./../../models/projectModel')

//
// Cnfigure TSV parsing
//
const csvParseOptions = {
    delimiter: '	',
    quote: null,
    renameHeaders: true,
    headers: [
        'name',
        'rcn',
        'call',
        'type',
        'startDate',
        'endDate',
        'budget',
        'title',
        'teaser',
        'url',
        'fundingBodyLink',
        'cwurl',
    ],
}

//
// parse TSV buffers into plain JS objects
//
exports.parseTSV = (buffer) => {
    // 1) Create return data structures
    const data = []
    let status = 'success'
    const messages = []
    // 2) Create stream buffer and start parsing data
    return new Promise((resolve, reject) => {
        streamifier
            .createReadStream(buffer)
            .pipe(csv.parse(csvParseOptions))
            // error handling while stream buffering. N/A with memory backed buffers!?
            .on('error', (error) => {
                status = 'error'
                messages.push('Stream read error:' + error)
                // return a reject
                reject({ status, data, messages })
            })
            // In each data row, sanitise empty cells into undefned before storing
            .on('data', (row) => {
                // sanitise empty values to undefined
                let obj = {}
                Object.keys(row).forEach(function (key) {
                    if (row[key] !== '') {
                        obj[key] = row[key] // remove empty entries
                    }
                })
                data.push(obj)
            })
            // add a final message to the import process
            .on('end', (rowCount) => {
                status = 'success'
                messages.push(`Parsed ${rowCount} rows, accepting ${data.length} entries.`)
                resolve({ status, data, messages })
            })
    })
}

//
// Instantiate projects from imported JS objects
//
exports.createProjects = (results) => {
    // 1) Return a promise
    return new Promise((resolve, reject) => {
        // 2) Create return data structures
        let { status, data, messages } = results
        const projects = []
        let numFailed = 0
        // 3) Wait for all async data.map() calls to resolve
        Promise.all(
            data.map(async (prj, i) => {
                // 3.1) Create project
                try {
                    await Project.create({
                        name: prj.name,
                        call: prj.call,
                        rcn: prj.rcn,
                        type: prj.type,
                        startDate: moment(prj.startDate, 'MMM YYYY'),
                        endDate: moment(prj.endDate, 'MMM YYYY').endOf('month'),
                        budget: parseCurrency(prj.totalCost).value,
                        title: prj.title,
                        teaser: prj.teaser,
                        url: prj.url,
                        fundingBodyLink: prj.fundingBodyLink,
                        cwurl: prj.cwurl,
                    }).then(
                        (data) => {
                            projects.push(data)
                            console.log('SUCCESS', data.name)
                        },
                        (err) => {
                            console.log('FAIL', prj.name)
                            messages.push(
                                `Error while importing project '${prj.name}' at row ${i + 1}: '${
                                    err.message
                                }'`
                            )
                            numFailed++
                        }
                    )
                } catch (err) {
                    console.log('ERR', prj.name)
                    messages.push(
                        `Error while importing project '${prj.name}' at row ${i + 1}: '${
                            err.message
                        }'`
                    )
                    numFailed++
                }
            })
            // then resolve the outer promise with all the results
        ).then(() => {
            messages.push(`Imported ${projects.length} projects, ${numFailed} projects failed.`)
            resolve({ status, projects, messages })
        })
    })
}
