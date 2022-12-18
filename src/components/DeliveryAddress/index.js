import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import DeliveryAddressRow from './DeliveryAddressRow'
import { wp, hp } from '@styles'
import ModifyPopup from './ModifyPopup'
import DeletePopup from './DeletePopup'

const DeliveryAddresses = ({ addresses, currentAddress, selectAddress, deleteAddress, toEditPage }) => {
    const [selectedAddress, setSelectedAddress] = useState(currentAddress)
    const [showModify, setShowModify] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    if (addresses.length > 1) {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={addresses}
                    contentContainerStyle={styles.container}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const isSelected = item.id == currentAddress.id

                        return <DeliveryAddressRow
                            address={item}
                            isSelected={isSelected}
                            onItemClick={() => selectAddress(item)}
                            onEditClick={(address) => {
                                setSelectedAddress(address)
                                setShowModify(true)
                            }}
                        />
                    }}
                    ItemSeparatorComponent={() => <View style={{ height: hp(16) }} />}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => <View style={{ height: hp(60) }} />}
                />
                <ModifyPopup
                    visible={showModify}
                    address={selectedAddress}
                    onEditClick={(address) => {
                        setShowModify(false)
                        toEditPage(address)
                    }}
                    onDeleteClick={() => {
                        setShowModify(false)
                        setShowDelete(true)
                    }}
                    onClose={() => setShowModify(false)}
                />
                <DeletePopup
                    visible={showDelete}
                    address={selectedAddress}
                    onCancel={() => {
                        setShowDelete(false)
                    }}
                    onConfirm={(id) => {
                        setShowDelete(false)
                        setShowModify(false)
                        deleteAddress(id)
                    }}
                    onClose={() => setShowDelete(false)}
                />
            </View>
        )
    }

    const address = addresses[0]
    return (
        <View style={styles.container}>
            <DeliveryAddressRow
                address={address}
                isSelected={true}
                selectable={false}
                onItemClick={() => toEditPage(address)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp(24),
        marginTop: hp(32)
    },
})

export default DeliveryAddresses