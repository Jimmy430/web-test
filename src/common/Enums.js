import { Color } from '@styles'

export const Anims = {
    LoginFetching: require('../../assets/anim_login_fetching.gif'),
    LoginTransition: require('../../assets/anim_login_transition.gif'),
    Payment: require('../../assets/anim_payment.gif'),
    Waiting: require('../../assets/anim_please_wait.gif'),
}

export const Applicability = {
    UNRESTRICTED: "UNRESTRICTED",
    MINIBUFFET: "MINIBUFFET",
    DELIVERY: "DELIVERYFEE"
}

export const CommunityUsage = {
    0: {
        name: "Insufficient data",
        deliveryFee: 1.95,
        color: "#77C043"
    },
    1: {
        name: "Below average",
        deliveryFee: 3.95,
        color: "#E57E7E"
    },
    2: {
        name: "Average",
        deliveryFee: 2.95,
        color: "#E0E05A"
    },
    3: {
        name: "Above average",
        deliveryFee: 1.95,
        color: "#7F99E6"
    },
    4: {
        name: "High",
        deliveryFee: 0.95,
        color: "#6CD987"
    },
    5: {
        name: "Very high",
        deliveryFee: 0,
        color: "#2A4D3C"
    }
}

export const DeliveryStatus = {
    processing: "PROCESSING",
    ontheway: "ONTHEWAY",
    collected: "DELIVERED",
    issued: "ISSUED"
}

export const DeliveryTabs = {
    Mealbox: 'Mealbox',
    Minibuffet: 'Mini buffet'
}

export const DishTypes = {
    MealBox: 'MEALBOX',
    ComboSet: 'COMBO_SET',
    Catering: 'CATERING'
}

export const EditAddressFrom = {
    NEW: {
        MEALBOX: "new mealbox customer",
        MINIBUFFET: "new minibuffet customer"
    },
    ADD: "add new address",
    EDIT: "edit exist address",
    FORCE: "force existing user enter postcode"
}

export const FilterType = {
    Producer: 'producer',
    Muslim_Friendly: 'muslim',
    Dietary: 'dietary',
    Protein: 'protein'
}

export const HistoryTabs = {
    pendingMealbox: 'Mealbox',
    pendingMinibuffet: 'Mini buffet',
    completed: 'Completed',
}

export const Icons = {
    Account: require('../../assets/ic_Account.png'),
    AddNoBg: require('../../assets/ic_Add.png'),
    ArrowHead: require('../../assets/ic_ArrowHead.png'),
    ArrowHeadDown: require('../../assets/ic_ArrowHead_Down.png'),
    ArrowHeadDown_Fill: require('../../assets/ic_ArrowHead_Down_Fill.png'),
    Bin: require('../../assets/ic_Bin_Fill.png'),
    Bulb: require('../../assets/ic_Bulb.png'),
    Bell: require('../../assets/ic_Bell.png'),
    CafeCup: require('../../assets/ic_CafeCup.png'),
    Calendar: require('../../assets/ic_Calendar.png'),
    Cancellation: require('../../assets/ic_Cancellation.png'),
    Cart: require('../../assets/ic_Cart.png'),
    Cart_Fill: require('../../assets/ic_Cart_Fill.png'),
    Checked: require('../../assets/ic_Checked.png'),
    Checked_Unfill: require('../../assets/ic_Checked_Unfill.png'),
    Coin: require('../../assets/ic_Coin.png'),
    Contact: require('../../assets/ic_Contact.png'),
    Credit_NoRefund: require('../../assets/ic_CreditNoRefund.png'),
    Cross: require('../../assets/ic_Cross.png'),
    Cross_Border: require('../../assets/ic_Cross_border.png'),
    Cutlery: require('../../assets/ic_Cutlery.png'),
    DefaultCard: require('../../assets/ic_DefaultCard.png'),
    Delivery_Arrived: require('../../assets/ic_Van.png'),
    Delivery_Collected: require('../../assets/ic_Foodbag.png'),
    Delivery_Delay: require('../../assets/ic_Delay.png'),
    Delivery_DelayFill: require('../../assets/ic_Delay_Fill.png'),
    Delivery_Issued: require('../../assets/ic_Orderissue.png'),
    Delivery_LatePickup: require('../../assets/ic_Hourglass.png'),
    Delivery_NoOrder: require('../../assets/ic_NoOrder.png'),
    Delivery_OnTime: require('../../assets/ic_Smile.png'),
    Delivery_Status: require('../../assets/ic_Delivery.png'),
    Delivery_Time: require('../../assets/ic_PickupTime.png'),
    Diamond: require('../../assets/ic_Diamond.png'),
    DoubleTick: require('../../assets/ic_DoubleTick.png'),
    Email: require('../../assets/ic_Email.png'),
    Eye: require('../../assets/ic_Eye.png'),
    Feedback: require('../../assets/ic_Feedback.png'),
    Filter: require('../../assets/ic_Filter.png'),
    FindOutWhy_Crown: require('../../assets/ic_FindOutWhy_Crown.png'),
    FindOutWhy_Piggy: require('../../assets/ic_FindOutWhy_Piggy.png'),
    FindOutWhy_Service: require('../../assets/ic_FindOutWhy_CustomerService.png'),
    FindOutWhy_Star: require('../../assets/ic_FindOutWhy_Star.png'),
    FindOutWhy_Tag: require('../../assets/ic_FindOutWhy_NoMarkUp.png'),
    Guide: require('../../assets/ic_Guide.png'),
    Heart: require('../../assets/ic_Heart.png'),
    Help: require('../../assets/ic_Help.png'),
    History: require('../../assets/ic_History.png'),
    HistoryClock: require('../../assets/ic_HistoryClock.png'),
    Inbox: require('../../assets/ic_Inbox.png'),
    InfoBoarder: require('../../assets/ic_InfoBoarderNew.png'),
    InfoFilled: require('../../assets/ic_InfoFilled.png'),
    Leave: require('../../assets/ic_Leaves.png'),
    LeaveGreen: require('../../assets/ic_LeaveGreen.png'),
    Link: require('../../assets/ic_Link.png'),
    LocationAvailable: require('../../assets/ic_Location_available.png'),
    LocationLined: require('../../assets/ic_Location_lined.png'),
    LocationUnavailable: require('../../assets/ic_Location_unavailable.png'),
    Logout: require('../../assets/ic_Logout.png'),
    Minus_Circle: require('../../assets/ic_Minus_Circle.png'),
    Minus_Square: require('../../assets/ic_Minus_Square.png'),
    More: require('../../assets/ic_More.png'),
    Moon: require('../../assets/ic_Moon.png'),
    Navi: require('../../assets/ic_Navi.png'),
    PaperBag: require('../../assets/ic_PaperBag.png'),
    Phone: require('../../assets/ic_Phone.png'),
    Plus_Circle: require('../../assets/ic_Plus_Circle.png'),
    Plus_Square: require('../../assets/ic_Plus_Square.png'),
    Pin: require('../../assets/ic_Pin.png'),
    Privacy: require('../../assets/ic_Privacy.png'),
    Refresh: require('../../assets/ic_Refresh.png'),
    RefreshLined: require('../../assets/ic_Refresh_Lined.png'),
    Refund: require('../../assets/ic_Refund.png'),
    Set: require('../../assets/ic_Set.png'),
    Setting: require('../../assets/ic_Setting.png'),
    Sun: require('../../assets/ic_Sun.png'),
    Tag: require('../../assets/ic_Tag.png'),
    TagLined: require('../../assets/ic_Tag_lined.png'),
    Terms: require('../../assets/ic_Terms.png'),
    ThankYou: require('../../assets/ic_ThankYou.png'),
    ThumbUp: require('../../assets/ic_ThumbUp.png'),
    Time: require('../../assets/ic_Time.png'),
    TimeLined: require('../../assets/ic_Time_lined.png'),
    Van: require('../../assets/ic_Van.png'),
    Wallet: require('../../assets/ic_Wallet.png'),
    Whatsapp: require('../../assets/ic_Whatsapp.png')
}

