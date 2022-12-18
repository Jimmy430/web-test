import React from 'react'
import { Modal, View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import { Icons } from '@common'
import { Color, FontType, wp, hp } from '@styles'

const ModifyPopup = ({ visible, address, onEditClick, onDeleteClick, onClose }) => {
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
                    <TouchableOpacity style={[styles.optionContainer, { backgroundColor: Color.btnGreen }]}
                        onPress={() => onEditClick(address)}>
                        <Text style={[styles.optionText, { color: Color.fontWhite }]}>Edit address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.optionContainer, { backgroundColor: Color.btnGrey }]}
                        onPress={() => onDeleteClick()}>
                        <Text style={[styles.optionText, { color: Color.btnGreen }]}>Delete address</Text>
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
        alignItems: 'center',
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

export default ModifyPopup