import { forEach, get, isString, mapValues, set } from 'lodash/fp'
import { setField } from 'cape-lodash'
import { select } from 'cape-select'
import { createSelector } from 'reselect'
import Pattern from 'url-pattern'
import { getLocation } from './utils'

export const getLocInfo = get('locInfo')
export const getRoutes = select(getLocInfo, 'route')

export const addPattern = setField('pattern', ({ path, options }) => new Pattern(path, options))
export const selectRoutes = createSelector(getRoutes, mapValues(addPattern))

// Check path against specific route. If it's a match grab all info about the route.
const checkRoute = (urlPart, route) => route.pattern.match(urlPart)

export function getLoc(locInfo) {
  const loc = isString(locInfo) ? { pathname: locInfo } : locInfo
  if (!isString(loc.pathname)) {
    throw new Error('Must pass pathname property value must be a string.')
  }
  return getLocation(loc)
}

// Use this if you have a simple path string.
// @TODO Look into caching?
export function findRoute(routes, urlPart) {
  let result = null
  function iteratee(route) {
    const params = checkRoute(urlPart, route)
    if (params) result = set('params', params, set('urlPart', urlPart, route))
    return !result
  }
  forEach(iteratee, routes)
  return result
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
