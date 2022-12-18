import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

import { Color, hp, Typography, wp } from "@styles"

const MultiBox = ({ style, tips }) => (

    <View style={[styles.container, style]}>
        {tips.map((tip, index) => {
            return (
                <View key={'tips_' + index}>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={tip.icon} />
                        <Text style={styles.content}>{tip.content}</Text>
                    </View>
                    {index != (tips.length - 1) &&
                        <View style={styles.separator} />
                    }
                </View>
            )
        })}
    </View>
)

export default MultiBox

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        backgroundColor: '#EDEEF9',
        borderRadius: wp(8),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        height: wp(24),
        width: wp(24),
        tintColor: Color.Text.Black,
    },
    content: {
        flex: 1,
        ...Typography.Caption,
        color: Color.Text.Black,
        marginLeft: wp(16)
    },
    separator: {
        height: hp(16)
    }
})