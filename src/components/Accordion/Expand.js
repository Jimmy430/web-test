import React, { useState, useEffect, useContext } from "react";
import { LayoutAnimation, StyleSheet, Platform, UIManager } from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { MinibuffetContext } from '@context'
import { Color, hp, wp } from "@styles";

const DURATION = 400

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Expand = ({
    componentName,
    headerComponent,
    headerComponentStyle,
    contentComponent,
    contentComponentStyle,
}) => {

    const { activeComponentName, setActiveComponentName } = useContext(MinibuffetContext.SelectorContext)
    const [expanded, setExpand] = useState(false);

    const header = useSharedValue(1)

    useEffect(() => {
        if (expanded) setActiveComponentName(componentName)
        header.value = withTiming(expanded ? 0 : 1, { duration: DURATION })
    }, [expanded])

    useEffect(() => {
        const isExpand = activeComponentName === componentName
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: DURATION
        })
        setExpand(isExpand)
    }, [activeComponentName])

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            borderBottomLeftRadius: header.value * 16,
            borderBottomRightRadius: header.value * 16,
        }
    }, [])

    const _toggle = () => {
        LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.easeInEaseOut,
            duration: DURATION
        })
        setExpand(prev => !prev)
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={_toggle}>
                <Animated.View style={[styles.headerContainer, headerComponentStyle, headerAnimatedStyle]}>
                    {headerComponent}
                </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.contentContainer, contentComponentStyle, { height: expanded ? null : 0, opacity: expanded ? 1 : 0 }]}>
                {contentComponent}
            </Animated.View>
        </>
    )
}

export default Expand


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: wp(24),
        paddingVertical: hp(24),
        backgroundColor: Color.Text.White,
    },
    contentContainer: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        backgroundColor: Color.Text.White,
    },
});
