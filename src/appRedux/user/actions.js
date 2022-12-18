import * as types from './types'

export const fetching = () => {
    return {
        type: types.USER_FETCHING
    }
}

export const createTokenSuccess = (token) => {
    return {
        type: types.USER_CREATE_TOKEN_SUCCESS,
        payload: {
            accessToken: token.accessToken,
            expiresAt: token.expiresAt
        }
    }
}

export const createTokenFailure = (error) => {
    return {
        type: types.USER_CREATE_TOKEN_FAILURE,
        payload: {
            error
        }
    }
}

export const recoverAccountFinish = () => {
    return {
        type: types.USER_RECOVER_ACCOUNT_FINISH
    }
}

export const getUserInfoSuccess = (customer) => {
    return {
        type: types.USER_GET_INFO_SUCCESS,
        payload: {
            customer,
        }
    }
}

export const getUserInfoFailure = (error) => {
    return {
        type: types.USER_GET_INFO_FAILURE,
        payload: {
            error
        }
    }
}

export const updateCustomerSuccess = ({ firstName, lastName, phone }) => {
    return {
        type: types.USER_UPDATE_INFO_SUCCESS,
        payload: {
            firstName,
            lastName,
            phone
        }
    }
}

export const changeAddress = (address) => {
    return {
        type: types.USER_CHANGE_ADDRESS,
        payload: {
            address
        }
    }
}

export const addAddressSuccess = (addresses, newAddress) => {
    return {
        type: types.USER_ADD_ADDRESS_SUCCESS,
        payload: {
            addresses,
            newAddress
        }
    }
}

export const updateAddressSuccess = (addresses) => {
    return {
        type: types.USER_UPDATE_ADDRESS_SUCCESS,
        payload: {
            addresses
        }
    }
}

export const deleteAddressSuccess = (addresses) => {
    return {
        type: types.USER_DELETE_ADDRESS_SUCCESS,
        payload: {
            addresses
        }
    }
}

export const updateHistory = (history, reviews) => {
    return {
        type: types.USER_UPDATE_HISTORY,
        payload: {
            history,
            reviews
        }
    }
}

export const getTodayShippingAddresses = () => {
    return {
        type: types.USER_GET_TODAY_SHIPPING_ADDRESSES
    }
}

export const getNotifications = (notifications) => {
    return {
        type: types.USER_GET_NOTIFICATION,
        payload: {
            notifications
        }
    }
}

export const addCreditRecord = (creditAmount) => {
    return {
        type: types.USER_ADD_TEMP_CREDIT_RECORD,
        payload: {
            creditAmount
        }
    }
}

export const updateCredit = (credit) => {
    return {
        type: types.USER_UPDATE_CREDIT,
        payload: {
            credit
        }
    }
}

export const updateCustomDeliveryTimes = (times) => {
    return {
        type: types.USER_UPDATE_CUSTOM_DELIVERY_TIME,
        payload: {
            times
        }
    }
}

export const postReviewFailure = (error) => {
    return {
        type: types.USER_POST_REVIEW_FAILURE,
        payload: {
            error
        }
    }
}

export const seeStoreReview = () => {
    return {
        type: types.USER_SEE_STORE_REVIEW_POPUP
    }
}

export const logout = () => {
    return {
        type: types.USER_LOG_OUT
    }
}