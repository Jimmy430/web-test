import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Icons } from "@common"
import { Color, hp, Typography, wp } from "@styles"

export default function CheckoutButton({
    totalPrice,
    customTimeFee,
    deliverySurcharge,
    dateSpecificSurcharge,
    usedPromo,
    usedCredit,
    onCheckout
}) {
    const displayValue = !!(totalPrice + customTimeFee + deliverySurcharge + dateSpecificSurcharge - usedPromo - usedCredit)
        ? '$ ' + (totalPrice + customTimeFee + deliverySurcharge + dateSpecificSurcharge - usedPromo - usedCredit).toFixed(2)
        : 'Free'

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onCheckout}>
                <View style={[styles.btnContainer, styles.row]}>
                    <View style={styles.row}>
                        <Image style={[styles.icon, { tintColor: '#FFF' }]} source={Icons.Cart_Fill} />
                        <Text style={styles.text}>To checkout</Text>
                    </View>
                    <Text style={styles.text}>{displayValue}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(16),
        paddingTop: hp(24),
        paddingBottom: hp(40),
        paddingHorizontal: wp(24),
        backgroundColor: '#FFF'
    },
    btnContainer: {
        height: hp(48),
        paddingHorizontal: wp(24),
        borderRadius: 16,
        backgroundColor: Color.Brand.Primary,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        ...Typography.SubTitle_16,
        color: Color.Text.White
    },
    icon: {
        width: wp(24),
        height: wp(24),
        marginRight: wp(8)
    }
})