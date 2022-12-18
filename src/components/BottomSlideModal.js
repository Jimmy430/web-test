import React from "react"
import Modal from 'react-native-modal'

import { Color, hp, wp } from "@styles"
import { View } from "react-native"

export const SlideIndicator = ({ style }) => (
    <View
        style={[{
            width: wp(37),
            height: hp(4),
            borderRadius: hp(2),
            backgroundColor: Color.Background.Line,
            marginTop: hp(10),
            marginBottom: hp(26),
            alignSelf: 'center'
        }, style]}
    />
)

export const ScrollableModal = ({ visibility, onClose, handleScrollTo, scrollOffset, children }) => (
    <Modal
        isVisible={visibility}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        onSwipeComplete={onClose}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}

        style={{ margin: 0, justifyContent: 'flex-end' }}
        backdropColor={Color.modalBackground}
        scrollOffsetMax={200}
        swipeDirection='down'
        propagateSwipe={true}
    >
        {children}
    </Modal >
)


const BottomSlideModal = ({ visibility, onClose, children }) => (
    <Modal
        style={{ margin: 0, justifyContent: 'flex-end' }}
        backdropColor={Color.modalBackground}
        isVisible={visibility}
        onBackdropPress={onClose}
        onBackButtonPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection='down'
        // useNativeDriverForBackdrop={true}
    >
        {children}
    </Modal>
)

export default BottomSlideModal