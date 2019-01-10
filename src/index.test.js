import { addRoute, addRoutes, findRoute, getInitState, selectRoutes } from './'

/* globals describe test expect */

// If not otherwise saved in a database/persistent store...
const routeActions = [
  addRoutes({
    home: '/',
    about: '/about',
    member: '/home-drawer/:id',
    image: '/image-upload',
  }),
  addRoute('dat', '/feed/me'),
  addRoute({
    id: 'me', // Ignored because `routeId` has priority.
    routeId: 'user',
    routePath: '/user/:userId',
    userId: 1,  // Ignored.
    name: 'Profile',  // Ignored.
  }),
  // Alternative to above: addRoute('user', '/user/:userId')
  addRoutes(['foo', 'bar']),
  addRoute({
    id: 'detail',
    pattern: '/detail/:id',
  }),
  addRoute({
    id: 'default',
    pattern: '*',
  }),
]

const state = { locInfo: getInitState(routeActions) }
const routes = selectRoutes(state)
const locationDetails = findRoute(routes, '/detail/vroom')
const locationRes = {
  id: 'detail',
  params: { id: 'vroom' },
  pattern: '/detail/:id',
  urlPart: '/detail/vroom',
  urlPattern: {
    names: ['id'],
    isRegex: false,
  },
}
describe('without redux', () => {
  test('Return some useful stuff', () => {
    // expect(locationDetails).toEqual(locationRes)
    expect(locationDetails).toMatchObject(locationRes)
    expect(findRoute(routes, 'foo-bar.com').id).toBe('default')
  })
})
