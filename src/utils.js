import { flow, head, isString, pick, set, split } from 'lodash/fp'
import { setWith } from 'cape-lodash'

export function idString(id) {
  // Maybe generate an id?
  if (!isString(id)) {
    console.error(id)
    throw new Error(`'id' must be a string. Got ${id} instead.`)
  }
  return id
}

// We are removing the actual hash.
export function stripHash(hash) {
  if (hash[0] === '#') return hash.slice(1)
  return hash
}

export function addSlash({ leadingSlash, trailingSlash }, id) {
  return `${leadingSlash ? '/' : ''}${id}${trailingSlash ? '/' : ''}`
}
export function getInfo(state, route) {
  if (route.pattern && isString(route.pattern)) return route
  return set('pattern', addSlash(state, route.id), route)
}

// Parts of the URL or location object that we want to keep.
export const urlParts = [
  'origin', 'protocol', 'username', 'password',
  'host', 'hostname', 'pathname', 'port', 'search', 'searchParams', 'hash',
]
// Use parse-domain package for something more complicated.
const getSubdomain = flow(split('.'), head)

// Grab the properties we pass along from a location/URL object.
export const getLocation = flow(
  pick(urlParts),
  setWith('subdomain', 'hostname', getSubdomain),
)
