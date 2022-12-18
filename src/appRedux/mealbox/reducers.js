import * as types from './types'
import * as util from './utils'

/**
 *  cartItem:{
        "productId": Long,
        "variantId": Long,
        "price": Float,
        "amount": Int,
        "servingDate": String,
        "needDeliveryFee": Boolean,
        "menugroupId": Int,
        "mealtimeId": Int,
        "mealtimeSeq": Int
    }
 */

const initState = {
    list: [],
    filteredList: [],
    additionalFilter: [],
    tempAdditionalFilter: [],
    selectedDate: null,
    servingTimes: [],
    selectedTime: null,
    selectedDateIndex: -1,
    showFilter: false,
    mealtimeType: -1,

    // carts
    cartItems: [],
    totalAmounts: 0,
    productTotal: 0,
    needPaidDrops: [],
}

export default (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case types.MEALBOX_FETCH_SUCCESS:
            return {
                ...state,
                list: payload.mealBox,
                filteredList: payload.mealBox,
                servingTimes: payload.servingTimes,
                selectedTime: payload.servingTimes[0],
                mealtimeType: payload.mealtimeType,
            }
        case types.MEALBOX_FILTER:
            const { date, index } = payload
            let filteredList = state.list.filter(product => product.servingDate === date)
            if (state.mealtimeType != -1)
                filteredList = filteredList.filter(product => product.servingTime.mealtime.id == state.mealtimeType)
            filteredList = util.additionFilteredList(filteredList, state.additionalFilter)
            return {
                ...state,
                filteredList,
                selectedDateIndex: index,
                selectedDate: date
            }
        case types.MEALBOX_RESET:
            return {
                ...state,
                filteredList: [...state.list],
                selectedDateIndex: -1,
                selectedDate: null
            }
        case types.MEALBOX_OPEN_FILTER:
            return {
                ...state,
                showFilter: true
            }
        case types.MEALBOX_CLOSE_FILTER:
            return {
                ...state,
                showFilter: false,
                tempAdditionalFilter: [...state.additionalFilter]
            }
        case types.MEALBOX_SWITCH_ADDITIONAL_FILTER_OPTION:
            const { item } = payload
            if (!state.tempAdditionalFilter.some(exist => {
                return exist.value == item.value
            })) {
                return {
                    ...state,
                    tempAdditionalFilter: [...state.tempAdditionalFilter, item]
                }
            }
            return {
                ...state,
                tempAdditionalFilter: state.tempAdditionalFilter.filter(option =>
                    option.value !== item.value)
            }
        case types.MEALBOX_CLEAR_ADDITIONAL_FILTER:
            return {
                ...state,
                tempAdditionalFilter: []
            }
        case types.MEALBOX_APPLY_ADDITIONAL_FILTER:
            filteredList = util.additionFilteredList(state.list.filter(product => {
                if (state.mealtimeType === -1)
                    return product.servingDate === state.selectedDate
                return product.servingDate === state.selectedDate && product.servingTime.mealtime.id == state.mealtimeType
            }), state.tempAdditionalFilter)
            return {
                ...state,
                filteredList,
                additionalFilter: [...state.tempAdditionalFilter]
            }
        case types.MEALBOX_CHANGE_MEALTIME_TYPE:
            filteredList = state.list.filter(product => product.servingDate === state.selectedDate)
            if (payload.mealtimeType != -1)
                filteredList = filteredList.filter(product => product.servingTime.mealtime.id == payload.mealtimeType)
            filteredList = util.additionFilteredList(filteredList, state.additionalFilter)
            return {
                ...state,
                mealtimeType: payload.mealtimeType,
                filteredList
            }

        // carts
        case types.MEALBOX_UPDATE_ITEMS:
            return util.updateCartItems(state, payload)
        case types.MEALBOX_REMOVE_ITEM:
            return util.removeCartItems(state, payload.productId)
        case types.MEALBOX_CONFIRM_ORDER_SUCCESS:
            return {
                ...state,
                cartItems: [],
                totalAmounts: 0,
                productTotal: 0,
                needPaidDrops: [],
                isFetching: false,
            }
        case types.MEALBOX_CONFIRM_ORDER_FAILURE:
        case types.MEALBOX_CANCEL_ITEM_SUCCESS:
        case types.MEALBOX_CANCEL_ITEM_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case types.MEALBOX_CLEAR_CART:
            return {
                ...state,
                cartItems: [],
                totalAmounts: 0,
                productTotal: 0,
                needPaidDrops: [],
                isFetching: false,
            }
        default:
            return state
    }
}