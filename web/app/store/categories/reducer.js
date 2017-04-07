import Immutable from 'immutable'
import {handleActions} from 'redux-actions'
import {mergePayload} from '../../utils/reducer-utils'
import {receiveCategory} from './actions'

const initialState = Immutable.Map()

const categoryReducer = handleActions({
    [receiveCategory]: mergePayload
}, initialState)

export default categoryReducer
