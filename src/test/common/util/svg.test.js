/**
 * @jest-environment node
 */
const s = require('../../../common/util/svg')
const m = require('../../../common/util/maths')

/*
 * Circle as ring segment
 */
// default circle
describe('SVG default circle', () => {
    // set up SVGDom et al
    const { createSVGWindow } = require('svgdom')
    const window = createSVGWindow()
    const { document } = window
    const { registerWindow } = require('@svgdotjs/svg.js')
    registerWindow(window, document)

    const svgCircle = s.ringSegment({})

    test('check x, y and radius', () => {
        expect(svgCircle.cx()).toBe(0)
        expect(svgCircle.cy()).toBe(0)
        expect(svgCircle.attr('r')).toBe(10)
    })
    test('check dash and offset', () => {
        // split
        const [len, pause] = svgCircle
            .attr('stroke-dasharray')
            .split(',')
            .map((e) => e.trim())
        // test
        expect(m.roundDec(len, 4)).toEqual(m.roundDec(2 * Math.PI * 10, 4))
        expect(m.roundDec(pause, 4)).toEqual(m.roundDec(0, 4))
        expect(svgCircle.attr('stroke-dashoffset')).toEqual(0)
    })
    test('check stroke, width and fill', () => {
        expect(svgCircle.attr('stroke')).toEqual('black')
        expect(svgCircle.attr('stroke-width')).toEqual(1)
        expect(svgCircle.fill()).toEqual('none')
    })
})
// CW radar Secure systems Assess
describe('SVG CW radar circle', () => {
    const svgCircle = s.ringSegment({
        x: 51,
        y: 51,
        radius: 34.5,
        startAngle: 0,
        angle: 60,
        width: 7,
    })

    test('check x, y and radius', () => {
        expect(svgCircle.cx()).toBe(51)
        expect(svgCircle.cy()).toBe(51)
        expect(svgCircle.attr('r')).toBe(34.5)
    })
    test('check dash and offset', () => {
        // split
        const [len, pause] = svgCircle
            .attr('stroke-dasharray')
            .split(',')
            .map((e) => e.trim())
        // test
        expect(m.roundDec(len, 4)).toEqual(36.1283)
        expect(m.roundDec(pause, 4)).toEqual(180.6416)
        expect(m.roundDec(svgCircle.attr('stroke-dashoffset'), 4)).toEqual(54.1925)
    })
    test('check stroke, width and fill', () => {
        expect(svgCircle.attr('stroke')).toEqual('black')
        expect(svgCircle.attr('stroke-width')).toEqual(7)
        expect(svgCircle.fill()).toEqual('none')
    })
})
