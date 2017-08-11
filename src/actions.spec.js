import test from 'tape'
import { setIn } from 'cape-lodash'
import { addRoute, ADD_ROUTE, addRoutes, ADD_ROUTES, delRoute, DEL_ROUTE } from './actions'

test('addRoute', (t) => {
  const res = addRoute('foo')
  const action1 = { payload: { id: 'foo', path: null }, type: ADD_ROUTE }
  t.deepEqual(res, action1)
  t.deepEqual(addRoute({ id: 'foo', name: 'Foo' }), action1)
  const res2 = addRoute('foo', '/bar')
  const action2 = setIn(['payload', 'path'], action1, '/bar')
  t.deepEqual(res2, action2)
  t.deepEqual(addRoute({ id: 'baz', routeId: 'foo', routePath: '/bar' }), action2)
  t.deepEqual(addRoute({ id: 'foo', path: '/bar' }), action2)
  t.end()
})
test('addRoutes', (t) => {
  const res = addRoutes({
    home: '/',
    drawer: '/home-drawer',
    drawerEdit: '/home-drawer/:id',
    image: '/image-upload',
  })
  t.deepEqual(res, {
    type: ADD_ROUTES,
    payload: [
      { id: 'home', path: '/' },
      { id: 'drawer', path: '/home-drawer' },
      { id: 'drawerEdit', path: '/home-drawer/:id' },
      { id: 'image', path: '/image-upload' },
    ],
  })
  t.end()
})
test('delRoute', (t) => {
  t.deepEqual(delRoute('home'), { type: DEL_ROUTE, payload: 'home' })
  t.end()
})
