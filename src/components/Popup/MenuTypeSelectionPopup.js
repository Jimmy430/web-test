import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { CommunityUsage, Icons, MenuTypes } from '@common'
import { wp, hp, Typography, Color } from '@styles'

import BottomSlideModal, { SlideIndicator } from '../BottomSlideModal'
import WarningPopup from './WarningPopup'

/**
 * 
 * @param {boolean} visibility use to control popup display status
 * @param {array} types datas to show on popup
 * @param {object} cartCounts use to check how many item in every carts
 * @param {function} clearCart function of Redux to clear carts
 * @param {function} onClose function to trigger when component colsed
 * 
 */

const MenuTypeSelectionPopup = ({ visibility, types, onClose, cartCounts, clearCart }) => {

    const navigation = useNavigation()
    const [showCheckPopup, setShowCheckPopup] = useState(false)
    const [currentChooseType, setCurrentChooseType] = useState(MenuTypes.MealBox)

    const cardPress = (mealType) => {
        setCurrentChooseType(mealType)
        if (checkCarts(mealType)) {
            setShowCheckPopup(true)
        } else {
            navigateToScreen(mealType)
        }
    }

    const checkCarts = (mealType) => {
        const otherMenuTypeCarts = Object.keys(cartCounts)
            .filter((key) => key !== mealType)
            .map((key) => {
                return {
                    type: key,
                    value: cartCounts[key]
                }
            })

        const needToClean = otherMenuTypeCarts.filter(c => c.value > 0).length > 0

        return needToClean
    }

    const onWarningConfrim = () => {
        clearCart()
        setShowCheckPopup(false)
        navigateToScreen(currentChooseType)
    }

    const navigateToScreen = (menuType) => {
        switch (menuType) {
            case MenuTypes.MealBox:
                navigation.navigate('MealBoxMenu')
                onClose()
                break
            case MenuTypes.MiniBuffet:
                onClose(MenuTypes.MiniBuffet)
                break
        }

    }

    const _renderItem = ({ item, index }) => {
        const { mealType, content, deliveryFee } = item
        const counts = cartCounts[mealType]
        const isInCart = counts > 0

        return (
            <TouchableOpacity onPress={() => cardPress(mealType)}>
                <View style={styles.cardTopContainer}>
                    {isInCart &&
                        <>
                            <View style={styles.maskContainer} />
                            <View style={styles.badgeContainer}>
                                <View style={styles.iconContainer}>
                                    <Image style={styles.icon} source={Icons.Cart_Fill} resizeMode="contain" />
                                </View>
                                <Text style={styles.textBadge}>{counts} in cart</Text>
                            </View>
                        </>
                    }
                    <Image style={styles.img} source={item.image} resizeMode="cover" />
                </View>
                <View style={[styles.cardBottomContainer, isInCart && styles.choosed]}>
                    <Text style={styles.textSubHeader}>{mealType}</Text>
                    <View style={{ alignItems: 'flex-start' }}>
                        {deliveryFee.tier === 5 ?
                            <View style={[styles.deliveryFeeContainer, { backgroundColor: '#2B4D3C' }]}>
                                <Text style={styles.freeDeliveryFeeText}>Free delivery *</Text>
                            </View>
                            :
                            <View style={[styles.deliveryFeeContainer, { backgroundColor: CommunityUsage[deliveryFee.tier].color }]}>
                                <Text style={styles.deliveryFeeText}>${deliveryFee.fee}</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.cardContentContainer}>
                        <Text style={styles.textContent}>{content}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const _renderWarningPopup = () => {
        return (
            <WarningPopup
                visible={showCheckPopup}
                title="Reset your cart"
                content={`Are you sure you want to change your order type to ${currentChooseType}?`}
                onClose={() => setShowCheckPopup(prev => !prev)}
                onCancel={() => setShowCheckPopup(prev => !prev)}
                onConfrim={onWarningConfrim}
            />
        )
    }

    const _renderMenuTypes = () => {

        if (types.length === 0)
            return (
                <View style={styles.noTypeContainer}>
                    <Text style={styles.textSubHeader}>We are working hard to recruit sufficient drivers to resume our service in your area.</Text>
                </View>
            )

        return (
            <View style={styles.contentContainer}>
                <FlatList
                    data={types}
                    renderItem={_renderItem}
                    contentContainerStyle={{ paddingBottom: hp(40) }}
                    keyExtractor={(_, index) => 'MenuType_' + index}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        )
    }

    return (
        <BottomSlideModal
            visibility={visibility}
            onClose={() => onClose()}
        >
            <View style={styles.container}>
                <SlideIndicator />
                <Text style={styles.textHeader}>Choose order format</Text>
                {_renderMenuTypes()}
            </View>
            {_renderWarningPopup()}
        </BottomSlideModal>
    )
}

export default MenuTypeSelectionPopup

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.Background.Base,
        borderTopLeftRadius: wp(16),
        borderTopRightRadius: wp(16),
    },
    contentContainer: {
        marginTop: hp(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        height: hp(24)
    },
    choosed: {
        borderColor: Color.Brand.Primary
    },
    maskContainer: {
        position: 'absolute',
        zIndex: 1,
        opacity: .9,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: wp(16),
        borderTopRightRadius: wp(16),
        backgroundColor: Color.Text.Black,
    },
    cardTopContainer: {
        width: wp(328),
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    cardBottomContainer: {
        paddingHorizontal: wp(24),
        paddingVertical: hp(24),
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderColor: Color.Background.Card,
        backgroundColor: Color.Text.White,
    },
    cardContentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: hp(16)
    },
    iconContainer: {
        width: wp(22),
        aspectRatio: (22 / 20),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp(4),
    },
    badgeContainer: {
        position: 'absolute',
        zIndex: 1,
        top: hp(55),
        borderRadius: 8,
        paddingHorizontal: wp(8),
        paddingVertical: hp(4),
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.Brand.Primary,
    },
    deliveryFeeContainer: {
        paddingHorizontal: wp(8),
        paddingVertical: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: hp(8)
    },
    noTypeContainer: {
        paddingHorizontal: wp(24),
        paddingTop: hp(16),
        paddingBottom: hp(40)
    },
    textHeader: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
        marginHorizontal: wp(24)
    },
    textSubHeader: {
        ...Typography.SubTitle_16,
        color: Color.Text.Black
    },
    deliveryFeeText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.White,
        lineHeight: hp(19.6)
    },
    freeDeliveryFeeText: {
        fontSize: wp(14),
        fontStyle: 'italic',
        color: Color.Text.White,
        lineHeight: hp(19.6)
    },
    textContent: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black
    },
    textBadge: {
        ...Typography.SubTitle_14,
        color: Color.Text.White
    },
    icon: {
        width: wp(22),
        height: wp(20),
        marginRight: wp(4),
        tintColor: Color.Text.White
    },
    imgContainer: {
        width: wp(72),
        aspectRatio: 1,
    },
    img: {
        width: '100%',
        height: hp(138),
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    }
})



