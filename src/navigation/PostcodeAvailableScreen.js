import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { CommonActions } from '@react-navigation/native'
import { connect } from 'react-redux'

import { userOps } from "@appRedux/operations";
import { Icons } from "@common";
import { Color, FontType, wp, hp } from "@styles";

const mapDispatchToProps = {
    guestLogin: userOps.guestLogin
}

const PostcodeAvailableScreen = ({ guestLogin, navigation, route }) => {
    const { address } = route.params

    const startAsGuest = () => {
        guestLogin(address)
        goToMainPage()
    }

    const goToMainPage = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
        navigation.dispatch(resetAction)
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ width: wp(125), height: hp(150) }}
                source={Icons.LocationAvailable}
                resizeMode="contain"
            />
            <Text style={styles.title}>Congratulations!</Text>
            <Text style={styles.subTitle}>Our doorstep delivery service is available at</Text>
            <Text style={styles.postcode}>{address.postcode}</Text>

            <View style={styles.reminderContainer}>
                <Text style={styles.reminder}>You'll only be asked to create an account at the cart page when you're ready to make your first checkout.</Text>
            </View>
            <TouchableOpacity style={styles.btnContainer}
                onPress={() => startAsGuest()}>
                <Text style={styles.btnText}>Continue as guest</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(24)
    },
    title: {
        fontFamily: FontType.Black,
        fontSize: wp(21),
        color: Color.fontBlack,
        marginTop: hp(34)
    },
    subTitle: {
        fontFamily: FontType.Light,
        fontSize: wp(14),
        color: Color.fontBlack,
        lineHeight: wp(19),
        marginTop: hp(16)
    },
    postcode: {
        fontFamily: FontType.Black,
        fontSize: wp(21),
        color: Color.btnGreen,
        lineHeight: wp(24),
        marginTop: hp(16)
    },
    reminderContainer: {
        alignSelf: 'baseline',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(8),
        backgroundColor: '#EDEEF9',
        marginTop: hp(38),
        paddingHorizontal: wp(16),
        paddingVertical: hp(8)
    },
    reminder: {
        fontFamily: FontType.Medium,
        fontSize: wp(12),
        color: Color.fontBlack,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    btnContainer: {
        width: '100%',
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.btnGreen,
        borderRadius: hp(8),
        marginTop: hp(24),
    },
    btnText: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        color: Color.fontWhite
    }
})

export default connect(null, mapDispatchToProps)(PostcodeAvailableScreen)