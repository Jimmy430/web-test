import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Keyboard, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Header, CustomTextInput, Loading } from '@components'
import { userOps } from '@appRedux/operations'
import { Color, FontType, wp, hp } from '@styles'

const mapDispatchToProps = {
    recoverAccount: userOps.recoverAccount
}

const ForgotPasswordScreen = ({ recoverAccount, navigation }) => {
    const [email, setEmail] = useState("")
    const [showModal, isShowModal] = useState(false)
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState()

    const sendEmail = async () => {
        isLoading(true)
        const result = await recoverAccount(email)
        isLoading(false)
        isShowModal(true)
        setError(result.error)
    }

    const _renderSendButton = () => {
        if (!email.isValidEmail())
            return (
                <View style={[styles.btnContainer, { backgroundColor: Color.unclickable }]}>
                    <Text style={styles.btnText}>Send email</Text>
                </View>
            )
        return (
            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => {
                    Keyboard.dismiss()
                    sendEmail()
                }}
            >
                <Text style={styles.btnText}>Send email</Text>
            </TouchableOpacity>
        )
    }

    const _renderModal = () => (
        <Modal
            transparent
            visible={showModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    <Text style={styles.modalText}>{error ? "Sorry, " + error : "If you have an account with us, a password reset link will be sent to your inbox shortly. Please check your spam folder too if you did not receive the email"}</Text>
                    <TouchableOpacity style={[styles.btnContainer, { paddingHorizontal: wp(16) }]}
                        onPress={() => {
                            isShowModal(false)
                            if (error == null) navigation.goBack()
                        }}>
                        <Text style={styles.btnText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

    const _renderLoading = () => (
        <Modal
            visible={loading}
            transparent>
            <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                <Loading transparent={true} />
            </View>
        </Modal>
    )

    return (
        <ScrollView contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'>
            <Header />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    Forgot Password?
                </Text>
                <Text style={styles.description}>
                    We will send you an email shortly to reset your password.
                </Text>
                <CustomTextInput
                    style={styles.emailContainer}
                    label="Email address"
                    inputStyle={styles.textInput}
                    value={email}
                    type="email-address"
                    onChangeText={email => setEmail(email)}
                />
                {_renderSendButton()}
            </View>
            {_renderLoading()}
            {_renderModal()}
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
        lineHeight: hp(24),
        marginTop: hp(62)
    },
    description: {
        fontFamily: FontType.Medium,
        fontSize: wp(16),
        color: Color.fontGrey,
        lineHeight: hp(25),
        marginTop: hp(8)
    },
    emailContainer: {
        width: '100%',
        marginTop: hp(44),
    },
    textInput: {
        color: Color.textBlack,
        fontSize: wp(18),
        lineHeight: hp(23),
        marginTop: Platform.select({
            ios: hp(12),
            android: hp(8)
        }),
        borderColor: Color.fontBlack,
        borderBottomWidth: 1,
    },
    btnContainer: {
        width: '100%',
        height: hp(48),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.btnGreen,
        borderRadius: hp(8),
        marginTop: hp(40),
    },
    btnText: {
        color: Color.textWhite,
        fontFamily: FontType.Futura,
        fontSize: wp(14)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(24),
        backgroundColor: Color.modalBackground
    },
    modalContentContainer: {
        borderRadius: hp(13),
        backgroundColor: Color.textWhite,
        alignItems: 'center',
        paddingVertical: hp(30),
        paddingHorizontal: wp(24)
    },
    modalText: {
        fontFamily: FontType.Medium,
        fontSize: wp(14),
        color: Color.textBlack
    }
})

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen)