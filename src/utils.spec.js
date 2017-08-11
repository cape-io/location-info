import test from 'tape'
import { isValidRouteObj, stripHash } from './utils'
import { menu } from './initState.spec'

test('stripHash should remove front hash', (assert) => {
  assert.equal(stripHash('#hash'), 'hash', 'Removes hash from start.')
  assert.equal(stripHash('nohash'), 'nohash', 'Leaves no hash untouched.')
  assert.equal(stripHash('middle#hash'), 'middle#hash', 'Leaves middle hash there.')
  assert.end()
})
test('isValidRouteObj', (t) => {
  t.equal(isValidRouteObj(menu.far), false)
  t.end()
})
