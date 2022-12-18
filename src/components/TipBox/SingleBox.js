import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { Color, hp, Typography, wp } from "@styles"

const SingleBox = ({ style, icon, content }) => (
    <View style={[styles.container, style]}>
        <Image
            style={styles.icon}
            source={icon}
            resizeMode="contain" />
        <Text style={styles.content}>{content}</Text>
    </View>
)

export default SingleBox

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        backgroundColor: '#EDEEF9',
        borderRadius: wp(8),
    },
    icon: {
        width: hp(24),
        aspectRatio: 1,
        tintColor: Color.Text.Black,
    },
    content: {
        flex: 1,
        ...Typography.Caption,
        color: Color.Text.Black,
        marginLeft: wp(16)
    }
})