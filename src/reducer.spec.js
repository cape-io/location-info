import test from 'tape'
import { addRoute, addRoutes } from './actions'
import reducer, { defaultState } from './reducer'

const routes = {
  colors: '/colors',
  filmfest: '/details/recPkxpU5hm2lfIWC',
  details: '/details/:showId',
  home: '/',
  me: '/me',
  studentList: '/students',
}

test('default', (t) => {
  const res = reducer(undefined)
  t.deepEqual(res, defaultState)
  t.end()
})
test('addRoutes', (t) => {
  const res = reducer(undefined, addRoutes(routes))
  t.deepEqual(res, {
    route: {
      colors: { id: 'colors', path: '/colors' },
      details: { id: 'details', path: '/details/:showId' },
      filmfest: { id: 'filmfest', path: '/details/recPkxpU5hm2lfIWC' },
      home: { id: 'home', path: '/' },
      me: { id: 'me', path: '/me' },
      studentList: { id: 'studentList', path: '/students' },
    },
    trailingSlash: false,
  })
  t.end()
})

test('addRoute', (t) => {
  const res = reducer(undefined, addRoute('dat', '/feed/me'))
  t.deepEqual(res, {
    route: {
      dat: { id: 'dat', path: '/feed/me' },
    },
    trailingSlash: false,
  })
  const res2 = reducer(res, addRoute('tad', '/me/feed'))
  t.equal(res2.route.tad.id, 'tad')
  t.end()
})
