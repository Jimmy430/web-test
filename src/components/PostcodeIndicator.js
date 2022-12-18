import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Icons } from '@common'
import { Color, FontType, wp, hp } from '@styles'

const PostcodeIndicator = ({ postcode, style, maxLength, isDarkMode = false }) => {
    return (
        <View style={[styles.container, style]}>
            <Image style={[styles.icon, { tintColor: isDarkMode ? Color.Text.White : Color.Text.Black }]}
                source={Icons.Pin} />
            <Text style={[styles.value, maxLength && { maxWidth: maxLength }, { color: isDarkMode ? Color.Text.White : Color.Text.Black }]} numberOfLines={1}>{postcode}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },
    icon: {
        width: hp(13),
        aspectRatio: 1
    },
    value: {
        maxWidth: wp(194),
        fontFamily: FontType.Medium,
        fontSize: wp(15),
        lineHeight: wp(18),
        textAlignVertical: 'center',
        marginHorizontal: wp(4)
    }
})

export default PostcodeIndicator