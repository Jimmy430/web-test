import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Alert } from "react-native";
import { connect } from 'react-redux'

import { mealboxOps, minibuffetOps, userOps } from '@appRedux/operations'
import { Header, Loading, DeliveryAddress } from "@components";
import { AmplitudeAPI, Events } from "@services";
import { Color, wp, hp, Typography } from "@styles";
import { EditAddressFrom, Icons, useOnUpdate } from "@common";

const mapStateToProps = ({ user }) => ({
    userInfo: user.userInfo,
    currentAddress: user.selectedAddress,
})

const mapDispatchToProps = {
    changeAddress: userOps.changeAddress,
    deleteAddress: userOps.deleteAddress,

    clearCart: mealboxOps.clearCart,
    clearCartForMinibuffet: minibuffetOps.clearCart
}

const DeliveryListScreen = ({ userInfo, currentAddress, changeAddress, deleteAddress, clearCart, clearCartForMinibuffet, navigation }) => {
    const [deleting, isDeleting] = useState(false)

    useEffect(() => {
        AmplitudeAPI.track(Events.NAVI.SETTING.DELIVERY_LIST)
    }, [])

    useOnUpdate(() => {
        clearAllCart()
    }, [currentAddress])

    const clearAllCart = useCallback(() => {
        clearCart()
        clearCartForMinibuffet()
    }, [])

    const deleteTargetAddress = async (id) => {
        isDeleting(true)
        const result = await deleteAddress(id)
        isDeleting(false)

        if (result.error) Alert.alert("", result.error)
    }

    const _renderLoading = () => (
        <Modal
            visible={deleting}
            transparent>
            <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                <Loading transparent={true} />
            </View>
        </Modal>
    )

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.titleAndAddContainer}>
                <Text style={styles.title}>Delivery address</Text>
                <TouchableOpacity style={styles.addContainer}
                    onPress={() => navigation.navigate('postCheck', { from: EditAddressFrom.ADD })}>
                    <Image
                        style={styles.addIcon}
                        source={Icons.AddNoBg}
                    />
                </TouchableOpacity>
            </View>
            <DeliveryAddress
                addresses={userInfo.addresses}
                currentAddress={currentAddress}
                selectAddress={address => changeAddress(address)}
                deleteAddress={(id) => deleteTargetAddress(id)}
                toEditPage={address => navigation.navigate('EditAddress', { address, from: EditAddressFrom.EDIT })}
            />
            {_renderLoading()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Text.White
    },
    titleAndAddContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(12),
        paddingHorizontal: wp(24)
    },
    title: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black
    },
    addContainer: {
        height: wp(24),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Brand.Secondary,
        borderRadius: wp(12)
    },
    addIcon: {
        height: wp(10),
        aspectRatio: 1
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryListScreen)