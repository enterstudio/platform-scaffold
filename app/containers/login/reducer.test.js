import test from 'ava'
import {Map} from 'immutable'

import reducer from './reducer'
import * as Actions from './actions'

test('unknown action type leaves state unchanged', (t) => {
    const action = {
        type: 'qwertyuiop'
    }
    const inputState = Map({
        test: true,
        item: false,
    })

    t.is(reducer(inputState, action), inputState)
})
