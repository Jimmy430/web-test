// const elevationShadowStyle = (elevation) => {
//     return {
//         elevation,
//         shadowOffset: {
//             height: 0,
//             width: elevation
//         },
//         shadowColor: "rgba(0,0,0,0.2)",
//         shadowOpacity: 1,
//         shadowRadius: 5
//     }
// }

const fisherShuffle = (array) => {
    for (let i = 0; i < array.length; i++) {
        let x = array[i]
        let y = Math.floor(Math.random() * (i + 1))
        array[i] = array[y]
        array[y] = x
    }
}

const Constants = {
    AmendmentFee: 0.5,
    CustomTimeFee: 30,
    ExtraDeliveryFee: 2,
    TeabreakDeliveryFee: 1.5,
}

export {
    fisherShuffle,
    Constants
}
export * from './CustomHook'
export * from './DateTimeUtil'
export * from './Enums'
export * from './ImageUtil'
export * from './StringUtil'