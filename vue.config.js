module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
    },
  },
  devServer: {
    proxy: {
      '/api/disputs': {
        target: 'https://reviews.xyzies.ardas.biz',
        secure: true,
        changeOrigin: true,
      },
    },
  },
};
