import Pattern from 'url-pattern'
import find from 'lodash/find'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import map from 'lodash/map'
import partial from 'lodash/partial'

import locationInfo from './locationInfo'
import { getPath } from './utils'
export { stripHash } from './utils'

// location-info
// Get custom information about a location object or path.
export default function createRouter(options = {}) {
  const { trailingSlash = true } = options
  // Route database.
  const routeIndex = {}
  // Array of route ids.
  const routes = []
  // Adds route to index and array.
  function setRoute(route) {
    if (routeIndex[route.id]) {
      throw new Error(`Already have a route with that id (${route.id}).`)
    }
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

  function deleteRoute(id) {
    const { index } = getRoute(id)
    delete routeIndex[id]
    routes.splice(index, 1)
  }

  // Helper function to make and set new routes.
  // @id is a machine readable string for the route.
  // @path is a path string. See url-pattern module for possible options.
  // @props object that might include validate function.
  //   Methods include:
  //   `getParams` is mostly if you want to process the pathname with a function instead of string.
  //   `validate` should return true or false.
  //   `getState` should return an object.
  //   `getLocation` should return an absolute path.
  function addRoute(id, _path, props = {}, opts) {
    if (!isString(id)) {
      console.error(id)
      throw new Error(`'id' must be a string. Got ${id} instead.`)
    }
    // path is not required. Default to use the id.
    const path = getPath(trailingSlash, id, _path)
    // Make our object that represents a route.
    const route = {
      // Apply any of the props.
      ...props,
      id,
      index: routes.length,
      // Create new UrlPattern object.
      pattern: new Pattern(path, options),
    }
    // Add it to our route database index and id list.
    setRoute(route)
    // Return what we created.
    return route
  }

  // When you need an event simpler way to create routes.
  // Key of object is the route id. Value is the route path template string.
  function addRoutes(routeObject) {
    if (isArray(routeObject)) {
      return map(routeObject, id => addRoute(id))
    }
    return map(routeObject, (path, id) => addRoute(id, path))
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
  function pathInfo(pathname) {
    // Default to no route.
    let route = null
    // Run against each id in routes array.
    function isMatch(id) {
      // Run match against the route.
      // If it's valid it returns route information.
      route = routeInfo(id, pathname)
      // Tell find() if we found a result or not.
      return route ? true : false
    }
    // The id of the matched route.
    const id = find(routes, isMatch)
    // If we found an id return the route object. Otherwise null.
    return id ? route : {}
  }

  return {
    addRoute,
    addRoutes,
    deleteRoute,
    getRoutes,
    getRoute,
    size: () => routes.length,
    locationInfo: partial(locationInfo, pathInfo, options),
    pathInfo,
  }
}
