import React from "react"
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native"

import { Icons } from "@common"
import { Color, FontType, wp, hp, Typography } from "@styles"

const InfoCard = ({ address, discount, deliveryFee, canLateOrder, onAddressClick, onDeliveryClick }) => {
    const discountValue = parseFloat(discount) / 100

    const _renderPrice = (price) => {
        if (discountValue == 0) return (
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: wp(8), alignItems: 'center' }}>
                <Text style={styles.deliveryFeeAfterDiscountText}>${price}</Text>
                <Text style={[styles.deliveryFeeBeforeDiscountText, { color: Color.Text.White }]}>${price}</Text>
            </View>
        )

        const priceAfterDiscount = price * (1 - discountValue)
        return (
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: wp(8) }}>
                <Text style={styles.deliveryFeeAfterDiscountText}>${priceAfterDiscount.toFixed(2)}</Text>
                <Text style={styles.deliveryFeeBeforeDiscountText}>${price}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.firstRow}
                onPress={onAddressClick}>
                <View style={styles.iconContainer}>
                    <Image style={styles.icon}
                        source={Icons.Pin}
                        resizeMode="contain" />
                </View>
                <Text style={[styles.addressText]}>{address}</Text>
            </TouchableOpacity>
            {/* <View style={styles.separator} />
            <TouchableOpacity
                onPress={onDeliveryClick}>
                <View style={styles.secondRow}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.nestedRow}>
                            <View style={styles.iconContainer}>
                                <Image style={styles.icon} source={Icons.Tag} />
                            </View>
                            {_renderPrice(deliveryFee)}
                            {discountValue !== 0 &&
                                <View style={styles.discountContainer}>
                                    <Text style={styles.discountText}>{discount + '% off'}</Text>
                                </View>
                            }
                            {canLateOrder && _renderPrice(deliveryFee + 2)}
                        </View>
                        <View style={[styles.nestedRow, !canLateOrder && { justifyContent: 'flex-end' }]}>
                            <View style={[styles.timeContainer, { width: wp(184) }]}>
                                <Text style={styles.timeText}>Order by 9pm the day before delivery</Text>
                            </View>
                            {canLateOrder &&
                                <View style={[styles.timeContainer, { alignSelf: 'flex-end' }]}>
                                    <Text style={styles.timeText}>Thereafter</Text>
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: wp(8),
        marginTop: hp(24),
        backgroundColor: Color.Text.White,
        paddingVertical: hp(16),
        paddingHorizontal: wp(16),
        borderWidth: 1,
        borderColor: Color.Background.Card,
        position: 'absolute',
        width: '100%',
        top: Dimensions.get('window').height < 840 ? hp(-64) : hp(-56),
        left: wp(16),
        zIndex: 2
    },
    firstRow: {
        flexDirection: 'row',
    },
    iconContainer: {
        width: wp(24),
        aspectRatio: (24 / 38),
        alignItems: 'center',
        paddingHorizontal: wp(3),
        paddingBottom: hp(7),
        marginLeft: wp(4)
    },
    icon: {
        flex: 1,
        width: '100%',
        aspectRatio: 1,
        tintColor: Color.Text.Black
    },
    addressText: {
        flex: 1,
        marginLeft: wp(16),
        ...Typography.SubTitle_16,
        color: Color.Text.Black,
    },
    separator: {
        width: wp(312),
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: hp(12)
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    firstColumn: {
        width: wp(184)
    },
    secondColumn: {
        width: wp(80)
    },
    nestedRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    discountContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(8),
        backgroundColor: '#538AF7',
        marginStart: wp(8),
        paddingHorizontal: wp(8),
        paddingVertical: hp(3)
    },
    discountText: {
        ...Typography.BodyMedium_12,
        color: Color.Text.White,
        lineHeight: wp(16.8),
        textAlignVertical: 'center'
    },
    deliveryFeeBeforeDiscountText: {
        ...Typography.BodyLight_12,
        color: Color.Text.Grey,
        textDecorationLine: 'line-through',
        marginLeft: wp(8),
        alignSelf: 'center'
    },
    deliveryFeeAfterDiscountText: {
        ...Typography.SubTitle_16,
        color: Color.Text.Black,
    },
    timeContainer: {
        paddingHorizontal: wp(6),
        paddingVertical: hp(2),
        borderRadius: wp(8),
        marginTop: hp(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.Background.Base
    },
    timeText: {
        fontFamily: FontType.Regular,
        fontSize: wp(10),
        color: '#949991',
        lineHeight: wp(16),
        textAlign: 'center',
        textAlignVertical: 'center'
    },
})

export default InfoCard