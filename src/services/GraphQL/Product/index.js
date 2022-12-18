import { client } from "../Client"
import { GET_MENU_BY_GROUP_IDS, GET_MINI_BUFFET_DATES, GET_MINI_BUFFET_MENU_BY_CONDITION, GET_SPECIFIC_DELIVERY_TIMES } from './schema'
import { formatData } from "../utils"
import ErrorTrackingAPI from '../../ErrorTrackingAPI'

export default class ProductAPI {
    static getMealBoxByGroups = ({ groupIds }) => {
        try {
            return client.query({
                query: GET_MENU_BY_GROUP_IDS,
                variables: {
                    groupIds
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'menu')
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "ProductAPI", "getMealBoxByGroups", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "ProductAPI", "getMealBoxByGroups", "SystemError")
            return { error }
        }
    }

    static getMiniBuffetServingDateTime = ({ groupIds }) => {
        try {
            return client.query({
                query: GET_MINI_BUFFET_DATES,
                variables: {
                    groupIds
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'menuMiniBuffetDates')
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "ProductAPI", "getMiniBuffetServingDateTime", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "ProductAPI", "getMiniBuffetServingDateTime", "SystemError")
            return { error }
        }
    }

    static getMiniBuffetByCondition = ({ groupIds, servingDate, mealtimeId, maxPax, isDev }) => {
        try {
            return client.query({
                query: GET_MINI_BUFFET_MENU_BY_CONDITION,
                variables: {
                    groupIds,
                    servingDate,
                    mealtimeId,
                    maxPax,
                    isDev
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'menuMiniBuffet')
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "ProductAPI", "getMiniBuffetByCondition", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "ProductAPI", "getMiniBuffetByCondition", "SystemError")
            return { error }
        }
    }

    static getSpecificDeliveryTimes = () => {
        try {
            return client.query({
                query: GET_SPECIFIC_DELIVERY_TIMES,
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'retrieveSpecificDeliveryTimes')
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "ProductAPI", "getSpecificDeliveryTimes", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "ProductAPI", "getSpecificDeliveryTimes", "SystemError")
            return { error }
        }
    }
}