import { cond, flow, isArray, isPlainObject, rearg, reduce, stubTrue } from 'lodash/fp'
import { condId } from 'cape-lodash'
import reducer from './reducer'
import { addRoute } from './actions'
import { isValidRouteObj } from './utils'

export const addRouteAction = (state = [], item) => state.concat(addRoute(item))
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
