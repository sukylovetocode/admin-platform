module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
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
