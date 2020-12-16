/* eslint-disable no-console */
//
// IMPORTS
//
require('dotenv').config()
// libraries
const csv = require('@fast-csv/parse')
const fs = require('fs')
const moment = require('moment')
const mongoose = require('mongoose')
const parseCurrency = require('parsecurrency')
// app modules
const { Project } = require('./../src/server/models/projectModel')

process.on('unhandledRejection', (error) => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message)
    throw error
})

//
// parsing formats
//
const csvParseOptions = {
    delimiter: '	',
    quote: null,
    renameHeaders: true,
    headers: [
        'cw_id',
        'name',
        'rcn',
        'call',
        'type',
        'startDate',
        'endDate',
        'budget',
        'title',
        'teaser',
        'projectURL',
        'fundingBodyLink',
        'cwurl',
    ],
}

// DB URL
let { DB_URL } = process.env
// connect to DB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
// test connect so that we know all is in order
var db = mongoose.connection
db.on('error', function () {
    throw new Error('Failed to connect to database')
})
db.once('open', async function () {
    console.log('Connected to database')
    await runScript()
})

//
// the actual script
//
const runScript = async () => {
    console.log('\n==> DELETING ALL PROJECTS')
    const deleteResult = await Project.deleteMany({})
    console.log(`Deleted ${deleteResult.deletedCount} projects.`)

    const data = await importProjects()

    const projects = await createProjects(data)

    const insertResult = await Project.insertMany(projects)
    console.log('\n==> STORING ALL PROJECTS')
    console.log(`${insertResult.length} projects stored in database.`)

    console.log('\n--> Done importing, disconnecting DB.')
    await mongoose.disconnect()

    console.log('--> Shutting down.')
    process.exit(0)
}

// import projects from CSV into an object array
const importProjects = () => {
    return new Promise((resolve, reject) => {
        const data = []
        console.log('\n==> IMPORTING ALL PROJECTS')
        fs.createReadStream('__import__/projects.tsv')
            .pipe(csv.parse(csvParseOptions))

            .on('error', (error) => {
                console.error(error)
                reject()
            })

            .on('data', (row) => {
                if (row.cw_id === '156') {
                    console.log('** omitting Dogana II **')
                    return
                }

                // sanitise empty values to undefined
                let obj = {}
                Object.keys(row).forEach(function (key) {
                    if (row[key] !== '') {
                        obj[key] = row[key] // remove empty entries
                    }
                })
                data.push(obj)
            })

            .on('end', (rowCount) => {
                console.log(`Parsed ${rowCount} rows, accepting ${data.length} projects`)
                resolve(data)
            })
    })
}

const createProjects = (data) => {
    console.log('\n==> CREATING MOGOOSE PROJECTS')
    const projects = []

    // await Promise.all(
    data.map(async (prj) => {
        const project = new Project({
            acronym: prj.name,
            cw_id: prj.cw_id,
            rcn: prj.rcn,
            call: prj.call,
            type: prj.type,
            startDate: moment(prj.startDate, 'MMM YYYY'),
            endDate: moment(prj.endDate, 'MMM YYYY').endOf('month'),
            totalCost: parseCurrency(prj.budget).value,
            title: prj.title,
            teaser: prj.teaser,
            url: prj.projectURL,
            fundingBodyLink: prj.fundingBodyLink,
            cwurl: prj.cwurl,
        })
        projects.push(project)
    })
    console.log(`Created ${projects.length} mongoose projects.`)
    return projects
}
