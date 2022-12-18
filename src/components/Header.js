import React from "react"
import { View, TouchableOpacity, StyleSheet, Image } from "react-native"
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { Icons } from "@common"
import { Color, wp, hp } from "@styles"

const Header = ({ style, whiteBackArrow = false, headerRightRow }) => {
    const navigation = useNavigation()

    const containerStyle = {
        ...styles.container,
        ...style,
    }

    return (
        <SafeAreaInsetsContext.Consumer>{insets =>
            <View style={[containerStyle, { paddingTop: hp(8) + insets.top }]}>
                <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.goBack() }}>
                    <Image
                        source={Icons.ArrowHead}
                        style={[styles.backIcon, !whiteBackArrow && { tintColor: Color.Text.Black }]}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                {headerRightRow}
            </View>
        }</SafeAreaInsetsContext.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'transparent',
        paddingHorizontal: wp(20)
    },
    iconButton: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(4)
    },
    backIcon: {
        width: wp(9),
        height: wp(16),
        transform: [{ rotate: '180deg' }]
    }
});

export default Header