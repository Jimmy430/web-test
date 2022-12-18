import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window');
const designWidth = 375
const designHeight = 812

const wp = (size) => PixelRatio.roundToNearestPixel(size / designWidth * width)
const hp = (size) => PixelRatio.roundToNearestPixel(size / designHeight * height)

export { wp, hp }