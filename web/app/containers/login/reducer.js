import Immutable from 'immutable'
import {createReducer} from 'redux-act'

import {isPageType} from '../../utils/router-utils'
import {isRunningInAstro} from '../../utils/astro-integration'

import Login from './container'
import {openInfoModal, closeInfoModal} from './actions'

import {onPageReceived} from '../app/actions'
import signinParser from './parsers/signin'
import registerParser from './parsers/register'
import {handleActions} from 'redux-actions'
import {mergePayloadForActions} from '../../utils/reducer-utils'
import {receiveData} from './actions'

const signinFields = [
    {
        label: 'Email',
        name: 'login[username]',
        type: 'email',
        required: true,
        tooltip: false,
    },
    {
        label: 'Password',
        name: 'login[password]',
        type: 'password',
        required: true,
        tooltip: false,
    },
    {
        label: 'Remember Me',
        name: 'persistent_remember_me',
        type: 'checkbox',
        required: false,
        tooltip: false,
    },
]

const registerPersonalFields = [
    {
        label: 'First Name',
        name: 'firstname',
        type: 'text',
        required: true,
        tooltip: false,
    },
    {
        label: 'Last Name',
        name: 'lastname',
        type: 'text',
        required: true,
        tooltip: false,
    },
    {
        label: 'Email',
        name: 'email',
        type: 'email',
        required: true,
        tooltip: false,
    },
    {
        label: 'Sign Up for Newsletter',
        name: 'is_subscribed',
        type: 'checkbox',
        required: false,
        tooltip: false,
    },
]

const registerSigninFields = [
    {
        label: 'Password',
        name: 'password',
        type: 'password',
        required: true,
        tooltip: false,
    },
    {
        label: 'Confirm Password',
        name: 'password_confirmation',
        type: 'password',
        required: true,
        tooltip: false,
    },
    {
        label: 'Remember Me',
        name: 'persistent_remember_me',
        type: 'checkbox',
        required: false,
        tooltip: false,
    },
]

const initialState = Immutable.fromJS({
    title: 'Customer Login',
    isRunningInAstro,
    signinSection: Immutable.Map({
        href: '',
        heading: '',
        description: '',
        requiredText: '',
        form: {
            href: '',
            fields: signinFields,
            hiddenInputs: [],
            submitText: ''
        },
    },
    registerSection: {
        href: '',
        heading: '',
        description: '',
        requiredText: '',
        form: {
            href: '',
            hiddenInputs: [],
            submitText: '',
            sections: [{
                heading: '',
                fields: registerPersonalFields,
            }, {
                heading: '',
                fields: registerSigninFields,
            }]
        },
    }
})

export default handleActions({
    ...mergePayloadForActions(receiveData)
}, initialState)
