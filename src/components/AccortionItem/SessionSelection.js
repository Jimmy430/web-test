import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MealTimeButtons } from "@common";
import { Color, hp, Typography, wp } from "@styles";
import Accordion from "../Accordion";
import { TouchableOpacity } from "react-native-gesture-handler";

const SessionButtons = [
    MealTimeButtons.Lunch,
    MealTimeButtons.TeaBreak,
    MealTimeButtons.Dinner,
    MealTimeButtons.Other
]

const SessionSelection = ({ name = '', session, onSessionChange }) => {

    const formateSession = (value) => SessionButtons.find(session => session.value === value).label

    const _renderItems = () => {
        return (
            <View style={styles.contentContainer}>
                {SessionButtons.map((option, idx) => {
                    const isChoosed = option.value === session
                    return (
                        <TouchableOpacity key={'SessionButton_' + idx}  onPress={() => onSessionChange(option.value)}>
                            <View style={[styles.optionContainer, isChoosed && styles.optionChoosed]}>
                                <Text style={styles.textOption}>{option.label} {option.value < 99 && '-'} {option.mealtime}</Text>
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
                componentName={'SessionSelection' + name}
                headerComponent={
                    <View style={styles.headerContainer}>
                        <Text style={styles.textHeader}>Session</Text>
                        <Text style={styles.textSession}>{formateSession(session)}</Text>
                    </View>
                }
                contentComponent={_renderItems()}
            />
        </View>
    )
}

export default SessionSelection

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
    textSession: {
        ...Typography.BodyMedium_16,
        color: Color.Text.Black
    },
    contentContainer: {
        marginHorizontal: wp(24),
        paddingTop: hp(8),
        paddingBottom: hp(24),
        overflow: 'hidden',
        borderTopWidth: 1,
        borderColor: Color.Background.Card
    },
    optionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
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