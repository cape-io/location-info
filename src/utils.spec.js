import { getInfo, stripHash } from './utils'

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
describe('getInfo', () => {
  test('add front slash to id', () => {
    const state = { leadingSlash: true, trailingSlash: false }
    expect(getInfo(state, { id: 'foo' })).toEqual({ id: 'foo', pattern: '/foo' })
  })
  test('add slash to head and tail.', () => {
    const state = { leadingSlash: true, trailingSlash: true }
    expect(getInfo(state, { id: 'foo' })).toEqual({ id: 'foo', pattern: '/foo/' })
  })
  test('add no slash.', () => {
    const state = { leadingSlash: false, trailingSlash: false }
    expect(getInfo(state, { id: 'foo' })).toEqual({ id: 'foo', pattern: 'foo' })
  })
})
