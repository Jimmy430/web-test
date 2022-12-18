import { lineitems as mockLineitems } from './mockData'
import moment from 'moment'
import { DishTypes } from '../../common'

const extractLineItemsFromOrder = (orders, lineitems = []) => {
    orders.forEach(order => {
        order.lineitems.forEach(lineitem => {
            if (lineitem.isRefunded) {
                lineitems = lineitems.filter(li => li.id != lineitem.id)
            } else {
                const existLineitem = lineitems.find(li => li.id === lineitem.id)
                if (!!existLineitem) {
                    if (existLineitem.quantity !== lineitem.quantity)
                        existLineitem.quantity = lineitem.quantity
                    return
                }

                const lineItemHistory = {
                    id: lineitem.id,
                    order_id: order.id,
                    quantity: lineitem.quantity,
                    variant_id: lineitem.variant.id,
                    variant_title: lineitem.variant.title,
                    price: lineitem.variant.price,
                    setVariantId: lineitem.setVariantId,
                    product_id: null,
                    dishType: null,
                    estimatedMin: 1,
                    estimatedMax: 1,
                    title: null,
                    vendor: null,
                    description: null,
                    servingDate: null,
                    servingTime: null,
                    cutoffTime: null,
                    image: null,
                    images: null,
                    rating: null,
                    comment: null,
                    shippingAddress: order.shippingAddress,
                    credit: lineitem.credit
                }

                let product = lineitem.product
                if (product) {
                    lineItemHistory.product_id = product.id
                    lineItemHistory.dishType = product.dishType
                    lineItemHistory.estimatedMin = product.estimatedMin
                    lineItemHistory.estimatedMax = product.estimatedMax
                    lineItemHistory.title = product.title
                    lineItemHistory.description = product.description
                    lineItemHistory.image = product.image
                    lineItemHistory.images = product.images
                    lineItemHistory.servingDate = product.servingDate
                    lineItemHistory.servingTime = product.servingTime
                    lineItemHistory.cutoffTimeV2 = product.cutoffTimeV2
                    lineItemHistory.vendor = product.vendor
                }
                lineitems.push(lineItemHistory)
            }
        })
    })
    /**To test function*/
    // lineitems.push(...mockLineitems)
    return lineitems
}

