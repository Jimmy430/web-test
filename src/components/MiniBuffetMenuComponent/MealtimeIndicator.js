import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { Icons, MealTimeButtons } from "@common"
import { Color, hp, Typography, wp } from "@styles"

/**
 * 
 * @param {Int} mealtimeID 
 * @param {String} timeStr string to display delivery time range
 *
 */
const MealtimeIndicator = ({
    mealtimeID,
    timeStr
}) => {
    let mealtimeUI

    switch (mealtimeID) {
        case 3:
            mealtimeUI = MealTimeButtons.TeaBreak
            break
        case 4:
            mealtimeUI = MealTimeButtons.Dinner
            break
        default:
            mealtimeUI = MealTimeButtons.Lunch
            break
    }

    return (
        <View style={[styles.container, { backgroundColor: mealtimeUI.backgroundColor }]}>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.iconMealType}
                        source={mealtimeUI.icon}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.text}>{mealtimeUI.label}</Text>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.iconTime}
                        source={Icons.TimeLined}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.text}>{timeStr}</Text>
            </View>
        </View>
    )
}

export default MealtimeIndicator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(24),
        paddingVertical: hp(12)
    },
    itemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        width: wp(20),
        height: wp(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconMealType: {
        width: '100%',
        height: wp(16),
        tintColor: Color.Text.Black,
    },
    iconTime: {
        width: '100%',
        height: wp(24),
        tintColor: Color.Text.Black
    },
    text: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
        marginStart: wp(8)
    }
})