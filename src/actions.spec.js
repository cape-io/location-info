import test from 'tape'
import { addRoute, ADD_ROUTE } from './actions'

test('addRoute', (t) => {
  const res = addRoute('foo')
  t.deepEqual(res, { payload: { id: 'foo' }, type: ADD_ROUTE })
  const res2 = addRoute('foo', { path: '/bar' })
  t.deepEqual(res2, { payload: { id: 'foo', path: '/bar' }, type: ADD_ROUTE })
  t.end()
})
