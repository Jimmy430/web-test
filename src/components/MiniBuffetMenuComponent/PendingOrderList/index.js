import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import moment from 'moment'

import { Color, FontType, wp, hp, Typography } from '@styles';
import PendingItem from './PendingItem'

const PendingOrderList = ({ sectionList, onOpenInfo, onCancelItem }) => {

    const _renderServingDate = (section) => {
        let quantities = 0
        const servingDateOrders = section.data[0]
        servingDateOrders.forEach(servingTimeOrders => {
            servingTimeOrders.data.forEach(order => {
                quantities += order.quantity
            })
        })

        return (
            <View style={styles.servingDateContainer}>
                <Text style={styles.servingDate}>{moment(section.title).format('ddd, D MMM')}</Text>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{quantities}</Text>
                </View>
            </View>
        )
    }

    const _renderServingTimeOrders = (servingTime) => {
        return (
            <SectionList
                style={{ flex: 1, width: '100%' }}
                sections={servingTime}
                keyExtractor={(item, index) => index + item.title}
                renderItem={({ item, section }) => (
                    <PendingItem
                        item={item}
                        onClickCard={() => onOpenInfo(item)}
                        onClickCancel={() => onCancelItem(item)}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderSectionHeader={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
            />
        )
    }

    return (
        <SectionList
            style={{ flex: 1, width: '100%', marginBottom: hp(24) }}
            sections={sectionList}
            keyExtractor={(item, index) => index + item.title}
            renderItem={({ item }) => _renderServingTimeOrders(item)}
            renderSectionHeader={({ section }) => _renderServingDate(section)}
            showsVerticalScrollIndicator={false}
            stickySectionHeadersEnabled={false}
        />
    )
}

const styles = StyleSheet.create({
    servingDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(16),
        marginBottom: hp(8)
    },
    servingDate: {
        ...Typography.SubTitle_14,
        color: Color.Text.Black,
        marginLeft: wp(24)
    },
    amountContainer: {
        alignSelf: 'baseline',
        paddingVertical: hp(2),
        paddingHorizontal: wp(12),
        borderRadius: wp(12),
        backgroundColor: Color.Background.Card,
        marginStart: wp(8)
    },
    amount: {
        ...Typography.SubTitle_14,
        color: Color.Text.Black
    },
    separator: {
        height: hp(16)
    },
})

export default PendingOrderList