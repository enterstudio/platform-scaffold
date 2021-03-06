/* eslint-env jest */
import Immutable from 'immutable'
import React from 'react'
import ConnectedEstimateShippingReduxForm, {CartEstimateShippingModal} from './cart-estimate-shipping'
import {Field} from 'redux-form'
import {Provider} from 'react-redux'
import {noop} from 'progressive-web-sdk/dist/utils/utils'
import {mount, shallow} from 'enzyme'

const countries = [{value: 'C1', label: 'country 1'}, {value: 'C2', label: 'country 2'}]
const regions = [{value: 'R1', label: 'region 1'}, {value: 'R2', label: 'region 2'}]
const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({
        modals: Immutable.Map(),
        checkout: Immutable.fromJS({
            locations: {
                countries,
                regions
            },
        }),
        form: {
            estimateShipping: {}
        },
        ui: {
            cart: Immutable.fromJS({})
        }
    })
}
const testProps = {
    countries,
    stateProvinces: regions,
    onSubmit: noop,
    handleSubmit: noop,
    cart: {}
}

test('renders without errors', () => {
    const wrapper = mount(
        <Provider store={store}>
            <ConnectedEstimateShippingReduxForm onSubmit={noop} />
        </Provider>
    )

    expect(wrapper.length).toBe(1)
})

const ROOT_CLASS = 't-cart__estimate-shipping-modal'

test('renders the component class correctly', () => {
    const wrapper = shallow(<CartEstimateShippingModal {...testProps} />)

    expect(wrapper.hasClass(ROOT_CLASS)).toBe(true)
})

test('renders the countries and state/provinces', () => {
    const wrapper = shallow(<CartEstimateShippingModal {...testProps} />)

    const fields = wrapper.find(Field)

    expect(fields.length).toBe(3)
})
