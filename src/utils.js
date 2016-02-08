// We are removing the actual hash.
export function stripHash(hash) {
  if (hash[0] === '#') {
    return hash.slice(1)
  }
  return hash
}
