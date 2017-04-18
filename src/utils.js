import defaults from 'lodash/defaults'
import isString from 'lodash/isString'
import pick from 'lodash/pick'

export function idString(id) {
  if (!isString(id)) {
    console.error(id)
    throw new Error(`'id' must be a string. Got ${id} instead.`)
  }
  return id
}

// We are removing the actual hash.
export function stripHash(hash) {
  if (hash[0] === '#') {
    return hash.slice(1)
  }
  return hash
}

export function getPath(trailingSlash, id, path) {
  if (path && isString(path)) {
    return path[0] === '/' ? path : `/${path}`
  }
  return trailingSlash ? `/${id}/` : `/${id}`
}

// Grab the properties we pass along from a location object.
export function getLocationObject(_location, defaultLocation = {}) {
  const loc = pick(_location,
    'pathname', 'hash', 'search', 'origin', 'protocol', 'port', 'hostname',
  )
  return defaults(loc, defaultLocation)
}
