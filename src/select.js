import {
  forEach, get, isFunction, isString, mapValues, set,
} from 'lodash/fp'
import { setField } from 'prairie'
import { select } from 'cape-select'
import { createSelector } from 'reselect'
import Pattern from 'url-pattern'
import getLocation from './location'

export const getLocInfo = get('locInfo')
export const getRoutes = select(getLocInfo, 'route')

export const getUrlPattern = ({ pattern, options }) => new Pattern(pattern, options)
export const addPattern = setField('urlPattern', getUrlPattern)
export const selectRoutes = createSelector(getRoutes, mapValues(addPattern))

// Check path against specific route. If it's a match grab all info about the route.
function checkRoute(urlPart, route) {
  if (!route.urlPattern || !isFunction(route.urlPattern.match)) {
    console.error(route)
    throw new Error('Must pass route with `urlPattern` that has match property.')
  }
  return route.urlPattern.match(urlPart)
}
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
    // console.log(urlPart, route)
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
  const urlPattern = get([routeId, 'urlPattern'], selectRoutes(state))
  if (!urlPattern) { // Throw?
    console.error(routeId, 'route not found')
    return routeId
  }
  return urlPattern.stringify(props)
}
