import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { GuestButtons } from "@common";
import { Color, hp, Typography, wp } from "@styles";
import Accordion from "../Accordion";

const GuestsSelection = ({ name = '', guests, onGuestsChange }) => {

    const formateGuests = (value) => GuestButtons.find(guest => guest.value === value).label

    const _renderItems = () => {
        return (
            <View style={styles.contentContainer}>
                {GuestButtons.map((option, idx) => {
                    const isChoosed = option.value === guests
                    return (
                        <TouchableOpacity key={'GuestButton_' + idx} onPress={() => onGuestsChange(option.value)}>
                            <View style={[styles.optionContainer, { marginRight: wp(16) }, isChoosed && styles.optionChoosed]}>
                                <Text style={styles.textOption}>{option.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Accordion.Expand
                componentName={'GuestsSelection' + name}
                headerComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.textHeader}>Number of guests</Text>
                        <Text style={styles.textGuests}>{formateGuests(guests)}</Text>
                    </View>
                }
                contentComponent={_renderItems()}
            />
        </View>
    )
}

export default GuestsSelection

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
    textGuests: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    contentContainer: {
        marginHorizontal: wp(24),
        paddingTop: hp(8),
        paddingBottom: hp(24),
        overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTopWidth: 1,
        borderColor: Color.Background.Card
    },
    optionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(65),
        paddingVertical: hp(8),
        marginTop: hp(16),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Color.Background.Line,
        backgroundColor: Color.Background.Base
    },
    optionChoosed: {
        borderColor: Color.Brand.Primary,
        backgroundColor: Color.Background.Brand.Primary
    },
    textOption: {
        ...Typography.BodyMedium_14,
        color: Color.Text.Black
    }
});