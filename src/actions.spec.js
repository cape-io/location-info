import test from 'tape'
import { addRoute, ADD_ROUTE, addRoutes, ADD_ROUTES, delRoute, DEL_ROUTE } from './actions'

test('addRoute', (t) => {
  const res = addRoute('foo')
  t.deepEqual(res, { payload: { id: 'foo', path: null }, type: ADD_ROUTE })
  const res2 = addRoute('foo', '/bar')
  t.deepEqual(res2, { payload: { id: 'foo', path: '/bar' }, type: ADD_ROUTE })
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
