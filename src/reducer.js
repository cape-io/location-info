import { delAt, reduce, setIn } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { getPath } from './utils'
import { ADD_ROUTE, ADD_ROUTES, DEL_ROUTE } from './actions'

export const ROUTE_PREFIX = 'route'

export const defaultState = {
  trailingSlash: false,
  [ROUTE_PREFIX]: {
  },
}

export function delRoute(state, payload) {
  return delAt([ROUTE_PREFIX, payload], state)
}
export function setRoute(state, { id, path, ...rest }) {
  if (state[ROUTE_PREFIX][id]) {
    throw new Error(`Already have a route with the id of "${id}".`)
  }
  return setIn([ROUTE_PREFIX, id], {
    ...rest, id, path: getPath(state.trailingSlash, id, path),
  })
}
export function setRoutes(state, payload) {
  return reduce(payload, setRoute, state)
}
export const reducers = {
  [ADD_ROUTE]: setRoute,
  [ADD_ROUTES]: setRoutes,
  [DEL_ROUTE]: delRoute,
}
const reducer = createReducer(reducers)
export default reducer
