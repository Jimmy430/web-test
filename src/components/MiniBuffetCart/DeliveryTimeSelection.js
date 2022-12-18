import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { hp, wp, Color, Typography, FontType } from '@styles'

export default function DeliveryTimeSelection({ currentTime, timesData, onChooseTime }) {

    const _renderText = (customTime) => {
        if (!!customTime.value)
            return (
                <Text>
                    <Text style={styles.btnText}>{customTime.label} </Text>
                    <Text style={styles.moneyText}>(+$30)</Text>
                </Text>
            )

        return (
            <View style={styles.row}>
                <Text style={styles.btnText}>Any time between {customTime.label}</Text>
                <View style={styles.freeContainer}>
                    <Text style={styles.freeText}>Free</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Delivery time selection</Text>
            <Text style={styles.descriptionText}>Kindly allow 30 minutes of grace period before/after the selected time.</Text>
            <View style={styles.timesContainer}>
                {timesData.map(customTime => {
                    return (
                        <TouchableOpacity key={'CustomDeliveryTime_' + customTime.value} onPress={() => onChooseTime(customTime)}>
                            <View style={[styles.btnContainer, (customTime.value === currentTime.value) && styles.selectedContainer]}>
                                {_renderText(customTime)}
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(16),
        paddingStart: wp(24),
        paddingEnd: wp(8),
        borderRadius: 16,
        marginTop: hp(16),
        backgroundColor: '#FFF'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Grey,
        marginRight: wp(8)
    },
    descriptionText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        marginTop: hp(16),
        marginRight: wp(16)
    },
    timesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    btnContainer: {
        paddingVertical: hp(8),
        paddingHorizontal: wp(16),
        borderWidth: 1,
        borderRadius: 8,
        marginRight: wp(16),
        marginTop: hp(16),
        backgroundColor: Color.Background.Base,
        borderColor: Color.Background.Line
    },
    selectedContainer: {
        borderColor: Color.Brand.Primary,
        backgroundColor: Color.Background.Brand.Primary
    },
    btnText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
    },
    freeContainer: {
        paddingHorizontal: wp(8),
        marginStart: wp(8),
        backgroundColor: '#2B4D3C',
        borderRadius: 2
    },
    freeText: {
        fontFamily: FontType.Italic,
        fontSize: wp(12),
        lineHeight: hp(16.8),
        color: Color.Text.White
    },
    moneyText: {
        fontFamily: FontType.Italic,
        fontSize: wp(14),
        color: Color.Text.Black
    }
})