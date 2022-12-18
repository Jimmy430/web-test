import React, { useCallback, useState, useMemo } from 'react'
import { FlatList, StyleSheet, View, Image } from 'react-native'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { BlurView } from 'expo-blur';
// import { Image } from 'react-native-elements'

import { wp, hp } from '@styles'
import { FormatShopifyImage } from '@common'
import Paginator from './Paginator'

const ReanimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ImageCarousel = ({ images, componentWidth = wp(328), componentHeight, imageStyle, containerStyle, paginatorStyle, onImagePress, imageDisabled = false }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const scrollX = useSharedValue(0)
    const flatlistRef = useAnimatedRef(null)

    const sizeStyle = useMemo(() => ({
        width: componentWidth,
        height: componentHeight || componentWidth,
    }), [componentWidth, componentHeight])


    const scrollToActiveIndex = (index) => {
        setActiveIndex(index)
        flatlistRef?.current?.scrollToOffset({
            offset: index * componentWidth,
            animated: true
        })
    }

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });


    const _keyExtractor = useCallback((_, idx) => 'ImageCarouselItem_' + idx, [])

    const _renderImage = useCallback(({ item }) => {
        const imageStr = FormatShopifyImage(item, 800)
        return (
            <TouchableWithoutFeedback onPress={onImagePress} disabled={imageDisabled}>
                <Image style={[imageStyle, sizeStyle]} source={{ uri: imageStr }} placeholderStyle={{ opacity: .1 }} />
            </TouchableWithoutFeedback>
        )
    }, [])

    const _getItemLayout = useCallback((data, index) => {
        return {
            length: componentWidth,
            offset: componentWidth * index,
            index
        }
    }, [])

    return (
        <View style={[styles.container, containerStyle, sizeStyle]}>
            <ReanimatedFlatList
                ref={flatlistRef}
                data={images}
                style={[styles.flatlist, sizeStyle]}
                keyExtractor={_keyExtractor}
                renderItem={_renderImage}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={ev => {
                    scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / componentWidth))
                }}
                onScroll={scrollHandler}
                maxToRenderPerBatch={2}
                initialNumToRender={3}
                getItemLayout={_getItemLayout}
            />
            <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                <Paginator
                    counts={images.length}
                    customStyle={paginatorStyle}
                    currentIndex={activeIndex}
                    scrollX={scrollX}
                    scrollToIndex={scrollToActiveIndex}
                    imageWidth={componentWidth}
                    showPrevAndNext
                />
            </BlurView>
        </View>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    flatlist: {
        flexGrow: 0,
        overflow: 'hidden',
    },
    blurContainer: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        paddingVertical: hp(8),
        bottom: 0,
    }
})