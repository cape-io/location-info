import test from 'tape'
import reducer, { addRoutes, findRoute, selectRoutes, routeInfoSelector } from './'

const routeVals = {
  colors: '/colors',
  details: '/details/:showId',
  home: '/',
  me: '/me',
}
const state = {
  locInfo: reducer(undefined, addRoutes(routeVals)),
}

test('selectRoutes', (t) => {
  const route = selectRoutes(state).details
  const location = route.pattern.stringify({ extra: 'bits', showId: 20 })
  t.equal(location, '/details/20')
  t.end()
})
test('findRoute', (t) => {
  const res = findRoute(selectRoutes(state), '/me')
  t.equal(res.route.id, 'me', 'route id')
  t.deepEqual(res.location, { pathname: '/me' }, 'location')
  t.deepEqual(res.params, {}, 'params')

  const res2 = findRoute(selectRoutes(state), '/details/vroom')
  t.equal(res2.route.id, 'details', 'route id')
  t.deepEqual(res2.location, { pathname: '/details/vroom' }, 'location')
  t.deepEqual(res2.params, { showId: 'vroom' }, 'params')
  t.end()
})
test('routeInfoSelector', (t) => {
  const routes = selectRoutes(state)
  const history = { index: 1, location: '/me' }
  const res = routeInfoSelector(routes, history)
  // console.log(res)
  t.equal(res.history.index, 1)
  t.equal(res.route.id, 'me')
  t.end()
})
