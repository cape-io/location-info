import isString from 'lodash/isString'

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
