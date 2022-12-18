import { StyleSheet } from "react-native"

import { wp } from './CustomPoints'

export const FontType = {
    Futura: 'Futura-Medium',
    FuturaBold: 'Futura-Bold',
    FuturaItalic: 'Futura-MediumItalic',
    FuturaCn: 'Futura-CondensedMedium',
    FuturaCnBold: 'Futura-CondensedExtraBold',
    Avenir: 'AvenirNext-Regular',
    AvenirBold: 'AvenirNext-Bold',
    AvenirDemiBold: 'AvenirNext-DemiBold',
    AvenirMedium: 'AvenirNext-Medium',
    Regular: 'Roboto-Regular',
    Medium: 'Roboto-Medium',
    Italic: 'Roboto-MediumItalic',
    Light: 'Roboto-Light',
    Bold: 'Roboto-Bold',
    Black: 'Roboto-Black',
    SlabBold: 'Roboto-Slab-Bold'
}

export const Typography = StyleSheet.create({
    Header: {
        fontFamily: FontType.Black,
        fontSize: wp(24),
        letterSpacing: wp(0.18)
    },
    SubTitle_21: {
        fontFamily: FontType.Bold,
        fontSize: wp(21),
        letterSpacing: wp(0.15)
    },
    SubTitle_16: {
        fontFamily: FontType.Bold,
        fontSize: wp(16),
        letterSpacing: wp(0.15)
    },
    SubTitle_14: {
        fontFamily: FontType.Bold,
        fontSize: wp(14),
        letterSpacing: wp(0.1)
    },
    BodyMedium_16: {
        fontFamily: FontType.Medium,
        fontSize: wp(16),
        letterSpacing: wp(0.3)
    },
    BodyMedium_14: {
        fontFamily: FontType.Medium,
        fontSize: wp(14),
        letterSpacing: wp(0.25)
    },
    BodyMedium_12: {
        fontFamily: FontType.Medium,
        fontSize: wp(12),
        letterSpacing: wp(0.25)
    },
    BodyRegular_16: {
        fontFamily: FontType.Regular,
        fontSize: wp(16),
        letterSpacing: wp(0.3)
    },
    BodyRegular_14: {
        fontFamily: FontType.Regular,
        fontSize: wp(14),
        letterSpacing: wp(0.25)
    },
    BodyRegular_12: {
        fontFamily: FontType.Regular,
        fontSize: wp(12),
        letterSpacing: wp(0.25)
    },
    BodyLight_16: {
        fontFamily: FontType.Light,
        fontSize: wp(16),
        letterSpacing: wp(0.3)
    },
    BodyLight_14: {
        fontFamily: FontType.Light,
        fontSize: wp(14),
        letterSpacing: wp(0.25)
    },
    BodyLight_12: {
        fontFamily: FontType.Light,
        fontSize: wp(12),
        letterSpacing: wp(0.25)
    },
    Button: {
        fontFamily: FontType.Bold,
        fontSize: wp(16)
    },
    Caption: {
        fontFamily: FontType.Regular,
        fontSize: wp(12),
        letterSpacing: wp(0.3)
    }
})