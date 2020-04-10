/* eslint-disable no-console */
//
// IMPORTS
//
// libraries
require('dotenv').config()
const mongoose = require('mongoose')
// app modules
const Radar = require('./../src/server/models/radarModel')

process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message)
    throw error
})

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
    console.log('\n==> DELETING radars')
    let deleteResult = await Radar.deleteMany({})
    console.log(`Deleted ${deleteResult.deletedCount} radars.`)

    await createRadars()

    console.log('\n--> Done importing, disconnecting DB.')
    await mongoose.disconnect()

    console.log('--> Shutting down.')
    process.exit(0)
}

const createRadars = async () => {
    console.log('\n==> CREATING radars')

    const radars = []
    radars.push(
        await Radar.create({
            year: 2018,
            release: 'Autumn',
            summary: 'First radar'
        })
    )
    console.log(`Radar ${radars[0].name} created.`)

    radars.push(
        await Radar.create({
            year: 2019,
            release: 'Spring',
            summary: 'Second radar'
        })
    )
    console.log(`Radar ${radars[1].name} created.`)

    radars.push(
        await Radar.create({
            year: 2019,
            release: 'Autumn',
            summary: 'Third radar'
        })
    )
    console.log(`Radar ${radars[2].name} created.`)

    radars.push(
        await Radar.create({
            year: 2020,
            release: 'Spring',
            summary: 'Fourth radar'
        })
    )
    console.log(`Radar ${radars[3].name} created.`)

    radars.push(
        await Radar.create({
            year: 2020,
            release: 'Autumn',
            summary: 'Fifth radar'
        })
    )
    console.log(`Radar ${radars[4].name} created.`)

    return radars
}
