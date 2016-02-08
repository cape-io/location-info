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
