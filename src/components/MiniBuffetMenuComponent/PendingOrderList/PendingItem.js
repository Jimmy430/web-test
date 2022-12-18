import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import moment from 'moment'

import { Color, hp, Typography, wp } from '@styles'
import { Icons, MealTimeButtons } from '@common'
import DashedLine from '../../DashedLine'

export default function PendingItem({ item, onClickCard, onClickCancel }) {

    let mealtimeUI
    switch (item.servingTime.mealtime.id) {
        case 3:
            mealtimeUI = MealTimeButtons.TeaBreak
            break
        case 4:
            mealtimeUI = MealTimeButtons.Dinner
            break
        default:
            mealtimeUI = MealTimeButtons.Lunch
            break
    }

    const _renderHeader = () => {
        return (
            <View style={[styles.headerContainer, styles.row]}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: item.options[0].image }}
                    />
                    <Text style={styles.imageText}>+ {item.options.length}</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={Icons.Pin} />
                        <Text style={styles.postcodeText}>{item.shippingAddress.postcode}</Text>
                    </View>
                    <Text style={styles.viewmenuText}>View menu</Text>
                </View>
            </View>
        )
    }

    const _renderCustomTime = () => {
        const customTime = item.servingTime?.customTime
        const label = moment().hour(customTime / 60).minute(customTime % 60).format('h:mm A')
        if (!!customTime) {
            return (
                <View style={styles.customTimeContainer}>
                    <Text style={styles.infoContentText}>Specific delivery timing requested </Text>
                    <View style={styles.customTimeLabelContainer}>
                        <Text style={[styles.customTimeText, { color: mealtimeUI.textColor }]}>{label}</Text>
                    </View>
                </View>
            )
        }
    }

    const _renderInfo = () => {
        return (
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.infoTitleText}>{item.variantTitle}</Text>
                    {item.quantity > 1 &&
                        <Text style={styles.qtyText}>(Qty: {item.quantity})</Text>
                    }
                </View>
                <View style={styles.row}>
                    <Image
                        style={styles.icon}
                        source={mealtimeUI.icon}
                        resizeMode="contain"
                    />
                    <Text style={styles.infoContentText}>{mealtimeUI.label} • {item.servingTime.time}</Text>
                </View>
                {_renderCustomTime()}
            </View>
        )
    }

    const _renderCredit = () => {
        if (!item.credit) return null

        return (
            <View style={styles.row}>
                <Image
                    style={styles.coin}
                    source={Icons.Coin}
                />
                <Text style={styles.creditText}>-${item.credit.toFixed(2)}</Text>
            </View>
        )
    }

    const _renderCancelButton = (isPast) => {
        return (
            <TouchableOpacity onPress={onClickCancel} disabled={isPast}>
                <View style={[styles.btnContainer, isPast && styles.unabilityCancelBtn]}>
                    <Text style={styles.btnText}>Cancel</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const _renderFooter = () => {
        const { first, second } = item.cutoffTime
        const cancellableTime = second ? moment(second) : moment(first)
        const isPastCutoffTime = cancellableTime.valueOf() < moment().valueOf()

        return (
            <View style={{ paddingBottom: hp(16) }}>
                <View style={[styles.footerContainer, styles.row]}>
                    <View>
                        <Text style={styles.paxText}>{item.estimatedMin * item.quantity} - {item.estimatedMax * item.quantity} pax</Text>
                        <View style={styles.row}>
                            <Text style={styles.priceText}>${(item.price * item.quantity).toFixed(2)}</Text>
                            {_renderCredit()}
                        </View>
                    </View>
                    {_renderCancelButton(isPastCutoffTime)}
                </View>
                {isPastCutoffTime &&
                    <View style={{ alignSelf: 'flex-end', marginRight: wp(24) }}>
                        <Text style={styles.pastText}>Order past cut off time.</Text>
                    </View>
                }
            </View>
        )
    }

    return (
        <TouchableOpacity onPress={onClickCard}>
            <View style={styles.container}>
                {_renderHeader()}
                <View>
                    <View style={[styles.servingTimeBar, { backgroundColor: mealtimeUI.textColor }]} />
                    {_renderInfo()}
                    <DashedLine
                        style={{ marginVertical: hp(16), marginHorizontal: wp(24) }}
                        dashGap={8}
                        dashLength={10}
                        dashThickness={1}
                        dashColor={Color.Background.Card}
                    />
                    {_renderFooter()}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        paddingTop: hp(16),
        backgroundColor: '#FFFFFF'
    },
    headerContainer: {
        flex: 1,
        marginHorizontal: wp(24),
        marginBottom: hp(32),
        justifyContent: 'space-between',
    },
    postcodeText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    viewmenuText: {
        ...Typography.BodyMedium_14,
        color: Color.Brand.Secondary,
        alignSelf: 'flex-end',
        marginTop: hp(8),
    },
    servingTimeBar: {
        position: 'absolute',
        width: wp(12),
        height: '100%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    infoContainer: {
        borderWidth: 1,
        width: wp(328),
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        borderRadius: 8,
        borderColor: Color.Background.Card,
        marginLeft: wp(24),
    },
    infoTitleText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black
    },
    qtyText: {
        ...Typography.BodyRegular_12,
        color: Color.Text.Black,
        marginLeft: wp(8)
    },
    infoContentText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    customTimeContainer: {
        marginTop: hp(24)
    },
    customTimeLabelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: Color.Background.Card,
        marginTop: hp(8),
        paddingVertical: hp(4),
        paddingHorizontal: wp(16),
        borderRadius: 8
    },
    customTimeText: {
        ...Typography.BodyMedium_14
    },
    footerContainer: {
        marginHorizontal: wp(24),
        paddingBottom: hp(0),
        justifyContent: 'space-between'
    },
    paxText: {
        ...Typography.BodyRegular_12,
        color: Color.Text.Grey,
    },
    priceText: {
        ...Typography.SubTitle_16,
        color: Color.Text.Black,
    },
    coin: {
        width: wp(16),
        aspectRatio: 1,
        marginLeft: wp(16)
    },
    creditText: {
        ...Typography.SubTitle_16,
        color: Color.Text.Black,
        marginLeft: wp(4)
    },
    pastText: {
        fontStyle: 'italic',
        fontSize: wp(12),
        color: Color.Text.Grey,
        marginTop: hp(4)
    },
    imageContainer: {
        width: wp(48),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {
        ...Typography.SubTitle_14,
        color: Color.Text.White,
        position: 'absolute',
    },
    image: {
        width: wp(48),
        aspectRatio: 1,
        borderRadius: 8,
    },
    icon: {
        width: wp(16),
        height: wp(16),
        tintColor: Color.Text.Black,
        marginRight: wp(8)
    },
    btnContainer: {
        paddingVertical: hp(8),
        paddingHorizontal: wp(16),
        borderRadius: 16,
        backgroundColor: Color.Brand.Primary
    },
    btnText: {
        ...Typography.BodyMedium_12,
        color: Color.Text.White
    },
    unabilityCancelBtn: {
        backgroundColor: Color.Background.Brand.Primary
    }

})