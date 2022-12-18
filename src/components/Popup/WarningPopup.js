import React from 'react'
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image } from 'react-native'

import { Icons } from '@common'
import { Color, wp, hp, Typography } from '@styles'

/**
 * 
 * @param {boolean} visible use to control popup display status
 * @param {string} title use to display string on title area
 * @param {string} content use to display string on content area
 * @param {function} onClose function to trigger when component colsed
 * @param {function} onCancel function to trigger when clicked cancel button on component 
 * @param {function} onConfrim function to trigger when clicked confirm button on component 
 * 
 */

export default function WarningPopup({ visible, title, content, onClose, onCancel, onConfrim }) {
    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <Image style={styles.icon} source={Icons.Delivery_DelayFill} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <View style={[styles.buttonContainer, styles.row]}>
                        <TouchableOpacity style={[styles.btnBase, styles.btnCancel]} onPress={onCancel}>
                            <Text style={[styles.textButton]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnBase, styles.btnConfirm, { marginLeft: wp(16) }]} onPress={onConfrim}>
                            <Text style={[styles.textButton, styles.textConfirm]}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(24),
        backgroundColor: Color.modalBackground,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        backgroundColor: Color.textWhite,
        justifyContent: 'center',
        paddingHorizontal: wp(24),
        paddingVertical: hp(24),
        borderRadius: hp(13),
        overflow: 'hidden'
    },
    buttonContainer: {
        marginTop: hp(40),
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
    },
    content: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Grey,
        marginTop: hp(8)
    },
    icon: {
        width: wp(33),
        height: wp(30),
        marginBottom: hp(24),
        tintColor: Color.Brand.Alert
    },
    btnBase: {
        width: wp(128),
        height: hp(40),
        borderWidth: 2,
        borderColor: Color.Background.Line,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnConfirm: {
        borderWidth: 0,
        backgroundColor: Color.Brand.Primary
    },
    textButton: {
        ...Typography.SubTitle_16,
        color: Color.Text.Grey
    },
    textConfirm: {
        color: Color.Text.White
    }

})