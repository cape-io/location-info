import { actionsFromObj, getInitState, getRouteId, isValidRouteObj } from './initState'
import { addRoute, addRoutes } from './actions'

/* globals describe test expect */

// Create a menu and provide enough details for creating routes at the same time.
export const menu = {
  foo: {
    id: 'foo',
    name: 'Foo',
  },
  far: {
    id: 'far',
    name: 'Far Away',
    route: false,
  },
  me: {
    id: 'me',
    routeId: 'user',
    routePattern: '/user/:userId',
    userId: 1,
    name: 'Profile',
  },
}

export const result1 = {
  trailingSlash: false,
  urlPath: 'pathname',
  route: {
    foo: { id: 'foo', pattern: '/foo' },
    user: { id: 'user', pattern: '/user/:userId' },
  },
}

describe('getRouteId', () => {
  const res = getRouteId(menu.me)
  test('Should return routeId before id', () => {
    expect(res).toBe('user')
  })
})

describe('getInitState', () => {
  const res = getInitState(menu)
  test('Should handle menu based object', () => {
    expect(res).toEqual(result1)
  })
  test('Should handle menu based object', () => {
    expect(res).toEqual(result1)
  })
  const actions = actionsFromObj(menu).concat([
    addRoutes({
      detail: '/detail/:id',
      itemEdit: '/edit/*',
    }),
    addRoute('showroom'),
  ])
  const result2 = {
    ...result1,
    route: {
      ...result1.route,
      detail: { id: 'detail', pattern: '/detail/:id' },
      itemEdit: { id: 'itemEdit', pattern: '/edit/*' },
      showroom: { id: 'showroom', pattern: '/showroom' },
    },
  }
  test('Handle menu and more', () => {
    expect(getInitState(actions)).toEqual(result2)
  })
})

describe('isValidRouteObj', () => {
  test('Should reject when prop route is false', () => {
    expect(isValidRouteObj(menu.far)).toBe(false)
  })
})
