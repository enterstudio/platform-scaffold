import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import {getAssetUrl} from 'progressive-web-sdk/dist/asset-utils'
import throttle from 'lodash.throttle'
import {removePromoCode} from '../../cart/actions'
import CartPromoForm from '../../cart/partials/cart-promo-form'
import OrderTotal from '../../../components/order-total'

// Selectors
import * as selectors from '../selectors'
import * as cartSelectors from '../../../store/cart/selectors'
import {getSelectedShippingRate, getSelectedShippingLabel} from '../../../store/checkout/shipping/selectors'

// Actions
import * as checkoutPaymentActions from '../actions'

// Partials
import PaymentProductItem from './payment-product-item'

// SDK Components
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'
import Button from 'progressive-web-sdk/dist/components/button'
// import Field from 'progressive-web-sdk/dist/components/field'
// import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import Icon from 'progressive-web-sdk/dist/components/icon'
import Image from 'progressive-web-sdk/dist/components/image'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import List from 'progressive-web-sdk/dist/components/list'

class OrderSummary extends React.Component {
    constructor(props) {
        super(props)

        this.handleScroll = throttle(this.handleScroll.bind(this), 200)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        const {isFixedPlaceOrderShown} = this.props
        const footerHeight = 200
        const scrollPosition = window.pageYOffset
        const windowSize = window.innerHeight
        const bodyHeight = document.body.offsetHeight
        const distanceFromBottom = Math.max(bodyHeight - (scrollPosition + windowSize), 0)
        const newIsFixedPlaceOrderShown = distanceFromBottom > footerHeight

        if (newIsFixedPlaceOrderShown !== isFixedPlaceOrderShown) {  // Saves triggering the action
            this.props.toggleFixedPlaceOrder(newIsFixedPlaceOrderShown)
        }
    }

    render() {
        const {
            cartItems,
            couponCode,
            discountAmount,
            isFixedPlaceOrderShown,
            summaryCount,
            subtotalExclTax,
            subtotalInclTax,
            shippingRate,
            shippingLabel,
            taxAmount,
            removePromoCode
        } = this.props

        const removeButton = (
            <Button innerClassName="u-color-brand u-padding-start-0 u-text-letter-spacing-normal" onClick={removePromoCode}>
                Remove Discount
            </Button>
        )

        return (
            <div className="t-checkout-payment__order-summary">
                <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-md">
                    <h2 className="u-h4 u-text-uppercase">Order Summary</h2>
                </div>

                <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-00 t-checkout-payment__card">
                    <List>
                        {cartItems.map((item, idx) =>
                            <PaymentProductItem {...item} key={idx} />
                        )}
                    </List>

                    <Ledger className="u-border-light-top">
                        <LedgerRow
                            label={`Subtotal (${summaryCount} items)`}
                            value={subtotalExclTax}
                        />

                        <LedgerRow
                            label={`Shipping (${shippingLabel})`}
                            value={shippingRate}
                        />

                        {taxAmount &&
                            <LedgerRow
                                className="u-flex-none u-border-0"
                                label="Taxes"
                                value={taxAmount}
                            />
                        }

                        {discountAmount && couponCode ?
                            <LedgerRow
                                className="pw--sale"
                                label={`Discount: ${couponCode}`}
                                labelAction={removeButton}
                                value={discountAmount}
                            />
                        :
                            <Accordion>
                                <AccordionItem header="Promo code">
                                    <CartPromoForm />
                                </AccordionItem>
                            </Accordion>
                        }
                    </Ledger>
                    <OrderTotal className="u-border-light-top" />

                    {/* This is the statically positioned "Place Your Order" container */}
                    <div className="u-padding-end-md u-padding-start-md">
                        <Button className="c--primary u-flex-none u-width-full u-text-all-caps" type="submit">
                            <Icon name="lock" />
                            Place Your Order
                        </Button>
                    </div>

                    {/* This is the FIXED positioned "Place Your Order" container */}
                    <div
                        className={`t-checkout-payment__fixed-place-order ${isFixedPlaceOrderShown && 't--show'}`}
                        tabIndex="-1"
                        aria-hidden="true"
                    >
                        <div className="u-padding-md u-bg-color-neutral-00 u-text-align-center">
                            <Button className="c--primary u-flex-none u-width-full u-text-all-caps" type="submit">
                                <Icon name="lock" />
                                Place Your Order
                            </Button>

                            <p className="u-margin-top-md">
                                Total: <strong>{subtotalInclTax}</strong>
                            </p>
                        </div>
                    </div>

                    <div className="u-padding-top-lg u-padding-bottom-lg u-text-align-center">
                        <Image
                            src={getAssetUrl('static/img/checkout/verisign-mcafee-secure.png')}
                            alt="Verisign and McAfee Secure"
                            height="38px"
                            width="150px"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

OrderSummary.propTypes = {
    cart: PropTypes.object,
    /**
     * Cart item data
     */
    cartItems: PropTypes.array,
    couponCode: PropTypes.string,
    discountAmount: PropTypes.string,

    /**
     * Whether the fixed 'Place Order' container displays
     */
    isFixedPlaceOrderShown: PropTypes.bool,
    removePromoCode: PropTypes.func,

    /**
     * Shipping rate label
     */
    shippingLabel: PropTypes.string,

    /**
     * Shipping rate amount
     */
    shippingRate: PropTypes.string,

    /**
     * Subtotal excluding tax
     */
    subtotalExclTax: PropTypes.string,

    /**
     * Subtotal including tax
     */
    subtotalInclTax: PropTypes.string,

    /**
     * Total item count in cart
     */
    summaryCount: PropTypes.number,

    /**
     * Tax amount
     */
    taxAmount: PropTypes.string,

    /**
     * Handle scroll to toggle fixed 'Place Order' container
     */
    toggleFixedPlaceOrder: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    cartItems: cartSelectors.getCartItems,
    couponCode: cartSelectors.getCouponCode,
    discountAmount: cartSelectors.getDiscountAmount,
    subtotalExclTax: cartSelectors.getSubtotalExcludingTax,
    subtotalInclTax: cartSelectors.getSubtotalIncludingTax,
    shippingRate: getSelectedShippingRate,
    shippingLabel: getSelectedShippingLabel,
    taxAmount: cartSelectors.getTaxAmount,
    summaryCount: cartSelectors.getCartSummaryCount,
    isFixedPlaceOrderShown: selectors.getIsFixedPlaceOrderShown
})

const mapDispatchToProps = {
    toggleFixedPlaceOrder: checkoutPaymentActions.toggleFixedPlaceOrder,
    removePromoCode
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderSummary)
