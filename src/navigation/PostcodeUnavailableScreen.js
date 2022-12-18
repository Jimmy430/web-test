import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Modal, StyleSheet, Image } from "react-native";
import { connect } from 'react-redux'
import { useToast } from 'react-native-toast-notifications';

import { appOps } from '@appRedux'
import { Icons } from "@common";
import { Header, Loading } from '@components'
import { AmplitudeAPI, Events } from "@services";
import { Color, FontType, wp, hp } from "@styles";

const mapDispatchToProps = {
    requestPostcode: appOps.requestPostcode
}

const PostcodeUnavailableScreen = ({ requestPostcode, route }) => {
    const toast = useToast()
    const [postcode, setPostcode] = useState()
    const [phone, setPhone] = useState("")
    const [requestSending, isRequestSending] = useState(false)

    useEffect(() => {
        const { postcode } = route.params
        setPostcode(postcode)
    }, [])

    const _renderNotify = () => {
        if (phone.length != 8)
            return (
                <View style={[styles.btnContainer, { backgroundColor: Color.unclickable }]}>
                    <Text style={styles.btnText}>Get notified</Text>
                </View>
            )
        return (
            <TouchableOpacity style={styles.btnContainer}
                onPress={() => registerNotify()}>
                <Text style={styles.btnText}>Get notified</Text>
            </TouchableOpacity>
        )
    }

    const registerNotify = async () => {
        AmplitudeAPI.track(Events.OP.COMMUNITY_REQUEST)
        Keyboard.dismiss()
        const input = {
            phone: `+65${phone}`,
            postcode: parseInt(postcode, 10)
        }
        isRequestSending(true)
        await requestPostcode(input)
            .then(json => {
                isRequestSending(false)
                toast.show(json.message);
            })
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <Header />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contentContainer}>
                    <Image
                        style={{ width: wp(125), height: hp(150) }}
                        source={Icons.LocationUnavailable}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Sorry...</Text>
                    <Text style={styles.subTitle}>We are working hard to recruit sufficient drivers to resume our service in your area.</Text>
                    <Text style={styles.postalCode}>{postcode}</Text>
                    <Text style={styles.description}>Enter your mobile phone to get notified as soon as our service is available in your community</Text>
                    <Text style={styles.label}>Mobile number</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            editable={false}
                            value="+65"
                            style={[styles.textInput, { color: 'grey' }]}
                        />
                        <TextInput
                            autoCorrect={false}
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={phone => setPhone(phone)}
                            style={[styles.textInput, { flex: 1, paddingStart: wp(8) }]}
                        />
                    </View>
                    {_renderNotify()}
                </View>
            </TouchableWithoutFeedback>
            <Modal
                visible={requestSending}
                transparent>
                <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                    <Loading transparent={true} />
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(24)
    },
    title: {
        fontFamily: FontType.Black,
        fontSize: wp(21),
        color: Color.fontBlack,
        lineHeight: wp(24)
    },
    subTitle: {
        width: '100%',
        fontFamily: FontType.Light,
        fontSize: wp(14),
        color: Color.fontBlack,
        lineHeight: wp(19),
        marginTop: hp(17),
        textAlign: 'center'
    },
    postalCode: {
        fontFamily: FontType.Black,
        fontSize: wp(21),
        color: Color.btnGreen,
        lineHeight: wp(24),
        marginTop: hp(12),
    },
    description: {
        width: '100%',
        fontFamily: FontType.Medium,
        fontSize: wp(16),
        color: Color.fontGrey,
        lineHeight: wp(25),
        marginTop: hp(45)
    },
    label: {
        width: '100%',
        fontFamily: FontType.Bold,
        fontSize: wp(14),
        color: Color.fontBlack,
        marginTop: hp(24),
    },
    textInput: {
        color: Color.textBlack,
        fontSize: wp(18),
        lineHeight: hp(23),
        marginTop: Platform.select({
            ios: hp(12),
            android: hp(8)
        }),
        borderColor: Color.textBlack,
        borderBottomWidth: 1,
    },
    btnContainer: {
        width: '100%',
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.btnGreen,
        borderRadius: hp(8),
        marginTop: hp(40)
    },
    btnText: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        color: Color.fontWhite
    }
})

export default connect(null, mapDispatchToProps)(PostcodeUnavailableScreen)