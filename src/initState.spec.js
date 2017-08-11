import test from 'tape'
import { getInitState } from './initState'
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
export const result = {
  trailingSlash: false,
  route: {
    foo: { id: 'foo', path: '/foo' },
    user: { id: 'user', path: '/user/:userId' },
  },
}
// test()
test('initState', (t) => {
  const res = getInitState(menu)
  t.deepEqual(res, result)
  t.end()
})
