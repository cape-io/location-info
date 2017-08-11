import { flow, rearg, reduce } from 'lodash/fp'
import { condId } from 'cape-lodash'
import reducer from './reducer'
import { addRoute } from './actions'
import { isValidRouteObj } from './utils'

export const addRouteAction = (state = [], item) => state.concat(addRoute(item))
export const buildActions = condId([rearg([1], isValidRouteObj), addRouteAction])

export const getInitState = flow(
  reduce(buildActions, undefined),
  reduce(reducer, undefined)
)
