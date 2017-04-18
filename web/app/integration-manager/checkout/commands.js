let connector = {}

export const register = (commands) => {
    connector = commands
}

export const fetchCheckoutShippingData = (...args) => connector.fetchCheckoutShippingData(...args)
export const submitShipping = (...args) => connector.submitShipping(...args)
export const checkCustomerEmail = (...args) => connector.checkCustomerEmail(...args)
export const checkoutSignIn = (...args) => connector.checkoutSignIn(...args)
export const fetchShippingMethodsEstimate = (...args) => connector.fetchShippingMethodsEstimate(...args)
export const fetchCheckoutPaymentData = (...args) => connector.fetchCheckoutPaymentData(...args)
export const submitPayment = (...args) => connector.submitPayment(...args)