import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as pdpActions from './actions'

const initialState = Immutable.fromJS({})

export default createReducer({
    [pdpActions.receiveContents]: (state, payload) => {
        payload.contentsLoaded = true
        return state.mergeDeep(payload)
    },
    [pdpActions.receiveResponse]: (state) => {
        return state
    },
    [pdpActions.fetchContents]: (state) => {
        return state
    }
}, initialState)
