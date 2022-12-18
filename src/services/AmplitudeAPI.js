import * as Amplitude from '@amplitude/analytics-react-native';
// import * as FirebaseAnalytics from 'expo-firebase-analytics'
import * as Devices from 'expo-device'
import ErrorTrackingAPI from './ErrorTrackingAPI'
// import Branch, { BranchError } from './BranchModule'
import Constants, { AppOwnership } from 'expo-constants'

let isInitialized = false
const apiKey = "cf113e48f12fd51cf84d768b9118810b"

export const Events = {
    NAVI: {
        COMMUNITY_USAGE: 'ENTER_COMMUNITY_USAGE_PAGE',
        COMPLETE_ORDER: 'ENTER_COMPLETE_ORDER_PAGE',
        CREDIT: 'ENTER_CREDIT_DETAIL_PAGE',
        DELIVARY: 'ENTER_DELIVERY_STATUS_PAGE',
        FORCEREVIEW: {
            NORMAL: 'ENTER_FORCE_REVIEW',
            FREE: 'ENTER_FREE_SAMPLE_FORCE_REVIEW'
        },
        FREESAMPLE: 'ENTER_FREE_SAMPLE_PAGE',
        GROUPREVIEW: 'ENTER_GROUP_REVIEW_PAGE',
        GROUPREVIEWFREE: 'ENTER_GROUP_REVIEW_FREE_PAGE',
        HISTORY: 'ENTER_ORDER_HISTORY_PAGE',
        HOME: 'ENTER_HOME_PAGE',
        MEALBOX: {
            CART: 'MEALBOX_ENTER_CART_PAGE',
            DETAIL: 'MEALBOX_ENTER_PRODUCT_DETAIL_PAGE',
            MENU: 'MEALBOX_ENTER_MENU_PAGE',
        },
        MINIBUFFET: {
            CART: 'MINIBUFFET_ENTER_CART_PAGE',
            DETAIL: 'MINIBUFFET_ENTER_DETAIL_PAGE',
            MENU: 'MINIBUFFET_ENTER_MENU_PAGE',
            SEARCH: 'MINIBUFFET_ENTER_SEARCH_PAGE'
        },
        QUICK_GUIDE: 'LOOK_QUICK_GUIDE',
        REGISTER: 'ENTER_REGISTER_PAGE',
        SETTING: {
            ROOT: 'ENTER_SETTING_PAGE',
            PROFILE: 'ENTER_EDIT_PROFILE_PAGE',
            DELIVERY_LIST: 'ENTER_DELIVERY_LIST_PAGE',
            EDIT_DELIVERY: 'ENTER_EDIT_DELIVERY_PAGE',
            FEEDBACK: 'ENTER_FEEDBACK_PAGE',
            HELP: 'CLICK_GET_HELP',
            TERM: 'ENTER_TERM_AND_CONDITIONS_PAGE',
            PRIVACY: 'ENTER_PRIVACY_PAGE'
        },
        TRENDING: 'ENTER_TRENDING_PAGE'
    },
    OP: {
        CLICKSHARE: 'CLICK_SHARE_REFERRAL_CODE',
        CHECK_REFERRAL_CODE: 'CHECK_REFERRAL_CODE',
        COMMUNITY_REQUEST: 'CLICK_COMMUNITY_REQUEST_BUTTON',
        DELIVERY_TABS: 'CLICK_DELIVERY_TABS',
        HISTORY_TABS: 'CLICK_HISTORY_TABS',
        LAUNCH: 'APP_LAUNCH',
        LOG_OUT: 'USER_LOG_OUT',
        MEALBOX: {
            ADD_TO_CART: 'MEALBOX_ADD_TO_CART',
            APPLY_CREDIT: 'MEALBOX_APPLY_CREDIT',
            APPLY_FILTER: 'MEALBOX_APPLY_FILTER',
            CANCEL: 'MEALBOX_CLICK_CANCEL',
            CHANGE_DATE: 'MEALBOX_CHANGE_DATE',
            CHECK_OUT: 'MEALBOX_CLICK_CHECK_OUT',
            COMPLETE_PAYMENT: 'MEALBOX_COMPLETE_PAYMENT',
            FILTER: 'MEALBOX_CLICK_FILTER',
            PAY: "MEALBOX_CLICK_PAYMENT",
            REMOVE_FROM_CART: 'MEALBOX_REMOVE_FROM_CART',
            SERVING_TIME: 'MEALBOX_SEE_SERVING_TIME',
            SERVING_TIME_WITHOUT_BG: 'MEALBOX_SEE_SERVING_TIME_WITHOUT_BG',
            VENDOR_LOCATION: 'MEALBOX_SEE_VENDOR_LOCATION',
        },
        MINIBUFFET: {
            ADD_TO_CART: "MINIBUFFET_ADD_TO_CART",
            CANCEL: 'MINIBUFFET_CLICK_CANCEL',
            CHECK_OUT: 'MINIBUFFET_CLICK_CHECK_OUT',
            COMPLETE_PAYMENT: 'MINIBUFFET_COMPLETE_PAYMENT',
            CUSTOM_DELIVERY_TIME: "MINIBUFFET_CHOOSE_CUSTOM_DELIVERY_TIME",
            SEARCH_MENU: 'MINIBUFFET_SEARCH_MENU',
            OPEN_HISTORY_INFO_POPUP: 'OPEN_HISTORY_INFO_POPUP',
            OPEN_DELIVERY_INFO_POPUP: 'OPEN_DELIVERY_INFO_POPUP',
            PAY: "MINIBUFFET_CLICK_PAYMENT",
            REMOVE_FROM_CART: 'MINIBUFFET_REMOVE_FROM_CART',
        },
        REFERALTERM: 'SEE_REFERRAL_TERM',
        SHAREDONE: 'FINISH_SHARE_REFERRAL_CODE',
        SENDFORCE: 'SEND_FORCE_REVIEW',
        SENDGROUP: 'SEND_GROUP_REVIEW',
        TOHISTORY: 'SKIP_REVIEW_TO_HISTORY',
    }
}

