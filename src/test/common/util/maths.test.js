const m = require('../../../common/util/maths')

/*
 * toRadian
 */
test('toRadian 0', () => {
    expect(m.toRadian(0)).toBe(0)
})

test('toRadian 360', () => {
    expect(m.toRadian(360)).toBe(2 * Math.PI)
})

test('toRadian 180', () => {
    expect(m.toRadian(180)).toBe(Math.PI)
})

test('toRadian 720', () => {
    expect(m.toRadian(720)).toBe(4 * Math.PI)
})

test('toRadian -180', () => {
    expect(m.toRadian(-180)).toBe(-1 * Math.PI)
})

/*
 * toDegree
 */
test('toDegree 0', () => {
    expect(m.toDegree(0)).toBe(0)
})

test('toDegree Math.PI', () => {
    expect(m.toDegree(Math.PI)).toBe(180)
})

test('toDegree 2*Math.PI', () => {
    expect(m.toDegree(2 * Math.PI)).toBe(360)
})

test('toDegree 4*Math.PI', () => {
    expect(m.toDegree(4 * Math.PI)).toBe(720)
})

test('toDegree -Math.PI', () => {
    expect(m.toDegree(-1 * Math.PI)).toBe(-180)
})

/*
 * theta
 */
test('theta 0', () => {
    expect(m.theta(0)).toBe(Infinity)
})

test('theta 1', () => {
    expect(m.theta(1)).toBe(360)
})

test('theta 2', () => {
    expect(m.theta(2)).toBe(180)
})

test('theta 4', () => {
    expect(m.theta(4)).toBe(90)
})

/*
 * calcAngles
 */
test('calcAngles 0', () => {
    expect(m.calcAngles(0)).toEqual([])
})

test('calcAngles 1', () => {
    expect(m.calcAngles(1)).toEqual([0, 2 * Math.PI])
})

test('calcAngles 2', () => {
    expect(m.calcAngles(2)).toEqual([0, Math.PI, 2 * Math.PI])
})

test('calcAngles 4', () => {
    expect(m.calcAngles(4)).toEqual([0, Math.PI / 2, Math.PI, Math.PI * 1.5, 2 * Math.PI])
})

/*
 * equiDistantRadii
 */
test('equiDistantRadii 0 0 0', () => {
    expect(m.equiDistantRadii(0, 0, 0)).toEqual([])
})

test('equiDistantRadii 0 1 0', () => {
    expect(m.equiDistantRadii(0, 1, 0)).toEqual([])
})

test('equiDistantRadii 0 0 1', () => {
    expect(m.equiDistantRadii(0, 0, 1)).toEqual([])
})

test('equiDistantRadii 0 1 1', () => {
    expect(m.equiDistantRadii(0, 1, 1)).toEqual([0, 1])
})

test('equiDistantRadii 0 1 10', () => {
    expect(m.equiDistantRadii(0, 1, 10)).toEqual([0, 10])
})

test('equiDistantRadii 0 2 10', () => {
    expect(m.equiDistantRadii(0, 2, 10)).toEqual([0, 5, 10])
})

test('equiDistantRadii 0 5 100', () => {
    expect(m.equiDistantRadii(0, 5, 100)).toEqual([0, 20, 40, 60, 80, 100])
})

test('equiDistantRadii 100 5 100', () => {
    expect(m.equiDistantRadii(100, 5, 100)).toEqual([0, 20, 40, 60, 80, 100])
})

/*
 * equiSpatialRadii
 */
test('equiSpatialRadii 0 0 0', () => {
    expect(m.equiSpatialRadii(0, 0, 0)).toEqual([])
})

test('equiSpatialRadii 1 1 0', () => {
    expect(m.equiSpatialRadii(1, 1, 0)).toEqual([])
})

test('equiSpatialRadii 1 0 1', () => {
    expect(m.equiSpatialRadii(0, 0, 0)).toEqual([])
})

test('equiSpatialRadii 0 0 1', () => {
    expect(m.equiSpatialRadii(0, 0, 1)).toEqual([])
})

test('equiSpatialRadii 1 1 100', () => {
    expect(m.equiSpatialRadii(1, 1, 100)).toEqual([0, 100])
})

test('equiSpatialRadii 2 2 100', () => {
    expect(m.equiSpatialRadii(2, 2, 100)).toEqual([0, 71, 100])
})

/*
 * scale
 */
// identity scale
describe('scale positive identity', () => {
    let scale
    beforeAll(() => {
        return (scale = m.scale(0, 100).range(0, 100))
    })

    test('scale min', () => {
        expect(scale(0)).toBe(0)
    })

    test('scale mid', () => {
        expect(scale(50)).toBe(50)
    })

    test('scale max', () => {
        expect(scale(100)).toBe(100)
    })
})
// inflating positive scale
describe('scale positive inflating', () => {
    let scale
    beforeAll(() => {
        return (scale = m.scale(0, 400).range(100, 200))
    })

    test('scale min', () => {
        expect(scale(100)).toBe(0)
    })

    test('scale mid', () => {
        expect(scale(150)).toBe(200)
    })

    test('scale max', () => {
        expect(scale(200)).toBe(400)
    })
})
// deflating positive scale
describe('scale positive deflating', () => {
    let scale
    beforeAll(() => {
        return (scale = m.scale(0, 100).range(100, 400))
    })

    test('scale min', () => {
        expect(scale(100)).toBe(0)
    })

    test('scale mid', () => {
        expect(scale(250)).toBe(50)
    })

    test('scale max', () => {
        expect(scale(400)).toBe(100)
    })
})
// negative scale, positive values
describe('scale negative values', () => {
    let scale
    beforeAll(() => {
        return (scale = m.scale(-100, 100).range(100, 500))
    })

    test('scale min', () => {
        expect(scale(100)).toBe(-100)
    })

    test('scale mid', () => {
        expect(scale(300)).toBe(0)
    })

    test('scale max', () => {
        expect(scale(500)).toBe(100)
    })

    test('scale beyond min', () => {
        expect(scale(0)).toBe(-150)
    })

    test('scale beyond max', () => {
        expect(scale(600)).toBe(150)
    })
})

/*
 * roundDec
 */
test('round zero, no decimals', () => {
    expect(m.roundDec(0, 0)).toBe(0)
})
test('round 1.2345 2 dec to 1.23', () => {
    expect(m.roundDec(1.2345, 2)).toBe(1.23)
})
