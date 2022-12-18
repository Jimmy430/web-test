import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import moment from 'moment'

import { Header, PostcodeIndicator, MiniBuffetMenuComponent } from '@components'
import { Color, wp, hp, Typography } from '@styles'
import { AmplitudeAPI, Events } from '@services'

const mapStateToProps = ({ user, minibuffet }) => ({
    selectedAddress: user.selectedAddress,

    productList: minibuffet.productList,
    servingDate: minibuffet.servingDate,
    servingTime: minibuffet.servingTime,
    searchInfo: minibuffet.searchInfo,
})

const MiniBuffetMenuScreen = ({ selectedAddress, productList, servingDate, servingTime, searchInfo, navigation }) => {
    const { guests } = searchInfo

    useEffect(() => {
        AmplitudeAPI.track(Events.NAVI.MINIBUFFET.MENU)
    }, [])

    const toSelectionPage = () => {
        navigation.goBack()
    }

    const toProductPage = (product) => {
        navigation.navigate('MiniBuffetProduct', { product })
    }

    const _renderProducts = () => (
        <MiniBuffetMenuComponent.MenuList
            menus={productList}
            onChooseProduct={(item) => toProductPage(item)}
        />
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header
                    whiteBackArrow={true}
                    headerRightRow={
                        <PostcodeIndicator
                            isDarkMode={true}
                            postcode={selectedAddress.postcode}
                            style={styles.communityContainer}
                        />
                    }
                />
                <View style={{ paddingVertical: hp(16), paddingHorizontal: wp(24) }}>
                    <Text style={styles.dateText}>Day/guest</Text>
                    <MiniBuffetMenuComponent.DateSelector
                        date={moment(servingDate)}
                        guests={guests}
                        onClick={toSelectionPage}
                    />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <MiniBuffetMenuComponent.MealtimeIndicator
                    mealtimeID={servingTime.mealtime.id}
                    timeStr={servingTime.time}
                />
                <View style={styles.productListContainer}>
                    {_renderProducts()}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        backgroundColor: Color.Brand.MiniBuffet,
        paddingBottom: hp(16)
    },
    contentContainer: {
        flex: 1,
        top: hp(-16),
        borderRadius: wp(16),
        paddingBottom: hp(40),
        backgroundColor: Color.Background.Base,
    },
    productListContainer: {
        paddingHorizontal: wp(24),
        paddingTop: hp(24),
        backgroundColor: Color.Text.White
    },
    dateText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.White
    },
    communityContainer: {
        paddingTop: hp(4)
    }
});

export default connect(mapStateToProps)(MiniBuffetMenuScreen)