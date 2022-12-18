import React, { Fragment } from "react"
import { StyleSheet, Text, View } from "react-native"

import { Color, hp, Typography, wp } from "@styles"
import VariantsGroupButton from "./VariantsGroupButton"

const VariantsOption = ({
    option,
    currentSet,
    onVariantSelect
}) => {
    const { packs, variants } = option

    const _renderVariant = () => {
        return (
            <View style={styles.variantContainer}>
                {currentSet.map((set, idx) => {
                    return (
                        <View key={idx} style={{ marginTop: idx === 0 ? 0 : hp(60) }}>
                            <View style={styles.variantGroupContainer}>
                                {[...Array(packs)].map((_, i1) => {
                                    return (
                                        <Fragment key={i1.toString()}>
                                            {packs > 1 &&
                                                <Text style={[styles.protionText, { marginTop: hp(8) }]}>Portion {i1 + 1}</Text>
                                            }
                                            <VariantsGroupButton
                                                key={`${idx}-${i1}`}
                                                variants={variants}
                                                currentId={set[i1]}
                                                onSelectedChange={(variantId) => {
                                                    const newVariants = [
                                                        ...set.slice(0, i1),
                                                        variantId,
                                                        ...set.slice(i1 + 1)
                                                    ]
                                                    const newSets = [
                                                        ...currentSet.slice(0, idx),
                                                        newVariants,
                                                        ...currentSet.slice(idx + 1)
                                                    ]
                                                    onVariantSelect(option.id, newSets)
                                                }}
                                            />
                                        </Fragment>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.vendorText}>{option?.vendor.name}</Text>
            {_renderVariant()}
        </View>
    )
}

export default VariantsOption

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: wp(24),
        paddingVertical: hp(16),
        backgroundColor: Color.Text.White,
    },
    variantContainer: {
        flex: 1,
    },
    variantGroupContainer: {
        flex: 1,
    },
    vendorText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Grey
    },
    protionText: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    }
})