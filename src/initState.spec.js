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
    routePath: '/user/:userId',
    userId: 1,
    name: 'Profile',
  },
}

export const result1 = {
  trailingSlash: false,
  route: {
    foo: { id: 'foo', path: '/foo' },
    user: { id: 'user', path: '/user/:userId' },
  },
}
export const result2 = {
  trailingSlash: false,
  route: {
    ...result1.route,
    detail: { id: 'detail', path: '/detail/:id' },
    itemEdit: { id: 'itemEdit', path: '/edit/*' },
    showroom: { id: 'showroom', path: '/showroom' },
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
  test('Handle menu and more', () => {
    expect(getInitState(actions)).toEqual(result2)
  })
})

describe('isValidRouteObj', () => {
  test('Should reject when prop route is false', () => {
    expect(isValidRouteObj(menu.far)).toBe(false)
  })
})
