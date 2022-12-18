import React, { useState, useEffect, useRef } from 'react'
import { Image, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client'
import { gql } from 'graphql-tag'
import moment from 'moment'

import { minibuffetOps, appOps } from '@appRedux/operations'
import { Applicability, Constants, DateSpecificSurcharge, Icons, MenuTypes } from '@common'
import * as PromotionUtil from '@common/PromotionUtil'
import { wp, hp, Typography, Color } from '@styles'
import { CreditUsage, Header, Loading, MiniBuffetCartComponent, MiniBuffetMenuComponent, PromotionInput } from '@components'
import { AmplitudeAPI, Events } from '@services'

const getPostcodeSurcharges = gql`
{
    retrievePostcodeSurcharges{
        postcode
        surcharge
    }
}
`

const mapStateToProps = ({ app, user, minibuffet }) => ({
    specificDeliveryTimes: app.specificDeliveryTimes,

    userInfo: user.userInfo,
    selectedAddress: user.selectedAddress,

    productList: minibuffet.productList,
    servingDate: minibuffet.servingDate,
    servingTime: minibuffet.servingTime,
    cartItems: minibuffet.cartItems,
})

const mapDispatchToProps = {
    checkPromoCode: appOps.checkPromoCode,
    updateCartItem: minibuffetOps.updateCartItem,
    removeCartItem: minibuffetOps.removeCartItem,
}

const MiniBuffetCartScreen = ({ userInfo, selectedAddress, specificDeliveryTimes, productList, servingDate, servingTime, cartItems, checkPromoCode, updateCartItem, removeCartItem }) => {
    const totalPrice = cartItems.reduce((prev, curr) => prev + (curr.amount * curr.price), 0)

    const navigation = useNavigation()
    const promoInputRef = useRef()
    const dateSpecificSurcharge = useRef(DateSpecificSurcharge.find(e => e.date === moment(servingDate).format('YYYY-MM-DD'))).current

    const [usedPromo, setUsedPromo] = useState()
    const [promoDiscount, setPromoDiscount] = useState(0)
    const [isPromoChecking, setPromoChecking] = useState(false)
    const [availableTimes, setAvailableTimes] = useState([])
    const [deliverySurcharge, setdeliverySurcharge] = useState(0)
    const [customDeliveryTime, setCustomDeliveryTime] = useState(
        {
            label: servingTime.time,
            value: null
        }
    )
    const [customTimeFee, setCustomTimeFee] = useState(0)
    const [credit, setCredit] = useState(0)
    const { data } = useQuery(getPostcodeSurcharges, { fetchPolicy: 'network-only' })

    useEffect(() => {
        AmplitudeAPI.track(Events.NAVI.MINIBUFFET.CART)
    }, [])

    useEffect(() => {
        if (!!data) {
            const surcharge = data.retrievePostcodeSurcharges.find(postcodeSurcharge => selectedAddress.postcode.startsWith(postcodeSurcharge.postcode))
            if (!!surcharge)
                setdeliverySurcharge(surcharge.surcharge)
        }
    }, [data])

    useEffect(() => {
        const availableTimes = specificDeliveryTimes
            .filter(timeObj => {
                return timeObj.mealtimeId === servingTime.mealtime.id
                    && timeObj.exceptions.every(exception => !selectedAddress.postcode.startsWith(exception))
            })
            .sort((a, b) => a.minutes - b.minutes)
            .map(timeObj => ({
                label: moment().hour(timeObj.minutes / 60).minute(timeObj.minutes % 60).format('h:mm A'),
                value: timeObj.minutes
            }))

        availableTimes.unshift({
            label: servingTime.time,
            value: null
        })

        setAvailableTimes(availableTimes)

    }, [selectedAddress, servingTime])

    useEffect(() => {
        if (!!customDeliveryTime.value)
            setCustomTimeFee(Constants.CustomTimeFee)
        else
            setCustomTimeFee(0)
    }, [customDeliveryTime])

    useEffect(() => {
        const productTotal = cartItems.reduce((prev, curr) => prev + (curr.amount * curr.price), 0)

        /**calculate if any delivery related fee */
        let deliveryFee = 0
        deliveryFee += customTimeFee
        deliveryFee += deliverySurcharge
        deliveryFee += dateSpecificSurcharge.value

        let promoDiscount = 0
        if (!!usedPromo)
            promoDiscount = PromotionUtil.applyPromo(usedPromo, productTotal, deliveryFee)

        setPromoDiscount(promoDiscount)
    }, [cartItems, deliverySurcharge, customTimeFee, dateSpecificSurcharge, usedPromo])

    const promoApplied = (promo) => {
        setUsedPromo(promo)
        if (promo)
            setCredit(0)
    }

    const creditApplied = (credit) => {
        setCredit(credit)
        if (credit) {
            setUsedPromo(undefined)
            promoInputRef.current.reset()
        }
    }

    const onEditSet = () => {
        navigation.goBack()
    }

    const _renderUtensilAndCutleryProvided = () => {
        return (
            <View style={styles.sectionContainer}>
                <View style={styles.utensilContainer}>
                    <Image
                        style={styles.icon}
                        source={Icons.Cutlery}
                        resizeMode="contain" />
                    <Text style={styles.utensilText}>Utensils and cutlery will be provided</Text>
                </View>
            </View>
        )
    }

    const _renderDeliveryTimeSelection = () => {
        return <MiniBuffetCartComponent.DeliveryTimeSelection
            currentTime={customDeliveryTime}
            onChooseTime={(value) => {
                AmplitudeAPI.track(Events.OP.MINIBUFFET.CUSTOM_DELIVERY_TIME, { time: value.label })
                setCustomDeliveryTime(value)
            }}
            timesData={availableTimes}
        />
    }

    const _renderDeliveryAddress = () => (
        <MiniBuffetCartComponent.DeliveryAddress address={selectedAddress} />
    )

    const _renderPromoInput = () => {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.headerText}>Promo code</Text>
                <PromotionInput
                    ref={promoInputRef}
                    onCheck={async code => {
                        setPromoChecking(true)
                        const result = await checkPromoCode({
                            promoCode: code,
                            customerId: userInfo.id,
                            total: totalPrice,
                            postcode: selectedAddress.postcode,
                            type: Applicability.MINIBUFFET
                        })
                        setPromoChecking(false)
                        return result
                    }}
                    onApplied={promoApplied}
                />
            </View>
        )
    }

    const _renderCreditInput = () => {
        const availableCredits = userInfo.credit.usableV2.unrestricted + userInfo.credit.usableV2.minibuffet
        const total = totalPrice + customTimeFee + deliverySurcharge + dateSpecificSurcharge.value

        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.headerText}>Credit balance</Text>
                <CreditUsage
                    applicable={availableCredits}
                    max={Math.min(total, availableCredits)}
                    usedCredit={credit}
                    setUsedCredit={creditApplied}
                />
            </View>
        )
    }

    const _renderPriceBreakdown = () => (
        <MiniBuffetCartComponent.PriceBreakdown
            cartItems={cartItems}
            productList={productList}
            customDeliveryTime={customDeliveryTime}
            deliverySurcharge={deliverySurcharge}
            dateSpecificSurcharge={dateSpecificSurcharge}
            promoDiscount={promoDiscount}
            usedCredits={credit}
        />
    )

    const _renderCheckoutButton = () => (
        <MiniBuffetCartComponent.CheckoutButton
            totalPrice={totalPrice}
            customTimeFee={customTimeFee}
            deliverySurcharge={deliverySurcharge}
            dateSpecificSurcharge={dateSpecificSurcharge?.value ?? 0}
            usedPromo={promoDiscount}
            usedCredit={credit}
            onCheckout={() => navigation.navigate(
                'OrderChecking',
                {
                    mealType: MenuTypes.MiniBuffet,
                    promoCode: usedPromo?.code,
                    promoDiscount: promoDiscount,
                    credit: credit,
                    customDeliveryTime,
                    deliverySurcharge,
                    dateSpecificSurcharge
                }
            )}
        />
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header />
                <View style={{ paddingVertical: hp(16), paddingHorizontal: wp(24) }}>
                    <Text style={styles.descriptionText}>Review your order on</Text>
                    <Text style={styles.dateText}>{moment(servingDate).format('ddd, D MMM YYYY')}</Text>
                </View>
            </View>
            <View>
                <View style={styles.maskContainer} />
                <MiniBuffetMenuComponent.MealtimeIndicator
                    mealtimeID={servingTime.mealtime.id}
                    timeStr={customDeliveryTime.label}
                />
            </View>
            <ScrollView
                style={{ flex: 1 }}
                nestedScrollEnable={false}
                showsVerticalScrollIndicator={false}
            >
                <MiniBuffetCartComponent.CartItemList
                    cartItems={cartItems}
                    productList={productList}
                    onEditSet={onEditSet}
                />
                {_renderUtensilAndCutleryProvided()}
                {_renderDeliveryTimeSelection()}
                {_renderDeliveryAddress()}
                {_renderPromoInput()}
                {_renderCreditInput()}
                {_renderPriceBreakdown()}
                {_renderCheckoutButton()}
            </ScrollView>
            <Modal visible={isPromoChecking} transparent>
                <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                    <Loading transparent={true} />
                </View>
            </Modal>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.Background.Base,
    },
    headerContainer: {
        backgroundColor: Color.Text.White,
    },
    maskContainer: {
        zIndex: 0,
        position: 'absolute',
        width: '100%',
        height: hp(20),
        backgroundColor: Color.Brand.MiniBuffet,
    },
    descriptionText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
    },
    dateText: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black
    },
    sectionContainer: {
        paddingVertical: hp(16),
        paddingHorizontal: wp(24),
        borderRadius: 16,
        marginTop: hp(16),
        backgroundColor: '#FFF'
    },
    headerText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Grey,
        marginBottom: hp(20)
    },
    utensilContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(16),
        paddingVertical: hp(8),
        backgroundColor: Color.Background.Card,
        borderRadius: wp(8)
    },
    utensilText: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        textAlign: 'right'
    },
    icon: {
        width: wp(24),
        height: wp(24),
        marginRight: wp(16),
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniBuffetCartScreen)