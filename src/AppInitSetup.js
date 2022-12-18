// import setExtendFunctions from './ExtendFunction'
import { setExtendFunctions } from "./ExtendFunction";
import { Text, ActivityIndicator, StatusBar, Platform, Image } from "react-native";
import * as Font from 'expo-font'
import { Asset } from "expo-asset";

export const AppInitSetup = async () => {
    /**App basic setup */
    if (Text.defaultProps == null) Text.defaultProps = {}
    Text.defaultProps.allowFontScaling = false
    if (ActivityIndicator.defaultProps == null) ActivityIndicator.defaultProps = {}
    ActivityIndicator.defaultProps.color = "#8c8c8c"

    StatusBar.setBarStyle('dark-content')
    if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true)
        StatusBar.setBackgroundColor('transparent')
    }

    /**Class extend functions */
    setExtendFunctions()

    /**Preload assets */
    const cacheImages = () => {
        const images = [
            require('../assets/anim_login_fetching.gif'),
            require('../assets/anim_login_transition.gif'),
            require('../assets/anim_payment.gif'),
            require('../assets/anim_please_wait.gif'),
            require('../assets/ic_Account.png'),
            require('../assets/ic_Add.png'),
            require('../assets/ic_ArrowHead.png'),
            require('../assets/ic_ArrowHead_Down.png'),
            require('../assets/ic_ArrowHead_Down_Fill.png'),
            require('../assets/ic_Bin_Fill.png'),
            require('../assets/ic_Bulb.png'),
            require('../assets/ic_Bell.png'),
            require('../assets/ic_CafeCup.png'),
            require('../assets/ic_Calendar.png'),
            require('../assets/ic_Cancellation.png'),
            require('../assets/ic_Cart.png'),
            require('../assets/ic_Cart_Fill.png'),
            require('../assets/ic_Checked.png'),
            require('../assets/ic_Checked_Unfill.png'),
            require('../assets/ic_Coin.png'),
            require('../assets/ic_Contact.png'),
            require('../assets/ic_CreditNoRefund.png'),
            require('../assets/ic_Cross.png'),
            require('../assets/ic_Cross_border.png'),
            require('../assets/ic_Cutlery.png'),
            require('../assets/ic_DefaultCard.png'),
            require('../assets/ic_Delay.png'),
            require('../assets/ic_Delay_Fill.png'),
            require('../assets/ic_Delivery.png'),
            require('../assets/ic_Diamond.png'),
            require('../assets/ic_DoubleTick.png'),
            require('../assets/ic_Email.png'),
            require('../assets/ic_Feedback.png'),
            require('../assets/ic_Filter.png'),
            require('../assets/ic_FindOutWhy_Crown.png'),
            require('../assets/ic_FindOutWhy_CustomerService.png'),
            require('../assets/ic_FindOutWhy_NoMarkUp.png'),
            require('../assets/ic_FindOutWhy_Piggy.png'),
            require('../assets/ic_FindOutWhy_Star.png'),
            require('../assets/ic_Foodbag.png'),
            require('../assets/ic_Guide.png'),
            require('../assets/ic_Heart.png'),
            require('../assets/ic_Help.png'),
            require('../assets/ic_History.png'),
            require('../assets/ic_HistoryClock.png'),
            require('../assets/ic_Hourglass.png'),
            require('../assets/ic_Inbox.png'),
            require('../assets/ic_InfoBoarderNew.png'),
            require('../assets/ic_InfoFilled.png'),
            require('../assets/ic_LeaveGreen.png'),
            require('../assets/ic_Leaves.png'),
            require('../assets/ic_Link.png'),
            require('../assets/ic_Location_available.png'),
            require('../assets/ic_Location_lined.png'),
            require('../assets/ic_Location_unavailable.png'),
            require('../assets/ic_Logout.png'),
            require('../assets/ic_Minus_Circle.png'),
            require('../assets/ic_Minus_Square.png'),
            require('../assets/ic_Moon.png'),
            require('../assets/ic_More.png'),
            require('../assets/ic_Navi.png'),
            require('../assets/ic_NoOrder.png'),
            require('../assets/ic_Orderissue.png'),
            require('../assets/ic_PaperBag.png'),
            require('../assets/ic_Phone.png'),
            require('../assets/ic_PickupTime.png'),
            require('../assets/ic_Pin.png'),
            require('../assets/ic_Plus_Circle.png'),
            require('../assets/ic_Plus_Square.png'),
            require('../assets/ic_Privacy.png'),
            require('../assets/ic_Refund.png'),
            require('../assets/ic_Refresh.png'),
            require('../assets/ic_Refresh_Lined.png'),
            require('../assets/ic_Set.png'),
            require('../assets/ic_Setting.png'),
            require('../assets/ic_Smile.png'),
            require('../assets/ic_Sun.png'),
            require('../assets/ic_Tag.png'),
            require('../assets/ic_Tag_lined.png'),
            require('../assets/ic_Terms.png'),
            require('../assets/ic_ThankYou.png'),
            require('../assets/ic_ThumbUp.png'),
            require('../assets/ic_Time.png'),
            require('../assets/ic_Time_lined.png'),
            require('../assets/ic_Van.png'),
            require('../assets/ic_Wallet.png'),
            require('../assets/ic_Whatsapp.png'),
            require('../assets/CreditReferral.png'),
            require('../assets/CreditReferralBar.png'),
            require('../assets/Emptycart.png'),
            require('../assets/OrderComplete.png'),
            require('../assets/PaperTexture.png'),
            require('../assets/PaymentError.png'),
            require('../assets/image_communityUsage.png'),
            require('../assets/image_Mealbox.jpg'),
            require('../assets/image_Minibuffet.jpg'),
            require('../assets/logo_full.png'),
            require('../assets/medal_black.png'),
            require('../assets/medal_bronze.png'),
            require('../assets/medal_gold.png'),
            require('../assets/medal_new.png'),
            require('../assets/medal_silver.png'),
            require('../assets/mealType_mealbox.png'),
        ]
        return images.map(image => {
            if (typeof image === 'string') {
                return Image.prefetch(image)
            }
            return Asset.fromModule(image).downloadAsync()
        })
    }

    const cacheFonts = () => {
        const fonts = [{
            'Futura-Medium': require('../assets/fonts/Futura-Medium.ttf'),
            'Futura-Bold': require('../assets/fonts/Futura-Bold.ttf'),
            'Futura-MediumItalic': require('../assets/fonts/Futura-MediumItalic.ttf'),
            'AvenirNext-Regular': require('../assets/fonts/AvenirNext-Regular.ttf'),
            'AvenirNext-Medium': require('../assets/fonts/AvenirNext-Medium.ttf'),
            'AvenirNext-Bold': require('../assets/fonts/AvenirNext-Bold.ttf'),
            'AvenirNext-DemiBold': require('../assets/fonts/AvenirNext-DemiBold.ttf'),
            'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
            'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
            'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf'),
            'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
            'Roboto-Black': require('../assets/fonts/Roboto-Black.ttf'),
            'Roboto-Slab-Bold': require('../assets/fonts/RobotoSlab-Bold.ttf')
        }]
        return fonts.map(font => Font.loadAsync(font))
    }

    await Promise.all([...cacheImages(), ...cacheFonts()])

}