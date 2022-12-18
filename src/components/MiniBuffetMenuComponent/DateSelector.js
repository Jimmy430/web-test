import React from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Icons } from "@common"
import { Color, Typography, wp } from "@styles"

/**
 * 
 * @param {moment} date use to display date related information
 * @param {guests} number use to display guests related information
 * @param {function} onClick function to trigger when clicked on component 
 * 
 */
const DateSelector = ({
    date,
    guests,
    onClick
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onClick}
        >
            <Text style={styles.dateText}>{date.format('ddd, D MMM')} • {guests} guests</Text>
            <View style={styles.iconContainer}>
                <Image
                    style={styles.icon}
                    source={Icons.ArrowHeadDown_Fill}
                    resizeMode="contain"
                />
            </View>
        </TouchableOpacity>
    )
}

export default DateSelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'baseline'
    },
    dateText: {
        ...Typography.SubTitle_21,
        color: Color.Text.White
    },
    iconContainer: {
        width: wp(24),
        height: wp(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(16)
    },
    icon: {
        width: wp(18),
        height: wp(18),
    }
})