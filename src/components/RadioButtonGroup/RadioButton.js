import React, { useMemo } from 'react'
import { PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'

import { wp, hp, Typography, Color } from '@styles'

export default function RadioButton({
    activeColor = Color.Brand.Primary,
    containerStyle,
    disabled = false,
    id,
    label,
    labelStyle,
    description,
    descriptionStyle,
    layout = 'row',
    onPress,
    selected = false,
    size = wp(20),
}) {
    const borderWidth = PixelRatio.roundToNearestPixel(size * 0.05)
    const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.3)
    const sizeFull = PixelRatio.roundToNearestPixel(size)

    const orientation = useMemo(() => {
        return layout === 'column' ? { alignItems: 'center' } : { flexDirection: 'row' }
    }, [layout])

    const margin = useMemo(() => {
        return layout === 'column' ? { marginTop: hp(8) } : { marginLeft: wp(16) }
    }, [layout])


    function handlePress() {
        if (disabled) return null
        if (onPress) onPress(id)
    }

    return (
        <Pressable
            onPress={handlePress}
            style={[
                styles.container,
                orientation,
                { opacity: disabled ? 0.3 : 1 },
                containerStyle,
            ]}>
            <View
                style={[
                    styles.border,
                    {
                        borderColor: Color.Background.Line,
                        borderWidth: selected ? 0 : borderWidth,
                        width: sizeFull,
                        height: sizeFull,
                        borderRadius: 99,
                        backgroundColor: selected ? activeColor : null,
                    },
                ]}>
                {selected && (
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: sizeHalf,
                            height: sizeHalf,
                            borderRadius: sizeHalf,
                        }}
                    />
                )}
            </View>
            {label && <Text style={[styles.label, margin, labelStyle]}>{label}</Text>}
            {description && <Text style={[styles.desc, margin, descriptionStyle]}>{description}</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    border: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        flex: 1,
        ...Typography.BodyRegular_16,
        color: Color.Text.Black
    },
    desc: {
        ...Typography.BodyRegular_16,
        color: Color.Brand.Alert
    }
})
