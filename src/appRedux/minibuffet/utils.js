import { ErrorTrackingAPI } from "@services";
import moment from "moment";

export const restructureProducts = (products = []) => {
    try {
        if (products.length === 0)
            return []

        const productList = []

        products.forEach(set => {
            /** avoid repeated product */
            const existProductIndex = productList.findIndex(product => product.id === set.id)
            const options = [...set.options]
            if (existProductIndex === -1) {
                productList.push({
                    id: set.id,
                    title: set.title,
                    minPrice: set.price.amount,
                    maxPax: set.estimatedMax,
                    servingDate: set.servingDate,
                    servingTime: set.servingTime,
                    inventory: set.inventory,
                    isSoldout: set.inventory <= 0,
                    image: set.images[1] || set.images[0],
                    setList: [set],
                    optionList: options.sort((a, b) => a.sequence - b.sequence).map(option => ({
                        id: option.id,
                        title: option.title,
                        description: option.description,
                        image: option.images[1] || option.images[0],
                        images: option.images,
                        tags: option.tags,
                        vendor: option.vendor
                    }))
                })
            } else {
                const currentMinPrice = productList[existProductIndex].minPrice
                if (set.price.amount < currentMinPrice)
                    productList[existProductIndex].minPrice = set.price.amount
                productList[existProductIndex].setList.push(set)
                options.sort((a, b) => a.sequence - b.sequence).forEach(option => {
                    /** avoid repeated option  */
                    const existOptionIndex = productList[existProductIndex]
                        .optionList.findIndex(o => o.id === option.id)

                    if (existOptionIndex === -1) {
                        productList[existProductIndex].optionList.push({
                            id: option.id,
                            title: option.title,
                            description: option.description,
                            image: option.images[1] || option.images[0],
                            images: option.images,
                            tags: option.tags,
                            vendor: option.vendor
                        })
                    }
                })
            }
        })

        return productList
    } catch (error) {
        ErrorTrackingAPI.sendError(error, 'Utils(Minibuffet)', 'restructureProducts')
    }
}

export const removeCartItem = (state, { variantId }) => {
    const otherProducts = state.cartItems.filter(existItem => existItem.variantId !== variantId)

    return {
        ...state,
        cartItems: otherProducts
    }
}