import test from 'tape'
import { stripHash } from './utils'

test('stripHash should remove front hash', (assert) => {
  assert.equal(stripHash('#hash'), 'hash', 'Removes hash from start.')
  assert.equal(stripHash('nohash'), 'nohash', 'Leaves no hash untouched.')
  assert.equal(stripHash('middle#hash'), 'middle#hash', 'Leaves middle hash there.')
  assert.end()
})
