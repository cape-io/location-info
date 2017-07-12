# location-info

This is just a wrapper around `url-pattern` to enable some "route" processing with redux.

Set and get custom information about a location object or string path. The library forces a unique key/id for each route. Routes are currently flat.

You build up the route location info index with redux actions.

```javascript
import { reduce } from 'lodash'
import { combineReducers, createStore } from 'redux'
import locInfo, { addRoute, addRoutes } from 'location-info'
// If not saved in a database/persistent store...
export const routeActions = [
  addRoutes({
    home: '/',
    about: '/about',
    member: '/home-drawer/:id',
    image: '/image-upload',
  }),
  addRoute('dat', '/feed/me'),
  addRoutes(['foo', 'bar']),
]
export const initState = { locInfo: reduce(routeActions, locInfo) }
export const reducer = combineReducers({ locInfo })
export const store = createStore(reducer, initState)
```

Note that it's not possible to enforce match order. Post an issue if you need it.
