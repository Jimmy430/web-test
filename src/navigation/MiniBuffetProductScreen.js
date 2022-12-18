import React, { useState, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'

import { minibuffetOps } from '@appRedux/operations'
import { ImageCarousel, MiniBuffetMenuComponent, RadioButtonGroup } from '@components'
import { Color, hp, Typography, wp } from '@styles'
import { Icons, EditAddressFrom } from '@common'

const mapStateToProps = ({ user }) => ({
    accessToken: user.accessToken
})

const mapDispatchToProps = {
    updateCartItem: minibuffetOps.updateCartItem,
    removeCartItem: minibuffetOps.removeCartItem,
}

const MiniBuffetProductScreen = ({ accessToken, updateCartItem, removeCartItem }) => {
    const navigation = useNavigation()
    const route = useRoute()
    const { product } = route.params

    const optionImages = []
    product.optionList.forEach(option => {
        if (option.images[1] && !option.images[1].match(/notfound/)) {
            optionImages.push(option.images[1])
        }
    })

    const setList = product.setList.map((set, idx) => {
        const { variantTitle } = set
        const displayVairantTitle = !variantTitle.match(/.+with/)
            ? 'without Drinks'
            : `with${variantTitle.split('with')[1]}`
        return {
            id: set.variantId,
            label: displayVairantTitle,
            value: idx,
            discription: set.inventory <= 0 ? 'Sold out' : null
        }
    })

    const [currentItem, setCurrentItem] = useState(setList.find(set => set.discription !== 'Sold out'))

    useEffect(() => navigation.addListener('beforeRemove', (e) => {
        removeCartItem(product.setList[currentItem.value].variantId)
    }), [])

    const checkLogin = () => {
        if (!accessToken) {
            navigation.navigate('SignUp', { from: EditAddressFrom.NEW.MINIBUFFET })
        } else {
            navigation.navigate('MiniBuffetCart')
        }
    }

    const _renderRadioButtonGroup = () => {
        return (
            <RadioButtonGroup
                options={setList}
                currentOption={currentItem}
                onChooseOption={(item) => {
                    setCurrentItem(item)
                }}
                containerStyle={{ marginTop: hp(32) }}
            />
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: Color.Background.Base }}>
                <Pressable style={styles.pressable} onPress={() => navigation.goBack()}>
                    <Image source={Icons.ArrowHeadDown_Fill} style={styles.icon} />
                </Pressable>
                <ImageCarousel
                    images={optionImages}
                    componentWidth={wp(375)}
                    componentHeight={hp(256)}
                />
                <View style={styles.headerContainer}>
                    <Text style={styles.textHeader}>{product.title}</Text>
                    {_renderRadioButtonGroup()}
                </View>
                <View style={styles.contentContainer}>
                    <MiniBuffetMenuComponent.ProductOptionList
                        product={product.setList[currentItem.value]}
                        onConfirm={(updateItem) => {
                            updateCartItem(updateItem)
                            checkLogin()
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniBuffetProductScreen)

const styles = StyleSheet.create({
    pressable: {
        position: 'absolute',
        zIndex: 99,
        top: hp(64),
        left: wp(24),
    },
    icon: {
        width: wp(24),
        height: wp(24),
        transform: [
            { rotate: '90deg' }
        ],
    },
    headerContainer: {
        paddingVertical: hp(16),
        paddingHorizontal: wp(24),
        backgroundColor: Color.Text.White
    },
    textHeader: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black
    },
    radioGroup: {
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 0
    },
    contentContainer: {
        marginTop: hp(16),
        backgroundColor: Color.Text.White
    }
})