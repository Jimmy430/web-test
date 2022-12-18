import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { Color, FontType, wp, hp, Typography } from '@styles'

const HomeItemNoBar = ({ icon, iconStyle, iconBg, title, subTitle, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
                <Image
                    style={iconStyle}
                    source={icon}
                />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(168),
        height: hp(68),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        borderRadius: hp(8),
        borderWidth: 1,
        borderColor: Color.Background.Card,
        backgroundColor: "#FFFFFF",
    },
    iconContainer: {
        width: hp(32),
        height: hp(32),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp(8),
        overflow: 'hidden'
    },
    title: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        color: Color.textBlack
    },
    subTitle: {
        ...Typography.BodyRegular_12,
        color: Color.Text.Grey
    }
})

export default HomeItemNoBar