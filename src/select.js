import { curry, isString, transform, set } from 'lodash'
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
const checkRoute = curry((loc, res, route) => {
  set(res, 'params', route.pattern.match(loc.pathname))
  if (!res.params) return true
  set(res, 'location', loc)
  set(res, 'route', route)
  return false
})

export function getLoc(locInfo) {
  const loc = isString(locInfo) ? { pathname: locInfo } : locInfo
  if (!isString(loc.pathname)) {
    throw new Error('Must pass pathname property value must be a string.')
  }
  return getLocationObject(loc)
}

// Use this if you have a simple path string.
// @TODO Look into caching?
export function findRoute(routes, locInfo) {
  return transform(routes, checkRoute(getLoc(locInfo)), {})
}

// route.pattern.match(path)
// Assume the use of redux-history-sync for location in state.
export function routeInfoSelector(routes, history) {
  if (!history || !history.location) return history
  return {
    ...findRoute(routes, history.location), // params
    history,
  }
}

// Take an object and turn it into a string.
export function getHref(state, { routeId, ...props }) {
  const pattern = get([routeId, 'pattern'], selectRoutes(state))
  if (!pattern) { // Throw?
    console.error(routeId, 'route not found')
    return routeId
  }
  return pattern.stringify(props)
}
