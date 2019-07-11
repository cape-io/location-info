import {
  flow, head, pick, split,
} from 'lodash/fp'
import { updateWith } from 'prairie'

// Parts of the URL or location object that we want to keep.
export const urlParts = [
  'origin', 'protocol', 'username', 'password',
  'host', 'hostname', 'pathname', 'port', 'search', 'searchParams', 'hash',
]
// Use parse-domain package for something more complicated.
const getSubdomain = flow(split('.'), head)

// Grab the properties we pass along from a location/URL object.
export default flow(
  pick(urlParts),
  updateWith('subdomain', 'hostname', getSubdomain),
)
