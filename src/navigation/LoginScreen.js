import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, Image, TouchableWithoutFeedback, StyleSheet, Keyboard, Platform, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native';

import { userOps } from '@appRedux/operations'
import { Anims, EditAddressFrom } from '@common';
import { CustomTextInput } from '@components';
import { Color, FontType, wp, hp, Typography } from '@styles';

const mapStateToProps = ({ user }) => ({
    accessToken: user.accessToken,
    expiresAt: user.expiresAt
})

const mapDispatchToProps = {
    logIn: userOps.logIn,
    getUserInfo: userOps.getUserInfo,
}

const LoginScreen = ({ accessToken, expiresAt, logIn, getUserInfo, navigation }) => {
    const [fetching, isFetching] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (accessToken) {
            isFetching(true)
            getUserInfo({ accessToken, expiresAt })
                .then(res => {
                    isFetching(false)
                    if (res.error) {
                        if (res.error == "no address")
                            setError(res.error)
                            // forceEnterPostcode(res.addressId)
                        else
                            setError(res.error.message ?? res.error)
                        return
                    }
                    goToMainPage()
                })
        }
    }, [])

    const forceEnterPostcode = (addressId) => {
        // navigation.navigate('postCheck', {
        //     from: EditAddressFrom.FORCE,
        //     addressId
        // })
    }

    const goToMainPage = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })

        navigation.dispatch(resetAction)
    }

    const login = async () => {
        isFetching(true)
        const res = await logIn(email, password)
        isFetching(false)
        if (res.error) {
            if (res.error == "no address")
                forceEnterPostcode(res.addressId)
            else
                setError(res.error)
            return
        }
        goToMainPage()
    }

    const _renderLogin = () => {
        if (email == "" || password == "")
            return (
                <View
                    style={[styles.loginBtn, { backgroundColor: Color.unclickable }]}
                >
                    <Text style={styles.loginText}>Log in</Text>
                </View>
            )

        return (
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                    Keyboard.dismiss()
                    login()
                }}
            >
                <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
        )
    }

    const _renderLoaading = () => {
        return (
            <Modal
                visible={fetching}
                transparent>
                <View style={{ flex: 1 }}>
                    <Image
                        source={Anims.LoginFetching}
                        style={{ flex: 1, width: wp(375), height: hp(752) }}
                    />
                </View>
            </Modal>
        )
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => { }}>
                <View style={styles.container} >
                    <Image
                        style={styles.logo}
                        source={require('../../assets/logo_full.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.title}>Signature dish from the highest rated hawkers and eateries.</Text>
                    <Text style={styles.subTitle}>Delivering in both individual and mini-buffet formats.</Text>
                    <CustomTextInput
                        style={styles.emailContainer}
                        label="Email address"
                        inputStyle={styles.textInput}
                        value={email}
                        type="email-address"
                        onChangeText={email => setEmail(email)}
                    />
                    <CustomTextInput
                        style={styles.passwordContainer}
                        label="Password"
                        inputStyle={styles.textInput}
                        value={password}
                        isPassword={true}
                        onChangeText={password => setPassword(password)}
                    />
                    <View style={{ flexDirection: 'row', marginTop: hp(10), alignItems: 'center' }}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.forgetContainer}
                            onPress={() => {
                                Keyboard.dismiss()
                                navigation.navigate('ForgetPW')
                            }}>
                            <Text style={styles.forgetText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    {_renderLogin()}

                    <View style={styles.signupContainer}>
                        <View style={styles.separatorContainer}>
                            <View style={styles.separator} />
                            <Text style={styles.separatorText}>Or</Text>
                            <View style={styles.separator} />
                        </View>
                        <TouchableOpacity
                            style={styles.signupBtn}
                            onPress={() => {
                                Keyboard.dismiss()
                                navigation.navigate('postCheck', { from: EditAddressFrom.NEW.MEALBOX })
                            }}>
                            <Text style={styles.signupText}>New user?</Text>
                        </TouchableOpacity>
                        <Text style={styles.findOutText}>Find out our service availability to your area</Text>
                    </View>
                    {_renderLoaading()}
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(24),
        paddingTop: hp(85)
    },
    logo: {
        height: hp(66),
        aspectRatio: 186 / 66
    },
    title: {
        marginTop: hp(48),
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
    },
    subTitle: {
        width: '100%',
        marginTop: hp(8),
        ...Typography.BodyRegular_16,
        color: Color.Text.Grey
    },
    emailContainer: {
        width: '100%',
        marginTop: hp(38),
    },
    passwordContainer: {
        width: '100%',
        marginTop: hp(20),
    },
    textInput: {
        color: Color.textBlack,
        fontFamily: FontType.Medium,
        fontSize: wp(18),
        lineHeight: hp(23),
        marginTop: Platform.select({
            ios: hp(12),
            android: hp(5)
        }),
        borderColor: Color.textBlack,
        borderBottomWidth: 1,
    },
    errorText: {
        flex: 1,
        fontFamily: FontType.Light,
        fontSize: wp(12),
        color: Color.icRed,
        marginEnd: wp(8),
    },
    forgetContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(8),
    },
    forgetText: {
        fontFamily: FontType.Medium,
        fontSize: wp(12),
        color: Color.fontGrey,
        lineHeight: hp(14),
        textDecorationLine: 'underline'
    },
    loginBtn: {
        width: '100%',
        height: hp(40),
        marginTop: hp(32),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.btnGreen,
        borderRadius: 16
    },
    loginText: {
        ...Typography.SubTitle_14,
        color: Color.fontWhite
    },
    signupContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: hp(47)
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(32)
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: Color.Background.Line
    },
    separatorText: {
        width: wp(40),
        textAlign: 'center',
        ...Typography.BodyRegular_14,
        color: Color.Background.Line
    },
    signupBtn: {
        width: '100%',
        height: hp(40),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1
    },
    signupText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black
    },
    findOutText: {
        width: '100%',
        ...Typography.BodyRegular_12,
        color: Color.Text.Black,
        textAlign: 'center',
        marginTop: hp(16)
    }
})