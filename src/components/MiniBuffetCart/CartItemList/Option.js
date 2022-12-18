import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, hp, Typography } from '@styles'


import OptionVariant from './OptionVariant'

export default function Option({ info, sets }) {
    const filterOutDuplicateSets = [...new Set(sets[0])];

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{info.vendor.name}</Text>
                {filterOutDuplicateSets.map((variantId, index) => {
                    const optionInfo = info.variants.find(variant => variant.id === variantId)
                    return (
                        <OptionVariant
                            key={variantId + index}
                            info={optionInfo}
                            productName={info.title}
                            isMultipleVariant={info.variants.length > 1}
                        />
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp(16),
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1
    },
    nameText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Grey
    }
})