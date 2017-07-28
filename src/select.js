import { forEach, isString } from 'lodash'
import { get, mapValues } from 'lodash/fp'
import { setField } from 'cape-lodash'
import { select } from 'cape-select'
import { createSelector } from 'reselect'
import Pattern from 'url-pattern'
import { getLocationObject } from './utils'

export const getLocInfo = get('locInfo')
export const getRoutes = select(getLocInfo, 'route')

export const addPattern = setField('pattern', ({ path, options }) => new Pattern(path, options))
export const selectRoutes = createSelector(getRoutes, mapValues(addPattern))

// Check path against specific route. If it's a match grab all info about the route.
// Calls the `validate` and `getParams` methods on the route if it has them.
function checkRoute(route, loc) {
  // Run the match method.
  const params = route.pattern.match(loc.pathname)
  // No match, return.
  if (!params) return null
  return {
    route,
    location: getLocationObject(loc),
    params,
  }
}

// Use this if you have a simple path string.
// @TODO Look into caching?
export function findRoute(routes, _location) {
  const loc = isString(_location) ? { pathname: _location } : _location
  if (!isString(loc.pathname)) {
    throw new Error('Must pass pathname property value must be a string.')
  }
  // Parse pathname based on routes. Get route info or empty object.
  // Note that path should not include the search (?foo=bar) portion of the url.
  // Default to no route.
  let routeInfo = null
  // Run against each id in routes array.
  function isMatch(route) {
    // Run match against the route.
    // If it's valid it returns route information.
    routeInfo = checkRoute(route, loc)
    // Tell find() if we found a result or not.
    return !routeInfo
  }
  // Check a path against all routes.
  forEach(routes, isMatch)
  // If we found an id return the route object. Otherwise null.
  return routeInfo || {}
}

// route.pattern.match(path)
// We are using the redux-history-sync to put location into state.
export function routeInfoSelector(routes, history) {
  if (!history || !history.location) return history
  return {
    ...findRoute(routes, history.location), // params
    history,
  }
}
export function getHref(state, { routeId, ...props }) {
  const pattern = get([routeId, 'pattern'], selectRoutes(state))
  if (!pattern) { // Throw?
    console.error(routeId, 'route not found')
    return routeId
  }
  return pattern.stringify(props)
}
