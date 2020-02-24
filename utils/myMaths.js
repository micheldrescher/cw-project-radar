//
// IMPORTS
//

//
// calculate the angles for the radar segments using the given values
//
const calcAngles = num => {
    const angle = toRadian(360 / num)

    const angles = [0]
    for (let i = 0; i < num; i++) {
        angles.push(angles[angles.length - 1] + angle)
    }
    return angles
}

//
// calculate an array of radii for radar segment rings
//
const calcRadii = (numSegs, numRings, radius) => {
    const angle = toRadian(360 / numSegs)
    const ringArea = (0.5 * angle * Math.pow(radius, 2)) / numRings

    const radii = [0]
    for (let i = 0; i < numRings; i++) {
        radii.push(
            Math.round(Math.sqrt((2 / angle) * ringArea + Math.pow(radii[radii.length - 1], 2)))
        )
    }
    return radii
}

//
// convert an angle ind egrees into radians
//
const toRadian = angleInDegrees => {
    return (Math.PI * angleInDegrees) / 180
}

//
// EXPORTS
//
module.exports = { calcAngles, calcRadii, toRadian }
