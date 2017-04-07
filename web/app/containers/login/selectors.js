import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'
import {getUi} from '../../store/selectors'

export const getLogin = createSelector(getUi, ({login}) => login)

export const isSigninLoaded = createGetSelector(getLogin, 'signinSection')
export const isRegisterLoaded = createGetSelector(getLogin, 'registerSection')
