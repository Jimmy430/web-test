import React from "react"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { Icons } from "@common"
import { Color, hp, Typography, wp } from "@styles"

import BottomSlideModal, { SlideIndicator } from "../BottomSlideModal"
import { useNavigation } from "@react-navigation/native"

const AddressItem = ({ address, isSelcted, onPress }) => (
    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => onPress()}>
        <Text style={[itemStyle.text, isSelcted && itemStyle.isSelctedText]}>{address.value}</Text>
        {isSelcted
            ? <View style={[itemStyle.iconContainer, { backgroundColor: Color.Brand.Primary }]}>
                <Image style={itemStyle.icon} source={Icons.Checked_Unfill} />
            </View>
            : <View style={[itemStyle.iconContainer, { backgroundColor: Color.Text.White, borderWidth: 1, borderColor: Color.Background.Line }]} />
        }
    </TouchableOpacity>
)

const itemStyle = StyleSheet.create({
    text: {
        flex: 1,
        ...Typography.BodyRegular_14,
        color: Color.Text.Black,
        lineHeight: wp(20),
        marginEnd: wp(24)
    },
    isSelctedText: {
        color: Color.Brand.Primary,
        ...Typography.BodyMedium_14
    },
    iconContainer: {
        marginTop: hp(4),
        width: wp(24),
        height: wp(24),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 99
    },
    icon: {
        width: wp(10),
        height: wp(10),
    },
})

const AddressesSelectionPopup = ({title, visibility, onClose, addresses, currentAddressId = -1, chooseAddress, canEdit = true }) => {

    const navigation = useNavigation()

    const onEdit = () => {
        onClose()
        navigation.navigate('DeliveryList')
    }

    return (
        <BottomSlideModal
            visibility={visibility}
            onClose={onClose}
            isActionMode={true}
        >
            <View style={styles.container}>
                <SlideIndicator />
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {canEdit &&
                        <TouchableOpacity onPress={onEdit}>
                            <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                    }
                </View>
                <FlatList
                    style={{ marginTop: hp(16) }}
                    data={addresses}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <AddressItem address={item} isSelcted={item.id === currentAddressId} onPress={() => chooseAddress(item)} />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
                <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
                    <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
            </View>
        </BottomSlideModal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.Text.White,
        paddingHorizontal: wp(24),
        paddingBottom: hp(40),
        borderRadius: hp(16),
        overflow: 'hidden'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        ...Typography.SubTitle_21,
        color: Color.Text.Black,
        lineHeight: wp(30),
    },
    editText: {
        ...Typography.BodyMedium_16,
        color: Color.Brand.Secondary
    },
    separator: {
        width: '100%',
        height: hp(16)
    },
    doneBtn: {
        width: '100%',
        height: hp(48),
        marginTop: hp(32),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Brand.Primary,
        borderRadius: hp(16),
    },
    doneText: {
        ...Typography.SubTitle_16,
        color: Color.Text.White
    }
})

export default AddressesSelectionPopup