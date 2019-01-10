import { defaults, isArray, isPlainObject, map, spread, toPairs } from 'lodash/fp'
import { createSimpleAction } from 'cape-redux'
import { idString } from './utils'

// Make and save new routes.
export const ADD_ROUTE = 'locInfo/ADD_ROUTE'
export function requireIdPath(payload) {
  if (!payload.id) throw new Error('Route object must have an id property.')
  return true
}

// @props object
//  `options` @see https://github.com/snd/url-pattern#customize-the-pattern-syntax
//  `path`
//  `position`.
/**
 * Action builder for adding a single route object.
 * @param {Object|String} arg1 Object with `id` and `path` properties.
 *  String machine readable used as `id` of route.
 * @param {String} [path=null] Path string. See url-pattern module for possible options.
 * @param {Object} [props={}]  [description]
 */
function addRoutePayload(arg1, path = null, props = {}) {
  if (isPlainObject(arg1)) return requireIdPath(arg1) && defaults({ path: null }, arg1)
  return { ...props, id: idString(arg1), path }
}
export const addRoute = createSimpleAction(ADD_ROUTE, addRoutePayload)

// addRoutes
export const ADD_ROUTES = 'locInfo/ADD_ROUTES'
// When you need a simpler way to create routes.
// Key of object is the route id. Value is the route path template string.
export function addRoutesPayload(routeObject) {
  if (isArray(routeObject)) return map(addRoutePayload, routeObject)
  return map(spread(addRoutePayload), toPairs(routeObject))
}
export const addRoutes = createSimpleAction(ADD_ROUTES, addRoutesPayload)

// deleteRoute
export const DEL_ROUTE = 'locInfo/DEL_ROUTE'
export const delRoute = createSimpleAction(DEL_ROUTE, idString)

export const UPDATE_ROUTE = 'locInfo/UPDATE_ROUTE'
export const updateRoute = createSimpleAction(UPDATE_ROUTE)
