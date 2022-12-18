const FormatShopifyImage = (image, size = 500) => {
    if (!image) return undefined

    let imageStr
    const imageArr = image.split('.jpg')
    imageStr = `${imageArr[0]}_${size}x.jpg`
    for (let i = 1; i < imageArr.length; i++) {
        imageStr += imageArr[i]
    }
    return imageStr
}

export {
    FormatShopifyImage
}