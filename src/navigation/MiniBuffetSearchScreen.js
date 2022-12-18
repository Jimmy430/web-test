import React, { useState, useEffect, createContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import moment from 'moment'

import { AmplitudeAPI, Events } from '@services'
import { Color, hp, Typography, wp } from '@styles'
import { minibuffetOps } from '@appRedux/operations'
import { Header, AccortionItem, MiniBuffetMenuComponent, Loading } from '@components'
import { MinibuffetContext } from '@context'
import { FormatShopifyImage } from '@common'

const mapStateToProps = ({ user, minibuffet }) => ({
    isDev: user.userInfo.email === 'lastminuteorder@living.menu',
    groupIds: user.selectedAddress.menuGroups.map(mg => mg.id),
    minibuffetDateList: minibuffet.dateList,
    searchInfo: minibuffet.searchInfo
})

const mapDispatchToProps = {
    fetchProducts: minibuffetOps.fetchMenuByCondition,
    updateInfo: minibuffetOps.updateSearchInfo
}

export const SelectorContext = createContext({
    activeComponentName: null,
    setActiveComponentName: (name) => name
})

const prefetchImages = async (productList) => {
    const imagesToPrefetch = []

    productList.forEach(product => {
        imagesToPrefetch.push(FormatShopifyImage(product.image, 800))
        product.optionList.forEach(option => {
            imagesToPrefetch.push(FormatShopifyImage(option.image, 800))
        })
    })

    await Promise.all(
        imagesToPrefetch.map(imageUrl => {
            Image.prefetch(imageUrl)
        })
    )
}

const MiniBuffetSearchScreen = ({ isDev, groupIds, minibuffetDateList, searchInfo, fetchProducts, updateInfo }) => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [showContactUs, isShowContactUs] = useState(false)
    const [activeComponentName, setActiveComponentName] = useState(null)
    const [date, setDate] = useState(searchInfo.date)
    const [mealtimeId, setMealtimeId] = useState(searchInfo.session)
    const [maxPax, setMaxPax] = useState(searchInfo.guests)

    useEffect(() => {
        AmplitudeAPI.track(Events.NAVI.MINIBUFFET.SEARCH)

        return () => {
            setLoading(false)
            isShowContactUs(false)
        }
    }, [])

    useEffect(() => {
        if (date)
            updateInfo({
                date,
                session: mealtimeId,
                guests: maxPax
            })
    }, [date, mealtimeId, maxPax])


    const searchMenu = async () => {
        if (!date) {
            isShowContactUs(true)
            return
        }

        setLoading(true)
        const servingDate = moment(moment(date).format('YYYY-MM-DD')).utc()
        const isProvide = minibuffetDateList.findIndex(list => moment(list.servingDate).isSame(servingDate)) !== -1

        if (isProvide) {
            AmplitudeAPI.track(Events.OP.MINIBUFFET.SEARCH_MENU, { servingDate, mealtimeId, maxPax })

            const response = await fetchProducts(groupIds, servingDate, mealtimeId, maxPax, isDev)

            if (response?.length > 0) {
                await prefetchImages(response)
                setLoading(false)
                navigation.navigate('MiniBuffetMenu', { guests: maxPax })
                return
            }
        }
        setLoading(false)
        isShowContactUs(true)
    }

    const toRequestScreen = () => {
        isShowContactUs(false)
        navigation.navigate('MiniBuffetRequestFrom', { date: date ? date.format('YYYY-MM-DD') : 'date undecided', mealtimeId, maxPax })
    }

    const _renderLoading = () => (
        <Modal
            visible={loading}
            transparent>
            <View style={{ flex: 1, backgroundColor: Color.modalBackground }}>
                <Loading transparent={true} />
            </View>
        </Modal>
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header whiteBackArrow={true} />
                <View style={styles.headerContentContainer}>
                    <Text style={styles.textHeader}>Mini buffet</Text>
                    <Text style={styles.textHeaderContent}>Order and cancel any time 2 days before your event date by 9pm.</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MinibuffetContext.SelectorContext.Provider value={{ activeComponentName, setActiveComponentName }}>
                        <AccortionItem.CalendarSelection minDate={isDev ? null : moment().add(1, 'day').format('YYYY-MM-DD')} date={date} onDateChange={date => {
                            setDate(moment(date.dateString))
                            setActiveComponentName(null)
                        }} />
                        <AccortionItem.SessionSelection session={mealtimeId} onSessionChange={mealtime => {
                            setMealtimeId(mealtime)
                            setActiveComponentName(null)
                        }} />
                        <AccortionItem.GuestsSelection guests={maxPax} onGuestsChange={pax => {
                            setMaxPax(pax)
                            setActiveComponentName(null)
                        }} />
                    </MinibuffetContext.SelectorContext.Provider>
                </ScrollView>
            </View>
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={searchMenu}>
                    <View style={styles.searchButton}>
                        <Text style={styles.textSearch}>Search menu</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <MiniBuffetMenuComponent.ContactUsPopup
                visible={showContactUs}
                onRequest={toRequestScreen}
                onClose={() => isShowContactUs(false)}
            />
            {_renderLoading()}
        </View>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MiniBuffetSearchScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: Color.Brand.MiniBuffet,
    },
    headerContentContainer: {
        paddingHorizontal: wp(24),
        paddingTop: hp(16),
        paddingBottom: hp(32)
    },
    textHeader: {
        ...Typography.SubTitle_21,
        color: Color.Text.White
    },
    textHeaderContent: {
        ...Typography.BodyRegular_14,
        color: Color.Text.White,
        marginTop: hp(8)
    },
    contentContainer: {
        flex: 1,
        top: hp(-16),
        borderRadius: wp(16),
        paddingHorizontal: wp(24),
        paddingTop: hp(32),
        paddingBottom: hp(40),
        backgroundColor: Color.Background.Base,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderRadius: 16,
        alignSelf: 'center',
        paddingHorizontal: wp(24),
        paddingVertical: hp(24),
        backgroundColor: Color.Text.White,
    },
    searchButton: {
        borderRadius: 16,
        paddingVertical: hp(14.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.Brand.Primary
    },
    textSearch: {
        ...Typography.BodyMedium_16,
        color: Color.Text.White,
    }
})