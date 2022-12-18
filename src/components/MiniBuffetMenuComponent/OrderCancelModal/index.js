import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { wp, hp, Color, Typography } from '@styles'
import { AmplitudeAPI, Events } from '@services'
import { userOps, minibuffetOps } from '@appRedux/operations'
import { DishTypes, Icons, MealTimeButtons } from '@common'

import BottomSlideModal from '../../BottomSlideModal'
import Loading from '../../Loading'
import { MultiBox } from '../../TipBox'

const mapStateToProps = ({ user }) => ({
    userInfo: user.userInfo,
    history: user.history,
    reviews: user.reviews
})

const mapDispatchToProps = {
    refundSetByStripe: minibuffetOps.refundSetByStripe,
    updateLatestOrder: userOps.updateLatestOrder
}

const OrderCancelModal = ({ userInfo, history, reviews, refundSetByStripe, updateLatestOrder, visible, item, showToast, onClose }) => {

    const [loading, setLoading] = useState(false)

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

    const cancelItem = async () => {
        AmplitudeAPI.track(Events.OP.MINIBUFFET.CANCEL)
        setLoading(true)

        const sameDateDrop = history.filter(lineitem => {
            return lineitem.servingDate == item.servingDate
                && lineitem.dishType === DishTypes.ComboSet
                && lineitem.servingTime.menugroupId == item.servingTime.menugroupId
                && lineitem.shippingAddress.postcode == item.shippingAddress.postcode
                && lineitem.shippingAddress.floor == item.shippingAddress.floor
                && lineitem.shippingAddress.unit == item.shippingAddress.unit
        }).length

        const isLastDrop = sameDateDrop === 1

        const response = await refundSetByStripe(item, isLastDrop)
        setLoading(false)
        if (response.error) {
            onClose()
            showToast(response.error, 3000)
            return
        }
        const order = response.data
        updateLatestOrder(order, history, reviews)
        onClose()
        showToast("The order has been cancelled", 2000)
    }

    const _renderLoaading = () => (
        <Modal visible={loading} transparent>
            <Loading transparent={true} />
        </Modal>
    )

    const _renderInfo = () => {
        const customTime = item.servingTime?.customTime
        const deliveryTime = customTime ? moment().hour(customTime / 60).minute(customTime % 60).format('h:mm A') : item.servingTime?.time
        return (
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.infoTitle}>{item.variantTitle}</Text>
                    <Text style={styles.qtyText}>(Qty: {item?.quantity})</Text>
                </View>
                <View style={{ marginTop: hp(18) }}>
                    <Text style={styles.infoContentDateText}>{moment(item.servingDate).format('ddd, DD MMM')}</Text>
                    <View style={[styles.row, { marginTop: hp(4) }]}>
                        <Image
                            style={styles.icon}
                            source={mealtimeUI.icon}
                            resizeMode="contain"
                        />
                        <Text style={styles.infoContentText}>{mealtimeUI.label} • {deliveryTime}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const _renderTips = () => {
        const tips = [
            {
                icon: Icons.Refund,
                content: "You will get a full refund within 7 business days on your credit card."
            },
            {
                icon: Icons.Credit_NoRefund,
                content: "If you bought the item using livingmenu credit, the credit will not be refunded."
            }
        ]
        return (
            <MultiBox
                style={styles.tipsContainer}
                tips={tips}
            />
        )
    }

    const _renderConfirmButton = () => {
        return (
            <TouchableOpacity style={styles.btnContainer} onPress={() => cancelItem()}>
                <Text style={styles.btnText}>Confirm</Text>
            </TouchableOpacity>
        )
    }


    return (
        <BottomSlideModal
            visibility={visible}
            onClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.container}>
                    <Text style={styles.nameText}>{userInfo.firstName}, Wait!</Text>
                    <Text style={styles.sureText}>Are you sure you want to cancel the order</Text>
                    {_renderInfo()}
                    {_renderTips()}
                    {_renderConfirmButton()}
                </View>
                {_renderLoaading()}
            </View>
        </BottomSlideModal>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderCancelModal)

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
        paddingHorizontal: wp(24),
        paddingTop: hp(48),
        paddingBottom: hp(32),
        backgroundColor: Color.Background.Base,
    },
    nameText: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
    },
    sureText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Grey,
        marginTop: hp(8)
    },
    infoContainer: {
        marginTop: hp(8),
        paddingHorizontal: wp(16),
        paddingVertical: hp(16),
        borderRadius: 8,
        backgroundColor: '#F2E6DA'
    },
    infoTitle: {
        ...Typography.SubTitle_14,
        color: Color.Text.Black,
    },
    infoContentDateText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
    },
    infoContentText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    qtyText: {
        ...Typography.BodyRegular_12,
        color: Color.Text.Black,
        marginLeft: wp(8)
    },
    tipsContainer: {
        marginTop: hp(16)
    },
    icon: {
        width: wp(16),
        height: wp(16),
        tintColor: Color.Text.Black,
        marginRight: wp(8)
    },
    btnContainer: {
        marginTop: hp(40),
        height: hp(40),
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Brand.Primary
    },
    btnText: {
        ...Typography.SubTitle_14,
        color: Color.Text.White,
    }
})