# location-info

This is just a wrapper around `url-pattern` to enable some basic route processing.

Get custom information about a location object or path. The library forces a unique key/id for each route because the author prefers objects over arrays.

Something like this:

```javascript
import createRouter from 'location-info'
import { parse } from 'query-string'
const router = createRouter({ parseSearch: parse })
const routes = {
  about: '/about',
  member: '/member(/:id)',
}
router.addRoutes(routes)
// turns into '/foo/', '/bar/'
// pass createRouter({ trailingSlash: false }) for '/foo' '/bar'
router.addRoutes([ 'foo', 'bar' ])
```
Note that it's not possible to enforce match order when routes created via object. Using lodash/each internally.

or this:

```javascript

const valid = {
  visit: true,
  about: true,
  programs: {
    subject: {
      entityId: true,
    },
  },
}

// Validation for a default route.
function validate({ primarySubject, subject, entityId }) {
  const route = valid[primarySubject]
  if (!route) return false
  if (subject && !route.subject) return false
  if (entityId && !route.subject.entityId) return false
  return true
}

function isAnonymous() {
  // ... Do some checking to see if the user is authenticated.
  return true
}

function loginOnAnonymous({ location: { search, pathname, ...location } }, route) {
  if (isAnonymous()) {
    return {
      ...location,
      pathname: '/user/login',
    }
  }
}
const router = createRouter()

router.addRoute('login', '/user/login', { validate: isAnonymous })
router.addRoute('profile', '/user/profile', { redirect: loginOnAnonymous })
router.addRoute('default', '/(:primarySubject/)(:subject/)(:entityId/)', { validate })
const info = router.locationInfo(window.location)
console.log(info)

```