const initialize = async () => {
    if (Constants.debugMode) return
    if (isInitialized) {
        return;
    }


    await Amplitude.init(apiKey);
    isInitialized = true;

    // if (!!Branch) {
    //     try {
    //         await Branch.subscribe(async ({ error, params, uri }) => {
    //             if (error) {
    //                 ErrorTrackingAPI.sendError(error, 'Error from Branch')
    //                 return
    //             }
    //             const lastParams = await Branch.getLatestReferringParams()
    //             track('BRANCH_INFO', { suport: true, app_env: Constants.manifest.extra.app_env, ...lastParams })
    //             const utmObject = {
    //                 channel: lastParams["~channel"],
    //                 feature: lastParams["~feature"],
    //                 campaign: lastParams["~campaign"]
    //             }
    //             if (lastParams["+is_first_session"]) {
    //                 utmObject.initialCampaign = lastParams["~campaign"]
    //             }
    //             await Amplitude.setUserPropertiesAsync(utmObject)
    //         })
    //     } catch (error) {
    //         ErrorTrackingAPI.sendError(error, "Branch", "SystemError")
    //     }
    // } else {
    //     track('BRANCH_INFO', { suport: false, app_env: Constants.manifest.extra.app_env })
    // }
}

const setUser = (customer) => {
    if (Constants.debugMode) return
    initialize()

    Amplitude.setUserId(customer.id.toString())

    const userProperties = new Amplitude.Identify();
    userProperties.set('customerId', customer.id.toString())
    userProperties.set('email', customer.email)

    Amplitude.identify(userProperties)

    // if (Devices.brand != 'HUAWEI') {
    //     FirebaseAnalytics.setUserProperties({
    //         customerId: customer.id.toString(),
    //         email: customer.email
    //     })
    // }
}

const track = (event, props) => {
    if (Constants.debugMode) {
        if (props)
            console.log(`[${event}] ${JSON.stringify(props)}`)
        else
            console.log(`[${event}]`)
        return
    }
    initialize()

    if (props) {
        Amplitude.track(event, props)
    } else {
        Amplitude.track(event)
    }

    // if (Devices.brand != 'HUAWEI') {
    //     FirebaseAnalytics.logEvent(event, props)
    // }
}

export default {
    initialize,
    setUser,
    track
}