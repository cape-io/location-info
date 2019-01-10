# location-info

Sometimes you want to parse a string into a meaningful object. The [url-pattern](https://github.com/snd/url-pattern) module does a decent job this. But what or how do you combine a bunch of possibilities together? This module enables you to build out a collection of parsing possibilities that a string can be matched against. Typically it's used for routing, but it could be used for anything.

Route possibilities are created with Redux actions and stored in state. A selector is used to build out the index and allow deciding what route a string belongs to.
Set and get custom information about a location object or string path.

The library forces creating a unique key/id for each route. The route info index with redux actions.

```javascript
import { combineReducers, createStore } from 'redux'
import locInfo, { addRoute, addRoutes, findRoute, getInitState, select } from 'location-info'

// If not otherwise saved in a database/persistent store...
const routeActions = [
  addRoutes({
    home: '/',
    about: '/about',
    member: '/home-drawer/:id',
    image: '/image-upload',
  }),
  addRoute('dat', '/feed/me'),
  addRoute({
    id: 'me', // Ignored because `routeId` has priority.
    routeId: 'user',
    routePattern: '/user/:userId',
    userId: 1,  // Ignored.
    name: 'Profile',  // Ignored.
  }),
  // Alternative to above: addRoute('user', '/user/:userId')
  addRoutes(['foo', 'bar']),
  addRoute({
    id: 'detail',
    pattern: '/detail/:id',
  }),
]
export const reducer = combineReducers({ locInfo })
export const initState = { locInfo: getInitState(routeActions) }
export const store = createStore(reducer, initState)

export const locationDetails = findRoute(selectRoutes(state), '/detail/vroom')

```

Note that no care is taken to enforce match order. Post an issue if you need it.

## Actions

* `addRoute(idOrObj, pattern = null, props = {})`
* addRoutes()
* delRoute()
* updateRoute()
