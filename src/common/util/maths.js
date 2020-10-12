//
// IMPORTS
//

//
// convert an angle and egrees into radians
//
const toRadian = (angleDeg) => (Math.PI * angleDeg) / 180

//
// convert an angle in rad to degree
//
const toDegree = (angleRad) => (angleRad * 180) / Math.PI

//
// round a floating point number to the given number of decimals
//
const roundDec = (f, d) => Math.round(f * Math.pow(10, d)) / Math.pow(10, d)

//
// Calc angle (in degree) for equally sized segments in a radar
//
const theta = (num) => {
    return 360 / num
}

//
// calculate the RADIAN angles for the radar segments using the given values
//
const calcAngles = (num) => {
    const angle = toRadian(theta(num))
    if (num < 1) return []

    const result = [0]
    for (let i = 0; i < num; i++) {
        result.push(result[result.length - 1] + angle)
    }

    return result
}

//
// calculate an array of radii for radar segment rings so that all ring arcs have the SAME THICKNESS.
//
const equiDistantRadii = (numSegs, numRings, radius) => {
    if (numRings < 1 || radius < 1) return []

    const delta = radius / numRings

    const radii = []
    for (let i = 0; i <= numRings; i++) {
        radii.push(delta * i)
    }
    return radii
}

//
// calculate an array of radii for radar segment rings so that all ring arcs have the SAME AREA.
//
const equiSpatialRadii = (numSegs, numRings, radius) => {
    if (numSegs < 1 || numRings < 1 || radius < 1) return []

    const angle = toRadian(theta(numSegs))
    const ringArea = (0.5 * angle * Math.pow(radius, 2)) / numRings

    const radii = [0]
    for (let i = 0; i < numRings; i++) {
        radii.push(
            Math.round(Math.sqrt((2 / angle) * ringArea + Math.pow(radii[radii.length - 1], 2)))
        )
    }
    return radii
}

const scale = (sMin, sMax) => {
    let scale = {}

    scale.range = function (rMin, rMax) {
        const ratio = (sMax - sMin) / (rMax - rMin)
        const offset = 0 + sMin
        const shift = 0 - rMin

        return function (value) {
            return (value + shift) * ratio + offset
        }
    }

    return scale
}

//
// EXPORTS
//
module.exports = {
    scale,
    theta,
    calcAngles,
    equiDistantRadii,
    equiSpatialRadii,
    toRadian,
    toDegree,
    roundDec,
}
