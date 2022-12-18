import moment from 'moment'

import * as types from './types'
import * as utils from './utils'

const initState = {
    dateList: [],
    productList: [],
    servingDate: null,
    servingTime: null,

    searchInfo: {
        date: moment().add(2, 'day'),
        session: 2,
        guests: 15
    },

    // carts
    cartItems: []
}

export default (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.MINIBUFFET_FETCH_SUCCESS:
            return {
                ...state,
                dateList: payload.miniBuffetDates,
            }
        case types.MINIBUFFET_CHOOSE_PRODUCT_LIST:
            const { servingDate, servingTime } = payload.productList[0]

            return {
                ...state,
                productList: payload.productList,
                servingDate,
                servingTime
            }
        case types.MINIBUFFET_UPDATE_SEARCHINFO:
            return {
                ...state,
                searchInfo: payload
            }

        // carts
        case types.MINIBUFFET_UPDATE_ITEMS:
            return {
                ...state,
                cartItems: [payload.item]
            }
        case types.MINIBUFFET_REMOVE_ITEMS:
            return utils.removeCartItem(state, payload)
        case types.MINIBUFFET_CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        case types.MINIBUFFET_CONFIRM_ORDER_SUCCESS:
            return {
                ...state,
                cartItems: [],
                productList: [],
            }
        case types.MINIBUFFET_CONFIRM_ORDER_FAILURE:
        case types.MINIBUFFET_CANCEL_ITEM_SUCCESS:
        case types.MINIBUFFET_CANCEL_ITEM_FAILURE:
        default:
            return state
    }
}

/* 
 *** dateList structure ***
 *
    dateList= [listObj]

    listObj = {
        servingDate: String,
        unavailable: Boolean,
        servingTimes: [servingTimeObj]
    }

    servingTimeObj = {
        id: Number,
        isUnavailable: Boolean,
        isSoldout: Boolean,
        priceFrom: Number,
    }
*/