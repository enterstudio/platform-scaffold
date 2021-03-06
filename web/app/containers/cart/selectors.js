import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getCart = createSelector(getUi, ({cart}) => cart)
export const getRemoveItemID = createGetSelector(getCart, 'removeItemId')
export const getIsWishlistAddComplete = createGetSelector(getCart, 'isWishlistAddComplete')
export const getTaxInitiation = createGetSelector(getCart, 'initiateTaxRequest')
