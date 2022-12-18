import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import moment from 'moment'

import { wp, hp, Color, Typography } from '@styles'
import { MealTimeButtons } from '@common'

import BottomSlideModal, { SlideIndicator } from '../../BottomSlideModal'
import OptionList from './OptionList'

export default function OrderInfoModal({ visible, item, showServingTimeLabel = true, onClose }) {

    let mealtimeUI
    switch (item.servingTime?.mealtime.id) {
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


    return (
        <BottomSlideModal
            visibility={visible}
            onClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={[styles.container, { backgroundColor: mealtimeUI.textColor }]}>
                    <SlideIndicator style={{ backgroundColor: Color.Background.Card }} />
                    <View style={[styles.headerContainer, { backgroundColor: mealtimeUI.textColor }]}>
                        <View style={[styles.row, { justifyContent: 'space-between' }]}>
                            <Text style={styles.headerTitleText}>{item.variantTitle}</Text>
                            <View style={styles.qtyContainer}>
                                <Text style={styles.qtyText}>Qty: {item.quantity}</Text>
                            </View>
                        </View>
                        {showServingTimeLabel &&
                            <View style={[styles.headerContentContainer, styles.row]}>
                                <Text style={styles.headerContentText}>{moment(item?.servingDate).format('ddd, D MMM')}</Text>
                                <View style={styles.row}>
                                    <View style={styles.iconContainer}>
                                        <Image
                                            style={styles.icon}
                                            source={mealtimeUI.icon}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    <Text style={styles.headerContentText}>{mealtimeUI.label} • {item.servingTime?.time}</Text>
                                </View>
                            </View>
                        }
                    </View>
                    <View style={styles.contentContainer}>
                        <OptionList data={item.options} sequence={item.sequence} />
                    </View>
                </View>
            </View>
        </BottomSlideModal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        borderTopLeftRadius: wp(13),
        borderTopRightRadius: wp(13),
    },
    headerContainer: {
        paddingHorizontal: wp(24),
        paddingBottom: hp(16)
    },
    headerTitleText: {
        ...Typography.SubTitle_21,
        color: Color.Text.White,
        lineHeight: hp(29.4)
    },
    headerContentContainer: {
        justifyContent: 'space-between',
        marginTop: hp(8)
    },
    headerContentText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.White
    },
    qtyContainer: {
        paddingHorizontal: wp(8),
        paddingVertical: hp(4),
        backgroundColor: Color.Background.Card,
        borderRadius: 8
    },
    qtyText: {
        ...Typography.BodyMedium_12,
        color: Color.Text.Black
    },
    contentContainer: {
        paddingHorizontal: wp(24),
        paddingTop: hp(8),
        paddingBottom: hp(44),
        backgroundColor: Color.Background.Base
    },
    image: {
        width: wp(48),
        aspectRatio: 1,
        borderRadius: 8,
    },
    icon: {
        width: wp(16),
        height: wp(16),
        tintColor: Color.Text.White,
        marginRight: wp(8)
    },
})