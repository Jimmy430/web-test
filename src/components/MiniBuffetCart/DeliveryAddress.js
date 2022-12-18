import { Image, StyleSheet, Text, View } from "react-native"

import { Icons } from "@common"
import { Color, hp, Typography, wp } from "@styles"

export default function DeliveryAddress({ address }) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.headerText}>Deliver to</Text>
            <View style={styles.row}>
                <Image style={[styles.icon, { alignSelf: 'flex-start', tintColor: Color.Text.Black }]} source={Icons.Pin} />
                <Text style={styles.addressText}>Block {address.block} {address.address.trim()}{address.isNoUnit ? "" : ` #${address.floor.pad()}-${address.unit.pad()}`}, Singapore {address.postcode}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingVertical: hp(16),
        paddingHorizontal: wp(24),
        borderRadius: 16,
        marginTop: hp(16),
        backgroundColor: '#FFF'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Grey,
        marginBottom: hp(20)
    },
    addressText: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    icon: {
        width: wp(24),
        height: wp(24),
        marginRight: wp(8)
    }
})