module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['.'],
                    alias: {
                        '@appRedux': './src/appRedux',
                        '@common': './src/common',
                        '@components': './src/components',
                        '@container': './src/container',
                        '@context': './src/context',
                        '@graphql': './src/graphql',
                        '@reducer': './src/reducer',
                        '@services': './src/services',
                        '@styles': './src/styles',
                    },
                    extensions: [
                        '.ios.ts',
                        '.ios.tsx',
                        '.android.ts',
                        '.android.tsx',
                        '.ts',
                        '.tsx',
                        '.js',
                        '.jsx',
                        '.json',
                    ],
                },
            ],
            'react-native-reanimated/plugin'
        ],
    };
};
