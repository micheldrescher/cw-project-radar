const v = require('../../../server/utils/validator')

/*
 * Log level config
 */
describe('Log level param validation', () => {
    // valid log level names
    test('valid log level', () => {
        expect(v.validLogLevel('error')).toBe(true)
        expect(v.validLogLevel('warn')).toBe(true)
        expect(v.validLogLevel('info')).toBe(true)
        expect(v.validLogLevel('http')).toBe(true)
        expect(v.validLogLevel('verbose')).toBe(true)
        expect(v.validLogLevel('debug')).toBe(true)
        expect(v.validLogLevel('silly')).toBe(true)
    })
    // undefuned, empty, or anything else
    test('undefined, null, empty, any other invalid string', () => {
        expect(v.validLogLevel(undefined)).toBe(false)
        expect(v.validLogLevel(null)).toBe(false)
        expect(v.validLogLevel('')).toBe(false)
        expect(v.validLogLevel('foo')).toBe(false)
        expect(v.validLogLevel('delete * from users')).toBe(false)
    })
})

/*
 * Log level config
 */
describe('Username validation', () => {
    test('undefined, null', () => {
        expect(v.validUsername(undefined)).toBe(false)
        expect(v.validUsername(null)).toBe(false)
    })
    test('too short values', () => {
        expect(v.validUsername('')).toBe(false)
        expect(v.validUsername('a')).toBe(false)
        expect(v.validUsername('test')).toBe(false)
    })
    test('invalid characters', () => {
        expect(v.validUsername('$tester')).toBe(false)
        expect(v.validUsername('tester$')).toBe(false)
        expect(v.validUsername('te@`/[*')).toBe(false)
    })
    test('only numbers', () => {
        expect(v.validUsername('012345678')).toBe(false)
    })
    test('valid usernames', () => {
        expect(v.validUsername('tester')).toBe(true)
        expect(v.validUsername('animal001')).toBe(true)
    })
})

/*
 * Scores param
 */
describe('Validating scores query param for get ProjectByCWID', () => {
    // undef, null or empty
    test('undef, null or empty', () => {
        expect(v.validScoresParam('')).toBe(false)
        expect(v.validScoresParam(undefined)).toBe(false)
        expect(v.validScoresParam(null)).toBe(false)
    })
    // random strings are invalid
    test('invalid values', () => {
        expect(v.validScoresParam('all ')).toBe(false)
        expect(v.validScoresParam(' all')).toBe(false)
        expect(v.validScoresParam('newest ')).toBe(false)
        expect(v.validScoresParam(' newest')).toBe(false)
    })
    // 'all' and 'last' are valid
    test('all, or newest', () => {
        expect(v.validScoresParam('all')).toBe(true)
        expect(v.validScoresParam('newest')).toBe(true)
    })
})

/*
 * Classification param
 */
describe('Validating classification query param for get ProjectByCWID', () => {
    // undef, null or empty
    test('undef, null or empty', () => {
        expect(v.validClassificationParam(undefined)).toBe(false)
        expect(v.validClassificationParam(null)).toBe(false)
        expect(v.validClassificationParam('')).toBe(false)
    })
    // random strings are invalid
    test('invalid values', () => {
        expect(v.validClassificationParam('all ')).toBe(false)
        expect(v.validClassificationParam(' all')).toBe(false)
        expect(v.validClassificationParam('newest ')).toBe(false)
        expect(v.validClassificationParam(' newest')).toBe(false)
    })
    // 'all' and 'last' are valid
    test('all, or newest', () => {
        expect(v.validClassificationParam('all')).toBe(true)
        expect(v.validClassificationParam('newest')).toBe(true)
    })
})

/*
 * Radar slugs
 */
describe('Validating slugs as user input', () => {
    // undefined, null, empty
    test('undefined, null, empty', () => {
        expect(v.validSlug(undefined)).toBe(false)
        expect(v.validSlug(null)).toBe(false)
        expect(v.validSlug('')).toBe(false)
    })

    // invalid slugs
    test('invalid slugs', () => {
        expect(v.validSlug('autumn-020')).toBe(false)
        expect(v.validSlug('-2020')).toBe(false)
        expect(v.validSlug('2020-spring')).toBe(false)
        expect(v.validSlug('username[$ne]=1&password[$ne]=1')).toBe(false)
    })

    // valid slugs
    test('valid slugs', () => {
        expect(v.validSlug('autumn-2020')).toBe(true)
        expect(v.validSlug('spring-2020')).toBe(true)
        expect(v.validSlug('spring-0000')).toBe(true)
        expect(v.validSlug('spring-9999')).toBe(true)
    })
})

/*
 * Project CW Ids
 */
describe('Validating project CW Ids as user input', () => {
    // undefined, null, empty
    test('undefined, null, empty', () => {
        expect(v.validCwId(undefined)).toBe(false)
        expect(v.validCwId(null)).toBe(false)
        expect(v.validCwId('')).toBe(false)
    })

    // invalid slugs
    test('invalid CW Ids', () => {
        expect(v.validCwId('?')).toBe(false)
        expect(v.validCwId('a')).toBe(false)
        expect(v.validCwId('autumn-020')).toBe(false)
        expect(v.validCwId('-2020')).toBe(false)
        expect(v.validCwId('2020-spring')).toBe(false)
        expect(v.validCwId('username[$ne]=1&password[$ne]=1')).toBe(false)
    })

    // valid slugs
    test('valid CW Ids', () => {
        expect(v.validCwId('0')).toBe(true)
        expect(v.validCwId('1')).toBe(true)
        expect(v.validCwId('9')).toBe(true)
        expect(v.validCwId('99')).toBe(true)
        expect(v.validCwId('9999999999999')).toBe(true)
    })
})
