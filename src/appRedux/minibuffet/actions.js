import * as types from './types'

export const fetchingSuccess = (payload) => {
    return {
        type: types.MINIBUFFET_FETCH_SUCCESS,
        payload
    }
}

export const chooseProductList = (productList) => {
    return {
        type: types.MINIBUFFET_CHOOSE_PRODUCT_LIST,
        payload: { productList }
    }
}

export const updateSearchInfo = ({ date, session, guests }) => {
    return {
        type: types.MINIBUFFET_UPDATE_SEARCHINFO,
        payload: { date, session, guests }
    }
}

// carts
export const updateItem = (item) => ({
    type: types.MINIBUFFET_UPDATE_ITEMS,
    payload: {
        item
    }
})

export const removeItem = (variantId) => ({
    type: types.MINIBUFFET_REMOVE_ITEMS,
    payload: {
        variantId
    }
})

export const clearCart = () => ({
    type: types.MINIBUFFET_CLEAR_CART
})

// order
export const confirmOrderSuccess = () => ({
    type: types.MINIBUFFET_CONFIRM_ORDER_SUCCESS
})

export const confirmOrderFailure = () => ({
    type: types.MINIBUFFET_CONFIRM_ORDER_FAILURE,
})

export const cancelItemSuccess = () => ({
    type: types.MINIBUFFET_CANCEL_ITEM_SUCCESS
})

export const cancelItemFailure = (error) => ({
    type: types.MINIBUFFET_CANCEL_ITEM_FAILURE,
    payload: {
        error
    }
})