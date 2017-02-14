import {handleActions} from 'redux-actions'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    body: '',
    contentsLoaded: true,
    emailAddress: '',
    isLoggedIn: true,
    isModalShown: false,
    orderNumber: '',
    orderUrl: ''
})

export default handleActions({
    [checkoutConfirmationActions.receiveContents]: (state, {payload}) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    },
    [checkoutConfirmationActions.showModal]: (state) => {
        return state.mergeDeep({isModalShown: true})
    },
    [checkoutConfirmationActions.hideModal]: (state) => {
        return state.mergeDeep({isModalShown: false})
    },
}, initialState)
