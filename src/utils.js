import { isString, pick, set, split } from 'lodash/fp'

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