export const MealTimeButtons = {
    All: {
        label: 'All',
        value: -1,
        textColor: Color.mealtypeAll,
        backgroundColor: Color.mealtypeAll_bg
    },
    Lunch: {
        label: 'Lunch',
        mealtime: '11:30 AM to 1:00 PM',
        value: 2,
        textColor: Color.mealtypeLunch,
        backgroundColor: Color.mealtypeLunch_bg,
        icon: Icons.Sun
    },
    TeaBreak: {
        label: 'Tea break',
        mealtime: '3:00 PM to 4:30 PM',
        value: 3,
        textColor: Color.mealtypeTeaBreak,
        backgroundColor: Color.mealtypeTeaBreak_bg,
        icon: Icons.CafeCup
    },
    Dinner: {
        label: 'Dinner',
        mealtime: '6:00 PM to 7:30 PM',
        value: 4,
        textColor: Color.mealtypeDinner,
        backgroundColor: Color.mealtypeDinner_bg,
        icon: Icons.Moon
    },
    Other: {
        label: 'Other',
        value: 99,
        textColor: Color.mealtypeAll,
        backgroundColor: Color.mealtypeAll_bg
    }
}

export const GuestButtons = [
    {
        label: '10',
        value: 10,
    },
    {
        label: '15',
        value: 15,
    },
    {
        label: '20',
        value: 20,
    },
    {
        label: '25 +',
        value: 99,
    },
]

export const MealTypeImages = {
    MealBox: require('../../assets/image_Mealbox.jpg'),
    MiniBuffet: require('../../assets/image_Minibuffet.jpg'),
}

export const Medal = {
    Black: require('../../assets/medal_black.png'),
    Bronze: require('../../assets/medal_bronze.png'),
    Gold: require('../../assets/medal_gold.png'),
    New: require('../../assets/medal_new.png'),
    Silver: require('../../assets/medal_silver.png')
}

export const MedalRate = {
    Bronze: 80,
    Gold: 90,
    Silver: 85
}

export const MemberShip = {
    1: {
        name: "Starter",
        discount: "0%",
        color: "#E57E7E"
    },
    2: {
        name: "Believer",
        discount: "10%",
        color: "#E0E07B"
    },
    3: {
        name: "Enthusiast",
        discount: "25%",
        color: "#7F99E6"
    },
    4: {
        name: "Advocate",
        discount: "50%",
        color: "#6CD987"
    }
}

export const MenuTypes = {
    MealBox: 'Meal box',
    MiniBuffet: 'Mini buffet'
}

export const DateSpecificSurcharge = [
    { type: 'Christmas Peak Surcharge', date: '2022-12-24', value: 15 },
    { type: 'Christmas Peak Surcharge', date: '2022-12-25', value: 15 },
    { type: 'Christmas Peak Surcharge', date: '2022-12-26', value: 15 },

    { type: 'Chinese New Year Peak Surcharge', date: '2023-01-20', value: 15 },
    { type: 'Chinese New Year Peak Surcharge', date: '2023-01-21', value: 15 },
    { type: 'Chinese New Year Peak Surcharge', date: '2023-01-22', value: 15 },
    { type: 'Chinese New Year Peak Surcharge', date: '2023-01-23', value: 15 },
    { type: 'Chinese New Year Peak Surcharge', date: '2023-01-24', value: 15 },
]