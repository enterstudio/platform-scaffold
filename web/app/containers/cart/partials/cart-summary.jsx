import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'
import * as cartSelectors from '../../../store/cart/selectors'
import {CART_ESTIMATE_SHIPPING_MODAL} from '../constants'
import {openModal} from '../../../store/modals/actions'
import {removePromoCode} from '../actions'
import {getSelectedShippingRate, getSelectedShippingLabel, getPostcode} from '../../../store/checkout/shipping/selectors'

import Button from 'progressive-web-sdk/dist/components/button'
import CartPromoForm from './cart-promo-form'
import Icon from 'progressive-web-sdk/dist/components/icon'
import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'
import {Accordion, AccordionItem} from 'progressive-web-sdk/dist/components/accordion'

const CartSummary = ({
    summaryCount,
    subtotalExclTax,
    grandTotal,
    subtotalInclTax,
    subtotalWithDiscount,
    couponCode,
    shippingRate,
    shippingLabel,
    zipCode,
    taxAmount,
    discountAmount,
    onCalculateClick,
    removePromoCode
}) => {
    const calculateButton = (
        <Button innerClassName="u-padding-end-0 u-color-brand u-text-letter-spacing-normal" onClick={onCalculateClick}>
            Calculate <Icon name="chevron-right" />
        </Button>
    )

    const editButton = (
        <span>Based on delivery to
            <Button innerClassName="u-padding-start-sm u-color-brand u-text-letter-spacing-normal" onClick={onCalculateClick}>
                {zipCode}
            </Button>
        </span>
    )

    const removeButton = (
        <Button innerClassName="u-color-brand u-padding-start-0 u-text-letter-spacing-normal" onClick={removePromoCode}>
            Remove Discount
        </Button>
    )

    const totals = function() {
        if (discountAmount && !taxAmount) {
            return (
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={subtotalWithDiscount}
                />
            )
        }
        if (taxAmount && !discountAmount) {
            return (
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={subtotalInclTax}
                />
            )
        }
        if (taxAmount && discountAmount) {
            return (
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={grandTotal}
                />
            )
        } else {
            return (
                <LedgerRow
                    label="Total"
                    isTotal={true}
                    value={subtotalInclTax}
                />
            )
        }
    }

    return (
        <div className="t-cart__summary">
            <Accordion className="u-margin-top u-bg-color-neutral-00">
                <AccordionItem header="Promo code">
                    <CartPromoForm />
                </AccordionItem>
            </Accordion>
            <div className="t-cart__summary-title u-padding-top-lg u-padding-bottom-md">
                <h2 className="u-h4 u-text-uppercase">
                    Order Summary
                </h2>
            </div>

            <div className="u-bg-color-neutral-00 u-border-light-top u-border-light-bottom">
                <Ledger className="u-border-light-top">
                    <LedgerRow
                        label={`Subtotal (${summaryCount} items)`}
                        value={subtotalExclTax}
                    />
                    {discountAmount &&
                        <LedgerRow
                            className="pw--sale"
                            label={`Discount: ${couponCode}`}
                            labelAction={removeButton}
                            value={discountAmount}
                        />
                    }

                    {/* <LedgerRow
                        label="Discount: FREESHIP"
                        valueAction={<span className="u-color-accent">-$10.00</span>}
                    />*/}

                    {!taxAmount ?
                        <LedgerRow
                            className="u-flex-none"
                            label="Taxes"
                            labelAction="Rates based on shipping location"
                            valueAction={calculateButton}
                        />
                    :
                    [
                        <LedgerRow
                            label={`Shipping (${shippingLabel})`}
                            value={shippingRate}
                            key={`Shipping (${shippingLabel})`}
                        />,
                        <LedgerRow
                            className="u-flex-none u-border-0"
                            label="Taxes"
                            labelAction={editButton}
                            value={taxAmount}
                            key="Taxes"
                        />
                    ]
                    }
                    {totals()}
                </Ledger>

                <div className="u-padding-end-md u-padding-bottom-lg u-padding-start-md">
                    <Button
                        className="c--primary u-flex-none u-width-full u-text-uppercase qa-cart__checkout"
                        href="/checkout/">
                        <Icon name="lock" />
                        Proceed To Checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}


CartSummary.propTypes = {
    couponCode: PropTypes.string,
    discountAmount: PropTypes.string,
    grandTotal: PropTypes.string,
    removePromoCode: PropTypes.func,
    shippingLabel: PropTypes.string,
    shippingRate: PropTypes.string,
    subtotalExclTax: PropTypes.string,
    subtotalInclTax: PropTypes.string,
    subtotalWithDiscount: PropTypes.string,
    summaryCount: PropTypes.number,
    taxAmount: PropTypes.string,
    zipCode: PropTypes.string,
    onCalculateClick: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    discountAmount: cartSelectors.getDiscountAmount,
    couponCode: cartSelectors.getCouponCode,
    grandTotal: cartSelectors.getGrandTotal,
    shippingRate: getSelectedShippingRate,
    shippingLabel: getSelectedShippingLabel,
    zipCode: getPostcode,
    subtotalExclTax: cartSelectors.getSubtotalExcludingTax,
    subtotalInclTax: cartSelectors.getSubtotalIncludingTax,
    subtotalWithDiscount: cartSelectors.getSubtotalWithDiscount,
    taxAmount: cartSelectors.getTaxAmount,
    summaryCount: cartSelectors.getCartSummaryCount,
})

const mapDispatchToProps = {
    onCalculateClick: () => openModal(CART_ESTIMATE_SHIPPING_MODAL),
    removePromoCode
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary)
