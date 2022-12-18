import { Color, hp, Typography, wp } from '@styles'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ImageCarousel from '../../ImageCarousel'

const ProductItem = ({ item, onChooseProduct }) => {

    const average = Math.round(item.minPrice / item.maxPax * 100) / 100
    const images = item.image.match(/notfound/) ? [] : [item.image] //start array with cover image
    item.optionList.forEach(option => {
        if (option.images[1] && !option.images[1].match(/notfound/)) {
            images.push(option.images[1]) //push to carousel if has dish photo
        }
    })

    const onPress = () => {
        onChooseProduct(item)
    }

    return (
        <View>
            <ImageCarousel images={images} containerStyle={{ borderRadius: 16 }} onImagePress={onPress} imageDisabled={item.isSoldout} />
            <TouchableOpacity onPress={onPress} disabled={item.isSoldout}>
                <View style={styles.contentContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.average}>Starting from ${average} per guest</Text>
                    </View>
                    {item.isSoldout &&
                        <Text style={styles.soldout}>Sold out</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    contentContainer: {
        paddingRight: wp(8),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(16),
    },
    title: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    average: {
        ...Typography.BodyRegular_16,
        color: Color.Text.Black
    },
    soldout: {
        ...Typography.BodyRegular_16,
        color: Color.Brand.Alert
    }
})