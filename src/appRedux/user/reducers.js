import * as types from './types'
import { grabReviewForLineitem, extractTodayShippingAddresses } from './utils'
import moment from 'moment'

const initState = {
    accessToken: null,
    expiresAt: null,
    userInfo: null,
    selectedAddress: null,
    isFetching: false,
    history: [],
    pendingMealBoxOrders: [],
    pendingMiniBuffetOrders: [],
    completedOrders: [],
    shippingAddresses: [],
    reviews: [],
    unreviewedList: [],
    unreviewedFreeList: [],
    notificationList: [],
}

export default (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.USER_FETCHING:
            return {
                ...state,
                isFetching: true
            }
        case types.USER_RECOVER_ACCOUNT_FINISH:
            return {
                ...state,
                isFetching: false
            }
        case types.USER_CREATE_TOKEN_SUCCESS:
            return {
                ...state,
                accessToken: payload.accessToken,
                expiresAt: payload.expiresAt,
            }
        case types.USER_CREATE_TOKEN_FAILURE:
            return initState
        case types.USER_GET_INFO_SUCCESS:
            let selectedAddress
            if (state.selectedAddress) {
                selectedAddress = payload.customer.addresses.find(address => address.id == state.selectedAddress.id)
            }
            return {
                ...state,
                userInfo: payload.customer,
                selectedAddress: selectedAddress || payload.customer.addresses[0],
                isFetching: false
            }
        case types.USER_GET_INFO_FAILURE:
            return {
                ...state,
                userInfo: null,
                selectedAddress: null,
                isFetching: false
            }
        case types.USER_UPDATE_INFO_SUCCESS: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    phone: payload.phone
                }
            }
        }
        case types.USER_CHANGE_ADDRESS: {
            return {
                ...state,
                selectedAddress: payload.address,
            }
        }
        case types.USER_ADD_ADDRESS_SUCCESS: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    addresses: payload.addresses
                },
                selectedAddress: payload.newAddress,
            }
        }
        case types.USER_UPDATE_ADDRESS_SUCCESS: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    addresses: payload.addresses
                },
                selectedAddress: payload.addresses.find(address => address.id == state.selectedAddress.id)
            }
        }
        case types.USER_DELETE_ADDRESS_SUCCESS: {
            const { addresses } = payload

            /**check if selected adress be deleted */
            if (addresses.some(address => address.id == state.selectedAddress.id))
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        addresses: addresses
                    }
                }
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    addresses: addresses
                },
                selectedAddress: addresses[0]
            }
        }
        case types.USER_UPDATE_HISTORY:
            const { lineitems, pendingMealBox, pendingMiniBuffet, completeds, reviews, unreviewedList, unreviewedFreeList } =
                grabReviewForLineitem(payload.history || state.history, payload.reviews || state.reviews, state.userInfo.customDeliveryTimes)
            return {
                ...state,
                isFetching: false,
                history: lineitems,
                pendingMealBoxOrders: pendingMealBox,
                pendingMiniBuffetOrders: pendingMiniBuffet,
                completedOrders: completeds,
                reviews,
                unreviewedList,
                unreviewedFreeList
            }
        case types.USER_GET_TODAY_SHIPPING_ADDRESSES:
            const shippingAddresses = extractTodayShippingAddresses(state.history)
            return {
                ...state,
                shippingAddresses
            }
        case types.USER_GET_NOTIFICATION:
            return {
                ...state,
                notificationList: payload.notifications
            }
        case types.USER_ADD_TEMP_CREDIT_RECORD:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    credit: {
                        usableV2: {
                            unrestricted: state.userInfo.credit.usableV2.unrestricted - payload.creditAmount,
                            minibuffet: state.userInfo.credit.usableV2.minibuffet
                        },
                        lines: [
                            ...state.userInfo.credit.lines,
                            {
                                amount: payload.creditAmount,
                                date: moment(),
                                action: 'SPENT',
                                type: "Credit spent"
                            }
                        ]
                    }
                }
            }
        case types.USER_UPDATE_CREDIT:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    credit: payload.credit
                }
            }
        case types.USER_UPDATE_CUSTOM_DELIVERY_TIME:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    customDeliveryTimes: payload.times
                }
            }
        case types.USER_POST_REVIEW_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case types.USER_SEE_STORE_REVIEW_POPUP:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    showStoreReview: false
                }
            }
        case types.USER_LOG_OUT:
            return initState
        default:
            return state
    }
}

/**
 *  pendingMiniBuffetOrders structure
 * 
    pendingMiniBuffetOrders = [setObj]
  
    setObj = {
        id: Long, //lineitem id
        variantId: Long,
        title: String,
        variantTitle: String,
        quantity: Int,
        estimatedMin: Int,
        estimatedMax: Int,
        price: Float,
        servingDate: DateString,
        servingTime: ServingTimeObj, //same as GraphQL
        options: [optionObj],
        cutoffTime: CutoffTimeObj, //same as GraphQL
        shippingAddress: ShippingAddressObj //same as GraphQL
    }

    optionObj = {
        id: Long,
        title: String,
        vendor: String,
        image: String,
        variants: [optionVariant]
    }

    optionVariant = {
        id: Long,
        title: String,
        quantity: Int
    }
 */