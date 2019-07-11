import { set } from 'lodash/fp'

import {
  addRoute, ADD_ROUTE, addRoutes, ADD_ROUTES, delRoute, DEL_ROUTE,
} from './actions'

/* globals describe test expect */

describe('addRoute', () => {
  const res = addRoute('foo')
  const action1 = { payload: { id: 'foo', pattern: null }, type: ADD_ROUTE }
  const action2 = set('payload.name', 'Foo', action1)
  const action3 = set('payload.pattern', '/bar', action1)
  test('Handle single arg as string', () => {
    expect(res).toEqual(action1)
  })
  test('Handle single arg as object', () => {
    expect(addRoute({ id: 'foo', name: 'Foo' })).toEqual(action2)
    expect(addRoute({ id: 'foo', pattern: '/bar' })).toEqual(action3)
  })
  test('Handle two arg string, string', () => {
    const res2 = addRoute('foo', '/bar')
    expect(res2).toEqual(action3)
  })
  test('Handle two arg string, string', () => {
    const res2 = addRoute('foo', '/bar')
    expect(res2).toEqual(action3)
  })
})

describe('addRoutes', () => {
  const res = addRoutes({
    home: '/',
    drawer: '/home-drawer',
    drawerEdit: '/home-drawer/:id',
    image: '/image-upload',
  })
  const action1 = {
    type: ADD_ROUTES,
    payload: [
      { id: 'home', pattern: '/' },
      { id: 'drawer', pattern: '/home-drawer' },
      { id: 'drawerEdit', pattern: '/home-drawer/:id' },
      { id: 'image', pattern: '/image-upload' },
    ],
  }
  test('Object of routes', () => {
    expect(res).toEqual(action1)
  })
  const res2 = addRoutes(['about', 'contact', 'favs', 'showroom'])
  const action2 = {
    type: ADD_ROUTES,
    payload: [
      { id: 'about', pattern: null },
      { id: 'contact', pattern: null },
      { id: 'favs', pattern: null },
      { id: 'showroom', pattern: null },
    ],
  }
  test('Array of routes', () => {
    expect(res2).toEqual(action2)
  })
})

describe('delRoute', () => {
  test('Single arg string should be payload', () => {
    expect(delRoute('home')).toEqual({ type: DEL_ROUTE, payload: 'home' })
  })
})
