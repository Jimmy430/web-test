import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import { Icons } from '@common'
import { Color, hp, wp, Typography } from '@styles'

import CreditInput from './CreditInput'

/**
 * CreditUsage
 * @author Jimmy
 * 
 * @param {Float} applicable Applicable credits
 * @param {Float} max Maximum of applicable value, would be minimum of available credits and total amount need to pay
 * @param {Float} usedCredit Currently used credits
 * @param {Function} setUsedCredit
 * 
 */
const CreditUsage = ({
    applicable,
    max,
    usedCredit,
    setUsedCredit
}) => {
    const [usable, setUsable] = useState(applicable)

    useEffect(() => {
        if (usedCredit > max)
            setUsedCredit(max)
    }, [max])

    useEffect(() => {
        setUsable(applicable - usedCredit)
    }, [usedCredit])

    const _renderApplicableCredit = () => {
        return (
            <View style={styles.creditContainer}>
                <Text style={styles.creditText}>Applicable credit</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Icons.Coin} style={styles.icon} />
                    <Text style={[styles.creditText, { marginLeft: wp(8) }]}>${usable.toFixed(2)}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            {_renderApplicableCredit()}
            <View style={{ height: hp(8) }} />
            <CreditInput
                usedCredit={usedCredit}
                limit={max}
                onInputChange={setUsedCredit}
            />
        </>
    )
}

const styles = StyleSheet.create({
    creditContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    creditText: {
        ...Typography.BodyRegular_14,
        color: Color.Text.Black
    },
    icon: {
        width: wp(16),
        aspectRatio: 1,
    }
})

export default CreditUsage