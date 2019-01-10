import reducer, { addRoutes, findRoute, getHref, selectRoutes, routeInfoSelector } from './'

/* globals describe test expect */

const routeVals = {
  colors: '/colors',
  details: '/details/:showId',
  home: '/',
  me: '/me',
}
const state = {
  locInfo: reducer(undefined, addRoutes(routeVals)),
}

describe('selectRoutes', () => {
  const route = selectRoutes(state).details
  test('Access route by ID.', () => {
    const location = route.pattern.stringify({ extra: 'bits', showId: 20 })
    expect(location).toBe('/details/20')
  })
})

describe('findRoute', () => {
  test('Find route by path.', () => {
    const res = findRoute(selectRoutes(state), '/me')
    expect(res.id).toBe('me')
    expect(res.urlPart).toEqual('/me')
    expect(res.params).toEqual({})
  })
  test('Find another route by path that has params value.', () => {
    const res = findRoute(selectRoutes(state), '/details/vroom')
    expect(res.id).toBe('details')
    expect(res.urlPart).toEqual('/details/vroom')
    expect(res.params).toEqual({ showId: 'vroom' })
  })
})

describe('routeInfoSelector', () => {
  const routes = selectRoutes(state)
  const history = { index: 1, location: '/me' }
  const res = routeInfoSelector(routes, history)
  test('Works with redux-history-sync.', () => {
    expect(res.history.index).toBe(1)
    expect(res.id).toBe('me')
  })
})

describe('getHref', () => {
  const props = { routeId: 'details', showId: 'foo' }
  test('Makes urlPart with params.', () => {
    expect(getHref(state, props)).toBe('/details/foo')
  })
  test('Makes urlPart with only routeId', () => {
    expect(getHref(state, { routeId: 'colors' })).toBe('/colors')
    expect(getHref(state, { routeId: 'home' })).toBe('/')
  })
})
