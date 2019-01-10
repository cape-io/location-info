import { get } from 'lodash/fp'
import { addRoute, addRoutes } from './actions'
import reducer, { defaultState } from './reducer'

/* globals describe test expect */

const routes = {
  colors: '/colors',
  filmfest: '/details/recPkxpU5hm2lfIWC',
  details: '/details/:showId',
  home: '/',
  me: '/me',
  studentList: '/students',
}

describe('reducer', () => {
  test('undefined default', () => {
    expect(reducer(undefined)).toBe(defaultState)
  })
  test('addRoutes', () => {
    const res = reducer(undefined, addRoutes(routes))
    const state1 = {
      route: {
        colors: { id: 'colors', pattern: '/colors' },
        details: { id: 'details', pattern: '/details/:showId' },
        filmfest: { id: 'filmfest', pattern: '/details/recPkxpU5hm2lfIWC' },
        home: { id: 'home', pattern: '/' },
        me: { id: 'me', pattern: '/me' },
        studentList: { id: 'studentList', pattern: '/students' },
      },
      trailingSlash: false,
      urlPath: 'pathname',
    }
    expect(res).toEqual(state1)
  })
})
describe('addRoute', () => {
  const res = reducer(undefined, addRoute('dat', '/feed/me'))
  const state1 = {
    route: {
      dat: { id: 'dat', pattern: '/feed/me' },
    },
    trailingSlash: false,
    urlPath: 'pathname',
  }
  test('add first route', () => {
    expect(res).toEqual(state1)
  })
  test('add another route', () => {
    const res2 = reducer(res, addRoute('tad', '/me/feed'))
    expect(get('route.tad.id', res2)).toBe('tad')
  })
})
