import * as appActions from './actions'
import * as mealboxActions from '../mealbox/actions'
import * as minibuffetActions from '../minibuffet/actions'
import { AppAPI, CustomerAPI, ProductAPI } from '@services'
import { cloneDeep } from 'lodash'
import moment from 'moment'

export const fetchAll = (groupIds) => async (dispatch) => {
    try {
        dispatch(appActions.productsFetching())

        /* retrieve all types of menu and specific delivery times */
        const [miniBuffetDates, mealBox, specificTimes] = await Promise.all([
            ProductAPI.getMiniBuffetServingDateTime({ groupIds }),
            ProductAPI.getMealBoxByGroups({ groupIds })
                .then(result => {
                    return result.map(product => {
                        const newProduct = cloneDeep(product)
                        return newProduct
                    })
                }),
            ProductAPI.getSpecificDeliveryTimes()
        ])

        /* set serving times filter for mealbox */
        const servingTimes = []
        for (let product of mealBox) {
            if (!servingTimes.some(servingTime => servingTime.time == product.servingTime.time))
                servingTimes.push(product.servingTime)
        }

        /* set mealtime for mealbox */
        const mealtimeType = servingTimes.length === 0
            ? -1
            : servingTimes.length > 1
                ? -1
                : servingTimes[0].mealtime.id

        const payload = {
            mealBox,
            servingTimes,
            mealtimeType,
        }

        dispatch(appActions.fetchingSuccess({ specificTimes }))
        // sent to mealbox model
        dispatch(mealboxActions.fetchingSuccess(payload))
        // sent to minibuffet model
        dispatch(minibuffetActions.fetchingSuccess({ miniBuffetDates }))

        /* set default filter to first date to mealbox menu */
        if (mealBox.length > 0) {
            mealBox.sort((a, b) => moment(a.servingDate).valueOf() - moment(b.servingDate).valueOf())
            dispatch(mealboxActions.filterProducts(mealBox[0].servingDate, 0))
        }
    } catch (error) {
        dispatch(appActions.fetchingFail({ error }))
    }
}

export const checkPromoCode = ({ promoCode, customerId, total, postcode, type }) => async () => {
    const result = await CustomerAPI.checkPromoCode({
        promoCode,
        customerId,
        orderAmount: total,
        postcode,
        orderType: type
    })

    return result
}

export const requestProposal = ({ name, phone, email, servingDate, mealtimeID, guests }) => async () => {
    const result = await AppAPI.requestProposal({
        name, phone, email, servingDate, mealtimeID, guests
    })

    return result
}