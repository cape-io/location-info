import { reduce } from 'lodash'
import { flow, get } from 'lodash/fp'
import { delAt, merge, setIn } from 'cape-lodash'
import { createReducer } from 'cape-redux'
import { getInfo } from './utils'
import { ADD_ROUTE, ADD_ROUTES, DEL_ROUTE, UPDATE_ROUTE } from './actions'

export const ROUTE_PREFIX = 'route'

export const defaultState = {
  leadingSlash: true,
  trailingSlash: false,
  urlPath: 'pathname',
  [ROUTE_PREFIX]: {},
}

export const routeId = id => [ROUTE_PREFIX, id]
export const getRouteInfo = flow(routeId, get)
export function requireNew(state, payload) {
  if (getRouteInfo(payload.id)(state)) {
    throw new Error(`Already have a route with the id of "${payload.id}".`)
  }
  return true
}

export const delRoute = (state, payload) => delAt(routeId(payload), state)

export const setRoute = (state, payload) => setIn(routeId(payload.id), state, payload)

export const addRoute = (state, payload) =>
  requireNew(state, payload) && setRoute(state, getInfo(state, payload))

export const addRoutes = (state, payload) => reduce(payload, addRoute, state)

export const updateRoute = (state, payload) => setRoute(
  state, merge(getRouteInfo(payload.id)(state), getInfo(state, payload))
)

export const reducers = {
  [ADD_ROUTE]: addRoute,
  [ADD_ROUTES]: addRoutes,
  [DEL_ROUTE]: delRoute,
  [UPDATE_ROUTE]: updateRoute,
}
export default createReducer(reducers, defaultState)
