import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Color, hp, Typography } from '@styles'

export default function OptionVariant({ info, productName, isMultipleVariant }) {
    return (
        <Text style={styles.text}>{isMultipleVariant ? info.title : productName}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginTop: hp(4),
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
        textAlignVertical: 'center'
    }
})