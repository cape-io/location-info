import { get, map } from 'lodash/fp'
import { setField } from 'cape-lodash'
import { select } from 'cape-select'
import { createSelector } from 'reselect'
import Pattern from 'url-pattern'

export const getLocInfo = get('locInfo')
export const getRoutes = select(getLocInfo, 'route')

export const addPattern = setField('pattern', ({ path, options }) => new Pattern(path, options))
export const selectRoutes = createSelector(getRoutes, map(addPattern))

// route.pattern.match(path)
