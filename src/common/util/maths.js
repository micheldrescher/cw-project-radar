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
// calculate an array of radii for radar segment rings
//
const calcRadii = (numSegs, numRings, radius) => {
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
        let range = {}
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
module.exports = { scale, theta, calcAngles, calcRadii, toRadian, toDegree }
