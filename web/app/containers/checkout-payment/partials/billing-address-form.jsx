import React, {PropTypes} from 'react'
import * as ReduxForm from 'redux-form'
// import {connect} from 'react-redux'
// import {createStructuredSelector} from 'reselect'
// import * as selectors from '../selectors'
// import {selectorToJS} from '../../../utils/selector-utils'

// SDK Components
import Button from 'progressive-web-sdk/dist/components/button'
import Field from 'progressive-web-sdk/dist/components/field'
import FieldRow from 'progressive-web-sdk/dist/components/field-row'
import {Icon} from 'progressive-web-sdk/dist/components/icon'

const BillingAddressForm = ({isCompanyOrAptShown, handleShowCompanyAndApt}) => {
    const shippingAddress = (
        <div>
            <p>720 W Georgia, Vancouver, V4R5TS</p>
            <p>Name: John Appleseed</p>
        </div>
    )

    const addDetails = (
        <Button
            className="c--is-anchor"
            innerClassName="c--no-min-height u-padding-0"
            onClick={handleShowCompanyAndApt}
        >
            <span className="u-color-brand u-text-letter-spacing-normal u-text-small">
                Add company, apt #, suite etc.
            </span>
            <Icon name="chevron-down" className="u-margin-start-sm u-color-brand" />
        </Button>
    )

    const newShippingAddressIsEnabled = true

    return (
        <div>
            <div className="t-checkout-payment__title u-padding-top-lg u-padding-bottom-lg">
                <h2 className="u-h4">Billing Address</h2>
            </div>

            <div className="u-border-light-top u-border-light-bottom u-bg-color-neutral-10">
                <FieldRow className="u-padding-md">
                    <ReduxForm.Field
                        component={Field}
                        name="same-address"
                        label={<strong className="u-text-semi-bold">Same as shipping address</strong>}
                        caption={shippingAddress}
                    >
                        <input type="checkbox" noValidate />
                    </ReduxForm.Field>
                </FieldRow>

                {newShippingAddressIsEnabled &&
                    <div className="u-padding-md u-padding-top-lg u-padding-bottom-lg u-border-light-top">
                        <FieldRow>
                            <ReduxForm.Field component={Field} name="fullName" label="Full name">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field
                                component={Field}
                                name="address"
                                label="Address"
                                caption={!isCompanyOrAptShown && addDetails}
                            >
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        {isCompanyOrAptShown &&
                            <FieldRow>
                                <ReduxForm.Field
                                    component={Field}
                                    name="organization"
                                    label="Company"
                                >
                                    <input type="text" noValidate />
                                </ReduxForm.Field>

                                <ReduxForm.Field
                                    component={Field}
                                    name="address-line2"
                                    label="Apt #, suite etc."
                                >
                                    <input type="text" noValidate />
                                </ReduxForm.Field>
                            </FieldRow>
                        }

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="city" label="City">
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="state" label="State/Province">
                                <select>
                                    <option>Select option</option>
                                </select>
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="zip" label="Zip/Postal code">
                                {/* @TODO: Set Type to text or tel based on country! */}
                                <input type="text" noValidate />
                            </ReduxForm.Field>
                        </FieldRow>

                        <FieldRow>
                            <ReduxForm.Field component={Field} name="country" label="Country">
                                <select>
                                    <option>United States</option>
                                </select>
                            </ReduxForm.Field>
                        </FieldRow>
                    </div>
                }
            </div>
        </div>
    )
}

BillingAddressForm.propTypes = {
    /**
     * Whether the "Company" and "Apt #" fields display
     */
    isCompanyOrAptShown: React.PropTypes.bool,

    /**
     * Shows the "Company" and "Apt #" fields
     */
    handleShowCompanyAndApt: React.PropTypes.func,
}

const BillingAddressReduxForm = ReduxForm.reduxForm({
    form: 'paymentBillingAddressForm'
})(BillingAddressForm)

export default BillingAddressReduxForm
