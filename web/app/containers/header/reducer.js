import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import * as headerActions from './actions'
import {mergePayload} from '../../utils/reducer-utils'

export const initialState = Immutable.fromJS({
    isCollapsed: false,
    searchIsOpen: false,
    searchSuggestions: null
})

const header = handleActions({
    [headerActions.toggleHeader]: mergePayload,
    [headerActions.openSearch]: (state) => state.set('searchIsOpen', true),
    [headerActions.closeSearch]: (state) => {
        state.set('searchIsOpen', false)
        state.set('searchSuggestions', false)
    },
    [headerActions.receiveSearchSuggestions]: (state, {payload}) => state.set('searchSuggestions', payload)
}, initialState)


export default header
