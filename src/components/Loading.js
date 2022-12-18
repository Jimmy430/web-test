import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { Color } from '@styles'

const Loading = ({ size = 'large', transparent = false, msg }) => {
    return (
        <View style={[styles.regular, transparent && styles.transparent]}>
            <ActivityIndicator size={size} />
            {msg &&
                <Text>{msg}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    regular: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.textWhite
    },
    transparent: {
        backgroundColor: 'transparent'
    }
})
export default Loading