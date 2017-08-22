import test from 'tape'
import { actionsFromObj, getInitState } from './initState'
import { addRoute, addRoutes } from './actions'
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
// test()
test('getInitState', (t) => {
  const res = getInitState(menu)
  t.deepEqual(res, result1)
  const actions = actionsFromObj(menu).concat([
    addRoutes({
      detail: '/detail/:id',
      itemEdit: '/edit/*',
    }),
    addRoute('showroom'),
  ])
  const res2 = getInitState(actions)
  t.deepEqual(res2, result2)
  t.end()
})
