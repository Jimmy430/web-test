import * as actions from './actions'
import { extractLineItemsFromOrder } from './utils'
import { AppAPI, AmplitudeAPI, CustomerAPI } from '@services'
// import { isExpired } from '@common'
import { isExpired } from '../../common'
import { cloneDeep, reject } from 'lodash'

export const checkMenuGroup = (postcode) => (dispatch) => {
    try {
        return CustomerAPI.checkMenuGroup(postcode)
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "checkMenuGroup")
        return {
            message: error
        }
    }
}

export const requestPostcode = ({ phone, postcode }) => (dispatch) => {
    try {
        return CustomerAPI.requestPostcode(phone, postcode)
            .then(json => {
                return json
            })
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "requestPostcode")
        return {
            message: error
        }
    }
}

export const createAccount = (customerInput, addressInput) => async (dispatch) => {
    try {
        dispatch(actions.fetching())
        const response = await CustomerAPI.createAccount(customerInput, addressInput)
        if (response.error) {
            return {
                error: response.error
            }
        }
        dispatch(actions.createTokenSuccess(response.data));
        // get user info
        return dispatch(getUserInfo(response.data))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "createAccount")
        dispatch(actions.createTokenFailure(error))
    }
}

export const guestLogin = (address) => (dispatch) => {
    const customer = {
        "id": null,
        "email": null,
        "firstName": "Guest",
        "lastName": "user",
        "phone": null,
        "tags": [],
        tier: 1,
        "addresses": [address],
        "reviews": [],
    }
    dispatch(actions.getUserInfoSuccess(customer))
}

export const logIn = (email, password) => async (dispatch) => {
    try {
        dispatch(actions.fetching())
        const response = await CustomerAPI.createAccessToken(email, password)
        if (response.error) {
            dispatch(actions.createTokenFailure(response.error));
            return {
                error: response.error
            }
        }
        dispatch(actions.createTokenSuccess(response.data));
        // get user info
        return dispatch(getUserInfo(response.data))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "logIn")
        return {
            error
        }
    }
}

export const userLogout = () => (dispatch) => {
    try {
        dispatch(actions.logout())
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "logOut")
    }
}

export const renewAccessToken = (accessToken) => (dispatch) => {
    try {
        return CustomerAPI.renewAccessToken(accessToken)
            .then(json => {
                if (json.error) {
                    dispatch(actions.getUserInfoFailure(json.error))
                } else {
                    const { data } = json
                    dispatch(actions.createTokenSuccess(data))
                    return dispatch(getUserInfo(data))
                }
            }).catch(error => {
                dispatch(actions.getUserInfoFailure(error))
            })
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "renewAccessToken")
    }
}

export const recoverAccount = (email) => (dispatch) => {
    try {
        dispatch(actions.fetching())
        return CustomerAPI.recoverAccount(email)
            .then(json => {
                dispatch(actions.recoverAccountFinish())
                return {
                    error: json.error
                }
            })
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "recoverAccount")
    }
}

export const getUserInfo = ({ accessToken, expiresAt }) => async (dispatch) => {
    try {
        if (isExpired(expiresAt)) {
            return dispatch(renewAccessToken(accessToken))
        } else {
            dispatch(actions.fetching())
            const response = await CustomerAPI.getCustomerInfo(accessToken)
            // const response = await CustomerAPI.getCustomerInfoByID(5248793313364)
            if (response.error) {
                return {
                    error: response.error
                }
            }
            const customer = response.data
            AmplitudeAPI.setUser(customer)
            //extract order from customer
            const orders = reject(customer.orders, { isCancelled: true })
            delete customer.orders
            const history = extractLineItemsFromOrder(orders)
            const reviews = customer.reviews

            dispatch(actions.getUserInfoSuccess(customer))
            dispatch(actions.updateHistory(history, reviews))
            if (customer.addresses.length < 1)
                return {
                    error: "no address"
                }
            const { id, postcode, isNoUnit, floor, unit } = customer.addresses[0]
            if (!postcode || (!isNoUnit && (!floor || !unit)))
                return {
                    error: "no address",
                    addressId: id
                }
            return {
                error: null
            }
        }
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "getUserInfo")
        return {
            error
        }
    }
}

