import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'

import { Color, hp, wp } from '@styles'

const Paginator = ({ counts, scrollX, currentIndex, scrollToIndex, showPrevAndNext = false, imageWidth = wp(328), customStyle }) => {

    const prevORnext = (i) => {
        if (i < 0 || i > (counts - 1)) return null
        return scrollToIndex(i)
    }

    const animatedStyle = (i) => {
        const style = useAnimatedStyle(() => {
            const inputRange = [(i - 1) * imageWidth, i * imageWidth, (i + 1) * imageWidth]
            const opacity = interpolate(scrollX.value, inputRange, [0.8, 1, 0.8], 'clamp')
            return {
                opacity
            }
        }, [])

        return style
    }

    return (
        <View style={[styles.container, customStyle?.container, { justifyContent: showPrevAndNext ? 'space-between' : 'center' }]}>
            {showPrevAndNext &&
                <TouchableOpacity onPress={() => prevORnext(currentIndex - 1)}>
                    <Text style={styles.text}>Prev</Text>
                </TouchableOpacity>
            }
            <View style={styles.areaDot}>
                {new Array(counts).fill(0).map((_, i) => {
                    return (
                        <TouchableOpacity onPress={() => scrollToIndex(i)} key={i.toString()}>
                            <Animated.View style={[styles.dot, animatedStyle(i)]} />
                        </TouchableOpacity>
                    )
                })}
            </View>
            {showPrevAndNext &&
                <TouchableOpacity onPress={() => prevORnext(currentIndex + 1)}>
                    <Text style={styles.text}>Next</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    areaDot: {
        flexDirection: 'row'
    },
    dot: {
        height: wp(8),
        width: wp(8),
        borderRadius: 5,
        backgroundColor: Color.Text.White,
        marginHorizontal: 4
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Color.Text.White
    }
})
