import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Color, wp, hp } from '@styles'

const HomePlaceHolder = ({ image, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={!image}>
            <View style={styles.container}>
                {image?
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={styles.image}
                    />
                    : <View style={[styles.image, { backgroundColor: 'grey' }]} />
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(344),
        height: hp(192),
        borderRadius: hp(8),
        backgroundColor: Color.Text.White,
        alignSelf: "center",
        overflow: 'hidden',
        marginTop: hp(8)
    },
    image: {
        width: '100%',
        height: '100%'
    },
})
export default HomePlaceHolder