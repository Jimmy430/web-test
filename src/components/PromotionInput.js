import { useEffect, useRef, forwardRef, useState, useImperativeHandle } from "react"
import { Image, StyleSheet, Text, TextInput, } from "react-native"
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { TouchableOpacity } from "react-native-gesture-handler"

import { Icons } from "@common"
import { Color, hp, Typography, wp } from "@styles"

const DURATION = 400
const TEXT_HEIGHT = wp(14)
const MARGIN = hp(8)

/**
 * PromotionInput
 * @author Jimmy
 * 
 */
const PromotionInput = forwardRef(({
    onCheck,
    onApplied
}, ref) => {
    const inputRef = useRef()
    const [applied, setApplied] = useState(false)
    const [promoName, setPromoName] = useState(null)
    const [error, setError] = useState("")
    const [temp, setTemp] = useState("")
    const [statusColor, setStatusColor] = useState(Color.Brand.Secondary)

    const footer = useSharedValue(0)

    useEffect(() => {
        footer.value = applied || !!error
            ? withTiming(1, { duration: DURATION })
            : withTiming(0, { duration: DURATION })
    }, [applied, error])

    useImperativeHandle(ref, () => ({
        reset: () => {
            reset()
        }
    }))

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
            marginTop
        }
    }, [])

    const borderColor = useAnimatedStyle(() => {

        const borderColor = interpolateColor(
            footer.value,
            [0, 1],
            [Color.Background.Card, statusColor]
        )

        return {
            borderColor
        }
    }, [statusColor])

    const reset = () => {
        inputRef.current?.clear()
        setApplied(false)
        onApplied(null)
        setTemp(null)
    }

    const validatePromoCode = async () => {
        const { error, promoCode } = await onCheck(temp)

        if (!error) {
            setApplied(true)
            setPromoName(promoCode.name)
            setError('')
            setStatusColor(Color.Brand.Secondary)
            onApplied(promoCode)
        } else {
            setApplied(false)
            setPromoName(null)
            setError(error)
            setStatusColor(Color.Brand.Alert)
            onApplied(null)
        }
    }

    const _renderInput = () => {
        if (applied) return <Text style={styles.inputText}>{temp}</Text>
        return (
            <TextInput
                ref={inputRef}
                editable={!applied && !error}
                style={styles.input}
                placeholder="Enter promo code"
                placeholderTextColor={Color.Background.Line}
                onChangeText={(text) => setTemp(text)}
                onKeyPress={({ nativeEvent: { key: keyValue } }) => {
                    if (keyValue === 'Enter' && temp !== '') validatePromoCode()
                }}
            />
        )
    }

    const _renderAction = () => {
        if (!!error)
            return null

        if (!applied && !error)
            return (
                <TouchableOpacity disabled={!temp} onPress={validatePromoCode}>
                    <Text style={[styles.applyText, !temp && { color: Color.Background.Line }]}>Apply</Text>
                </TouchableOpacity>
            )

        return (
            <TouchableOpacity
                onPress={reset}>
                <Image
                    style={[styles.icon, { tintColor: Color.Brand.Secondary }]}
                    source={Icons.Cross}
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <TouchableOpacity
                disabled={applied || !error}
                onPress={() => {
                    inputRef.current?.clear()
                    inputRef.current?.focus()
                    setError("")
                    setTemp(null)
                }}
            >
                <Animated.View
                    style={[styles.container, borderColor]}
                    pointerEvents={!!error ? 'none' : undefined}
                >
                    {_renderInput()}
                    {_renderAction()}
                </Animated.View>
            </TouchableOpacity>
            <Animated.View style={footerStyle}>
                <Text style={[styles.appliedText, !!error && styles.errorText]}>{applied ? promoName : error}</Text>
            </Animated.View>
        </>
    )
})
export default PromotionInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(8),
        backgroundColor: Color.Background.Base,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Color.Background.Card,

    },
    icon: {
        width: wp(20),
        height: wp(20)
    },
    input: {
        flex: 1,
        height: wp(20),
        marginRight: wp(8),
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        alignContent: 'center',
        paddingTop: hp(4)
    },
    inputText: {
        flex: 1,
        height: wp(20),
        marginRight: wp(8),
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        paddingTop: hp(4)
    },
    errorText: {
        color: Color.Brand.Alert
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