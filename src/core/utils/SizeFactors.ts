import { 
    moderateScale,
    moderateVerticalScale,
    scale,
    verticalScale 
  } from 'react-native-size-matters';
  import { 
    Platform, 
    PixelRatio, 
    Dimensions, 
  } from 'react-native';

  const { width, height } = Dimensions.get('window');
  
  const WIDE_SCREEN_FACTOR = 0.8;
  const TALL_SCREEN_FACTOR = 1.2;
  const ANDROID_FONT_FACTOR = 1.03;
  const IOS_FONT_FACTOR = 0.97;
  const BASE_FACTOR = 0.5;
  
  const isTablet = width >= 600 || height >= 900;
  const isAndroid = Platform.OS === 'android';

  export const responsiveSize = (
    size: number,
    factor: number = BASE_FACTOR,
    direction: 'vertical' | 'horizontal' = 'horizontal'
  ) => {
    let scaledSize = moderateScale(size, factor);

    const aspectRatio = width / height;
    if (aspectRatio > 0.6) scaledSize *= WIDE_SCREEN_FACTOR;
    if (aspectRatio < 0.45) scaledSize *= TALL_SCREEN_FACTOR;
  
    if (isTablet) scaledSize *= 0.85;
  
    return PixelRatio.roundToNearestPixel(scaledSize);
  };
  

  export const fontSize = (size: number) => {
    const fontScale = PixelRatio.getFontScale();
    let scaledSize = responsiveSize(size, 0.3);
  
    scaledSize *= isAndroid ? ANDROID_FONT_FACTOR : IOS_FONT_FACTOR;
  
    return PixelRatio.roundToNearestPixel(scaledSize * fontScale);
  };
  
  export const spacing = (
    size: number,
    direction: 'vertical' | 'horizontal' | 'all' = 'all'
  ) => {
    switch (direction) {
      case 'vertical':
        return moderateVerticalScale(size);
      case 'horizontal':
        return moderateScale(size);
      default:
        return responsiveSize(size, 0.4);
    }
  };


export const iconSize = (size: number) => {
  // Use moderateScale for scaling, no hard minimum
  let baseSize = moderateScale(size, 0.2);
  if (isTablet) baseSize *= 1.2; // Slightly bigger on tablets
  return PixelRatio.roundToNearestPixel(baseSize);
};

export const iconContainer = (size: number) => ({
  width: iconSize(size),
  height: iconSize(size),
  justifyContent: 'center',
  alignItems: 'center',
});