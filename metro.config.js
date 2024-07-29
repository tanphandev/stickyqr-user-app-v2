const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Bước 1: Nhận cấu hình mặc định
const config = getDefaultConfig(__dirname);

// Bước 2: Áp dụng cấu hình từ nativewind/metro
const nativewindConfig = withNativeWind(config, { input: './global.css' });

// Bước 3: Tùy chỉnh cấu hình để sử dụng react-native-svg-transformer
const { transformer, resolver } = nativewindConfig;

nativewindConfig.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

nativewindConfig.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = nativewindConfig;
