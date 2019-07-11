import {
  cond, defaultTo, eq, flow, getOr, isArray, isPlainObject, negate, rearg, reduce, stubTrue,
} from 'lodash/fp'
import { condId } from 'understory'
import { findAt, getFields } from 'prairie'
import reducer from './reducer'
import { addRoute } from './actions'

export const getRouteId = findAt(['routeId', 'id'])
export const getRoutePath = flow(findAt(['routePattern', 'pattern']), defaultTo(null))
const getMenuRoute = getFields({ id: getRouteId, pattern: getRoutePath })

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
