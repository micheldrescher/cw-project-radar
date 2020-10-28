const { JSDOM } = require('jsdom')
const { any, all, partition } = require('../../../../client/js/util/nodeFilter')

let testNodes
// create the sample data
beforeAll(() => {
    const { document } = new JSDOM(`<DOCTYPE html>
<g class='blip' id='blip-1' data-jrc-tags="foo"></g>
<g class='blip' id='blip-2' data-jrc-tags="bar"></g>
<g class='blip' id='blip-3' data-jrc-tags="foo bar"></g>
`).window

    testNodes = document.querySelectorAll('g')
})

describe("testing 'any' node filter", () => {
    // test that the testNodes are in fact an array of three nodes
    test('check nodeFilters', () => {
        expect(testNodes.length).toBe(3)
    })

    // check that empty filters return all
    test('check any()', () => {
        const [pass, fail] = partition(testNodes, [], any)
        expect(pass.length).toBe(3)
        expect(pass[0].id).toEqual('blip-1')
        expect(pass[1].id).toEqual('blip-2')
        expect(pass[2].id).toEqual('blip-3')
        expect(fail.length).toBe(0)
    })

    // test that any of 'foo' returns 2 blips; blip 1 and blip 3
    test('check any(foo)', () => {
        const [pass, fail] = partition(testNodes, ['foo'], any)
        expect(pass.length).toBe(2)
        expect(pass[0].id).toEqual('blip-1')
        expect(pass[1].id).toEqual('blip-3')
        expect(fail.length).toBe(1)
        expect(fail[0].id).toEqual('blip-2')
    })

    // test that any of 'bar' returns 2 blips; blip 2 and blip 3
    test('check any(bar)', () => {
        const [pass, fail] = partition(testNodes, ['bar'], any)
        expect(pass.length).toBe(2)
        expect(pass[0].id).toEqual('blip-2')
        expect(pass[1].id).toEqual('blip-3')
        expect(fail.length).toBe(1)
        expect(fail[0].id).toEqual('blip-1')
    })

    // test that any of 'foo, bar' returns 2 blips; blip 1, 2 and 3
    test('check any(foo,bar)', () => {
        const [pass, fail] = partition(testNodes, ['foo', 'bar'], any)
        expect(pass.length).toBe(3)
        expect(pass[0].id).toEqual('blip-1')
        expect(pass[1].id).toEqual('blip-2')
        expect(pass[2].id).toEqual('blip-3')
        expect(fail.length).toBe(0)
    })
})

describe("testing 'all' node filter", () => {
    // test that the testNodes are in fact an array of three nodes
    test('check nodeFilters', () => {
        expect(testNodes.length).toBe(3)
    })

    // check that empty filters return all
    test('check all()', () => {
        const [pass, fail] = partition(testNodes, [], all)
        expect(pass.length).toBe(3)
        expect(pass[0].id).toEqual('blip-1')
        expect(pass[1].id).toEqual('blip-2')
        expect(pass[2].id).toEqual('blip-3')
        expect(fail.length).toBe(0)
    })

    // test that all of 'foo' returns 2 blips; blip 1 and blip 3
    test('check all(foo)', () => {
        const [pass, fail] = partition(testNodes, ['foo'], all)
        expect(pass.length).toBe(2)
        expect(pass[0].id).toEqual('blip-1')
        expect(pass[1].id).toEqual('blip-3')
        expect(fail.length).toBe(1)
        expect(fail[0].id).toEqual('blip-2')
    })

    // test that all of 'bar' returns 2 blips; blip 2 and blip 3
    test('check all(bar)', () => {
        const [pass, fail] = partition(testNodes, ['bar'], all)
        expect(pass.length).toBe(2)
        expect(pass[0].id).toEqual('blip-2')
        expect(pass[1].id).toEqual('blip-3')
        expect(fail.length).toBe(1)
        expect(fail[0].id).toEqual('blip-1')
    })

    // test that all of 'foo, bar' returns 1 blip; blip 3
    test('check all(foo, bar)', () => {
        const [pass, fail] = partition(testNodes, ['foo', 'bar'], all)
        expect(pass.length).toBe(1)
        expect(pass[0].id).toEqual('blip-3')
        expect(fail.length).toBe(2)
        expect(fail[0].id).toEqual('blip-1')
        expect(fail[1].id).toEqual('blip-2')
    })
})
