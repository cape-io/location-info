import test from 'tape'
import reducer, { addRoutes, findRoute, selectRoutes } from './'

const routes = {
  colors: '/colors',
  details: '/details/:showId',
  home: '/',
  me: '/me',
}

test('findRoute', (t) => {
  const state = {
    locInfo: reducer(undefined, addRoutes(routes)),
  }
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
