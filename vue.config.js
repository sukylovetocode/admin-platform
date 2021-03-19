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
            userInfo: {
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
};
