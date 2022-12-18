import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { Color, hp, Typography, wp } from '@styles'

import Option from './Option'

const Item = ({ item, productObject, onEditSet }) => {
    const setObject = productObject.setList.find(set => set.variantId === item.variantId)

    const { variantTitle } = setObject
    const displayVairantTitle = !variantTitle.match(/.+with/)
        ? 'without add-on'
        : `with${variantTitle.split('with')[1]}`
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.titleText}>{setObject.title}</Text>
            <View style={[styles.itemHeaderContainer, styles.row]}>
                <Text style={styles.guestAndDrinkText}>For {item.pax.max} guests • {displayVairantTitle}</Text>
                <TouchableOpacity onPress={() => onEditSet(setObject)}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>
            {item.options.map(option => {
                const optionInfo = setObject.options.find(setOption => setOption.id === option.productId)
                return (
                    <Option
                        key={optionInfo.id}
                        info={optionInfo}
                        sets={option.sets}
                    />
                )
            })}
        </View>
    )
}

export default function CartItemList({
    cartItems,
    productList,
    onEditSet
}) {

    const _keyExtractor = useCallback((item) => item.variantId, [])
    const _renderItem = ({ item, index }) => {
        const productObject = productList.find(menu => menu.id === item.productId)

        return <Item
            item={item}
            productObject={productObject}
            onEditSet={set => onEditSet(set)}
        />
    }

    return (
        <FlatList
            style={{ backgroundColor: Color.Background.Base }}
            data={cartItems}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        paddingVertical: hp(16),
        paddingHorizontal: wp(24),
        borderRadius: 16,
        backgroundColor: '#FFF'
    },
    itemHeaderContainer: {
        justifyContent: 'space-between',
        marginBottom:hp(16)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    separator: {
        marginTop: hp(16)
    },
    titleText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    variantTitleText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black
    },
    guestAndDrinkText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black
    },
    editText: {
        ...Typography.BodyMedium_14,
        color: Color.Brand.Secondary
    }
})