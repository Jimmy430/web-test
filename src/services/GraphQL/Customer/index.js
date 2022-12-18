import { client } from '../Client'
import { CREATE_ACCOUNT, RECOVER_ACCOUNT, GET_CUSTOMER_INFO, UPDATE_CUSTOMER_INFO, GET_CUSTOMER_REVIEWS, CHECK_MENU_GROUP, RECEIVE_ACCESS_TOKEN, RENEW_ACCESS_TOKEN, CUSTOMER_ADD_ADDRESS, CUSTOMER_UPDATE_ADDRESS, CUSTOMER_DELETE_ADDRESS, REQUEST_POSTCODE, CUSTOMER_SEE_STORE_REVIEW, GET_CUSTOMER_INFO_BY_ID, GET_CURRENT_CUSTOM_DELIVERY_TIMES, GET_NOTIFICATIONS_BY_CUSTOMER_ID, CHECK_PROMO_CODE } from './schema'
import { formatData } from '../utils'
import ErrorTrackingAPI from '../../ErrorTrackingAPI'
// import { registerForPushNotificationsAsync } from '../../Notifications'

export default class CustomerAPI {
    static checkMenuGroup = (postcode) => {
        try {
            return client.query({
                query: CHECK_MENU_GROUP,
                variables: {
                    postcode
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                return formatData(res, "customerCheckMenuGroup")
            }).catch(error => {
                if (!error.networkError) {
                    ErrorTrackingAPI.sendError(error, "CustomerAPI", "checkMenuGroup", "GraphQLError")
                }
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "checkMenuGroup", "SystemError")
            return {
                error
            }
        }
    }

    static requestPostcode = (identifier, postcode) => {
        try {
            return client.mutate({
                mutation: REQUEST_POSTCODE,
                variables: {
                    requestPostcodeInput: {
                        identifier,
                        postcode
                    }
                }
            }).then(res => {
                const modal = formatData(res, "customerRequestPostcode")
                if (!modal.success)
                    return {
                        message: modal.error
                    }
                return {
                    message: "Thank you! We will inform you when access to your community becomes available."
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "requestPostcode", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "requestPostcode", "SystemError")
            return {
                error
            }
        }
    }

    static createAccount = (customerInput, addressInput) => {
        try {
            return client.mutate({
                mutation: CREATE_ACCOUNT,
                variables: {
                    customerInput,
                    addressInput
                }
            }).then(res => {
                const modal = formatData(res, "customerCreate")
                if (modal.error)
                    return {
                        error: modal.error
                    }
                return {
                    data: modal.accessToken
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "createAccount", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "createAccount", "SystemError")
            return {
                error
            }
        }
    }

    static createAccessToken = (email, password) => {
        try {
            return client.query({
                query: RECEIVE_ACCESS_TOKEN,
                variables: {
                    email,
                    password
                }
            }).then(res => {
                const modal = formatData(res, "customerGetToken")
                if (modal.error)
                    return {
                        error: modal.error
                    }

                return {
                    data: modal.accessToken
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "createAccessToken", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "createAccessToken", "SystemError")
            return {
                error
            }
        }
    }

    static renewAccessToken = (accessToken) => {
        try {
            return client.mutate({
                mutation: RENEW_ACCESS_TOKEN,
                variables: {
                    accessToken
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const modal = formatData(res, "customerRenewToken")
                if (modal.error)
                    return {
                        error: modal.error
                    }
                return {
                    data: modal.accessToken
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "renewAccessToken", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "renewAccessToken", "SystemError")
            return {
                error
            }
        }
    }

    static recoverAccount = (email) => {
        try {
            return client.mutate({
                mutation: RECOVER_ACCOUNT,
                variables: {
                    email
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const modal = formatData(res, "customerRecover")
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "recoverAccount", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "recoverAccount", "SystemError")
            return {
                error
            }
        }
    }

    static getCustomerInfo = async (accessToken) => {
        try {
            let notificationToken
            // await registerForPushNotificationsAsync()
            //     .then(token => notificationToken = token)
            //     .catch(error => ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerInfo", "retrivePushToken"))
            return client.query({
                query: GET_CUSTOMER_INFO,
                variables: {
                    accessToken,
                    notificationToken
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const modal = formatData(res, "customer")
                if (!modal)
                    return {
                        error: "Something went wrong with your login session, please try again."
                    }
                if (modal.phone)
                    modal.phone = modal.phone.slice(3)
                else
                    modal.phone = ''
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerInfo", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerInfo", "SystemError")
            return {
                error
            }
        }
    }

    static getCustomerInfoByID = async (id) => {
        try {
            return client.query({
                query: GET_CUSTOMER_INFO_BY_ID,
                variables: {
                    id
                },
                fetchPolicy: 'no-cache'
            }).then(res => {
                const modal = formatData(res, "customerById")
                if (!modal)
                    return {
                        error: "Something went wrong with your login session, please try again."
                    }
                if (modal.phone)
                    modal.phone = modal.phone.slice(3)
                else
                    modal.phone = ''
                return {
                    data: modal
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerInfo", "GraphQLError")
                return {
                    error
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerInfo", "SystemError")
            return {
                error
            }
        }
    }

    static getCustomerReviews = (customerId) => {
        try {
            return client.query({
                query: GET_CUSTOMER_REVIEWS,
                variables: {
                    customerId
                }
            }).then(res => {
                const modal = formatData(res, "customer")
                return modal.reviews
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerReviews", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "getCustomerReviews", "SystemError")
            return { error }
        }
    }

    static updateCustomer = (customerAccessToken, customer) => {
        try {
            return client.mutate({
                mutation: UPDATE_CUSTOMER_INFO,
                variables: {
                    customerAccessToken,
                    customer: {
                        ...customer,
                        phone: "+65" + customer.phone
                    }
                }
            }).then(res => {
                const modal = formatData(res, "customerInfoUpdate")
                if (modal.error) {
                    return {
                        error: modal.error
                    }
                }
                const { customer } = modal
                customer.phone = customer.phone.slice(3)
                return {
                    customer
                }
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "CustomerAPI", "updateCustomer", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "updateCustomer", "SystemError")
            return { error }
        }
    }

    static checkPromoCode = ({ customerId, promoCode, orderAmount, postcode, orderType }) => {
        try {
            return client.query({
                query: CHECK_PROMO_CODE,
                variables: {
                    customerId,
                    promoCode,
                    orderAmount,
                    postcode,
                    orderType
                },
                fetchPolicy: 'network-only'
            })
                .then(res => formatData(res, "checkPromoCode"))
                .catch(error => {
                    ErrorTrackingAPI.sendError(error, "CustomerAPI", "checkPromoCode", "GraphQLError")
                    return { error }
                })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "checkPromoCode", "SystemError")
            return { error }
        }
    }

    static customerAddAddress = (customerId, address) => {
        try {
            return client.mutate({
                mutation: CUSTOMER_ADD_ADDRESS,
                variables: {
                    customerId,
                    address
                }
            }).then(res => {
                const modal = formatData(res, 'customerAddAddress')

                if (modal.error)
                    return {
                        error: modal.error
                    }

                const { addresses } = modal
                return {
                    addresses
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "customerAddAddress", "SystemError")
            return { error }
        }
    }

    static customerUpdateAddress = (addressId, address) => {
        try {
            return client.mutate({
                mutation: CUSTOMER_UPDATE_ADDRESS,
                variables: {
                    addressId,
                    address
                }
            }).then(res => {
                const modal = formatData(res, 'customerUpdateAddress')

                if (modal.error)
                    return {
                        error: modal.error
                    }

                const { addresses } = modal
                return {
                    addresses
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "customerUpdateAddress", "SystemError")
            return { error }
        }
    }

    static customerDeleteAddress = (addressId) => {
        try {
            return client.mutate({
                mutation: CUSTOMER_DELETE_ADDRESS,
                variables: {
                    addressId
                }
            }).then(res => {
                const modal = formatData(res, 'customerDeleteAddress')

                if (modal.error)
                    return {
                        error: modal.error
                    }

                const { addresses } = modal
                return {
                    addresses
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "customerDeleteAddress", "SystemError")
            return { error }
        }
    }

    static customerSeeStoreReview = (customerId, isRated) => {
        try {
            return client.mutate({
                mutation: CUSTOMER_SEE_STORE_REVIEW,
                variables: {
                    customerId,
                    isRated
                }
            }).then(res => {
                const modal = formatData(res, 'customerSeeStoreReview')

                if (modal.error)
                    ErrorTrackingAPI.sendError(modal.error, "CustomerAPI", "customerSeeStoreReview", "GraphQLError")

            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "customerSeeStoreReview", "SystemError")
            return { error }
        }
    }

    static customerGetCustomDeliveryTimes = (accessToken) => {
        try {
            return client.query({
                query: GET_CURRENT_CUSTOM_DELIVERY_TIMES,
                variables: {
                    accessToken
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'customer')

                if (modal.error) {
                    ErrorTrackingAPI.sendError(modal.error, "CustomerAPI", "customerGetCustomDeliveryTimes", "GraphQLError")
                    return { error: modal.error }
                }

                return {
                    times: modal.customDeliveryTimes
                }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "customerGetCustomDeliveryTimes", "SystemError")
            return { error }
        }
    }

    static getNotificationsByCustomerId = (customerId) => {
        try {
            return client.query({
                query: GET_NOTIFICATIONS_BY_CUSTOMER_ID,
                variables: {
                    customerId
                },
                fetchPolicy: 'network-only'
            }).then(res => {
                const modal = formatData(res, 'retrieveNotifications')

                return modal
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "CustomerAPI", "getNotificationsByCustomerId", "SystemError")
            return { error }
        }
    }
}