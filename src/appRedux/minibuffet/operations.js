import * as actions from './actions'
import * as utils from './utils'
import { CartAPI, ErrorTrackingAPI, ProductAPI } from '@services'

export const fetchMenuByCondition = (groupIds, servingDate, mealtimeId, maxPax, isDev) => async (dispatch) => {
    try {
        const miniBuffetProducts = await ProductAPI.getMiniBuffetByCondition({ groupIds, servingDate, mealtimeId, maxPax, isDev })

        const productList = utils.restructureProducts(miniBuffetProducts)
        if (productList.length > 0)
            dispatch(actions.chooseProductList(productList))
        return productList
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "fetchMenuByCondition")
        return []
    }
}

export const chooseProductList = (productList) => (dispatch) => {
    try {
        dispatch(actions.chooseProductList(productList))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "chooseProductList")
    }
}

export const updateSearchInfo = ({ date, session, guests }) => (dispatch) => {
    try {
        dispatch(actions.updateSearchInfo({ date, session, guests }))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "updateSearchInfo")
    }
}

export const updateCartItem = (item) => (dispatch) => {
    try {
        dispatch(actions.updateItem(item))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "updateCartItem")
    }
}

export const removeCartItem = (variantId) => (dispatch) => {
    try {
        dispatch(actions.removeItem(variantId))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "removeCartItem")
    }
}

export const clearCart = () => (dispatch) => {
    try {
        dispatch(actions.clearCart())
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "clearCart")
    }
}

export const createDraftOrder = (userInfo, address, cartItems, promoCode, credit, customTime) => async (dispatch) => {
    try {
        const checkout = await CartAPI.confirmCheckout(userInfo, address, cartItems, promoCode, credit, 'MINIBUFFET', customTime)

        if (checkout.error) {
            return { error: checkout.error }
        }
        return checkout
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "createDraftOrder")
    }
}

export const completeDraftOrderByStripe = (draftOrderId, paymentIntentId) => async (dispatch) => {
    try {
        const order = await CartAPI.completeDraftOrderByStripe(draftOrderId, paymentIntentId)
        if (order.error) {
            dispatch(actions.confirmOrderFailure())
            return { error: order.error }
        }
        dispatch(actions.confirmOrderSuccess())
        return order
    } catch (error) {
        dispatch(actions.confirmOrderFailure())
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "completeDraftOrderByStripe")
    }
}

export const refundSetByStripe = (refundItem, isLastDrop) => async (dispatch) => {
    try {
        const refundStripeInfo = await CartAPI.refundMiniBuffetByStripe(refundItem, isLastDrop)
        if (refundStripeInfo.error) {
            let error
            if (refundStripeInfo.errorr instanceof Object)
                error = JSON.stringify(order.error)
            else
                error = refundStripeInfo.error
            dispatch(actions.cancelItemFailure(error))
            return { error }
        }
        dispatch(actions.cancelItemSuccess())
        return refundStripeInfo
    } catch (error) {
        dispatch(actions.cancelItemFailure(error))
        ErrorTrackingAPI.sendError(error, "Operation(Minibuffet)", "refundSetByStripe")
    }
}