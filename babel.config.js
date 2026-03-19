module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind', // NativeWind v4: replaces the old transformer approach
        },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@services': './src/services',
            '@store': './src/store',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
            '@theme': './src/theme',
            '@i18n': './src/i18n',
            '@config': './src/config',
            '@assets': './src/assets',
          },
        },
      ],
      'react-native-reanimated/plugin', // MUST be last
    ],
  };
};
