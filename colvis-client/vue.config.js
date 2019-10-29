module.exports = {
    configureWebpack: (config) => {
        config.externals = {
            ...config.externals,
            'vue-property-decorator': 'vue-property-decorator',
            'vue-class-component': 'vue-class-component',
            'vue': 'vue',
        }
    }
}