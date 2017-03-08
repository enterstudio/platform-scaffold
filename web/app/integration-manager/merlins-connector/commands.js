import {jqueryResponse} from 'progressive-web-sdk/dist/jquery-response'
import {makeRequest, makeFormEncodedRequest, makeJsonEncodedRequest} from 'progressive-web-sdk/dist/utils/fetch-utils'
import {urlToPathKey} from '../../utils/utils'

import {productDetailsParser} from '../../store/products/parser'
import {pdpAddToCartFormParser, appParser} from './parsers'
import {checkoutShippingParser, parseCheckoutData} from './checkout/parsers'
import homeParser from './home/parser'
import {parseNavigation} from './navigation/parser'
import * as responses from './../responses'
import {getCustomerEntityID} from '../../store/checkout/selectors'
import {getIsLoggedIn, getCurrentUrl} from '../../containers/app/selectors'
import {getShippingFormValues} from '../../store/form/selectors'
import {getCart} from '../../store/cart/actions'
import {browserHistory} from 'react-router'
import {receiveFormInfo} from './../actions'
import {removeAllNotifications} from '../../containers/app/actions'

const fetchPageData = (url) => (dispatch, getState) => {
    return makeRequest(url)
        .then(jqueryResponse)
        .then((res) => {
            const [$, $response] = res

            const currentURL = getCurrentUrl(getState())
            const receivedAction = responses.onPageReceived($, $response, url, currentURL)

            // Let app-level reducers know about receiving the page
            dispatch(receivedAction)
            dispatch(responses.receiveAppData(appParser($response)))
            dispatch(responses.receiveNavigationData(parseNavigation($, $response)))

            return res
        })
}

export const fetchPdpData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then((res) => {
            const [$, $response] = res
            dispatch(responses.receivePdpProductData({[urlToPathKey(url)]: productDetailsParser($, $response)}))
            dispatch(receiveFormInfo({[urlToPathKey(url)]: pdpAddToCartFormParser($, $response).formInfo}))
        })
        .catch((error) => { console.info(error.message) })
}

export const fetchHomeData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {
            dispatch(responses.receiveHomeData(homeParser($, $response)))
        })
}


export const fetchCheckoutShippingData = (url) => (dispatch) => {
    return dispatch(fetchPageData(url))
        .then(([$, $response]) => {

            dispatch(responses.receiveCheckoutShippingData(checkoutShippingParser($, $response)))
            dispatch(responses.receiveCheckoutData(parseCheckoutData($response)))
        })
        .catch((error) => { console.info(error.message) })
}

export const addToCart = (key, qty) => (dispatch, getStore) => {
    const formInfo = getStore().integrationManager.get(key)
    const formValues = {
        ...formInfo.get('hiddenInputs').toJS(),
        qty
    }

    return makeFormEncodedRequest(formInfo.get('submitUrl'), formValues, {method: formInfo.get('method')})
        .then(() => {
            dispatch(responses.onAddToCartSucceess())
            dispatch(getCart())
        })
}

export const submitShipping = () => {
    return (dispatch, getState) => {
        const currentState = getState()
        const {
            name,
            company,
            addressLine1,
            addressLine2,
            country_id,
            city,
            username,
            region_id,
            region,
            postcode,
            telephone,
            shipping_method
        } = getShippingFormValues(currentState)
        const entityID = getCustomerEntityID(currentState)
        const isLoggedIn = getIsLoggedIn(currentState)
        const names = name.split(' ')
        const shippingSelections = shipping_method.split('_')
        const address = {
            firstname: names.slice(0, -1).join(' '),
            lastname: names.slice(-1).join(' '),
            company: company || '',
            telephone,
            postcode,
            city,
            street: addressLine2 ? [addressLine1, addressLine2] : [addressLine1],
            regionId: region_id,
            region,
            countryId: country_id,
            save_in_address_book: true
        }
        const addressInformation = {
            addressInformation: {
                shippingAddress: address,
                billingAddress: {
                    ...address,
                    saveInAddressBook: false
                },
                shipping_carrier_code: shippingSelections[0],
                shipping_method_code: shippingSelections[1]
            }
        }
        const persistShippingURL = `/rest/default/V1/${isLoggedIn ? 'carts/mine' : `guest-carts/${entityID}`}/shipping-information`
        dispatch(responses.receiveCheckoutData({shipping: {address}, emailAddress: username}))
        makeJsonEncodedRequest(persistShippingURL, addressInformation, {method: 'POST'})
            .then((response) => response.json())
            .then((responseJSON) => {
                if (responseJSON.payment_methods) {
                    // TO DO: send response data to the next container
                    browserHistory.push({
                        pathname: '/checkout/payment/'
                    })
                }
            })
    }
}

export const checkCustomerEmail = () => {
    return (dispatch, getState) => {
        const formValues = getShippingFormValues(getState())

        makeJsonEncodedRequest('/rest/default/V1/customers/isEmailAvailable', {customerEmail: formValues.username}, {method: 'POST'})
            .then((response) => response.text())
            .then((responseText) => {
                if (/false/.test(responseText)) {
                    dispatch(responses.onShippingEmailRecognized())
                } else {
                    dispatch(responses.onShippingEmailNotRecognized())
                }
            })
    }
}

export const submitSignIn = () => {
    return (dispatch, getState) => {
        const {
            username,
            password
        } = getShippingFormValues(getState())

        // This data has to be sent via AJAX, it doesn't work with makeJsonEncodedRequest
        // If we send this using makeRequest, fetch or makeJsonEncodedRequest we get back a 400 (bad request) error
        // After comparing our request (using makeRequest, fetch or makeJsonEncodedRequest) to the desktop request (using AJAX)
        // The only difference we could find is that the desktop request is sent via AJAX and therefor includes the header X-Requested-With: XMLHttpRequest
        window.Progressive.$.ajax({
            url: '/customer/ajax/login',
            data: JSON.stringify({username, password, context: 'checkout'}),
            method: 'POST',
            success: (responseData) => {
                dispatch(removeAllNotifications())
                if (responseData.errors) {
                    dispatch(responses.onShippingLoginError(responseData))
                } else {
                    // Refetch the page now that the user is logged in
                    dispatch(fetchCheckoutShippingData(window.location.href))
                }
            }
        })
    }
}