import { flip, isArray, map, unary } from 'lodash'
import { createAction } from 'cape-redux'
import { idString } from './utils'
// addRoute

// Make and set new routes.
// @id is a machine readable string for the route.
// @path is a path string. See url-pattern module for possible options.
// @props object
//   `position`.
function addRoutePayload(id, path, props = {}) {
  idString(id)
  // Make our object that represents a route.
  // Return what we created.
  return {
    // Apply any of the props.
    ...props,
    id,
    path: path || id, // path is not required. Default to use the id.
  }
}

export const ADD_ROUTE = 'location/ADD_ROUTE'
export const addRoute = createAction(ADD_ROUTE, addRoutePayload)

// addRoutes
// When you need an event simpler way to create routes.
// Key of object is the route id. Value is the route path template string.
export function addRoutesPayload(routeObject) {
  if (isArray(routeObject)) {
    return map(routeObject, unary(addRoutePayload))
  }
  return map(routeObject, flip(addRoutePayload))
}
export const ADD_ROUTES = 'location/ADD_ROUTES'
export const addRoutes = createAction(ADD_ROUTES, addRoutesPayload)

// deleteRoute
export const DEL_ROUTE = 'location/DEL_ROUTE'
export const delRoute = createAction(DEL_ROUTE, idString)
