import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Color, hp, Typography, wp } from "@styles"

const AddToCartButton = ({ unselected = 0, onClick }) => {
    const isReady = unselected === 0

    return (
        <View style={[styles.container, { paddingTop: isReady ? hp(24) : hp(8) }]}>
            {isReady
                ? null
                : <Text style={styles.hintText}>
                    You have yet to make
                    <Text style={styles.amountText}> {unselected} </Text>
                    selection.
                </Text>
            }
            <TouchableOpacity
                style={[styles.btnContainer, isReady && styles.btnClickable]}
                disabled={!isReady}
                onPress={onClick}>
                <Text style={styles.btnText}>Review your order</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddToCartButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: wp(24),
        paddingBottom: hp(24),
        marginTop: hp(16),
        backgroundColor: Color.Text.White
    },
    hintText: {
        ...Typography.BodyLight_12,
        color: Color.Text.Black,
        marginBottom: hp(16)
    },
    amountText: {
        ...Typography.BodyMedium_14,
        color: Color.Brand.Primary
    },
    btnContainer: {
        width: '100%',
        paddingVertical: hp(12.5),
        borderRadius: hp(16),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Background.Line
    },
    btnClickable: {
        backgroundColor: Color.btnGreen
    },
    btnText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.White
    }
})