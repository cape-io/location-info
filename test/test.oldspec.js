import test from 'tape'
import _ from 'lodash'
import createRouter, { stripHash } from '../src'

const {
  addRoute, addRoutes,
  deleteRoute,
  size,
  getRoute, locationInfo,
  pathInfo,
} = createRouter()

test('addRoute should accept id as a single argument', (assert) => {
  const routeId = 'zFa'
  const path = `/${routeId}/`
  const route = addRoute(routeId)
  assert.equal(route.index, 0, 'First route index is 0.')
  assert.equal(route, getRoute(routeId), 'Return same object that is saved.')
  assert.equal(route.id, routeId, 'Save id to route.')
  assert.deepEqual(route.pattern.match(path), {}, 'Match returns empty object.')
  assert.equal(
    getRoute(routeId).pattern.match(`/${routeId}`),
    null,
    'getRoute returns route and no match returns null.'
  )
  assert.deepEqual(_.keys(route), ['id', 'index', 'pattern'], 'Returns id and pattern keys.')
  assert.end()
})

const path = '/foo/:bar'
test('addRoute accepts id and a second path argument', (assert) => {
  const routeId = 'ca'
  const pathname = '/foo/cat'
  const route = addRoute(routeId, path)
  assert.equal(route.index, 1, 'Second route index is 1.')
  assert.equal(route.id, routeId, 'Save id to route.')
  assert.deepEqual(
    route.pattern.match(pathname),
    { bar: 'cat' },
    'pattern.match returns param object.'
  )
  assert.equal(route.pattern.match('/blah'), null, 'No match returns null.')
  assert.end()
})

test('size() returns number of routes', assert => {
  assert.equal(size(), 2, '2 routes so far')
  assert.end()
})

test('deleteRoute removes route by id.', assert => {
  const routeLength = size()
  assert.equal(getRoute('ca').id, 'ca', 'ca route is there before delete')
  assert.equal(size(), routeLength, 'length is correct before delete')
  deleteRoute('ca')
  assert.equal(getRoute('ca'), undefined, 'getRoute returns undefined.')
  assert.equal(size(), routeLength - 1, 'length is correct after delete')
  assert.end()
})

test('addRoute spreads third argument object onto route', (assert) => {
  const routeId = 'sm'
  const route = addRoute(routeId, path, { sm: 'ys' })
  assert.equal(route.index, size() - 1, '2nd route index is 1.')
  assert.equal(route.sm, 'ys', 'Prop sm added to route.')
  assert.end()
})
test('addRoute sends fourth argument to new Pattern()', assert => {
  const token = 'Fe26.2**a346*QQ*6R_o-L--4U-Hfs*1456*RTR-oxBQX-qff9EQO%Bd6LaM30aVijxkXb7lkOM0q7bw'
  const pathTemplate = '/login/(:token)'
  const pathname = `/login/${token}`
  addRoute('login', pathTemplate, {}, {})
  assert.deepEqual(pathInfo(pathname), {}, 'without option there is no match.')
  deleteRoute('login')
  addRoute('login', pathTemplate, {}, { segmentValueCharset: 'a-zA-Z0-9-_~%.*' })
  assert.equal(pathInfo(pathname).id, 'login', 'With segmentValueCharset there is a match.')
  assert.equal(pathInfo(pathname).params.token, token, 'token param matches.')
  assert.end()
})

test('addRoutes takes simple object and makes routes.', (assert) => {
  const routes = {
    about: '/about',
    member: '/member(/:id)',
  }
  addRoutes(routes)
  assert.equal(getRoute('about').id, 'about', 'About got added.')
  assert.deepEqual(
    getRoute('member').pattern.match('/member/kai'),
    { id: 'kai' },
    'Member path pattern applied.'
  )
  assert.end()
})

test('addRoutes takes an array and makes routes.', assert => {
  const router = createRouter({ trailingSlash: false })
  router.addRoutes([ 'about', 'contact', 'foo' ])
  // console.log(router.getRoutes())
  assert.equal(router.size(), 3, 'Array of three equals size 3.')
  const aboutRoute = router.getRoute('about')
  assert.equal(aboutRoute && aboutRoute.id, 'about')
  assert.equal(aboutRoute.index, 0)
  assert.deepEqual(aboutRoute.pattern.match('/about'), {}, 'trailingSlash false')
  const contactRoute = router.getRoute('contact')
  assert.equal(contactRoute && contactRoute.id, 'contact')
  assert.equal(contactRoute.index, 1)
  const fooRoute = router.getRoute('foo')
  assert.equal(fooRoute && fooRoute.id, 'foo')
  assert.equal(fooRoute.index, 2)

  assert.end()
})

test('locationInfo', (assert) => {
  const pathname = '/about'
  const route = locationInfo(pathname)
  assert.equal(route.id, 'about', 'accepts string as location')
  assert.equal(route.location.pathname, pathname, 'returns original pathname')
  assert.end()
})

test('pathInfo() should', assert => {
  assert.deepEqual(pathInfo('asdbzx1'), {}, 'return empty obj when no match')
  assert.end()
})
