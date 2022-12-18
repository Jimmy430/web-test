import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'

import { hp, wp } from '@styles'
import RadioButton from './RadioButton'

// type option {
//     id: String | Number
//     label: String
//     value: String | Number
// }

// type buttonProps {
//     activeColor: String
//     containerStyle: StyleProps<View>
//     labelStyle: StyleProps<Text>
//     size: Number,
//     layout: 'row' | 'column'
// }

export default function RadioButtonGroup({
    options,
    currentOption,
    onChooseOption,
    layout = 'column',
    buttonProps,
    containerStyle
}) {

    const separatorStyle = useMemo(() => layout === 'row' ? { width: wp(16) } : { height: hp(16) }, [layout])

    const onButtonPress = (id) => {
        const selectedOption = options.find(option => option.id === id)
        onChooseOption(selectedOption)
    }

    const _keyExtractor = (item) => item.id

    const _renderItem = ({ item }) => {
        return (
            <RadioButton
                {...buttonProps}
                id={item.id}
                label={item.label}
                onPress={onButtonPress}
                selected={item.id === currentOption.id}
                disabled={!!item.discription}
                description={item.discription}
            />
        )
    }


    return (
        <View style={[containerStyle, { flexDirection: layout }]}>
            <FlatList
                data={options}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                contentContainerStyle={{ flexDirection: layout }}
                horizontal={layout === 'row'}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={separatorStyle} />}
            />
        </View>
    )
}