export const updateUserInfo = (accessToken, customerInput) => async (dispatch) => {
    try {
        const response = await CustomerAPI.updateCustomer(accessToken, customerInput)
        if (response.error) {
            return {
                error: response.error
            }
        }
        dispatch(actions.updateCustomerSuccess(response.customer))
        return {
            error: null
        }
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateUserInfo")
        return {
            error
        }
    }
}

export const changeAddress = (address) => (dispatch) => {
    try {
        dispatch(actions.changeAddress(address))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "changeAddress")
    }
}

export const addAddress = (customerId, address) => async (dispatch) => {
    try {
        const response = await CustomerAPI.customerAddAddress(customerId, address)

        if (response.error) {
            return {
                error: response.error
            }
        }
        const { addresses } = response
        const newSelected = addresses.find(addressItem =>
            addressItem.postcode == address.postcode
            && addressItem.floor == address.floor
            && addressItem.unit == address.unit
        )
        dispatch(actions.addAddressSuccess(addresses, newSelected))
        return {
            error: null
        }
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "addAddress")
    }
}

export const updateAddress = (addressId, address) => async (dispatch) => {
    try {
        const response = await CustomerAPI.customerUpdateAddress(addressId, address)

        if (response.error) {
            return {
                error: response.error
            }
        }
        const { addresses } = response
        dispatch(actions.updateAddressSuccess(addresses))
        return {
            error: null
        }
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateAddress")
    }
}

export const deleteAddress = (addressId) => async (dispatch) => {
    try {
        const response = await CustomerAPI.customerDeleteAddress(addressId)

        if (response.error) {
            return {
                error: response.error
            }
        }
        const { addresses } = response
        dispatch(actions.deleteAddressSuccess(addresses))
        return {
            error: null
        }
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "deleteAddress")
    }
}

export const postReviewFailure = (error) => (dispatch) => {
    try {
        dispatch(actions.postReviewFailure(error))
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "postReviewFailure")
    } catch (err) {
        // ErrorTrackingAPI.sendError(err, "Operation(User)", "postReviewFailure")
    }
}

export const updateLatestOrder = (order, history, reviews) => (dispatch) => {
    try {
        const newHistory = extractLineItemsFromOrder([order], history)
        dispatch(actions.updateHistory(newHistory, reviews))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateLatestOrder")
    }
}

export const updateHistory = (history, reviews) => (dispatch) => {
    try {
        dispatch(actions.updateHistory(history, reviews))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateHistory")
    }
}

export const getTodayShippingAddresses = () => (dispatch) => {
    try {
        dispatch(actions.getTodayShippingAddresses())
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "getTodayShippingAddresses")
    }
}

export const addTempCredit = (creditAmount) => (dispatch) => {
    try {
        dispatch(actions.addCreditRecord(creditAmount))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "addTempCredit")
    }
}

export const updateCredit = (credit) => (dispatch) => {
    try {
        dispatch(actions.updateCredit(credit))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateCredit")
    }
}

export const updateCustomDeliveryTimes = (accessToken) => async (dispatch) => {
    try {
        const { error, times } = await CustomerAPI.customerGetCustomDeliveryTimes(accessToken)

        if(error) return

        dispatch(actions.updateCustomDeliveryTimes(times))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "updateCustomDeliveryTimes")
    }
}

export const storeReviewReaction = (customerId, isConfirm) => (dispatch) => {
    try {
        dispatch(actions.seeStoreReview())

        CustomerAPI.customerSeeStoreReview(customerId, isConfirm)
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "storeReviewReaction")
    }
}

export const getNotifications = (customerId) => async (dispatch) => {
    try {
        const notifications = await CustomerAPI.getNotificationsByCustomerId(customerId)
        if (notifications.error) {
            return { error: notifications.error }
        }
        dispatch(actions.getNotifications(notifications))
    } catch (error) {
        // ErrorTrackingAPI.sendError(error, "Operation(User)", "getNotifications")
    }
}