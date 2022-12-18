import React from 'react'
import { Modal, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Icons } from '@common'
import { Color, FontType, wp, hp } from '@styles'

const DeletePopup = ({ visible, address, onCancel, onConfirm, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TouchableOpacity style={styles.closeBtn}
                        onPress={() => { onClose() }}>
                        <Image
                            style={styles.closeIcon}
                            source={Icons.Cross}
                        />
                    </TouchableOpacity>
                    <Text style={styles.waitText}>Wait!</Text>
                    <Text style={styles.sureText}>Are you sure you want to delete</Text>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>{address.block} {address.address}{address.isNoUnit ? "" : ` #${address.floor.pad()}-${address.unit.pad()}`}{'\n'}Singapore, {address.postcode}</Text>
                    </View>
                    <TouchableOpacity style={[styles.optionContainer, { backgroundColor: Color.btnGreen }]}
                        onPress={() => onCancel()}>
                        <Text style={[styles.optionText, { color: Color.fontWhite }]}>Maybe not</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionContainer, { backgroundColor: Color.btnGrey }]}
                        onPress={() => onConfirm(address.id)}>
                        <Text style={[styles.optionText, { color: Color.btnGreen }]}>I'm sure</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.modalBackground,
        paddingHorizontal: wp(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
        backgroundColor: '#FAFAFA',
        justifyContent: 'center',
        // alignItems: 'center',
        paddingHorizontal: wp(24),
        paddingTop: hp(40),
        paddingBottom: hp(32),
        borderRadius: hp(8),
        overflow: 'hidden'
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        end: 0,
        padding: wp(16)
    },
    closeIcon: {
        height: wp(24),
        aspectRatio: 1
    },
    waitText: {
        fontFamily: FontType.Black,
        fontSize: wp(18),
        color: Color.fontBlack,
        lineHeight: hp(21)
    },
    sureText: {
        fontFamily: FontType.Light,
        fontSize: wp(14),
        color: Color.fontBlack,
        lineHeight: hp(16),
        marginTop: hp(2)
    },
    addressContainer: {
        paddingHorizontal: wp(24),
        paddingVertical: hp(12),
        marginTop: hp(8),
        marginBottom: hp(16),
        backgroundColor: '#F7F3EF',
        borderRadius: hp(8)
    },
    addressText: {
        fontFamily: FontType.Bold,
        fontSize: wp(14),
        color: Color.fontBlack,
        lineHeight: hp(16)
    },
    optionContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(16),
        borderRadius: hp(8),
        paddingVertical: hp(10)
    },
    optionText: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        lineHeight: hp(19)
    }
})

export default DeletePopup