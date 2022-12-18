import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
// import CalendarPicker from "react-native-calendar-picker";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';

import { Color, hp, Typography, wp } from "@styles";
import Accordion from "../Accordion";
import { Icons } from "@common";

const MIN_DATE = moment().add(1, 'day').format('YYYY-MM-DD')
const DEFAULT_DATE = moment().add(2, 'day')

const CalendarSelection = ({ minDate = MIN_DATE, name = '', date, onDateChange }) => {

    const _renderArrow = (direction) => {
        switch (direction) {
            case 'left':
                return (
                    <Image
                        source={Icons.ArrowHeadDown}
                        style={[styles.arrowIcon, { transform: [{ rotate: '90deg' }] }]}
                        resizeMode="center"
                    />
                )
            case 'right':
                return (
                    <Image
                        source={Icons.ArrowHeadDown}
                        style={[styles.arrowIcon, { transform: [{ rotate: '-90deg' }] }]}
                        resizeMode="center"
                    />
                )
        }
    }

    return (
        <View style={styles.container}>
            <Accordion.Expand
                componentName={'CalendarSelection' + name}
                headerComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.textHeader}>Date of event</Text>
                        <Text style={styles.textDate}>{date ? moment(date).format('ddd, DD MMM YYYY') : "Undecided"}</Text>
                    </View>
                }
                contentComponent={
                    <View style={styles.contentContainer}>
                        <Calendar
                            initialDate={date.format('YYYY-MM-DD') || DEFAULT_DATE.format('YYYY-MM-DD')}
                            minDate={minDate}
                            onDayPress={onDateChange}
                            renderHeader={date => <Text style={styles.textDate}>{moment(date.toString()).format('YYYY - MM')}</Text>}
                            renderArrow={_renderArrow}
                            firstDay={1}
                            markedDates={{
                                [date.format('YYYY-MM-DD')]: {selected: true, selectedColor: Color.Brand.MiniBuffet},
                            }}
                            // disableAllTouchEventsForDisabledDays={true}
                        />
                        <View style={{ height: hp(24) }} />
                        <TouchableOpacity onPress={() => { onDateChange(null) }}>
                            <Text style={styles.undecideText}>I'm undecided on the date yet.</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default CalendarSelection

const styles = StyleSheet.create({
    container: {
        marginBottom: hp(24)
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textHeader: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Grey,
    },
    textDate: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    contentContainer: {
        paddingBottom: hp(24),
        justifyContent: 'space-between'
    },
    undecideText: {
        alignSelf: 'flex-end',
        ...Typography.BodyMedium_14,
        color: Color.Text.Black,
        marginRight: wp(16),
        textDecorationLine: 'underline'
    },
    arrowIcon: {
        width: wp(16),
        aspectRatio: 1,
        tintColor: Color.Text.Black
    }
});