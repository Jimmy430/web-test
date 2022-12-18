import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { wp, hp, Color, Typography } from '@styles'

const VariantsGroupButton = ({
    singleVariantLabel,
    variants,
    currentId,
    onSelectedChange
}) => {

    if (!!singleVariantLabel) {
        return (
            <View style={styles.container}>
                <View style={[styles.optionContainer, styles.selectedContainer]}>
                    <Text style={styles.optionText}>{singleVariantLabel}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.multipleContainer}>
            {variants?.map((variant, index) => {
                const isSelected = variant.id == currentId
                return (
                    <View key={index} style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.optionContainer, isSelected && styles.selectedContainer]}
                            disabled={!onSelectedChange}
                            onPress={() => {
                                onSelectedChange(variant.id)
                            }}>
                            <Text style={styles.optionText}>{variant.title}</Text>
                        </TouchableOpacity>
                    </View>
                    
                )
            })}
        </View>
    )
}

export default VariantsGroupButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    multipleContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-end',
    },
    optionContainer: {
        width: wp(327),
        paddingHorizontal: wp(16),
        paddingVertical: hp(13),
        backgroundColor: Color.Background.Base,
        borderRadius: 8,
        borderColor: Color.Background.Line,
        marginTop: hp(8)
    },
    selectedContainer: {
        backgroundColor: Color.Background.Brand.Primary,
        borderColor: Color.Brand.Primary,
        borderWidth: 1
    },
    optionText: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    separator: {
        height: '100%',
        width: wp(8)
    }
})