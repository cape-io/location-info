import Pattern from 'url-pattern'
import { parse } from 'query-string'
// import clone from 'lodash/clone'
import find from 'lodash/find'
import isFunction from 'lodash/isFunction'
import pick from 'lodash/pick'

// location-info
// Get custom information about a location object or path.

// We are removing the actual hash.
export function getHash(hash) {
  if (hash[0] === '#') {
    return hash.slice(1)
  }
  return hash
}

export default function createRouter() {
  // Route database.
  const routeIndex = {}
  // Array of route ids.
  const routes = []
  // Adds route to index and array.
  function setRoute(route) {
    routeIndex[route.id] = route
    routes.push(route.id)
  }
  // Get all routes. Returns index and array.
  function getRoutes() {
    return {
      route: routeIndex,
      routes,
    }
  }
  // Get a route by id.
  function getRoute(id) {
    return routeIndex[id]
  }

  // @TODO add a way to remove route?

  // Helper function to make and set new routes.
  // @id is a machine readable string for the route.
  // @path is a path string. See url-pattern module for possible options.
  // @props object that might include validate function.
  //   Methods include:
  //   `getParams` is mostly if you want to process the pathname with a function instead of string.
  //   `validate` should return true or false.
  //   `getState` should return an object.
  //   `getLocation` should return an absolute path.
  function makeRoute(id, path, props = {}) {
    // path is not required. Default to use the id.
    const _path = path || `/${id}/`
    // Make our object that represents a route.
    const route = {
      // Apply any of the props.
      ...props,
      id,
      // Create new UrlPattern object.
      pattern: new Pattern(_path),
    }
    // Add it to our route database index and id list.
    setRoute(route)
    // Return what we created.
    return route
  }

  // Check path against specific route. If it's a match grab all info about the route.
  // Calls the `validate` and `getParams` methods on the route if it has them.
  function routeInfo(id, path) {
    // Get the route.
    const route = getRoute(id)
    // Run the match method.
    let params = route.pattern.match(path)
    // No match, return.
    if (!params) return null
    // Check validate function.
    if (isFunction(route.validate) && !route.validate(params)) {
      return null
    }
    // There is a valid match against this route.
    if (isFunction(route.getParams)) {
      params = route.getParams(params, path, route)
    }
    // Clone the route props and add params and path to it.
    const info = {
      ...route,
      params,
      path,
    }
    return info
  }

  // Check a path against all routes.
  // Use this if you have a simple path string.
  // Note that path should not include the search (?foo=bar) portion of the url.
  function pathInfo(path) {
    // Default to no route.
    let route = null
    // Run against each id in routes array.
    function isMatch(id) {
      // Run match against the route.
      // If it's valid it returns route information.
      route = routeInfo(id, path)
      // Tell find() if we found a result or not.
      return route ? true : false
    }
    // The id of the matched route.
    const id = find(routes, isMatch)
    // If we found an id return the route object. Otherwise null.
    return id ? route : null
  }

  // Makes a new object based on browser document.location or similar object.
  // An object with a `pathname` property is sufficient.
  // Calls the `getState` and `getLocation` function.
  // Returns a plain object with no methods.
  function locationInfo(location) {
    // Grab props that we will process.
    const { pathname, search, hash } = location
    // Grab the properties we pass along from the location object.
    // Pathname gets deleted if there is a route match.
    const info = pick(location, 'protocol', 'hostname', 'port', 'pathname', 'query')
    if (hash) {
      info.hash = getHash(hash)
    }
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
  return {
    getRoutes,
    getRoute,
    locationInfo,
    makeRoute,
    pathInfo,
  }
}
