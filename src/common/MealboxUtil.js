const { Constants } = require("./index")

const getDeliveryFee = (drops, defaultFee = 0, discount = 0, checkTime) => {
    let totalDeliveryFee = 0

    drops.forEach(drop => {
        if (drop.mealtime != 3)
            totalDeliveryFee += defaultFee
        else
            totalDeliveryFee += Math.min(defaultFee, Constants.TeabreakDeliveryFee)

        const needExtraFee = drop.extraFeeTime < checkTime
        if (needExtraFee)
            totalDeliveryFee += Constants.ExtraDeliveryFee
    })

    return totalDeliveryFee * (1 - parseFloat(discount) / 100)
}

export {
    getDeliveryFee
}