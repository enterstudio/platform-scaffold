import React from 'react'
import classNames from 'classnames'

import {isRunningInAstro, trigger} from '../../utils/astro-integration'
import CheckoutShippingReduxForm from './partials/checkout-shipping-form'
import {ProgressSteps, ProgressStepsItem} from 'progressive-web-sdk/dist/components/progress-steps'


const CheckoutShipping = () => {
    if (isRunningInAstro) {
        trigger('checkout:enable-alert')
    }

    const templateClassnames = classNames('t-checkout-shipping u-bg-color-neutral-10 t--loaded')

    return (
        <div className={templateClassnames}>
            <div className="u-bg-color-neutral-00 u-border-light-bottom">
                <div className="t-checkout-shipping__progress">
                    <ProgressSteps>
                        <ProgressStepsItem icon="cart-full" title="Cart" href="/checkout/cart/" />
                        <ProgressStepsItem icon="shipping" title="Shipping" current />
                        <ProgressStepsItem icon="payment-full" title="Payment" />
                        <ProgressStepsItem icon="done" title="Done" />
                    </ProgressSteps>
                </div>
            </div>

            <CheckoutShippingReduxForm />
        </div>
    )
}

export default CheckoutShipping
