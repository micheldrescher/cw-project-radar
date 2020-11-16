const v = require('../../../common/util/validator')

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
