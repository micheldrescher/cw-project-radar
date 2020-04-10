/* eslint-disable no-console */
//
// IMPORTS
//
// libraries
require('dotenv').config()
const csv = require('@fast-csv/parse')
const fs = require('fs')
const moment = require('moment')
const mongoose = require('mongoose')
// app modules
const projectController = require('../src/server/controllers/projectController')
const { Classification } = require('../src/server/models/classificationModel')

process.on('unhandledRejection', error => {
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
    headers: true
}

// DB URL
let { DB_URL } = process.env
// connect to DB
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
// test connect so that we know all is in order
var db = mongoose.connection
db.on('error', function() {
    console.log('Failed to connect to database')
    process.exit(1)
})
db.once('open', async function() {
    console.log('Connected to database')
    await runScript()
})

//
// the actual script
//
const runScript = async () => {
    console.log('\n==> DELETING classifications')
    const deleteResult = await Classification.deleteMany({})
    console.log(`Deleted ${deleteResult.deletedCount} classifications.`)

    const data = await importClassifications()

    await addClassifications(data)

    console.log('--> Done importing, disconnecting DB.')
    await mongoose.disconnect()

    console.log('--> Shutting down.')
    process.exit(0)
}

// import projects from CSV into an object array
const importClassifications = () => {
    return new Promise((resolve, reject) => {
        console.log('\n==> IMPORTING classifications')
        const data = []
        fs.createReadStream('__import__/segments.tsv')
            .pipe(csv.parse(csvParseOptions))

            .on('error', error => {
                console.error(error)
                reject()
            })

            .on('data', row => {
                const obj = cleanseData(row)
                // add to data stack
                data.push({
                    cw_id: obj.cw_id,
                    name: obj.name,
                    segment: obj.segment
                })
            })

            .on('end', rowCount => {
                console.log(`Parsed ${rowCount} rows`)
                resolve(data)
            })
    })
}

const cleanseData = obj => {
    let result = {}

    // cleanse data: empty values to undefined
    Object.keys(obj).forEach(function(key) {
        if (obj[key] !== '') {
            result[key] = obj[key] // remove empty entries
        }
    })

    return result
}

const addClassifications = async data => {
    console.log('\n==> ADDING CLASSIFICATIONS')
    let added = 0
    let failed = 0
    let skipped = 0
    await Promise.all(
        data.map(async obj => {
            // skip if no classification available
            if (!obj.segment) {
                console.log(`(${obj.cw_id} | ${obj.name}) --> no classification, skipping`)
                skipped++
                return
            }
            // add classification
            await projectController.addCategory(obj.cw_id, {
                classification: obj.segment,
                classifiedOn: moment('2018-08-01', 'YYYY-MM-D'),
                changeSummary: 'Import from Google Sheets based system.'
            })
            added++
        })
    )
    console.log(
        `${added +
            failed +
            skipped} classifications (${added} added, ${failed} failed, ${skipped} skipped.)\n`
    )
}
