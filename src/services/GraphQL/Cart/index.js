import { client } from "../Client";
import { COMPLETE_CHECKOUT, CANCEL_LINEITEM, REFUND_LINEITEM_BY_STRIPE, RETRIEVE_ORDER, COMPLETE_DRAFTORDER_BY_STRIPE, REFUND_MINIBUFFET_BY_STRIPE } from "./schema";
import { formatData } from "../utils";
import ErrorTrackingAPI from '../../ErrorTrackingAPI'

export default class CartAPI {

    static confirmCheckout = (userInfo, address, cartItems, promoCode, credit, type, customTime) => {
        try {
            const addressInput = {
                postcode: address.postcode,
                address: address.address,
                building: address.building,
                block: address.block,
                floor: address.floor,
                unit: address.unit,
                navigationInstruction: address.navigationInstruction,
                opNotes: address.opNotes
            }
            const lineItems = cartItems.map(item => {
                const variantId = `gid://shopify/ProductVariant/${item.variantId}`
                return {
                    variantId,
                    quantity: item.amount,
                    price: item.price,
                    menugroupId: item.menugroupId,
                    mealtimeId: item.mealtimeId,
                    servingDate: item.servingDate,
                    needDeliveryFee: item.needDeliveryFee,
                    setVariantId: item.setVariantId
                }
            })
            // const appliedDiscount = {
            //     description: "test discount",
            //     value: 100.0,
            //     valueType: "PERCENTAGE"
            // }
            return client.mutate({
                mutation: COMPLETE_CHECKOUT,
                variables: {
                    address: addressInput,
                    checkorderInput: {
                        customerId: userInfo.id,
                        email: userInfo.email,
                        lineItems,
                        promoCode,
                        credit
                        // appliedDiscount
                    },
                    type,
                    customTime
                }
            }).then(res => {
                const model = formatData(res, "checkAndCreateDraftOrder")
                if (model.error) {
                    return { error: model.error }
                }
                if (!!model.paymentIntentId && !!model.draftOrderId) {
                    return {
                        draftOrderId: model.draftOrderId,
                        stripeCustomerId: model.stripeCustomerId,
                        ephemeralKey: model.ephemeralKey,
                        paymentIntentId: model.paymentIntentId,
                        paymentIntentClientSecret: model.paymentIntentClientSecret
                    }
                }
                return {
                    data: model
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "confirmCheckout", "GraphQLError")
                return { error: 'Oops, system got problem.' }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "confirmCheckout", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }

    static completeDraftOrderByStripe = (draftOrderId, paymentIntentId) => {
        try {
            return client.mutate({
                mutation: COMPLETE_DRAFTORDER_BY_STRIPE,
                variables: {
                    draftOrderId,
                    paymentIntentId
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const order = formatData(res, "completeDraftOrderByStripe")
                return {
                    data: order
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "completeDraftOrderByStripe", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "completeDraftOrderByStripe", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }

    static retrieveOrder = (draftOrderId) => {
        try {
            return client.mutate({
                mutation: RETRIEVE_ORDER,
                variables: {
                    draftOrderId
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const modal = formatData(res, "retrieveOrderByDraftOrderId")
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "retrieveOrder", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "retrieveOrder", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }

    static cancelItem = (refundItem) => {
        try {
            const orderId = `gid://shopify/Order/${refundItem.order_id}`
            const lineItemId = `gid://shopify/LineItem/${refundItem.id}`

            return client.mutate({
                mutation: CANCEL_LINEITEM,
                variables: {
                    refundInput: {
                        orderId,
                        refundLineItem: {
                            lineItemId,
                            quantity: refundItem.quantity,
                            refundDeliveryFee: refundItem.refundDeliveryFee
                        }
                    }
                }
            }).then(res => {
                const modal = formatData(res, "refundLineItem")
                if (!!modal.error) {
                    return {
                        error: modal.error
                    }
                }
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "cancelItem", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "cancelItem", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }

    static refundLineItemByStripe = (refundItem) => {
        try {
            const orderId = `gid://shopify/Order/${refundItem.order_id}`
            const lineItemId = `gid://shopify/LineItem/${refundItem.id}`

            return client.mutate({
                mutation: REFUND_LINEITEM_BY_STRIPE,
                variables: {
                    refundInput: {
                        orderId,
                        refundLineItem: {
                            lineItemId,
                            quantity: refundItem.quantity,
                            refundDeliveryFee: refundItem.refundDeliveryFee
                        }
                    }
                }
            }).then(res => {
                const modal = formatData(res, "refundLineItemByStripe")
                if (!!modal.error) {
                    return {
                        error: modal.error
                    }
                }
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "refundLineItemByStripe", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "refundLineItemByStripe", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }

    static refundMiniBuffetByStripe = (refundItem, isLastDrop) => {
        try {
            const setLineitemId = `gid://shopify/LineItem/${refundItem.id}`

            return client.mutate({
                mutation: REFUND_MINIBUFFET_BY_STRIPE,
                variables: {
                    setLineitemId,
                    isLastDrop
                }
            }).then(res => {
                const modal = formatData(res, "refundMiniBuffetByStripe")
                if (!!modal.error) {
                    return {
                        error: modal.error
                    }
                }
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CartAPI", "refundMiniBuffetByStripe", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CartAPI", "refundMiniBuffetByStripe", "SystemError")
            return { error: 'Oops, system got problem.' }
        }
    }
}