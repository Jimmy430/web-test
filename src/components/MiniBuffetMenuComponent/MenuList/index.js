import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

import { hp } from '@styles'
import ProductItem from './ProductItem'

export default function MenuList({ menus, onChooseProduct }) {

    const _keyExtractor = (item) => 'MinibuffetProductItem_' + item.id

    const _renderItem = ({ item, index }) => {
        return (
            <ProductItem
                item={item}
                onChooseProduct={onChooseProduct}
            />
        )
    }

    return (
        <FlatList
            data={menus}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
        />

    )
}

const styles = StyleSheet.create({
    separator: {
        height: hp(16)
    }
})