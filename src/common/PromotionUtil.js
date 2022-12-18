import { Applicability } from "./Enums"

const PromoType = {
    amount: "DOLLAR",
    percentage: "PERCENTAGE"
}

export const applyPromo = (promotion, productTotal, deliveryFees) => {
    let total = productTotal + deliveryFees
    const { value, type, applicability } = promotion

    if (applicability === Applicability.DELIVERY) {
        return calculateDiscounts(deliveryFees, value, type)
    } else {
        return calculateDiscounts(total, value, type)
    }
}

const calculateDiscounts = (target, value, type) => {
    if (type === PromoType.amount) return value > target ? target : value

    return Math.round(target * value) / 100
}