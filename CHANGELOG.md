## [4.3.0]

* `updateRoute()` action.
* Code cleanup.

## [4.2.0]

* `getHref()` selector allows sending state and props, returns href string.
* `routeInfoSelector()` get and combine route info from a history object.

## [4.1.0]

* Embrace redux.

## [4.0.0]

* Move towards using a Redux style architecture.

## [3.1.0]
> 2016-02-17

* Allow sending options as fourth argument to `addRoute(routeId, path, props, options)` that gets sent to `new Pattern(path, options)`.

## [3.0.1]
> 2016-02-16

* Forgot to update `lodash` to 4.4.0. Sorry about that.

## [3.0.0]
> 2016-02-16

* `locationInfo()` now returns the route with `location` attached to it as a property. What was `routeId` is now just `id`.
* If you want to parse the search sting you must pass a `parseSearch` function in options. No longer depends on `query-string`.
* `pathInfo()` returns an empty object if there is no match.

## [2.2.0]
> 2016-02-09

* `createRouter({ trailingSlash = true })` now accepts options. `trailingSlash` false will create id only routes like `/foo` instead of the default `/foo/`.
* `addRoutes` now accepts array in addition to object.

## [2.1.0]
> 2016-02-08

* Added `index` property to route. Clearly states route match priority.
* Transition away from `makeRoute` to `addRoute`. Aliased for now.
* Added `deleteRoute(id)` method.
* Added `size()` method.

## [2.0.0]
> 2016-02-07

* No longer strip the `#` from the hash. `getHash` became `stripHash` util function.
* Added `makeRoutes({ author: '/author(/:author)' })`
* Added a couple tests.

## [1.0.0]
Initial Release
