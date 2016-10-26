import {createAction as actionCreator} from 'redux-act'

// simplify redux-act createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export const createAction = (description, ...argNames) => {
    let payloadReducer

    if (argNames.length) {
        payloadReducer = (...args) => {
            const payload = {}

            argNames.forEach((arg, index) => {
                payload[arg] = args[index]
            })

            return payload
        }
    }

    return actionCreator(description, payloadReducer)
}

export const makeRequest = (url, options) => {
    return fetch(url, {...options, credentials: 'same-origin'})
}


/**
 * Form-encode an arbitrary JS object.
 */
export const formEncode = (data) => {
    const pairs = []
    Object.keys(data).forEach((k) => {
        pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    })
    return pairs.join('&').replace(/%20/g, '+')
}

/**
 * Make a request given the provided url and options, form-encoding the data
 * into the body of the request.
 */
export const makeFormEncodedRequest = (url, data, options) => {
    return makeRequest(url, {
        ...options,
        body: formEncode(data),
        headers: {
            ...(options.headers || {}),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
