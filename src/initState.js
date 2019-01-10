import {
  cond, defaultTo, eq, flow, getOr, isArray, isPlainObject, negate, rearg, reduce, stubTrue,
} from 'lodash/fp'
import { condId, getDefault } from 'cape-lodash'
import { structuredSelector } from 'cape-select'
import reducer from './reducer'
import { addRoute } from './actions'

export const getRouteId = getDefault('id', 'routeId')
export const getRoutePath = flow(getDefault('pattern', 'routePattern'), defaultTo(null))
const getMenuRoute = structuredSelector({ id: getRouteId, pattern: getRoutePath })

export const isValidRouteObj = flow(getOr(true, 'route'), negate(eq(false)))
export const addRouteAction = (state = [], item) => state.concat(addRoute(getMenuRoute(item)))
export const buildActions = condId([rearg([1], isValidRouteObj), addRouteAction])

export const actionsFromObj = reduce(buildActions, undefined)
export const actionReducer = reduce(reducer, undefined)

function createErr(item) {
  const errMsg = `location-info getInitState() only accepts array or obj. Got ${typeof item}`
  throw new Error(errMsg)
}

export const getInitState = cond([
  [isArray, actionReducer],
  [isPlainObject, flow(actionsFromObj, actionReducer)],
  [stubTrue, createErr],
])
