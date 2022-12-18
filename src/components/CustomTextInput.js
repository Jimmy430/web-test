import React, { useState } from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Color, FontType, wp, hp } from '@styles'

const CustomTextInput = ({ label, style, inputStyle, isPassword = false, placeholder, value, onChangeText, type, maxLength = 999 }) => {
    const [showPassword, setShowPassword] = useState(isPassword)

    const switchShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const TIStyle = inputStyle ? inputStyle : styles.defaultInput

    return (
        <View style={style}>
            {!!label &&
                <Text style={styles.label}>{label}</Text>
            }
            <View style={TIStyle}>
                <TextInput
                    secureTextEntry={showPassword}
                    placeholder={placeholder}
                    autoCorrect={false}
                    keyboardType={type}
                    value={value}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    style={{ fontFamily: FontType.Medium, fontSize: wp(14) }}
                />
                {isPassword &&
                    <TouchableOpacity
                        style={styles.showBtn}
                        onPress={() => switchShowPassword()}>
                        <Text style={styles.showText}>
                            {showPassword ? "Show" : "Hide"}
                        </Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: FontType.Bold,
        fontSize: wp(14),
        color: Color.fontBlack,
        lineHeight: wp(16)
    },
    inputContainer: {
        flexDirection: 'row'
    },
    defaultInput: {
        color: Color.textBlack,
        padding: 5,
        fontSize: wp(18),
    },
    showBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        paddingHorizontal: wp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    showText: {
        fontFamily: FontType.Medium,
        fontSize: wp(12),
        color: Color.fontGrey,
        lineHeight: hp(14)
    }
})

export default CustomTextInput