import {createReducer} from 'redux-act'
import {Map} from 'immutable'

import * as homeActions from './actions'

const initialState = Map({
    categories: [],
    banners: []
})

export default createReducer({
    [homeActions.receiveHomeContents]: (state, payload) => {
        return state.mergeDeep(payload)
    }
}, initialState)
