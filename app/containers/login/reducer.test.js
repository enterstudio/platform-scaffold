import {Map, is} from 'immutable'

import reducer from './reducer'

import * as appActions from '../app/actions'
import * as loginActions from './actions'

jest.mock('./parsers/signin')
import signinParser from './parsers/signin'

test('unknown action type leaves state unchanged', () => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    expect(reducer(inputState, action)).toBe(inputState)
})

test('appActions.onPageReceived does nothing when pageType !== Login', () => {
    const action = appActions.onPageReceived($, $(), 'Home')
    const inputState = Map()

    expect(reducer(inputState, action)).toEqual(inputState)
})

test('appActions.onPageReceived sets loaded to true', () => {
    const action = appActions.onPageReceived($, $(), 'Login', 'signin')
    const inputState = Map()

    expect(reducer(inputState, action).get('loaded')).toBe(true)
})

test('appActions.onPageReceived causes the page to be parsed into the state', () => {
    const $html = $('<body><hr /></body')
    const action = appActions.onPageReceived($, $html, 'Login', 'signin')
    const inputState = Map()

    signinParser.mockClear()
    const parsedPage = {test: true, title: 'Customer Login'}
    signinParser.mockReturnValueOnce(parsedPage)

    const result = reducer(inputState, action)

    expect(signinParser).toBeCalledWith($, $html)
    expect(result.get('signinSection').get('test')).toBe(true)
    expect(is(result, Map({signinSection: Map(parsedPage), loaded: true}))).toBe(true)
})

test('loginActions.openInfoModal opens the info modal', () => {
    const action = loginActions.openInfoModal()
    const inputState = Map()

    expect(is(reducer(inputState, action), Map({infoModalOpen: true}))).toBe(true)
})

test('loginActions.closeInfoModal closes the info modal', () => {
    const action = loginActions.closeInfoModal()
    const inputState = Map({infoModalOpen: true})

    expect(is(reducer(inputState, action), Map({infoModalOpen: false}))).toBe(true)
})
