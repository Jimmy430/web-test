import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Color, wp, hp, Typography } from '@styles'

const DeliveryAddressRow = ({ address, isSelected = false, selectable = true, onItemClick, onEditClick }) => {

    return (
        <TouchableOpacity
            onPress={() => onItemClick(address)}
        >
            <View style={[styles.container, isSelected && styles.containerSelected, !isSelected && { opacity: 0.3 }]}>
                <View style={styles.btnsContainer}>
                    <View style={styles.radioBtnContainer} >
                        <View style={[styles.radioBtnIndicator, isSelected && styles.radioBtnIndicatorSelected]} />
                    </View>
                    {selectable &&
                        <TouchableOpacity style={styles.editContainer}
                            onPress={() => onEditClick(address)}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    }
                </View>
                <Text style={styles.address}>{address.block} {address.address}{address.isNoUnit ? "" : ` #${address.floor.pad()}-${address.unit.pad()}`},{'\n'}Singapore {address.postcode}</Text>
                <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>{address.navigationInstruction || "－"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        justifyContent: 'center',
        borderWidth: 1.2,
        borderColor: Color.btnGrey,
        borderRadius: hp(10)
    },
    containerSelected: {
        borderColor: Color.Text.Black
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    radioBtnContainer: {
        width: wp(24),
        aspectRatio: 1,
        borderRadius: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Background.Card
    },
    radioBtnIndicator: {
        width: wp(12),
        aspectRatio: 1,
        borderRadius: wp(6),
        backgroundColor: Color.Background.Card
    },
    radioBtnIndicatorSelected: {
        backgroundColor: Color.Brand.Primary
    },
    editContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(4),
        backgroundColor: Color.Brand.Primary,
        borderRadius: hp(8)
    },
    editText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.White
    },
    address: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black,
        lineHeight: wp(19),
        marginTop: hp(12)
    },
    instructionContainer: {
        paddingHorizontal: wp(16),
        paddingVertical: hp(8),
        borderRadius: hp(8),
        backgroundColor: Color.Background.Card,
        marginTop: hp(16)
    },
    instructionText: {
        ...Typography.BodyLight_14,
        color: Color.Text.Black,
    }
})

export default DeliveryAddressRow