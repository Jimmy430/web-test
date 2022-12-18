export function generateOptionSet(option) {
    const result = Array(option.packs)

    if (option.variants.length === 1)
        result.fill(option.variants[0].id)

    return result
}