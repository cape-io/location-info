import { defaults, isFunction, isString } from 'lodash/fp'

import { getLocation } from './utils'

// Makes a new object based on browser document.location or similar object.
// An object with a `pathname` property is sufficient.
// Calls the `getState` and `getLocation` function.
// Returns a plain object with no methods.
export default function locationInfo(pathInfo, options, _location) {
  const { defaultLocation, parseSearch } = options
  const loc = isString(_location) ? { pathname: _location } : _location
  if (!isString(loc.pathname)) {
    throw new Error('Must pass pathname property value must be a string.')
  }
  // Parse pathname based on routes. Get route info or empty object.
  const route = pathInfo(loc.pathname)
  route.location = defaults(defaultLocation, getLocation(loc))

  // Parse query string.
  if (route.location.search && isFunction(parseSearch)) {
    route.query = parseSearch(route.location.search)
  }
  // Allow redirect method to trigger reprocessing with a different location.
  if (isFunction(route.redirect)) {
    const redirectLocation = route.redirect(route)
    if (redirectLocation) return locationInfo(pathInfo, options, redirectLocation)
  }
  // Allow route getState function to set specific state object.
  if (isFunction(route.getState)) {
    route.state = route.getState(route)
  }
  // What the url should be.
  // Opportunity to set a redirect or correct the location of a pushState.
  if (isFunction(route.getLocation)) {
    const newLocation = route.getLocation(route)
    if (newLocation) route.location = newLocation
  }
  return route
}
