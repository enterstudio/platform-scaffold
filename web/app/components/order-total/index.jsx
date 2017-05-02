import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import {Ledger, LedgerRow} from 'progressive-web-sdk/dist/components/ledger'

import * as cartSelectors from '../../store/cart/selectors'
/**
 * OrderTotal displays the total that includes tax, discount, subtotal
 */

const OrderTotal = ({
    className,
    grandTotal,
    subtotalInclTax,
    subtotalWithDiscount,
    taxAmount,
    discountAmount
}) => {
    const classes = classNames('c-order-total', className)

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
        <Ledger className={classes}>
            {totals()}
        </Ledger>
    )
}

OrderTotal.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,
    discountAmount: PropTypes.string,
    grandTotal: PropTypes.string,
    subtotalInclTax: PropTypes.string,
    subtotalWithDiscount: PropTypes.string,
    taxAmount: PropTypes.string,
}

const mapStateToProps = createPropsSelector({
    discountAmount: cartSelectors.getDiscountAmount,
    grandTotal: cartSelectors.getGrandTotal,
    subtotalInclTax: cartSelectors.getSubtotalIncludingTax,
    subtotalWithDiscount: cartSelectors.getSubtotalWithDiscount,
    taxAmount: cartSelectors.getTaxAmount,
})

export default connect(mapStateToProps)(OrderTotal)
