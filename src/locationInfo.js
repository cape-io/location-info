import pick from 'lodash/pick'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { parse } from 'query-string'

// Makes a new object based on browser document.location or similar object.
// An object with a `pathname` property is sufficient.
// Calls the `getState` and `getLocation` function.
// Returns a plain object with no methods.
export default function locationInfo(pathInfo, _location) {
  const location = isString(_location) ? { pathname: _location } : _location
  // Grab props that we will process.
  const { pathname, search } = location
  // Grab the properties we pass along from the location object.
  // Pathname gets deleted if there is a route match.
  const info = pick(location, 'protocol', 'hostname', 'port', 'pathname', 'query', 'hash')
  // Parse pathname based on routes above.
  const route = pathInfo(pathname)
  // Parse query string.
  // Prevent this process by omit `search` prop and include `query` prop yourself.
  if (search) {
    info.query = parse(search)
  }
  // Route match.
  if (route) {
    // Allow redirect method to trigger reprocessing.
    if (isFunction(route.redirect)) {
      const redirectLocation = route.redirect(info, route)
      if (redirectLocation) return locationInfo(redirectLocation)
    }
    info.routeId = route.id
    info.params = route.params
    // Allow route getState function to set specific state object.
    if (isFunction(route.getState)) {
      info.state = route.getState(info)
    }
    // What the url should be.
    // Opportunity to set a redirect or correct the location of a pushState.
    info.location = isFunction(route.getLocation) ? route.getLocation(info) : pathname
  }
  return info
}
