const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
            },
            '/authorize': {
                target: 'https://github.com/login/oauth/authorize',
                changeOrigin: true,
                pathRewrite: {
                    '^/authorize': '',
                },
            },
            '/getAccessToken': {
                target: 'https://github.com/login/oauth/access_token',
                changeOrigin: true,
                pathRewrite: {
                    '^/getAccessToken': '',
                },
            },
            '/userInfo': {
                target: 'https://api.github.com/user',
                changeOrigin: true,
                pathRewrite: {
                    '^/userInfo': '',
                },
            },
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias.set(
            'ScrollMagic',
            'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'
        );
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(new BundleAnalyzerPlugin());
        }
    },
    // configureWebpack: {
    //     plugins: [new BundleAnalyzerPlugin()],
    // },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'sass',
            patterns: [
                path.resolve(__dirname, './src/assets/styles/*.scss'), //你的.scss文件所在目录
            ],
        },
    },
    css: {
        extract: false,
    },
};
