//
// IMPORTS
//
// libraries
// modules

//
// MODULE VARS
//
const segments = process.env.MODEL_SEGMENTS.split(',').map((e) => e.trim())
const rings = process.env.MODEL_RINGS.split(',').map((e) => e.trim())
const lcycle = process.env.MODEL_LCYCLE.split(',').map((e) => e.trim())
if (!segments) throw 'Env var MODEL_SEGMENTS is missing.'
if (!rings) throw 'Env var MODEL_RINGS is missing.'
if (!lcycle) throw 'Env var MODEL_LCYCLE is missing.'

//
// Fetch a radar by its slug
//
exports.getModel = () => {
    return {
        segments,
        rings,
        lcycle,
    }
}
