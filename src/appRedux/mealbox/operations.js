import * as actions from './actions'
import { CartAPI, ErrorTrackingAPI, ProductAPI } from '@services'
import { cloneDeep } from 'lodash'
import moment from 'moment'

export const fetchAllMealBox = (groupIds) => async (dispatch) => {
    try {
        /* retrieve all types of menu and specific delivery times */
        const mealBox = await ProductAPI.getMealBoxByGroups({ groupIds })
            .then(result => {
                return result.map(product => {
                    const newProduct = cloneDeep(product)
                    return newProduct
                })
            })

        /* set serving times filter for mealbox */
        const servingTimes = []
        for (let product of mealBox) {
            if (!servingTimes.some(servingTime => servingTime.time == product.servingTime.time))
                servingTimes.push(product.servingTime)
        }

        /* set mealtime for mealbox */
        const mealtimeType = servingTimes.length === 0
            ? -1
            : servingTimes.length > 1
                ? -1
                : servingTimes[0].mealtime.id

        const payload = {
            mealBox,
            servingTimes,
            mealtimeType,
        }

        // sent to mealbox model
        dispatch(actions.fetchingSuccess(payload))

        /* set default filter to first date to mealbox menu */
        if (mealBox.length > 0) {
            mealBox.sort((a, b) => moment(a.servingDate).valueOf() - moment(b.servingDate).valueOf())
            dispatch(actions.filterProducts(mealBox[0].servingDate, 0))
        }
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "fetchAllMealBox")
    }
}

export const filterProducts = (date, index) => (dispatch) => {
    if (!date)
        dispatch(actions.resetProducts())
    else
        dispatch(actions.filterProducts(date, index))
}

export const openFilter = () => (dispatch) => {
    dispatch(actions.openFilter())
}

export const closeFilter = () => (dispatch) => {
    dispatch(actions.closeFilter())
}

export const switchOption = (item) => (dispatch) => {
    dispatch(actions.switchOption(item))
}

export const clearFilter = () => (dispatch) => {
    dispatch(actions.clearAdditionalFilter())
}

export const applyFilter = () => (dispatch) => {
    dispatch(actions.applyAdditionalFilter())
}

export const changeMealtimeType = (mealtimeType) => (dispatch) => {
    dispatch(actions.changeMealtimeType(mealtimeType))
}

// carts
export const updateCartItems = (items) => (dispatch) => {
    try {
        dispatch(actions.updateItems(items))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "updateCartItems")
    }
}

export const removeCartItems = (productID) => (dispatch) => {
    try {
        dispatch(actions.removeItems(productID))
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "removeCartItems")
    }
}

export const createDraftOrder = (userInfo, address, cartItems, promoCode, credit) => async (dispatch) => {
    try {
        const checkout = await CartAPI.confirmCheckout(userInfo, address, cartItems, promoCode, credit)
        if (checkout.error) {
            dispatch(actions.confirmOrderFailure())
            return { error: checkout.error }
        }
        if (checkout.paymentIntentId || checkout.draftOrderId) {
            dispatch(actions.confirmOrderFailure())
            return {
                draftOrderId: checkout.draftOrderId,
                stripeCustomerId: checkout.stripeCustomerId,
                ephemeralKey: checkout.ephemeralKey,
                paymentIntentId: checkout.paymentIntentId,
                paymentIntentClientSecret: checkout.paymentIntentClientSecret
            }
        }
        else
            dispatch(actions.confirmOrderSuccess())
        return checkout
    } catch (error) {
        dispatch(actions.confirmOrderFailure())
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "createDraftOrder")
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
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "completeDraftOrderByStripe")
    }
}

export const retrieveOrder = (draftOrderId) => async (dispatch) => {
    try {
        const order = await CartAPI.retrieveOrder(draftOrderId)
        if (order.error) {
            dispatch(actions.confirmOrderFailure())
            return { error: order.error }
        }
        dispatch(actions.confirmOrderSuccess())
        return order
    } catch (error) {
        dispatch(actions.confirmOrderFailure())
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "retrieveOrder")
    }
}

export const refundLineItemByStripe = (refundItem) => async (dispatch) => {
    try {
        const refundStripeInfo = await CartAPI.refundLineItemByStripe(refundItem)
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
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "refundLineItemByStripe")
    }
}

export const cancelLineItem = (refundItem) => async (dispatch) => {
    try {
        const order = await CartAPI.cancelItem(refundItem)
        if (order.error) {
            let error
            if (order.errorr instanceof Object)
                error = JSON.stringify(order.error)
            else
                error = order.error
            dispatch(actions.cancelItemFailure(error))
            return { error }
        }
        dispatch(actions.cancelItemSuccess())
        return order
    } catch (error) {
        dispatch(actions.cancelItemFailure(error))
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "cancelLineItem")
    }
}

export const clearCart = () => (dispatch) => {
    try {
        dispatch(actions.clearCart())
    } catch (error) {
        ErrorTrackingAPI.sendError(error, "Operation(Mealbox)", "clearCart")
    }
}