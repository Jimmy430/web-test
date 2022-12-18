import moment from 'moment'
import { FilterType } from "@common"

export const additionFilteredList = (list, options) => {
    if (options.length == 0)
        return listSorting(list)

    let filteredList = list
    let tempList = []
    const producerOptions = options.filter(option => option.filterType == FilterType.Producer)
    const muslimOptions = options.filter(option => option.filterType == FilterType.Muslim_Friendly)
    const dietaryOptions = options.filter(option => option.filterType == FilterType.Dietary)
    const proteinOptions = options.filter(option => option.filterType == FilterType.Protein)

    if (producerOptions.length > 0) {
        for (let option of producerOptions) {
            switch (option.value) {
                case 'Restaurant':
                    tempList = tempList.concat(filteredList.filter(product => product.productType === 'Restaurant' || product.productType === 'Standalone Outlet'))
                    break
                case 'Hawker':
                    tempList = tempList.concat(filteredList.filter(product => product.productType === 'Hawker'))
                    break
            }
        }
        if (tempList.length == 0) {
            filteredList = []
        } else {
            filteredList = [...tempList]
            tempList = []
        }
    }

    if (muslimOptions.length > 0) {
        for (let option of muslimOptions) {
            switch (option.value) {
                case 'Muslim-owned':
                    tempList = tempList.concat(filteredList.filter(product => product.tags.includes('Muslim_owned')))
                    break
                case 'Halal certified':
                    tempList = tempList.concat(filteredList.filter(product => product.tags.includes('Halal Certified')))
                    break
            }
        }
        if (tempList.length == 0) {
            return []
        } else {
            filteredList = [...tempList]
            tempList = []
        }
    }

    for (let option of dietaryOptions) {
        switch (option.value) {
            case 'Vegetarian':
                tempList = filteredList.filter(product => product.tags.includes('Vegetarian'))
                break
            case 'Vegan':
                tempList = filteredList.filter(product => product.tags.includes('Vegan'))
                break
            case 'Non-dairy':
                tempList = filteredList.filter(product => product.tags.includes('Non-dairy'))
                break
        }
        if (tempList.length == 0) {
            filteredList = []
            break
        }
        filteredList = [...tempList]
    }

    for (let option of proteinOptions) {
        switch (option.value) {
            case 'No beef':
                tempList = filteredList.filter(product => product.tags.includes('Does_not_contain_beef'))
                break
            case 'No seafood':
                tempList = filteredList.filter(product => product.tags.includes('Does_not_contain_seafood'))
                break
            case 'No pork no lard':
                tempList = filteredList.filter(product => product.tags.includes('Does_not_contain_pork_&_lard'))
                break
        }
        if (tempList.length == 0) {
            filteredList = []
            break
        }
        filteredList = [...tempList]
    }
    return listSorting(filteredList)
}

const listSorting = (list) => list.sort((a, b) => {
    const { isNew: aIsNew, total: aTotal, visible: aVisible } = a.dishReview
    const { isNew: bIsNew, total: bTotal, visible: bVisible } = b.dishReview

    const aIsNewIdx = aIsNew ? -1 : 0
    const bIsNewIdx = bIsNew ? -1 : 0
    const aRatio = (aTotal == 0) ? 0 : aVisible / aTotal
    const bRatio = (bTotal == 0) ? 0 : bVisible / bTotal
    return a.servingTime.mealtime.sequence - b.servingTime.mealtime.sequence || aIsNewIdx - bIsNewIdx || bRatio - aRatio
})

// carts
export const updateCartItems = (state, { items }) => {

    let otherProducts = state.cartItems.filter(item => item.productId !== items[0].productId)
    let newItems = [...otherProducts, ...items]

    const { itemAmount, productTotal, needPaidDrops } = summarizeCartItems(newItems)
    newItems.sort((prev, next) => moment.utc(prev.servingDate).valueOf() - moment.utc(next.servingDate).valueOf() || prev.mealtimeSeq - next.mealtimeSeq)
    return {
        ...state,
        totalAmounts: itemAmount,
        cartItems: newItems,
        productTotal,
        needPaidDrops
    }
}

export const removeCartItems = (state, productId) => {
    const newItems = state.cartItems.filter(item => item.productId !== productId)

    const { itemAmount, productTotal, needPaidDrops } = summarizeCartItems(newItems)

    return {
        ...state,
        totalAmounts: itemAmount,
        cartItems: newItems,
        productTotal,
        needPaidDrops
    }
}

const summarizeCartItems = (items) => {
    let itemAmount = 0, productTotal = 0
    const needPaidDrops = []

    items.forEach(item => {
        itemAmount += item.amount
        productTotal += item.amount * item.price

        if (item.needDeliveryFee && !needPaidDrops.some(drop =>
            drop.date == item.servingDate
            && drop.mealtime == item.mealtimeId
        )) {
            needPaidDrops.push({
                date: item.servingDate,
                mealtime: item.mealtimeId,
                extraFeeTime: item.extraFeeTime
            })
        }
    })

    return {
        itemAmount,
        productTotal,
        needPaidDrops
    }
}