import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { FontType, Color, wp, hp, Typography } from '@styles'
import BottomSlideModal, { SlideIndicator } from '../BottomSlideModal'

export default function ContactUsPopup({ visible, onRequest, onClose }) {
    return (
        <BottomSlideModal
            visibility={visible}
            onClose={onClose}
            isActionMode={true}
        >
            <View style={styles.modalContainer}>
                <SlideIndicator />
                <Text style={styles.title}>Custom menu</Text>
                <Text style={styles.subTitle}>
                    We do not have a ready-to-order menu based on your selected criteria.{'\n\n'}Click
                    <Text style={styles.point}> Request Proposals </Text>
                    for our account manager to get in touch within 1 business day.
                </Text>
                <TouchableOpacity style={[styles.btnContainer, { backgroundColor: Color.Text.Black }]} onPress={onRequest} >
                    <Text style={[styles.btnText, { color: Color.Text.White }]}>Request proposals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnContainer} onPress={onClose} >
                    <Text style={styles.btnText}>Back to selection</Text>
                </TouchableOpacity>
            </View>
        </BottomSlideModal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: wp(24),
        paddingBottom: hp(40),
        justifyContent: 'center',
        backgroundColor: Color.Text.White,
    },
    title: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
    },
    subTitle: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        marginVertical: hp(16),
    },
    point: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black
    },
    btnContainer: {
        marginTop: hp(16),
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp(12),
        backgroundColor: Color.Background.Base
    },
    btnText: {
        ...Typography.BodyMedium_16,
        color: Color.Brand.Primary
    },
})