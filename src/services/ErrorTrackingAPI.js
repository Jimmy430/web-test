// import * as Sentry from 'sentry-expo'
// import Constants, { AppOwnership } from 'expo-constants'

// const initialize = () => {
//     if (Constants.appOwnership == AppOwnership.Expo) return
//     Sentry.init({
//         dsn: 'https://05ec1f37964d433e8403cab182255298@o419471.ingest.sentry.io/5397955',
//         enableInExpoDevelopment: true,
//         debug: true,
//     })
// }

const sendError = (error, label, ...subLabel) => {
    let errorStr = ""
    if (label) errorStr += `[${label}]`
    if (subLabel)
        subLabel.forEach(sl => errorStr += `[${sl}]`)
    errorStr += " " + error

    console.log(errorStr)
//     if (Constants.appOwnership == AppOwnership.Expo)
//         console.log(errorStr)
//     else
//         Sentry.Native.captureMessage(errorStr)
}

export default {
    // initialize,
    sendError
}