const grabReviewForLineitem = (lineitems, reviews, customTimes) => {
    lineitems.forEach(lineitem => {
        let item = reviews.find(review => lineitem.product_id === review.product.id)
        if (item) {
            lineitem.rating = item.rating
            lineitem.comment = item.comment
        }
    })
    const unreviewedLineitems = lineitems.filter(lineitem => {
        const servingEndTime = moment(lineitem.servingDate).hour(lineitem.servingTime.end / 60 + 2).minute(lineitem.servingTime.end % 60)
        return (servingEndTime.valueOf() < moment().valueOf() && !lineitem.rating)
    })
    const unreviewedList = []
    const unreviewedObj = {}
    const unreviewedFreeList = []
    const unreviewedFreeObj = {}

    unreviewedLineitems.forEach(lineitem => {
        if (lineitem.dishType === DishTypes.MealBox && lineitem.price.amount === 0) {
            if (!!unreviewedFreeObj[lineitem.servingDate]) {
                if (!unreviewedFreeObj[lineitem.servingDate].some(item => item.product_id == lineitem.product_id))
                    unreviewedFreeObj[lineitem.servingDate].push(lineitem)
            } else {
                unreviewedFreeObj[lineitem.servingDate] = [lineitem]
            }
        } else {
            if (!!unreviewedObj[lineitem.servingDate]) {
                if (!unreviewedObj[lineitem.servingDate].some(item => item.product_id == lineitem.product_id))
                    unreviewedObj[lineitem.servingDate].push(lineitem)
            } else {
                unreviewedObj[lineitem.servingDate] = [lineitem]
            }
        }
    })

    /**normal unreviewed */
    Object.keys(unreviewedObj).forEach(key => {
        unreviewedList.push({
            title: moment(key).valueOf(),
            data: unreviewedObj[key]
        })
    })
    unreviewedList.sort((a, b) => {
        return a.title > b.title ? 1 : -1
    })

    /**free samples unreviewed */
    Object.keys(unreviewedFreeObj).forEach(key => {
        unreviewedFreeList.push({
            title: moment(key).valueOf(),
            data: unreviewedFreeObj[key]
        })
    })
    unreviewedFreeList.sort((a, b) => {
        return a.title > b.title ? 1 : -1
    })

    /**return values for mealbox */
    const mealBoxItems = lineitems.filter(lineitem =>
        lineitem.dishType === DishTypes.MealBox
    )

    const pendingMealBox = mealBoxItems.filter(item => moment(item.servingDate).hour(item.servingTime.end / 60).minute(item.servingTime.end % 60).valueOf() > moment().valueOf())

    const completeds = mealBoxItems.filter(item => moment(item.servingDate).hour(item.servingTime.end / 60).minute(item.servingTime.end % 60).valueOf() < moment().valueOf())

    /**return values for mini-buffet */
    const miniBuffetSets = lineitems.filter(lineitem =>
        lineitem.dishType === DishTypes.ComboSet
    ).map(comboSet => {
        const servingTime = comboSet.servingTime
        const servingDateStr = moment(comboSet.servingDate).format('YYYY-MM-DD')

        const customTime = customTimes.find(time =>
            time.menuGroupId === servingTime.menugroupId
            && time.servingDate === servingDateStr
            && time.shippingAddressId === comboSet.shippingAddress.id
        )

        servingTime.customTime = customTime?.customTime

        return {
            orderId: comboSet.order_id,
            id: comboSet.id,
            variantId: comboSet.variant_id,
            title: comboSet.title.split(' - ')[1],
            variantTitle: comboSet.variant_title,
            quantity: comboSet.quantity,
            estimatedMin: comboSet.estimatedMin,
            estimatedMax: comboSet.estimatedMax,
            price: comboSet.price.amount,
            servingDate: comboSet.servingDate,
            servingTime,
            credit: comboSet.credit,
            options: [],
            cutoffTime: comboSet.cutoffTimeV2,
            shippingAddress: comboSet.shippingAddress
        }
    })

    /**assign catering dishes to combo set */
    lineitems.filter(lineitem =>
        lineitem.dishType === DishTypes.Catering
    ).forEach(catering => {
        const assignedSet = miniBuffetSets.find(set => set.variantId === catering.setVariantId && set.orderId === catering.order_id)
        const existOption = assignedSet.options.find(option => option.id === catering.product_id)
        const variantTitle = catering.variant_title === "Default Title" ? "Original" : catering.variant_title
        if (existOption) {
            /** has same option variant*/
            const variantToPush = {
                id: catering.variant_id,
                title: variantTitle,
                quantity: catering.quantity
            }
            existOption.variants.push(variantToPush)
        } else {
            /** doesn't have same option variant */
            const optionToPush = {
                id: catering.product_id,
                title: catering.title.split(' - ')[1],
                vendor: catering.vendor.name,
                image: catering.image,
                variants: [
                    {
                        id: catering.variant_id,
                        title: variantTitle,
                        quantity: catering.quantity
                    }
                ]
            }
            assignedSet.options.push(optionToPush)
        }
    })

    const pendingMiniBuffet = miniBuffetSets.filter(item => moment(item.servingDate).hour(item.servingTime.end / 60).minute(item.servingTime.end % 60).valueOf() > moment().valueOf())

    return { lineitems, pendingMealBox, pendingMiniBuffet, completeds, reviews, unreviewedList, unreviewedFreeList }
}

const extractTodayShippingAddresses = (lineitems = []) => {
    const addresses = []
    const today = moment()

    lineitems.forEach(lineitem => {
        const servingDate = moment(lineitem.servingDate)

        if (servingDate.year() != today.year()
            || servingDate.month() != today.month()
            || servingDate.date() != today.date()
        ) return

        if (addresses.some(address => {
            return address.mealtimeId == lineitem.servingTime.mealtime.id
                && address.id == lineitem.shippingAddress.id
        })) return

        addresses.push({
            mealtimeId: lineitem.servingTime.mealtime.id,
            ...lineitem.shippingAddress
        })
    })

    return addresses
}


export {
    extractLineItemsFromOrder,
    grabReviewForLineitem,
    extractTodayShippingAddresses,
}