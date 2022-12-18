import React, { useCallback, useEffect, useState } from 'react'
import { Platform, View, ScrollView, Image, BackHandler, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { useIsFocused, CommonActions } from '@react-navigation/core'
import { connect } from 'react-redux'
import moment from 'moment'

import { CustomStatusBar, InfoCard, Popup } from '@components'
import { appOps, userOps, mealboxOps, minibuffetOps } from '@appRedux/operations'
import { FormatShopifyImage, Icons, MemberShip, MenuTypes, HistoryTabs, MealTypeImages, useOnUpdate } from '@common'
import { Color, wp, hp, Typography } from '@styles'
import { AmplitudeAPI, Events } from '@services'

const mapStateToProps = ({ user, mealbox, minibuffet }) => ({
    accessToken: user.accessToken,
    userInfo: user.userInfo,
    history: user.history,
    selectedAddress: user.selectedAddress,
    unreviewedList: user.unreviewedList,
    unreviewedFreeList: user.unreviewedFreeList,
    shippingAddresses: user.shippingAddresses,
    noticationList: user.notificationList,

    list: mealbox.list,

    cartItems: mealbox.cartItems,
    amount: mealbox.totalAmounts,
    productTotal: mealbox.productTotal,

    minibuffetCartItems: minibuffet.cartItems,
    minibuffetDateList: minibuffet.dateList
})

const mapDispatchToProps = {
    fetchAll: appOps.fetchAll,

    changeAddress: userOps.changeAddress,
    getTodayShippingAddresses: userOps.getTodayShippingAddresses,
    getNotifications: userOps.getNotifications,

    clearCart: mealboxOps.clearCart,
    removeCartItems: mealboxOps.removeCartItems,

    clearCartForMinibuffet: minibuffetOps.clearCart,
}

const HomeScreen = ({ accessToken, userInfo, history, selectedAddress, unreviewedFreeList, unreviewedList, shippingAddresses, noticationList, list, cartItems, amount, productTotal, minibuffetCartItems, minibuffetDateList, clearCart, changeAddress, fetchAll, getTodayShippingAddresses, getNotifications, removeCartItems, chooseProductList, clearCartForMinibuffet, navigation }) => {
    const [addressId, setAddressId] = useState(selectedAddress.id)
    const [showAddressSelector, setShowAddressSelector] = useState(false)
    const [showMealTypeSelector, setShowMealTypeSelector] = useState(false)
    const [showContact, isShowContact] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        AmplitudeAPI.track(Events.NAVI.HOME)

        BackHandler.addEventListener('hardwareBackPress', () => navigation.isFocused())

        return BackHandler.removeEventListener('hardwareBackPress', () => navigation.isFocused())
    }, [])

    useEffect(() => {
        if (isFocused && accessToken) {
            getTodayShippingAddresses()
            getNotifications(userInfo.id)
            if (minibuffetCartItems.length > 0)
                clearCartForMinibuffet()
        }
    }, [isFocused, accessToken])

    useEffect(() => {
        const address = userInfo.addresses.find(address => address.id == addressId)
        changeAddress(address)
    }, [addressId])

    useOnUpdate(() => {
        clearAllCart()
    }, [addressId])

    useEffect(() => {
        const groupIds = selectedAddress.menuGroups.map(mg => mg.id)
        fetchAll(groupIds)
    }, [selectedAddress])

    useEffect(() => {
        cartItems.forEach(item => {
            if (!list.some(product => product.id == item.productId)) {
                removeCartItems(item.productId)
            }
        })
    }, [list])

    const clearAllCart = useCallback(() => {
        clearCart()
        clearCartForMinibuffet()
    }, [])

    const _renderInfoCard = () => {
        const { tier } = userInfo
        const memberShip = MemberShip[tier]
        const { block, address, deliveryFee, menuGroups } = selectedAddress
        const canLateOrder = menuGroups.some(menuGroup => menuGroup.canLateOrder)
        const fullAddress = `Blk ${selectedAddress.block} ${selectedAddress.address}${!selectedAddress.floor ? "" : ` #${selectedAddress.floor.pad()}-${selectedAddress.unit.pad()}`} Singapore ${selectedAddress.postcode}`

        return (
            <InfoCard
                address={fullAddress}
                discount={memberShip.discount}
                deliveryFee={deliveryFee.fee}
                canLateOrder={canLateOrder}
                onAddressClick={() => setShowAddressSelector(true)}
                onDeliveryClick={() => navigation.navigate('membershipAndFee')} />
        )
    }

    const _renderAddressesPopup = () => {
        if (!accessToken) return null

        const { addresses } = userInfo
        const selectorAddresses = addresses.map(address => {
            const value = `Blk ${address.block} ${address.address}${!address.floor ? "" : ` #${address.floor.pad()}-${address.unit.pad()}`} Singapore ${address.postcode}`

            return {
                id: address.id,
                value
            }
        })

        return (
            <Popup.AddressesSelectionPopup
                title="Saved address"
                visibility={showAddressSelector}
                onClose={() => setShowAddressSelector(false)}
                addresses={selectorAddresses}
                currentAddressId={selectedAddress.id}
                chooseAddress={(address) => {
                    setAddressId(address.id)
                }}
            />
        )
    }

    const _renderMenuTypeSelectionPopup = () => {
        if (showMealTypeSelector) {
            const types = [], cartCounts = {}
            cartCounts[MenuTypes.MealBox] = cartItems.length
            cartCounts[MenuTypes.MiniBuffet] = minibuffetCartItems.length

            const { deliveryFee } = selectedAddress

            if (list.length > 0)
                types.push({
                    mealType: MenuTypes.MealBox,
                    content: 'Mix and match from multiple vendors on a daily evolving menu with no markup and no minimum order.',
                    image: MealTypeImages.MealBox,
                    deliveryFee
                })
            if (minibuffetDateList.length > 0)
                types.push({
                    mealType: MenuTypes.MiniBuffet,
                    content: 'Perfect for 8 pax or more. Reimagine mini buffet where every course is the signature dish of a top-rated vendor.',
                    image: MealTypeImages.MiniBuffet,
                    deliveryFee: { tier: 5 }
                })

            return (
                <Popup.MenuTypeSelectionPopup
                    types={types}
                    visibility={showMealTypeSelector}
                    onClose={(menuType) => {
                        setShowMealTypeSelector(false)
                        if (menuType === MenuTypes.MiniBuffet) {
                            if (minibuffetCartItems.length > 0) {
                                const item = minibuffetCartItems[0]
                                const route = CommonActions.reset({
                                    index: 2,
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'MiniBuffetSearch' },
                                        { name: 'MiniBuffetMenu', params: { date: item.servingDate, mealtimeId: item.mealtimeId, menugroupId: item.menugroupId } }
                                    ]
                                })
                                setTimeout(() => navigation.dispatch(route), 50)
                            }
                            else
                                setTimeout(() => navigation.navigate('MiniBuffetSearch'), 50)
                        }
                    }}
                    cartCounts={cartCounts}
                    clearCart={clearAllCart}
                />
            )
        }
    }

    return (
        <SafeAreaInsetsContext.Consumer>{insets =>
            <View style={{ flex: 1, paddingBottom: insets.bottom, backgroundColor: Color.Background.Base }}>
                <CustomStatusBar backgroundColor="#21261D" barStyle="light-content" />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {Platform.OS === 'ios' &&
                        <View
                            style={{
                                backgroundColor: '#21261D',
                                height: 1000,
                                position: 'absolute',
                                top: -1000,
                                left: 0,
                                right: 0,
                            }}
                        />
                    }
                    <View style={[styles.headerContainer, { paddingTop: hp(18) + insets.top }]}>
                        <View style={[styles.headerBackground, { height: hp(154) + insets.top }]} />
                        <View style={styles.titleAndIconsContainer}>
                            <Text style={styles.hello} numberOfLines={1}>Hello, {userInfo.firstName.capped()}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <TouchableOpacity
                                    onPress={() => navigation.navigate('QuickGuide')}>
                                    <Image style={styles.icon}
                                        source={Icons.Guide}
                                        resizeMode="contain" />
                                </TouchableOpacity> */}
                                
                            </View>
                        </View>

                    </View>
                    <View style={styles.contentContainer}>
                        {_renderInfoCard()}
                        <TouchableOpacity style={styles.btnContainer}
                            onPress={() => { setShowMealTypeSelector(true) }}>
                            <Text style={styles.btnText}>View menu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {_renderAddressesPopup()}
                {_renderMenuTypeSelectionPopup()}
            </View>
        }</SafeAreaInsetsContext.Consumer>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: wp(16)
    },
    headerBackground: {
        position: 'absolute',
        width: wp(375),
        backgroundColor: '#21261D'
    },
    contentContainer: {
        top: hp(-16),
        marginTop: hp(72),
        paddingTop: hp(40),
        paddingBottom: hp(16),
        paddingHorizontal: wp(16),
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: Color.Background.Base,
    },
    titleAndIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hello: {
        ...Typography.SubTitle_21,
        color: Color.Text.White
    },
    badge: {
        position: 'absolute',
        right: wp(-5),
        top: hp(-5),
        width: wp(12),
        height: wp(12),
        borderRadius: 99,
        backgroundColor: Color.Brand.Alert
    },
    icon: {
        height: wp(20),
        aspectRatio: 1,
        tintColor: 'white'
    },
    findOutBtn: {
        width: wp(88),
        height: hp(24),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: hp(12),
        marginEnd: wp(16)
    },
    memberShipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'baseline',
        paddingHorizontal: wp(12),
        paddingVertical: hp(2),
        borderRadius: hp(8),
        marginTop: hp(8),
    },
    memberShipNameText: {
        ...Typography.BodyMedium_14,
        color: Color.fontWhite,
    },
    memberShipMonthText: {
        ...Typography.BodyLight_12,
        color: Color.fontWhite,
    },
    itemsLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(8)
    },
    trendingText: {
        ...Typography.SubTitle_16,
        color: Color.Text.Black,
        lineHeight: hp(21),
        marginTop: hp(24),
    },
    btnContainer: {
        width: '100%',
        height: hp(48),
        marginTop: hp(16),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#77C043",
        borderRadius: hp(16),
    },
    btnText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.White,
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)