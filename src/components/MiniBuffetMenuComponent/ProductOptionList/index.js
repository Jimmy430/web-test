import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import { AmplitudeAPI, Events } from "@services"
import { Color, hp, Typography, wp } from "@styles"

import OptionList from "./OptionList"
import { generateOptionSet } from "./util"

const ProductOptionList = ({ product, onConfirm }) => {
    const [currentSets, updateCurrentSets] = useState([])

    useEffect(() => {
        if (!!product) {
            AmplitudeAPI.track(
                Events.NAVI.MINIBUFFET.DETAIL,
                {
                    "Product ID": product.id,
                    "Variant ID": product.variantId
                }
            )
            checkInCart()
        }
    }, [product])

    const checkInCart = () => {
        let currentSets, incart
        incart = false
        const result = []
        product.options.forEach(option => {
            result.push({
                productId: option.id,
                sets: Array(1).fill(generateOptionSet(option))
            })
        })
        currentSets = result

        updateCurrentSets(currentSets)
    }

    const updateCart = (options) => {
        const itemToUpdate = {
            productId: product.id,
            variantId: product.variantId,
            price: product.price.amount,
            amount: options[0].sets.length,
            pax: {
                min: product.estimatedMin,
                max: product.estimatedMax
            },
            servingDate: product.servingDate,
            needDeliveryFee: false,
            menugroupId: product.servingTime.menugroupId,
            mealtimeId: product.servingTime.mealtime.id,
            options
        }
        onConfirm(itemToUpdate)
    }

    const _renderOptionList = () => {
        if (!product) return null
        return (
            <OptionList
                product={product}
                currentSets={currentSets}
                onSetsChange={(newSets) => updateCurrentSets(newSets)}
                onConfirm={updateCart}
            />
        )
    }

    return (
        <View style={styles.container}>
            {_renderOptionList()}
        </View>
    )
}

export default ProductOptionList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Background.Base
    },
})