import { ary, flip, isArray, isPlainObject, map, unary } from 'lodash'
import { createSimpleAction } from 'cape-redux'
import { structuredSelector } from 'cape-select'
import { getRouteId, getRoutePath, idString } from './utils'

// Make and save new routes.
export const ADD_ROUTE = 'locInfo/ADD_ROUTE'
const addRouteMenu = structuredSelector({ id: getRouteId, path: getRoutePath })
// @id is a machine readable string for the route.
// @path is a path string. See url-pattern module for possible options.
// @props object
//  `options` @see https://github.com/snd/url-pattern#customize-the-pattern-syntax
//  `path`
//  `position`.
function addRoutePayload(arg1, path = null, props = {}) {
  if (isPlainObject(arg1)) return addRouteMenu(arg1)
  return { ...props, id: idString(arg1), path }
}
export const addRoute = createSimpleAction(ADD_ROUTE, addRoutePayload)

// addRoutes
export const ADD_ROUTES = 'locInfo/ADD_ROUTES'
// When you need an event simpler way to create routes.
// Key of object is the route id. Value is the route path template string.
export function addRoutesPayload(routeObject) {
  if (isArray(routeObject)) {
    return map(routeObject, unary(addRoutePayload))
  }
  return map(routeObject, ary(flip(addRoutePayload), 2))
}
export const addRoutes = createSimpleAction(ADD_ROUTES, addRoutesPayload)

// deleteRoute
export const DEL_ROUTE = 'locInfo/DEL_ROUTE'
export const delRoute = createSimpleAction(DEL_ROUTE, idString)

export const UPDATE_ROUTE = 'locInfo/UPDATE_ROUTE'
export const updateRoute = createSimpleAction(UPDATE_ROUTE)
