import * as types from './types'

export const fetchingSuccess = (payload) => {
    return {
        type: types.MEALBOX_FETCH_SUCCESS,
        payload
    }
}

export const filterProducts = (date, index) => {
    return {
        type: types.MEALBOX_FILTER,
        payload: {
            date,
            index
        }
    }
}

export const resetProducts = () => {
    return {
        type: types.MEALBOX_RESET
    }
}

export const openFilter = () => {
    return {
        type: types.MEALBOX_OPEN_FILTER
    }
}

export const closeFilter = () => {
    return {
        type: types.MEALBOX_CLOSE_FILTER
    }
}

export const switchOption = (item) => {
    return {
        type: types.MEALBOX_SWITCH_ADDITIONAL_FILTER_OPTION,
        payload: {
            item
        }
    }
}

export const clearAdditionalFilter = () => {
    return {
        type: types.MEALBOX_CLEAR_ADDITIONAL_FILTER
    }
}

export const applyAdditionalFilter = () => {
    return {
        type: types.MEALBOX_APPLY_ADDITIONAL_FILTER
    }
}

export const changeMealtimeType = (mealtimeType) => {
    return {
        type: types.MEALBOX_CHANGE_MEALTIME_TYPE,
        payload: {
            mealtimeType
        }
    }
}

// carts
export const updateItems = (items) => ({
    type: types.MEALBOX_UPDATE_ITEMS,
    payload: {
        items
    }
})

export const removeItems = (productId) => ({
    type: types.MEALBOX_REMOVE_ITEM,
    payload: {
        productId
    }
})

export const confirmOrderSuccess = () => ({
    type: types.MEALBOX_CONFIRM_ORDER_SUCCESS
})

export const confirmOrderFailure = () => ({
    type: types.MEALBOX_CONFIRM_ORDER_FAILURE,
})

export const cancelItemSuccess = () => ({
    type: types.MEALBOX_CANCEL_ITEM_SUCCESS
})

export const cancelItemFailure = (error) => ({
    type: types.MEALBOX_CANCEL_ITEM_FAILURE,
    payload: {
        error
    }
})

export const clearCart = () => ({
    type: types.MEALBOX_CLEAR_CART
})