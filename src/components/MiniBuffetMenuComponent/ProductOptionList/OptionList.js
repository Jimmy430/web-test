import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"

import { AmplitudeAPI, Events } from "@services"

import AddToCartButton from "./AddToCartButton"
import SingleOption from "./SingleOption"
import VariantsOption from "./VariantsOption"

const OptionList = ({
    product,
    currentSets,
    onSetsChange,
    onConfirm,
}) => {
    const { options } = product

    const [unselected, setUnselected] = useState(0)

    const allPacks = options.reduce((prev, curr) => {
        return prev + curr.packs
    }, 0)

    useEffect(() => {
        let currentSelected = 0
        currentSets.forEach(option => {
            option?.sets.forEach(set => {
                set.forEach(pack => {
                    if (!!pack) {
                        currentSelected++
                    }
                })
            })
        })

        setUnselected(allPacks - currentSelected)
    }, [currentSets])

    const onVariantSelect = (optionId, variantIDs) => {
        const newOption = {
            productId: optionId,
            sets: variantIDs
        }
        const updateOptionIndex = currentSets.findIndex(option => option.productId === optionId)
        if (updateOptionIndex !== -1) {
            const newSets = [
                ...currentSets.slice(0, updateOptionIndex),
                newOption,
                ...currentSets.slice(updateOptionIndex + 1)
            ]
            onSetsChange(newSets)
        } else {
            const newSets = [
                ...currentSets,
                newOption
            ]
            onSetsChange(newSets)
        }
    }

    const _keyExtractor = (item) => item.id

    const _renderItem = ({ item }) => {
        const currentSet = currentSets?.find(option => option.productId === item.id)?.sets || []

        if (item.variants.length === 1) {
            return (
                <SingleOption option={item} />
            )
        }

        return (
            <VariantsOption
                option={item}
                currentSet={currentSet}
                onVariantSelect={onVariantSelect}
            />
        )
    }

    const _renderFooter = () => {
        return (
            <AddToCartButton
                unselected={unselected}
                onClick={() => {
                    AmplitudeAPI.track(Events.OP.MINIBUFFET.ADD_TO_CART, { currentSets })
                    onConfirm(currentSets)
                }}
            />
        )
    }

    return (
        <FlatList
            data={options}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            ListFooterComponent={_renderFooter}
        />
    )
}

export default OptionList