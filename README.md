# location-info

Get custom information about a location object or path.

Something like this:

```javascript
import createRouter from 'location-info'
const router = createRouter()
const routes = {
  about: '/about',
  member: '/member(/:id)',
}
router.makeRoutes(routes)
```

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

function loginOnAnonymouse({ search, pathname, ...info }, route) {
  if (isAnonymous()) {
    return {
      ...info,
      pathname: '/user/login',
    }
  }
}
const router = createRouter()

router.makeRoute('login', '/user/login', { validate: isAnonymous })
router.makeRoute('profile', '/user/profile', { redirect: loginOnAnonymouse })
router.makeRoute('default', '/(:primarySubject/)(:subject/)(:entityId/)', { validate })
const info = router.locationInfo(window.location)
console.log(info)

```
