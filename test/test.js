import test from 'tape'
import _ from 'lodash'
import createRouter, { stripHash } from '../src'

const { makeRoute, makeRoutes, getRoute, locationInfo } = createRouter()

test('stripHash should remove front hash', (assert) => {
  assert.equal(stripHash('#hash'), 'hash', 'Removes hash from start.')
  assert.equal(stripHash('nohash'), 'nohash', 'Leaves no hash untouched.')
  assert.equal(stripHash('middle#hash'), 'middle#hash', 'Leaves middle hash there.')
  assert.end()
})

test('makeRoute should accept id as a single argument', (assert) => {
  const routeId = 'zFa'
  const path = `/${routeId}/`
  const route = makeRoute(routeId)
  assert.equal(route.id, routeId, 'Save id to route.')
  assert.deepEqual(route.pattern.match(path), {}, 'Match returns empty object.')
  assert.equal(route.pattern.match(`/${routeId}`), null, 'No match returns null.')
  assert.deepEqual(_.keys(route), [ 'id', 'pattern' ], 'Returns id and pattern keys.')
  assert.end()
})

const path = '/foo/:bar'
test('makeRoute accepts id and a second path argument', (assert) => {
  const routeId = 'ca'
  const pathname = '/foo/cat'
  const route = makeRoute(routeId, path)
  assert.equal(route.id, routeId, 'Save id to route.')
  assert.deepEqual(
    route.pattern.match(pathname),
    { bar: 'cat' },
    'pattern.match returns param object.'
  )
  assert.equal(route.pattern.match('/blah'), null, 'No match returns null.')
  assert.end()
})

test('makeRoute spreads third argument object onto route', (assert) => {
  const routeId = 'sm'
  const route = makeRoute(routeId, path, { sm: 'ys' })
  assert.equal(route.sm, 'ys', 'Prop sm added to route.')
  assert.end()
})

test('makeRoute takes simple object and makes routes.', (assert) => {
  const routes = {
    about: '/about',
    member: '/member(/:id)',
  }
  makeRoutes(routes)
  assert.equal(getRoute('about').id, 'about', 'About got added.')
  assert.deepEqual(
    getRoute('member').pattern.match('/member/kai'),
    { id: 'kai' },
    'Member path pattern applied.'
  )
  assert.end()
})

test('locationInfo', (assert) => {
  const pathname = '/about'
  const route = locationInfo(pathname)
  assert.equal(route.routeId, 'about', 'accepts string as location')
  assert.equal(route.pathname, pathname, 'returns original pathname')
  assert.end()
})
