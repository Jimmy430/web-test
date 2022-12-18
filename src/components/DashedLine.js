
import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const DashedLine = ({ axis = 'horizontal', dashGap = 2, dashLength = 4, dashThickness = 2, dashColor = '#000', dashStyle, style, }) => {
    const [lineLength, setLineLength] = useState(0);
    const isRow = axis === 'horizontal';
    const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

    const dashStyles = useMemo(() => ({
        width: isRow ? dashLength : dashThickness,
        height: isRow ? dashThickness : dashLength,
        marginRight: isRow ? dashGap : 0,
        marginBottom: isRow ? 0 : dashGap,
        backgroundColor: dashColor,
    }), [dashColor, dashGap, dashLength, dashThickness, isRow]);

    return (
        <View
            onLayout={event => {
                const { width, height } = event.nativeEvent.layout;
                setLineLength(isRow ? width : height);
            }}
            style={[style, isRow ? styless.row : styless.column]}
        >
            {[...Array(numOfDashes)].map((_, i) => {
                return <View key={i} style={[dashStyles, dashStyle]} />;
            })}
        </View>
    );
};

export default DashedLine

const styless = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
});