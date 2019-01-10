import { stripHash } from './utils'

/* globals describe test expect */

describe('stripHash', () => {
  test('remove front hash', () => {
    expect(stripHash('#hash')).toBe('hash')
  })
  test('Leaves no hash untouched.', () => {
    expect(stripHash('nohash')).toBe('nohash')
    expect(stripHash('middle#hash')).toBe('middle#hash')
  })
})
