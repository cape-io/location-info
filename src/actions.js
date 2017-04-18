import { ary, flip, isArray, map, unary } from 'lodash'
import { createAction } from 'cape-redux'
import { structuredSelector } from 'cape-select'
import { idString } from './utils'

// Make and set new routes.
// @id is a machine readable string for the route.
// @path is a path string. See url-pattern module for possible options.
// @props object
//  `options` @see https://github.com/snd/url-pattern#customize-the-pattern-syntax
//  `path`
//  `position`.
function addRoutePayload(id, path = null, props = {}) {
  idString(id)
  return { ...props, id, path }
}

export const ADD_ROUTE = 'locInfo/ADD_ROUTE'
export const addRoute = structuredSelector({
  type: ADD_ROUTE,
  payload: addRoutePayload,
})

// addRoutes
// When you need an event simpler way to create routes.
// Key of object is the route id. Value is the route path template string.
export function addRoutesPayload(routeObject) {
  if (isArray(routeObject)) {
    return map(routeObject, unary(addRoutePayload))
  }
  return map(routeObject, ary(flip(addRoutePayload), 2))
}
export const ADD_ROUTES = 'locInfo/ADD_ROUTES'
export const addRoutes = createAction(ADD_ROUTES, addRoutesPayload)

// deleteRoute
export const DEL_ROUTE = 'locInfo/DEL_ROUTE'
export const delRoute = createAction(DEL_ROUTE, idString)
