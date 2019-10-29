module.exports = {
    configureWebpack: (config) => {
        config.externals = {
            ...config.externals,
            'vue': 'vue',
        }
    }
}