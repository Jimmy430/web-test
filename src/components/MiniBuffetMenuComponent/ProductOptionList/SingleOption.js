import React from "react"
import { StyleSheet, Text, View } from "react-native"

import { Color, hp, Typography, wp } from "@styles"

import VariantsGroupButton from "./VariantsGroupButton"

const SingleOption = ({
    option,
}) => {
    const { title, variants } = option
    const displayTitle = title

    const _renderVariant = () => (
        <View style={styles.variantContainer}>
            <VariantsGroupButton
                singleVariantLabel={displayTitle}
                currentId={variants[0].id}
            />
        </View>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.vendorText}>{option?.vendor.name}</Text>
            {_renderVariant()}
        </View>
    )
}

export default SingleOption

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(24),
        paddingVertical: hp(16),
        backgroundColor: Color.Text.White,
    },
    variantContainer: {
        flex: 1,
    },
    vendorText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Grey
    },
})