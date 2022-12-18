import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Keyboard, Modal, Alert, Platform } from "react-native";
import { connect } from 'react-redux'

import { userOps } from "@appRedux/operations";
import { EditAddressFrom } from "@common";
import { Header, CustomTextInput, Loading } from '@components'
import { Color, FontType, wp, hp } from "@styles";

const mapDispatchToProps = {
    checkMenuGroup: userOps.checkMenuGroup
}

const CheckPostcodeScreen = ({ checkMenuGroup, navigation, route }) => {
    const [postcode, setPostcode] = useState("")
    const [checking, isChecking] = useState(false)

    const { from, addressId } = route.params

    const checkPostalCode = async () => {
        isChecking(true)
        const { error, address } = await checkMenuGroup(postcode)
        if (error) {
            if (error.networkError)
                Alert.alert(
                    "Network error",
                    "Internet connection is unstable now, please try again later.",
                    [{ text: "OK", onPress: () => isChecking(false) }]
                )
            else
                Alert.alert(
                    "",
                    error,
                    [{ text: "OK", onPress: () => isChecking(false) }]
                )
            isChecking(false)
            return
        }
        isChecking(false)
        if (address.menuGroups.length == 0)
            navigation.navigate('postUnavailable', { postcode })
        else if (from == EditAddressFrom.ADD)
            navigation.navigate('EditAddress', {
                address,
                from
            })
        else if (from == EditAddressFrom.FORCE) {
            const idAddress = {
                id: addressId,
                ...address
            }
            navigation.navigate('EditAddress', {
                address: idAddress,
                from
            })
        }
        else
            navigation.navigate('postAvailable', {
                address
            })
        setPostcode("")
    }

    const _renderConfirmBtn = () => {
        if (postcode.length !== 6) {
            return (
                <View style={[styles.btnContainer, { backgroundColor: Color.unclickable }]}>
                    <Text style={styles.btnText}>Confirm</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                    Keyboard.dismiss()
                    checkPostalCode()
                }}
            >
                <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'>
            <Header />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {from != EditAddressFrom.FORCE
                        ? "Check service availability"
                        : "Please re-enter your postal code"
                    }
                </Text>
                <Text style={styles.description}>
                    {from != EditAddressFrom.FORCE
                        ? "Enter the postal code to find out if our service is currently available at the community"
                        : "We've transitioned into doorstep delivery services. If our service is available in your area, you'd be ask to provide your unit number in the next step."
                    }</Text>
                <CustomTextInput
                    style={styles.postcodeContainer}
                    label="Postal Code (6 digits)"
                    inputStyle={styles.textInput}
                    value={postcode}
                    type="number-pad"
                    maxLength={6}
                    onChangeText={postcode => setPostcode(postcode)}
                />
                {_renderConfirmBtn()}
            </View>
            <Modal
                visible={checking}
                transparent
            >
                <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                    <Loading transparent={true} />
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.textWhite
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(24),
        backgroundColor: Color.textWhite
    },
    title: {
        fontFamily: FontType.Black,
        fontSize: wp(21),
        color: Color.fontBlack,
        lineHeight: hp(29),
        marginTop: hp(48)
    },
    description: {
        fontFamily: FontType.Medium,
        fontSize: wp(16),
        color: Color.fontGrey,
        lineHeight: hp(25),
        marginTop: hp(8)
    },
    postcodeContainer: {
        width: '100%',
        marginTop: hp(40),
    },
    textInput: {
        borderColor: Color.fontBlack,
        borderBottomWidth: 1,
        marginTop: Platform.select({
            ios: hp(12),
            android: hp(8)
        }),
    },
    btnContainer: {
        width: '100%',
        height: hp(48),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.btnGreen,
        borderRadius: hp(8),
        marginTop: hp(40)
    },
    btnText: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        color: Color.fontWhite,
    },
})

export default connect(null, mapDispatchToProps)(CheckPostcodeScreen)