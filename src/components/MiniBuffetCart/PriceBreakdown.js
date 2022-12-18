import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, } from 'react-native'

import { Constants, Icons } from '@common'
import { wp, hp, Typography, Color } from '@styles'
import Tooltip from 'react-native-walkthrough-tooltip';
import { TouchableOpacity } from 'react-native-web';
// import { Tooltip } from 'react-native-elements'

export default function PriceBreakdown({
    cartItems,
    productList,
    customDeliveryTime,
    deliverySurcharge,
    dateSpecificSurcharge,
    promoDiscount,
    usedCredits
}) {

    const [toolTipVisible, setToolTipVisible] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Price breakdown</Text>
            {cartItems.map(item => {
                const productObject = productList.find(menu => menu.id === item.productId)
                const { variantTitle } = productObject.setList.find(set => set.variantId === item.variantId)
                const displayVairantTitle = !variantTitle.match(/.+with/)
                    ? 'without add-on'
                    : `with${variantTitle.split('with')[1]}`

                return (
                    <View key={item.productId}>
                        <Text style={styles.productTitleText}>{productObject.title}</Text>
                        <View key={item.variantId} style={styles.itemContainer}>
                            <Text style={styles.guestAndDrinkText}>For {item.pax.max} guests • {displayVairantTitle}</Text>
                            <Text style={styles.contentText}>${item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                )
            })}
            <View style={styles.separater} />
            <View style={styles.itemContainer}>
                <Text style={styles.titleText}>Delivery fee</Text>
                <Text style={[styles.contentText, { color: Color.Brand.Primary }]}>Free</Text>
            </View>
            {!!customDeliveryTime.value &&
                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Specific timing selection</Text>
                    <Text style={styles.contentText}>${Constants.CustomTimeFee.toFixed(2)}</Text>
                </View>
            }
            {!!deliverySurcharge &&
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.titleText}>Area surcharge</Text>
                        <Tooltip
                            isVisible={toolTipVisible}
                            contentStyle={{
                                flex: 1,
                                paddingHorizontal: wp(16),
                                paddingVertical: hp(8)
                            }}
                            onClose={() => setToolTipVisible(false)}
                            content={
                                <Text style={styles.tipText}>{"Area surcharge is applicable for selected areas, such as CBD, Tuas and Sentosa."}</Text>
                            }>
                            <TouchableOpacity onPress={() => setToolTipVisible(true)}>
                                <View style={styles.infoIconContainer}>
                                    <Image style={styles.infoIcon} source={Icons.InfoBoarder} />
                                </View>
                            </TouchableOpacity>
                        </Tooltip>
                    </View>
                    <Text style={styles.contentText}>${deliverySurcharge.toFixed(2)}</Text>
                </View>
            }
            {!!dateSpecificSurcharge &&
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.titleText}>{dateSpecificSurcharge.type}</Text>
                    </View>
                    <Text style={styles.contentText}>${dateSpecificSurcharge.value.toFixed(2)}</Text>
                </View>
            }
            {!!usedCredits &&
                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Credit Used</Text>
                    <Text style={styles.contentText}>-${usedCredits.toFixed(2)}</Text>
                </View>
            }
            {!!promoDiscount &&
                <View style={styles.itemContainer}>
                    <Text style={styles.titleText}>Promotion code used</Text>
                    <Text style={styles.contentText}>-${promoDiscount.toFixed(2)}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: hp(16),
        paddingHorizontal: wp(24),
        borderRadius: 16,
        marginTop: hp(16),
        backgroundColor: '#FFF'
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(8)
    },
    separater: {
        borderTopWidth: 1,
        borderTopColor: Color.Background.Card,
        marginTop: hp(16),
        marginBottom: hp(8)
    },
    headerText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Grey,
    },
    titleText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    productTitleText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black,
        marginTop: hp(20)
    },
    guestAndDrinkText: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    contentText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
    },
    infoIconContainer: {
        width: wp(20),
        aspectRatio: 1,
        marginStart: wp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoIcon: {
        width: wp(14),
        height: wp(14),
        tintColor: Color.Text.Black
    },
    tipText: {
        ...Typography.BodyRegular_12,
        color: Color.Text.Black
    }
})