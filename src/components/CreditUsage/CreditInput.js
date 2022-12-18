import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

import { Icons } from "@common"
import { Color, hp, Typography, wp } from "@styles"
import { AmplitudeAPI, Events } from "@services"

const DURATION = 400
const TEXT_HEIGHT = wp(14)
const MARGIN = hp(8)

/**
 * CreditInput
 * @author Jimmy
 * 
 */
const CreditInput = ({
    usedCredit,
    limit,
    onInputChange
}) => {
    const [used, setUsed] = useState(0)
    const [temp, setTemp] = useState(0)

    const footer = useSharedValue(0)

    useEffect(() => {
        footer.value = usedCredit !== 0 ? withTiming(1, { duration: DURATION }) : withTiming(0, { duration: DURATION })
    }, [usedCredit])

    const footerStyle = useAnimatedStyle(() => {
        const height = interpolate(
            footer.value,
            [0, .5, 1],
            [0, (TEXT_HEIGHT + MARGIN) * 0.5, TEXT_HEIGHT + MARGIN]
        )

        const marginTop = interpolate(
            footer.value,
            [0, 1],
            [0, MARGIN]
        )

        return {
            height,
            marginTop,
            opacity: footer.value
        }
    }, [])

    const borderColor = useAnimatedStyle(() => {
        const borderColor = interpolateColor(
            footer.value,
            [0, 1],
            [Color.Background.Card, Color.Brand.Secondary]
        )

        return {
            borderColor
        }
    }, [])

    const checkLimit = () => {
        const parsedValue = Number.parseFloat(temp)
        let value
        if (Number.isNaN(parsedValue)) {
            value = 0
        } else if (parsedValue > limit) {
            value = Number.parseFloat(limit.toFixed(2))
        } else {
            value = parsedValue
        }
        AmplitudeAPI.track(Events.OP.MEALBOX.APPLY_CREDIT, { value })
        // setUsed(value)
        onInputChange(value)
    }

    const _renderValue = () => {
        if (usedCredit === 0)
            return (
                <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder="Enter amount"
                    placeholderTextColor={Color.Background.Line}
                    onChangeText={(text) => setTemp(text)}
                    onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                        if (keyValue === 'Enter' && temp !== '') checkLimit()
                    }}
                />
            )

        return (
            <Text style={styles.inputText}>${usedCredit.toFixed(2)}</Text>
        )
    }

    const _renderAction = () => {
        if (usedCredit === 0)
            return (
                <TouchableOpacity disabled={!temp} onPress={checkLimit}>
                    <Text style={[styles.applyText, !temp && { color: Color.Background.Line }]}>Apply</Text>
                </TouchableOpacity>
            )

        return (
            <TouchableOpacity
                onPress={() => { onInputChange(0); setTemp(null) }}>
                <Image
                    style={[styles.icon, { tintColor: Color.Brand.Secondary }]}
                    source={Icons.Cross}
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Animated.View style={[styles.container, borderColor]}>
                <Image style={styles.icon} source={Icons.Coin} />
                {_renderValue()}
                {_renderAction()}
            </Animated.View>
            <Animated.View style={footerStyle}>
                <Text style={styles.appliedText}>Credit applied</Text>
            </Animated.View>
        </>
    )
}

export default CreditInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(8),
        backgroundColor: Color.Background.Base,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Color.Background.Card
    },
    icon: {
        width: wp(20),
        height: wp(20)
    },
    input: {
        flex: 1,
        height: wp(20),
        marginHorizontal: wp(8),
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        textAlignVertical: 'center'
    },
    inputText: {
        flex: 1,
        height: wp(20),
        marginHorizontal: wp(8),
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        textAlignVertical: 'center',
        paddingTop: hp(4)
    },
    applyText: {
        ...Typography.BodyMedium_14,
        color: Color.Brand.Secondary
    },
    appliedText: {
        ...Typography.BodyRegular_12,
        color: Color.Brand.Primary
    }
})