import React, { useCallback } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'

import { hp, wp, Typography, Color } from '@styles'

export default function OptionList({ data, sequence }) {

    const _keyExtractor = useCallback((item) => item.id, [])
    const _renderItem = useCallback(({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: item.image }}
                />
                <View style={styles.infoContainer}>
                    <View style={styles.productTitleContainer}>
                        <Text style={styles.vendorText}>{item.vendor}</Text>
                        {sequence &&
                            <View style={styles.sequenceContainer}>
                                <Text style={styles.sequenceText}>V{sequence}</Text>
                            </View>
                        }
                    </View>
                    {item.variants?.map(variant => {
                        const isOriginal = variant.title === 'Original' || variant.title === ''
                        return (
                            <View key={variant.id} style={styles.variantContainer}>
                                <Text style={[styles.variantText, { flex: 1 }]}>{item.title}{!isOriginal && ' • '+variant.title}</Text>
                                <Text style={styles.variantText}>x {variant.quantity}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }, [])

    return (
        <FlatList
            data={data}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: hp(24),
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1,
        marginLeft: wp(16)
    },
    vendorText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Grey
    },
    image: {
        width: wp(48),
        aspectRatio: 1,
        borderRadius: 8
    },
    variantContainer: {
        marginTop: hp(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    variantText: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black
    },
    productTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    sequenceContainer: {
        paddingHorizontal: wp(8),
        paddingVertical: hp(4),
        borderRadius: 16,
        backgroundColor: Color.Brand.Secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sequenceText: {
        ...Typography.BodyMedium_12,
        color: Color.Text.White
    }
})